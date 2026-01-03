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

                        build_one() {
                          name="$1"
                          dir="$2"
                          echo "[JENKINS] Build ${name}"
                          cd "$dir"
                          npm_install
                          npm run build
                          cd - >/dev/null
                        }

                        build_one "portfolio" "portfolio"
                        build_one "cybersecurity-quiz" "cybersecurity-quiz"
                        build_one "cybersecurity-planner" "cybersecurity-planner"

                        echo "[JENKINS] Build gantt frontend (lightningcss safe)"
                        cd gantt/frontend
                        npm_install
                        npm rebuild lightningcss --verbose || true
                        npm rebuild --verbose || true
                        npm run build
                        cd - >/dev/null

                        build_one "mario-game" "mario-game"

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
                        docker compose version

                        export DB_PASS="$DB_PASS"
                        export JWT_SECRET="$JWT_SECRET"

                        echo "[JENKINS] docker compose pull/build/up"
                        docker compose pull
                        docker compose build

                        docker compose up -d --remove-orphans --no-build \
                          portfolio quiz planner db backend frontend mario

                        echo "=== DOCKER_DEPLOY_DONE ==="
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                try {
                    sh '''
                        set +e
                        echo "=== POST: docker ps ==="
                        if command -v docker >/dev/null 2>&1; then
                          docker ps --format "table {{.Names}}\\t{{.Ports}}\\t{{.Status}}"
                        else
                          echo "docker not available in this Jenkins runtime"
                        fi
                        echo "=== POST DONE ==="
                    '''
                } catch (e) {
                    echo "POST skipped: ${e}"
                }
            }
        }
    }
}
