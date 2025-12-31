pipeline {
    agent any

    environment {
        DB_PASS      = credentials('db-pass-gantt')
        JWT_SECRET   = credentials('jwt-secret-gantt')
        GITHUB_PAT   = credentials('github-pat')
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
                sh '''
                    set -e
                    export DB_PASS=$DB_PASS
                    export JWT_SECRET=$JWT_SECRET

                    cd portfolio && npm ci && npm run build && cd ..
                    cd frontend && npm ci && npm run build && cd ..
                    cd planner && npm ci && npm run build && cd ..
                    cd quiz && npm ci && npm run build && cd ..
                    cd mario-game && npm ci && npm run build && cd ..
                '''
            }
        }

        stage('Build & Deploy with Docker') {
            steps {
                dir('infra') {
                    sh '''
                        docker compose pull
                        docker compose build
                        docker compose up -d
                    '''
                }
            }
        }
    }
}
