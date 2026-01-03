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
GANTT_NODE_IMAGE="node:20-bookworm"
WS="/var/jenkins_home/workspace/workflow-portfolio"

docker inspect "$JENKINS_CONTAINER" >/dev/null 2>&1 || { echo "ERROR: container '$JENKINS_CONTAINER' not found"; exit 2; }

run_node() {
  local IMG="$1"
  local DIR="$2"
  shift 2 || true

  echo
  echo "----- [RUN NODE] img=$IMG dir=$DIR -----"

  docker run --rm \
    --volumes-from "$JENKINS_CONTAINER" \
    -e DB_PASS="$DB_PASS" \
    -e JWT_SECRET="$JWT_SECRET" \
    -e NPM_CONFIG_CACHE="$NPM_CONFIG_CACHE" \
    -e NPM_CONFIG_FUND="$NPM_CONFIG_FUND" \
    -e NPM_CONFIG_AUDIT="$NPM_CONFIG_AUDIT" \
    -w "$WS/$DIR" \
    "$IMG" \
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

  run_node "$NODE_IMAGE" "$DIR" '
    set -euo pipefail
    node -v
    npm -v
    rm -rf node_modules
    npm ci --include=optional || npm install --no-audit --no-fund
    npm run build
  '
}

build_gantt_frontend() {
  local DIR="gantt/frontend"
  echo "=== BUILD NODE (SPECIAL): $DIR ==="

  run_node "$DIR" '
    set -euo pipefail

    rm -rf node_modules
    npm ci --include=optional || npm install --no-audit --no-fund

    echo "=== LIGHTNINGCSS DEBUG ==="
    ls -la node_modules/lightningcss || true
    ls -la node_modules/lightningcss-linux-x64-gnu || true

    BIN_SRC="node_modules/lightningcss-linux-x64-gnu/lightningcss.linux-x64-gnu.node"
    BIN_DST="node_modules/lightningcss/lightningcss.linux-x64-gnu.node"

    if [[ -f "$BIN_SRC" && ! -f "$BIN_DST" ]]; then
      echo "[FIX] copying native binding into lightningcss package"
      cp "$BIN_SRC" "$BIN_DST"
    fi

    test -f "$BIN_DST"

    node -e "require(\"lightningcss\"); console.log(\"lightningcss native OK\")"

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
