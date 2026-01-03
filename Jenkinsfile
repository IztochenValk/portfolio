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

        stage('Build Frontends (Node only)') {
            steps {
                sh '''
                    set -e

                    JENKINS_CONTAINER="jenkins"
                    NODE_IMAGE="node:20-bullseye"
                    WS="/var/jenkins_home/workspace/workflow-portfolio"

                    build_node() {
                      DIR="$1"
                      echo "=== BUILD NODE: $DIR ==="

                      if [ ! -f "$WS/$DIR/package.json" ]; then
                        echo "SKIP $DIR (no package.json)"
                        return
                      fi

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
                          npm ci || npm install --no-audit --no-fund
                          npm run build
                        '
                    }

                    build_node "portfolio"
                    build_node "cybersecurity-quiz"
                    build_node "cybersecurity-planner"
                    build_node "gantt/frontend"

                    echo "=== NODE BUILDS DONE ==="
                '''
            }
        }

        stage('Mario Game (Static)') {
            steps {
                sh '''
                    set -e
                    echo "=== MARIO GAME STATIC ==="
                    test -f mario-game/index.html
                    echo "Mario game OK (static files only)"
                '''
            }
        }

        stage('Build & Deploy Docker') {
            steps {
                dir('infra') {
                    sh '''
                        set -e
                        docker compose build
                        docker compose up -d --remove-orphans
                    '''
                }
            }
        }
    }

    post {
        always {
            sh '''
                echo "=== RUNNING CONTAINERS ==="
                docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
            '''
        }
    }
}
