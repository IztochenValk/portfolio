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
                        docker inspect "$JENKINS_CONTAINER" >/dev/null

                        build() {
                          DIR="$1"
                          NODE_IMAGE="$2"

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
                              test -f package.json
                              npm ci
                              npm run build
                            '
                        }

                        # Node 20 OK
                        build "portfolio" "node:20-bullseye"
                        build "cybersecurity-quiz" "node:20-bullseye"
                        build "cybersecurity-planner" "node:20-bullseye"
                        build "mario-game" "node:20-bullseye"

                        # Node 18 REQUIRED for lightningcss
                        build "gantt/frontend" "node:18-bullseye"
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
            sh 'docker ps --format "table {{.Names}}\\t{{.Status}}" || true'
        }
    }
}
