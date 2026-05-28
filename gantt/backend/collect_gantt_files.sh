#!/usr/bin/env bash
set -e

# Nom du fichier de sortie
OUTPUT="project-export.txt"

# Extensions qu'on veut inclure
INCLUDE_EXTENSIONS="java,kt,xml,yml,yaml,json,js,jsx,ts,tsx,css,scss,html,md,gradle,sh"

# Répertoires à exclure
EXCLUDES="node_modules|.git|target|build|dist|out|venv|__pycache__|.idea|.vscode"

echo "▶ Export du projet vers $OUTPUT"
echo "▶ Extensions incluses: $INCLUDE_EXTENSIONS"
echo "▶ Exclusions: $EXCLUDES"
echo "" > "$OUTPUT"

# Trouver les fichiers et concaténer
find . -type f \
  | grep -E "\.($(echo $INCLUDE_EXTENSIONS | sed 's/,/|/g'))$" \
  | grep -Ev "$EXCLUDES" \
  | while read -r file; do
      echo "===== $file =====" >> "$OUTPUT"
      cat "$file" >> "$OUTPUT"
      echo -e "\n\n" >> "$OUTPUT"
    done

echo "✔ Export terminé → $OUTPUT"
