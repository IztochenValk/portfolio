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

        NODE_IMAGE = "node:20-bullseye"
        JENKINS_CONTAINER = "jenkins"
        WORKSPACE_DIR = "/var/jenkins_home/workspace/workflow-portfolio"
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

                        build_dir () {
                          DIR="$1"
                          EXTRA_ENV="$2"

                          echo "[JENKINS] Build $DIR"

                          docker run --rm \
                            --volumes-from "$JENKINS_CONTAINER" \
                            -e DB_PASS="$DB_PASS" \
                            -e JWT_SECRET="$JWT_SECRET" \
                            -e NPM_CONFIG_CACHE="$NPM_CONFIG_CACHE" \
                            -e NPM_CONFIG_FUND="$NPM_CONFIG_FUND" \
                            -e NPM_CONFIG_AUDIT="$NPM_CONFIG_AUDIT" \
                            $EXTRA_ENV \
                            -w "$WORKSPACE_DIR/$DIR" \
                            "$NODE_IMAGE" \
                            bash -lc '
                              set -e
                              test -f package.json
                              npm ci
                              npm run build
                            '
                        }

                        build_dir "portfolio"
                        build_dir "cybersecurity-quiz"
                        build_dir "cybersecurity-planner"

                        # FIX CI DEFINITIF POUR lightningcss
                        build_dir "gantt/frontend" "-e TAILWIND_DISABLE_LIGHTNINGCSS=1"

                        build_dir "mario-game"

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
                docker ps --format "table {{.Names}}\t{{.Status}}"
            '''
        }
    }
}
