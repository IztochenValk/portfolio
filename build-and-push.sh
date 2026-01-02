#!/usr/bin/env bash
set -euo pipefail

BRANCH_BUILD="build-prod"
ROOT_DIR="$(pwd)"
STAMP="$(date +'%Y-%m-%d %H:%M')"

echo "=== Vérification git ==="
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Ce script doit être lancé dans un repo git"
  exit 1
fi

echo "=== Nettoyage état git (branche courante) ==="
echo "=== Installation & build (projets npm) ==="

build_project () {
  local path="$1"
  local name="$2"

  echo ""
  echo ">>> BUILD $name"
  cd "$ROOT_DIR/$path"

  if [ ! -f package.json ]; then
    echo "package.json introuvable dans $path"
    exit 1
  fi

  npm ci
  npm run build

  cd "$ROOT_DIR"
}

# Projets npm
build_project "projets/portfolio" "portfolio"
build_project "projets/cybersecurity-quiz" "cybersecurity-quiz"
build_project "projets/cybersecurity-planner" "cybersecurity-planner"
build_project "projets/gantt/frontend" "gantt-frontend"

echo ""
echo ">>> PREP mario-game (statique, pas de npm)"
# Rien à builder: juste des fichiers statiques (index.html + assets + phaser)
# Optionnel: tu peux vérifier qu'un index.html existe
if [ ! -f "$ROOT_DIR/projets/mario-game/index.html" ]; then
  echo "index.html introuvable dans projets/mario-game"
  exit 1
fi

echo ""
echo "=== Préparation branche '$BRANCH_BUILD' ==="
git fetch origin --prune

# Si la branche existe sur origin, on la récupère
if git ls-remote --exit-code --heads origin "$BRANCH_BUILD" >/dev/null 2>&1; then
  echo "Branche distante origin/$BRANCH_BUILD trouvée"
  git checkout -B "$BRANCH_BUILD" "origin/$BRANCH_BUILD"
else
  echo "Branche distante origin/$BRANCH_BUILD introuvable, création"
  # Si elle existe localement, on se met dessus, sinon on la crée
  if git show-ref --verify --quiet "refs/heads/$BRANCH_BUILD"; then
    git checkout "$BRANCH_BUILD"
  else
    git checkout -b "$BRANCH_BUILD"
  fi
fi

echo "=== Suppression ancien contenu build ==="
git rm -rf . >/dev/null 2>&1 || true

echo "=== Ajout des builds ==="

copy_build () {
  local src="$1"
  local dest="$2"

  if [ ! -d "$ROOT_DIR/$src" ] && [ ! -f "$ROOT_DIR/$src" ]; then
    echo "Source introuvable: $src"
    exit 1
  fi

  mkdir -p "$dest"
  # copie dossier ou fichier
  if [ -d "$ROOT_DIR/$src" ]; then
    cp -r "$ROOT_DIR/$src"/. "$dest"/
  else
    cp "$ROOT_DIR/$src" "$dest"/
  fi
}

# portfolio (Nuxt) - ajuste si ton output réel n'est pas .output
copy_build "projets/portfolio/.output" "portfolio"

# Vite / React dist
copy_build "projets/cybersecurity-quiz/dist" "cybersecurity-quiz"
copy_build "projets/cybersecurity-planner/dist" "cybersecurity-planner"
copy_build "projets/gantt/frontend/dist" "gantt-frontend"

# mario-game: copie statique (tout le dossier)
copy_build "projets/mario-game" "mario-game"

# Optionnel: petit fichier de preuve
echo "Build branch: $BRANCH_BUILD" > BUILD_INFO.txt
echo "Generated: $STAMP" >> BUILD_INFO.txt

echo "=== Commit & push ==="
git add .

if git diff --cached --quiet; then
  echo "Aucun changement à commit"
else
  git commit -m "build-prod: automated frontend build ($STAMP)"
fi

# Push: si la branche distante n'existait pas, ça la crée.
# --force pour garantir que build-prod reflète uniquement les artefacts.
git push origin "$BRANCH_BUILD" --force

echo ""
echo "BUILD COMPLET TERMINE ET PUSH SUR BRANCHE '$BRANCH_BUILD'"
