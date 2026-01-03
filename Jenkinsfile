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
                timeout(time: 45, unit: 'MINUTES') {
                    sh '''#!/usr/bin/env bash
set -euo pipefail

JENKINS_CONTAINER="jenkins"
NODE_IMAGE="node:20-bookworm"
WS="/var/jenkins_home/workspace/workflow-portfolio"

docker inspect "$JENKINS_CONTAINER" >/dev/null 2>&1 || {
  echo "ERROR: Jenkins container not found"
  exit 2
}

run_node() {
  local DIR="$1"
  shift

  echo
  echo "=== BUILD: $DIR ==="

  docker run --rm \
    --volumes-from "$JENKINS_CONTAINER" \
    -e DB_PASS="$DB_PASS" \
    -e JWT_SECRET="$JWT_SECRET" \
    -e NPM_CONFIG_CACHE="$NPM_CONFIG_CACHE" \
    -e NPM_CONFIG_FUND="$NPM_CONFIG_FUND" \
    -e NPM_CONFIG_AUDIT="$NPM_CONFIG_AUDIT" \
    -w "$WS/$DIR" \
    "$NODE_IMAGE" \
    bash -lc "$*"
}

build_node_if_exists() {
  local DIR="$1"

  if [[ ! -f "$WS/$DIR/package.json" ]]; then
    echo "SKIP $DIR (no package.json)"
    return 0
  fi

  run_node "$DIR" '
    set -euo pipefail
    rm -rf node_modules
    npm ci --include=optional || npm install --include=optional --no-audit --no-fund
    npm run build
  '
}

build_gantt_frontend() {
  run_node "gantt/frontend" '
    set -euo pipefail

    rm -rf node_modules

    # Install strict first
    npm ci --include=optional || npm install --include=optional --no-audit --no-fund

    # Verify lightningcss loads. If not, force npm install to resolve platform optional deps.
    if node -e "require(\\"lightningcss\\")" >/dev/null 2>&1; then
      echo "lightningcss OK after npm ci"
    else
      echo "lightningcss missing after npm ci, forcing npm install"
      npm install --include=optional --no-audit --no-fund
      node -e "require(\\"lightningcss\\")"
    fi

    npm run build
  '
}

build_node_if_exists "portfolio"
build_node_if_exists "cybersecurity-quiz"
build_node_if_exists "cybersecurity-planner"
build_gantt_frontend

echo "=== FRONTENDS BUILD DONE ==="
'''
                }
            }
        }

        stage('Mario Game (Static)') {
            steps {
                sh '''#!/usr/bin/env bash
set -euo pipefail
test -f mario-game/index.html
echo "Mario game OK (static)"
'''
            }
        }

        stage('Build & Deploy Docker') {
            steps {
                dir('infra') {
                    sh '''#!/usr/bin/env bash
set -euo pipefail
docker compose pull
docker compose build
docker compose up -d --remove-orphans
'''
                }
            }
        }
    }

    post {
        always {
            sh '''#!/usr/bin/env bash
set +e
docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"
'''
        }
    }
}
