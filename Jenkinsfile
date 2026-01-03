pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    environment {
        DB_PASS    = credentials('db-pass-gantt')
        JWT_SECRET = credentials('jwt-secret-gantt')

        NPM_CONFIG_CACHE = "/tmp/.npm"
        NPM_CONFIG_FUND  = "false"
        NPM_CONFIG_AUDIT = "false"

        JENKINS_CONTAINER = "jenkins"
        WS = "/var/jenkins_home/workspace/workflow-portfolio"
    }

    stages {

        stage('Checkout') {
            steps {
                cleanWs()
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/IztochenValk/portfolio.git',
                        credentialsId: 'github-workflow'
                    ]]
                ])
            }
        }

        stage('Build Frontends') {
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    sh '''
                        set -e

                        docker inspect "$JENKINS_CONTAINER" >/dev/null 2>&1 || (echo "ERROR: container '$JENKINS_CONTAINER' not found" && exit 2)

                        build_node_project() {
                          DIR="$1"
                          NODE_IMAGE="$2"

                          if [ ! -f "$WS/$DIR/package.json" ]; then
                            echo "[JENKINS] SKIP (no package.json): $DIR"
                            return 0
                          fi

                          echo "[JENKINS] Build $DIR with $NODE_IMAGE"

                          docker run --rm \
                            --volumes-from "$JENKINS_CONTAINER" \
                            -e DB_PASS="$DB_PASS" \
                            -e JWT_SECRET="$JWT_SECRET" \
                            -e NPM_CONFIG_CACHE="$NPM_CONFIG_CACHE" \
                            -e NPM_CONFIG_FUND="$NPM_CONFIG_FUND" \
                            -e NPM_CONFIG_AUDIT="$NPM_CONFIG_AUDIT" \
                            -w "$WS/$DIR" \
                            "$NODE_IMAGE" \
                            bash -lc '
                              set -e
                              npm ci
                              npm run build
                            '
                        }

                        build_node_project "portfolio" "node:20-bullseye"
                        build_node_project "cybersecurity-quiz" "node:20-bullseye"
                        build_node_project "cybersecurity-planner" "node:20-bullseye"

                        # If gantt/frontend has native lightningcss issues on Node 20, use Node 18
                        build_node_project "gantt/frontend" "node:18-bullseye"

                        # mario-game is static HTML -> skip automatically because no package.json
                        build_node_project "mario-game" "node:20-bullseye"

                        echo "=== BUILD_FRONTENDS_DONE ==="
                    '''
                }
            }
        }

        stage('Build & Deploy Docker') {
            steps {
                dir('infra') {
                    sh '''
                        set -e
                        docker compose pull
                        docker compose build
                        docker compose up -d --remove-orphans --no-build \
                          portfolio quiz planner db backend frontend mario
                    '''
                }
            }
        }
    }

    post {
        always {
            sh '''
                set +e
                docker ps --format "table {{.Names}}\\t{{.Status}}"
            '''
        }
    }
}
