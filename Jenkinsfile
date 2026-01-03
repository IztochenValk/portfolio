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

        stage('Build Frontends (Node only)') {
            steps {
                timeout(time: 45, unit: 'MINUTES') {
                    sh '''#!/usr/bin/env bash
set -euo pipefail

trap 'echo; echo "[FAIL] line=$LINENO cmd=$BASH_COMMAND"; echo; exit 1' ERR

JENKINS_CONTAINER="jenkins"
NODE_IMAGE="node:20-bullseye"
WS="/var/jenkins_home/workspace/workflow-portfolio"

echo "[INFO] WS=$WS"
echo "[INFO] NODE_IMAGE=$NODE_IMAGE"
echo "[INFO] JENKINS_CONTAINER=$JENKINS_CONTAINER"

docker inspect "$JENKINS_CONTAINER" >/dev/null 2>&1 || { echo "ERROR: container '$JENKINS_CONTAINER' not found"; exit 2; }

run_node() {
  local DIR="$1"
  shift || true

  echo
  echo "----- [RUN NODE] $DIR -----"

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

build_node() {
  local DIR="$1"
  echo
  echo "=== BUILD NODE: $DIR ==="

  if [[ ! -f "$WS/$DIR/package.json" ]]; then
    echo "SKIP $DIR (no package.json)"
    return 0
  fi

  run_node "$DIR" '
    set -euo pipefail
    echo "[IN CONTAINER] pwd=$(pwd)"
    node -v
    npm -v
    rm -rf node_modules
    npm ci --include=optional || npm install --no-audit --no-fund
    npm run build
  '
}

build_gantt_frontend() {
  local DIR="gantt/frontend"
  echo
  echo "=== BUILD NODE (SPECIAL): $DIR ==="

  if [[ ! -f "$WS/$DIR/package.json" ]]; then
    echo "ERROR: $DIR/package.json missing"
    exit 3
  fi

  run_node "$DIR" '
    set -euo pipefail
    echo "[IN CONTAINER] pwd=$(pwd)"
    node -v
    npm -v

    rm -rf node_modules
    npm ci --include=optional || npm install --no-audit --no-fund

    # lightningcss native binary: ensure it exists
    if [[ ! -f node_modules/lightningcss/lightningcss.linux-x64-gnu.node ]]; then
      echo "[FIX] lightningcss binary missing -> installing platform package"
      npm i -D lightningcss-linux-x64-gnu
    fi

    node -e "require(\\"lightningcss\\"); console.log(\\"lightningcss OK\\")"
    npm run build
  '
}

build_node "portfolio"
build_node "cybersecurity-quiz"
build_node "cybersecurity-planner"
build_gantt_frontend

echo
echo "=== NODE BUILDS DONE ==="
'''
                }
            }
        }

        stage('Mario Game (Static)') {
            steps {
                sh '''#!/usr/bin/env bash
set -euo pipefail
echo "=== MARIO GAME STATIC ==="
test -f mario-game/index.html
ls -la mario-game | sed -n '1,120p'
echo "Mario game OK (static files only)"
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
echo "=== RUNNING CONTAINERS ==="
docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"
'''
        }
    }
}
