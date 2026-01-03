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
        NODE_IMAGE = 'node:20-bullseye'
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
                sh '''
                    set -e
                    docker inspect jenkins >/dev/null

                    build_node () {
                      DIR="$1"
                      echo "[BUILD] $DIR"

                      docker run --rm \
                        --volumes-from jenkins \
                        -e DB_PASS="$DB_PASS" \
                        -e JWT_SECRET="$JWT_SECRET" \
                        -w "/var/jenkins_home/workspace/workflow-portfolio/$DIR" \
                        $NODE_IMAGE bash -lc "
                          rm -rf node_modules package-lock.json
                          npm install
                          npm run build
                        "
                    }

                    build_node portfolio
                    build_node cybersecurity-quiz
                    build_node cybersecurity-planner
                    build_node gantt/frontend
                '''
            }
        }

        stage('Deploy Docker') {
            steps {
                dir('infra') {
                    sh '''
                        set -e
                        docker compose build
                        docker compose up -d --remove-orphans \
                          portfolio quiz planner db backend frontend
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker ps --format "table {{.Names}}\\t{{.Status}}"'
        }
    }
}
