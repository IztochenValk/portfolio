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

        stage('Build Frontends (Dockerized Node)') {
            steps {
                timeout(time: 25, unit: 'MINUTES') {
                    sh '''
                        set -ex

                        command -v docker >/dev/null 2>&1 || (echo "ERROR: docker CLI not available inside Jenkins container" && exit 1)

                        echo "=== WORKSPACE CHECK ==="
                        echo "WORKSPACE=$WORKSPACE"
                        ls -la "$WORKSPACE"
                        echo "======================="

                        NODE_IMAGE="node:20-bullseye"

                        npm_install_and_build() {
                          dir="$1"
                          echo "[JENKINS] Build ${dir} using ${NODE_IMAGE}"

                          if [ ! -f "$WORKSPACE/${dir}/package.json" ]; then
                            echo "[JENKINS] ERROR: missing $WORKSPACE/${dir}/package.json"
                            echo "[JENKINS] Listing $WORKSPACE/${dir}:"
                            ls -la "$WORKSPACE/${dir}" || true
                            exit 2
                          fi

                          docker run --rm \
                            -u 0:0 \
                            -e DB_PASS="$DB_PASS" \
                            -e JWT_SECRET="$JWT_SECRET" \
                            -e NPM_CONFIG_CACHE="$NPM_CONFIG_CACHE" \
                            -e NPM_CONFIG_FUND="$NPM_CONFIG_FUND" \
                            -e NPM_CONFIG_AUDIT="$NPM_CONFIG_AUDIT" \
                            -v "$WORKSPACE:/work" \
                            -w "/work/${dir}" \
                            "${NODE_IMAGE}" \
                            bash -lc '
                              set -e
                              if [ -f package-lock.json ]; then
                                npm ci
                              else
                                npm install --no-audit --no-fund
                              fi
                              npm run build
                            '
                        }

                        npm_install_and_build "portfolio"
                        npm_install_and_build "cybersecurity-quiz"
                        npm_install_and_build "cybersecurity-planner"

                        echo "[JENKINS] Build gantt frontend (lightningcss safe) using ${NODE_IMAGE}"
                        npm_install_and_build "gantt/frontend"

                        npm_install_and_build "mario-game"

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
