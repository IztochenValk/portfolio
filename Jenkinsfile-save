pipeline {
    agent any

    options {
        // Affiche les timestamps dans les logs Jenkins
        timestamps()
    }

    environment {
        DB_PASS    = credentials('db-pass-gantt')
        JWT_SECRET = credentials('jwt-secret-gantt')
        GITHUB_PAT = credentials('github-pat')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/IztochenValk/portfolio.git',
                    credentialsId: 'github-pat'
            }
        }

        stage('Build Frontends') {
            steps {
                // On évite les builds infinies
                timeout(time: 25, unit: 'MINUTES') {
                    sh '''
                        set -ex

                        export DB_PASS="$DB_PASS"
                        export JWT_SECRET="$JWT_SECRET"

                        echo "[JENKINS] Build portfolio"
                        cd portfolio
                        npm ci
                        npm run build
                        cd ..

                        echo "[JENKINS] Build cybersecurity-quiz"
                        cd cybersecurity-quiz
                        npm ci
                        npm run build
                        cd ..

                        echo "[JENKINS] Build cybersecurity-planner"
                        cd cybersecurity-planner
                        npm ci
                        npm run build
                        cd ..

                        echo "[JENKINS] Build gantt frontend"
                        cd gantt/frontend
                        npm ci
                        npm run build
                        cd ../..

                        echo "[JENKINS] Build mario-game"
                        cd mario-game
                        npm ci
                        npm run build
                        cd ..

                        echo "=== BUILD_FRONTENDS_DONE ==="
                    '''
                }
            }
        }

        stage('Build & Deploy with Docker') {
            steps {
                dir('infra') {
                    sh '''
                        set -ex
                        echo "[JENKINS] docker compose pull/build/up"
                        docker compose pull
                        docker compose build
                        docker compose up -d
                        echo "=== DOCKER_DEPLOY_DONE ==="
                    '''
                }
            }
        }
    }
}
