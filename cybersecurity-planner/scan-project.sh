#!/bin/bash

# Nom du fichier de sortie
OUTPUT_FILE="project-structure.txt"

# Répertoire de départ (par défaut: répertoire courant)
ROOT_DIR="${1:-.}"

# Fonction récursive d'affichage de l'arborescence
scan_dir() {
  local current_dir="$1"
  local prefix="$2"

  # Liste triée des fichiers et dossiers (hors node_modules)
  for entry in "$current_dir"/*; do
    # Sauter node_modules et les fichiers cachés
    if [[ "$entry" == *"node_modules"* || "$(basename "$entry")" == .* ]]; then
      continue
    fi

    # Affichage
    if [ -d "$entry" ]; then
      echo "${prefix}📁 $(basename "$entry")" >> "$OUTPUT_FILE"
      scan_dir "$entry" "$prefix  "
    elif [ -f "$entry" ]; then
      echo "${prefix}📄 $(basename "$entry")" >> "$OUTPUT_FILE"
    fi
  done
}

# Nettoyage du fichier existant
echo "📦 Structure du projet à partir de $ROOT_DIR" > "$OUTPUT_FILE"
echo "----------------------------------------" >> "$OUTPUT_FILE"

# Lancer le scan
scan_dir "$ROOT_DIR" ""

echo "✅ Structure enregistrée dans $OUTPUT_FILE"
