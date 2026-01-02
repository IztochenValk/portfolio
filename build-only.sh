#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(pwd)"
ARTIFACTS_DIR="$ROOT_DIR/_artifacts"
STAMP="$(date +'%Y-%m-%d_%H-%M-%S')"
ARCHIVE_NAME="_artifacts_${STAMP}.tgz"

log() { echo -e "\n$*"; }
die() { echo -e "\nERROR: $*" >&2; exit 1; }

require() {
  command -v "$1" >/dev/null 2>&1 || die "Commande manquante: $1"
}

require node
require npm
require tar

log "=== Nettoyage artefacts ==="
rm -rf "$ARTIFACTS_DIR"
mkdir -p "$ARTIFACTS_DIR"

build_npm() {
  local path="$1"
  local label="$2"
  local mode="$3"     # dist | nuxt
  local dest="$4"

  local abs="$ROOT_DIR/$path"
  [ -d "$abs" ] || die "Dossier introuvable: $path"

  log ">>> BUILD $label"
  cd "$abs"

  [ -f package.json ] || die "package.json absent dans $path"

  npm ci
  npm run build

  cd "$ROOT_DIR"
  mkdir -p "$ARTIFACTS_DIR/$dest"

  if [ "$mode" = "dist" ]; then
    [ -d "$abs/dist" ] || die "dist/ absent pour $label"
    cp -r "$abs/dist"/. "$ARTIFACTS_DIR/$dest"/
    return
  fi

  if [ "$mode" = "nuxt" ]; then
    if [ -d "$abs/.output/public" ]; then
      cp -r "$abs/.output/public"/. "$ARTIFACTS_DIR/$dest"/
      return
    fi
    if [ -d "$abs/.output" ]; then
      cp -r "$abs/.output"/. "$ARTIFACTS_DIR/$dest"/
      return
    fi
    die "Output Nuxt introuvable pour $label"
  fi

  die "Mode inconnu: $mode"
}

copy_static() {
  local path="$1"
  local label="$2"
  local dest="$3"

  local abs="$ROOT_DIR/$path"
  [ -d "$abs" ] || die "Dossier introuvable: $path"
  [ -f "$abs/index.html" ] || die "index.html absent pour $label"

  log ">>> COPY STATIC $label"
  mkdir -p "$ARTIFACTS_DIR/$dest"
  cp -r "$abs"/. "$ARTIFACTS_DIR/$dest"/
}

log "=== BUILDS npm ==="
build_npm "portfolio" "portfolio" "nuxt" "portfolio"
build_npm "cybersecurity-quiz" "cybersecurity-quiz" "dist" "cybersecurity-quiz"
build_npm "cybersecurity-planner" "cybersecurity-planner" "dist" "cybersecurity-planner"
build_npm "gantt/frontend" "gantt-frontend" "dist" "gantt-frontend"

log "=== BUILD statique ==="
copy_static "mario-game" "mario-game" "mario-game"

log "=== Manifest ==="
cat > "$ARTIFACTS_DIR/BUILD_MANIFEST.txt" <<EOF
generated_at=$STAMP
root=$ROOT_DIR
projects:
- portfolio
- cybersecurity-quiz
- cybersecurity-planner
- gantt-frontend
- mario-game
EOF

log "=== Archive ==="
tar -czf "$ARCHIVE_NAME" "$(basename "$ARTIFACTS_DIR")"

log "OK: artefacts prêts"
log "OK: archive: $ARCHIVE_NAME"
