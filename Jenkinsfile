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
        WORKSPACE_PATH = "/var/jenkins_home/workspace/workflow-portfolio"
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

                        build_dir() {
                          DIR="$1"
                          echo "[JENKINS] Build $DIR"

                          docker run --rm \
                            --volumes-from "$JENKINS_CONTAINER" \
                            -e DB_PASS="$DB_PASS" \
                            -e JWT_SECRET="$JWT_SECRET" \
                            -e NPM_CONFIG_CACHE="$NPM_CONFIG_CACHE" \
                            -e NPM_CONFIG_FUND="$NPM_CONFIG_FUND" \
                            -e NPM_CONFIG_AUDIT="$NPM_CONFIG_AUDIT" \
                            -w "$WORKSPACE_PATH/$DIR" \
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
                        build_dir "gantt/frontend"
                        build_dir "mario-game"

                        echo "[JENKINS] All frontends built"
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
                docker ps --format "table {{.Names}}\\t{{.Status}}"
            '''
        }
    }
}
