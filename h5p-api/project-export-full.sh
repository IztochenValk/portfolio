#!/usr/bin/env bash
set -euo pipefail

# ============================
# CONFIGURATION
# ============================

OUTPUT_FILE="project-export.txt"
ROOT_DIR="${1:-.}"

# Extensions incluses
INCLUDE_EXTENSIONS=(
  yml yaml json
  js jsx ts tsx
  css scss
  html vue
)

# Dossiers exclus (prune)
EXCLUDE_DIRS=(
  node_modules
  .git
  target
  build
  dist
  out
  venv
  __pycache__
  .idea
  .vscode
  .nuxt
  nuxt
)

# Fichiers exclus (sinon "node_modules/..." apparait dans package-lock)
EXCLUDE_FILES=(
  package-lock.json
  yarn.lock
  pnpm-lock.yaml
)

# ============================
# BUILD FIND EXPRESSIONS
# ============================

build_prune_dirs() {
  PRUNE_DIR_EXPR=()
  local d
  for d in "${EXCLUDE_DIRS[@]}"; do
    PRUNE_DIR_EXPR+=(-name "$d" -o)
  done
  unset 'PRUNE_DIR_EXPR[${#PRUNE_DIR_EXPR[@]}-1]' 2>/dev/null || true
}

build_include_exts() {
  EXT_EXPR=()
  local ext
  for ext in "${INCLUDE_EXTENSIONS[@]}"; do
    EXT_EXPR+=(-iname "*.${ext}" -o)
  done
  unset 'EXT_EXPR[${#EXT_EXPR[@]}-1]' 2>/dev/null || true
}

build_exclude_files() {
  EXCLUDE_FILE_EXPR=()
  local f
  for f in "${EXCLUDE_FILES[@]}"; do
    EXCLUDE_FILE_EXPR+=(-name "$f" -o)
  done
  unset 'EXCLUDE_FILE_EXPR[${#EXCLUDE_FILE_EXPR[@]}-1]' 2>/dev/null || true
}

# ============================
# HEADER
# ============================

write_header() {
  {
    echo "📦 PROJECT EXPORT"
    echo "📁 Root: $ROOT_DIR"
    echo "📅 Generated: $(date)"
    echo "========================================"
    echo
  } > "$OUTPUT_FILE"
}

# ============================
# TREE EXPORT
# ============================

export_tree() {
  {
    echo "📂 PROJECT STRUCTURE"
    echo "----------------------------------------"
  } >> "$OUTPUT_FILE"

  build_prune_dirs

  # Print structure excluding pruned dirs
  find "$ROOT_DIR" \
    -type d \( "${PRUNE_DIR_EXPR[@]}" \) -prune -o \
    -print \
  | sed "s#^$ROOT_DIR/##" \
  | awk '
      {
        line=$0
        if(line=="") next

        depth = gsub("/", "/", line)
        indent=""
        for(i=0;i<depth;i++) indent=indent"  "

        if(line ~ /\.[A-Za-z0-9]+$/)
          print indent "📄 " line
        else
          print indent "📁 " line
      }
    ' >> "$OUTPUT_FILE"

  echo >> "$OUTPUT_FILE"
}

# ============================
# FILE CONTENT EXPORT
# ============================

export_files() {
  {
    echo "📜 FILE CONTENT"
    echo "----------------------------------------"
  } >> "$OUTPUT_FILE"

  build_prune_dirs
  build_include_exts
  build_exclude_files

  local matched=0

  while IFS= read -r -d '' file; do
    matched=$((matched + 1))

    {
      echo "========================================"
      echo "📄 FILE: $file"
      echo "========================================"
      cat "$file"
      echo
      echo
    } >> "$OUTPUT_FILE"

  done < <(
    find "$ROOT_DIR" \
      -type d \( "${PRUNE_DIR_EXPR[@]}" \) -prune -o \
      -type f \( "${EXT_EXPR[@]}" \) \
      ! \( "${EXCLUDE_FILE_EXPR[@]}" \) \
      -print0
  )

  {
    echo "========================================"
    echo "✅ FILES EXPORTED: $matched"
    echo "========================================"
  } >> "$OUTPUT_FILE"
}

# ============================
# RUN
# ============================

write_header
export_tree
export_files

echo "✅ Export terminé → $OUTPUT_FILE"
