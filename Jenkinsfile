pipeline {
    agent any

    environment {
        DB_PASS      = credentials('db-pass-gantt')
        JWT_SECRET   = credentials('jwt-secret-gantt')
        GITHUB_PAT   = credentials('github-workflow')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/IztochenValk/portfolio.git',
                    credentialsId: 'github-workflow'
            }
        }

        stage('Build & Deploy') {
            steps {
                dir('infra') {
                    sh '''
                        export DB_PASS=$DB_PASS
                        export JWT_SECRET=$JWT_SECRET
                        docker compose pull
                        docker compose build
                        docker compose up -d
                    '''
                }
            }
        }
    }
}
