pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        DB_PASS    = credentials('db-pass-gantt')
        JWT_SECRET = credentials('jwt-secret-gantt')
        GITHUB_PAT = credentials('github-pat')

        // Stabilise npm dans Jenkins (évite cache pourri dans /var/jenkins_home)
        NPM_CONFIG_CACHE = "/tmp/.npm"
        NPM_CONFIG_FUND  = "false"
        NPM_CONFIG_AUDIT = "false"
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
                timeout(time: 25, unit: 'MINUTES') {
                    sh '''
                        set -ex

                        export DB_PASS="$DB_PASS"
                        export JWT_SECRET="$JWT_SECRET"

                        echo "=== ENV CHECK ==="
                        node -p "process.version + ' ' + process.platform + ' ' + process.arch" || true
                        npm -v || true
                        cat /etc/os-release || true
                        echo "================="

                        echo "[JENKINS] Build portfolio"
                        cd portfolio
                        rm -rf node_modules
                        npm ci
                        npm run build
                        cd ..

                        echo "[JENKINS] Build cybersecurity-quiz"
                        cd cybersecurity-quiz
                        rm -rf node_modules
                        npm ci
                        npm run build
                        cd ..

                        echo "[JENKINS] Build cybersecurity-planner"
                        cd cybersecurity-planner
                        rm -rf node_modules
                        npm ci
                        npm run build
                        cd ..

                        echo "[JENKINS] Build gantt frontend (fix lightningcss)"
                        cd gantt/frontend

                        rm -rf node_modules package-lock.json
                        npm cache clean --force || true

                        npm ci

                        # Fix natif lightningcss / tailwind postcss
                        npm rebuild lightningcss --verbose || true
                        npm rebuild --verbose || true

                        npm run build
                        cd ../..

                        echo "[JENKINS] Build mario-game"
                        cd mario-game
                        rm -rf node_modules
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

                        export DB_PASS="$DB_PASS"
                        export JWT_SECRET="$JWT_SECRET"

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

    post {
        always {
            sh '''
                set +e
                echo "=== POST: docker ps ==="
                docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}" || true
                echo "=== POST DONE ==="
            '''
        }
    }
}
