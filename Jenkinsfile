pipeline {
    agent any

    environment {
        // ID des credentials qu’on va créer dans Jenkins
        DB_PASS    = credentials('db-pass-gantt')
        JWT_SECRET = credentials('jwt-secret-gantt')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                dir('infra') {
                    sh '''
                        export DB_PASS="${DB_PASS}" JWT_SECRET="${JWT_SECRET}"
                        docker compose pull || true
                        docker compose build
                        export DB_PASS="${DB_PASS}" JWT_SECRET="${JWT_SECRET}"
                        docker compose up -d --remove-orphans
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Déploiement réussi."
        }
        failure {
            echo "Le déploiement a échoué."
        }
    }
}
