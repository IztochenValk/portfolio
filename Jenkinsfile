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

    export npm_config_platform=linux
    export npm_config_arch=x64
    export npm_config_libc=gnu
    unset npm_config_ignore_scripts || true

    npm ci --include=optional || npm install --include=optional --no-audit --no-fund

    if node -e "require(\\"lightningcss\\")" >/dev/null 2>&1; then
      echo "lightningcss OK"
    else
      echo "lightningcss missing binary -> force platform package + manual copy"

      LC_VER="$(node - <<\"NODE\"
const fs = require(\"fs\");
const lock = JSON.parse(fs.readFileSync(\"package-lock.json\", \"utf8\"));

function pickVersion(obj) {
  if (!obj) return null;
  if (obj.packages && obj.packages[\"node_modules/lightningcss\"] && obj.packages[\"node_modules/lightningcss\"].version)
    return obj.packages[\"node_modules/lightningcss\"].version;
  if (obj.dependencies && obj.dependencies.lightningcss && obj.dependencies.lightningcss.version)
    return obj.dependencies.lightningcss.version;
  return null;
}

const v = pickVersion(lock);
if (!v) process.exit(2);
process.stdout.write(v);
NODE
)"

      echo "Detected lightningcss version: $LC_VER"

      npm i --no-save --no-audit --no-fund "lightningcss-linux-x64-gnu@$LC_VER"

      BIN_SRC="node_modules/lightningcss-linux-x64-gnu/lightningcss.linux-x64-gnu.node"
      BIN_DST="node_modules/lightningcss/lightningcss.linux-x64-gnu.node"

      if [[ ! -f "$BIN_SRC" ]]; then
        echo "ERROR: $BIN_SRC not found after install"
        ls -la node_modules | head -200 || true
        ls -la node_modules/lightningcss* || true
        exit 3
      fi

      mkdir -p "node_modules/lightningcss"
      cp -f "$BIN_SRC" "$BIN_DST"

      node -e "require(\\"lightningcss\\")"
      echo "lightningcss OK after manual copy"
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
