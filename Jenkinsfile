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

                        npm_install() {
                          if [ -f package-lock.json ]; then
                            npm ci
                          else
                            npm install --no-audit --no-fund
                          fi
                        }

                        echo "[JENKINS] Build portfolio"
                        cd portfolio
                        rm -rf node_modules
                        npm_install
                        npm run build
                        cd ..

                        echo "[JENKINS] Build cybersecurity-quiz"
                        cd cybersecurity-quiz
                        rm -rf node_modules
                        npm_install
                        npm run build
                        cd ..

                        echo "[JENKINS] Build cybersecurity-planner"
                        cd cybersecurity-planner
                        rm -rf node_modules
                        npm_install
                        npm run build
                        cd ..

                        echo "[JENKINS] Build gantt frontend (lightningcss safe)"
                        cd gantt/frontend
                        rm -rf node_modules
                        npm_install

                        # Fix natif lightningcss / tailwind postcss
                        npm rebuild lightningcss --verbose || true
                        npm rebuild --verbose || true

                        npm run build
                        cd ../..

                        echo "[JENKINS] Build mario-game"
                        cd mario-game
                        rm -rf node_modules
                        npm_install
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

                        command -v docker >/dev/null 2>&1 || (echo "ERROR: docker CLI not available inside Jenkins container" && exit 1)
                        docker version

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
                if command -v docker >/dev/null 2>&1; then
                  docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"
                else
                  echo "docker not available in this Jenkins runtime"
                fi
                echo "=== POST DONE ==="
            '''
        }
    }
}
