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

        NPM_CONFIG_CACHE      = "/tmp/.npm"
        NPM_CONFIG_FUND       = "false"
        NPM_CONFIG_AUDIT      = "false"
        NPM_CONFIG_PRODUCTION = "false"
        NODE_ENV              = "development"
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
    -e NPM_CONFIG_PRODUCTION="$NPM_CONFIG_PRODUCTION" \
    -e NODE_ENV="$NODE_ENV" \
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

lockver() {
  node - <<'NODE'
const fs = require("fs");
const lock = JSON.parse(fs.readFileSync("package-lock.json","utf8"));
const name = process.argv[1];
const v =
  lock.packages?.[`node_modules/${name}`]?.version ||
  lock.dependencies?.[name]?.version ||
  null;
if (!v) process.exit(2);
process.stdout.write(v);
NODE
}

patch_tailwind_oxide() {
  # expects: ARCH LIBC already set
  local OX_VER
  OX_VER="$(node - <<'NODE'
const fs = require("fs");
const lock = JSON.parse(fs.readFileSync("package-lock.json","utf8"));
const v =
  lock.packages?.["node_modules/@tailwindcss/oxide"]?.version ||
  lock.dependencies?.["@tailwindcss/oxide"]?.version ||
  null;
if (!v) process.exit(2);
process.stdout.write(v);
NODE
)"
  local PKG="@tailwindcss/oxide-linux-${ARCH}-${LIBC}"
  echo "Patching oxide: ${PKG}@${OX_VER}"
  npm i --no-save --no-audit --no-fund "${PKG}@${OX_VER}"

  # manual place .node into @tailwindcss/oxide/dist (postinstall can silently fail in CI)
  local OX_NODE
  OX_NODE="$(find "node_modules/${PKG}" -name "*.node" -type f | head -1 || true)"
  if [[ -z "$OX_NODE" ]]; then
    echo "ERROR: oxide binary not found in node_modules/${PKG}"
    ls -la "node_modules" | head -200 || true
    ls -la "node_modules/@tailwindcss" || true
    exit 20
  fi

  mkdir -p node_modules/@tailwindcss/oxide/dist
  cp -f "$OX_NODE" "node_modules/@tailwindcss/oxide/dist/$(basename "$OX_NODE")"

  node -e "require('@tailwindcss/oxide')"
  node -e "require('@tailwindcss/postcss')"
}

patch_lightningcss() {
  # expects: ARCH LIBC already set
  local LC_VER
  LC_VER="$(node - <<'NODE'
const fs = require("fs");
const lock = JSON.parse(fs.readFileSync("package-lock.json","utf8"));
const v =
  lock.packages?.["node_modules/lightningcss"]?.version ||
  lock.dependencies?.["lightningcss"]?.version ||
  null;
if (!v) process.exit(2);
process.stdout.write(v);
NODE
)"
  local PKG="lightningcss-linux-${ARCH}-${LIBC}"
  echo "Patching lightningcss: ${PKG}@${LC_VER}"
  npm i --no-save --no-audit --no-fund "${PKG}@${LC_VER}"

  local SRC="node_modules/${PKG}/lightningcss.linux-${ARCH}-${LIBC}.node"
  local DST="node_modules/lightningcss/lightningcss.linux-${ARCH}-${LIBC}.node"

  # fallback: find any .node inside platform package if name differs
  if [[ ! -f "$SRC" ]]; then
    SRC="$(find "node_modules/${PKG}" -name "*.node" -type f | head -1 || true)"
  fi

  if [[ -z "${SRC:-}" || ! -f "$SRC" ]]; then
    echo "ERROR: lightningcss binary not found in node_modules/${PKG}"
    ls -la "node_modules/lightningcss"* || true
    exit 21
  fi

  mkdir -p node_modules/lightningcss
  cp -f "$SRC" "$DST"
  node -e "require('lightningcss')"
}

build_gantt_frontend() {
  run_node "gantt/frontend" '
    set -euo pipefail

    rm -rf node_modules
    npm ci --include=optional || npm install --include=optional --no-audit --no-fund

    ARCH="$(node -p "process.arch")"
    if ldd --version 2>&1 | head -1 | grep -qi musl; then
      LIBC="musl"
    else
      LIBC="gnu"
    fi

    # If @tailwindcss/postcss fails native binding, fix oxide placement
    if ! node -e "require(\"@tailwindcss/postcss\")" >/dev/null 2>&1; then
      patch_tailwind_oxide
    fi

    # If lightningcss is involved anywhere, ensure its binary exists too
    if ! node -e "require(\"lightningcss\")" >/dev/null 2>&1; then
      patch_lightningcss
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
