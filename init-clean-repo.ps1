# =================================================================
# init-clean-repo.ps1
#
# Repart d'un dépôt git vierge :
#   1. Sauvegarde l'ancien .git en .git.old (au cas où)
#   2. Initialise un nouveau repo propre
#   3. Fait un commit initial unique avec tout le contenu actuel
#   4. Affiche les commandes pour créer le nouveau repo GitHub et push
#
# Avantages :
#   - Plus de commit "sa mère la pute" ni de token expose dans l'historique
#   - Un commit initial propre et professionnel
#   - L'ancien repo portfolio-v2 peut être archivé / supprimé sur GitHub
#
# Lancer depuis : C:\Users\flori\Desktop\portfolio-main\portfolio-main
# =================================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Verifications prealables ===" -ForegroundColor Cyan

if (-not (Test-Path ".git")) {
    Write-Host "ERREUR : pas de .git/ ici. Lance ce script depuis la racine du repo." -ForegroundColor Red
    exit 1
}

# Verifier qu'il n'y a plus de fichiers sensibles
$secrets = @("projets-app-ports.txt")
$found = @()
foreach ($f in $secrets) {
    if (Test-Path $f) { $found += $f }
}
if ($found.Count -gt 0) {
    Write-Host "ATTENTION : ces fichiers contenant des secrets existent encore :" -ForegroundColor Red
    $found | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host "Les supprimer manuellement avant de continuer." -ForegroundColor Red
    exit 1
}
Write-Host "Aucun fichier de secrets detecte." -ForegroundColor Green

# Verifier que le README ne contient plus le token
$readmeContent = Get-Content "README.md" -Raw -ErrorAction SilentlyContinue
if ($readmeContent -match "ghp_sCDk5") {
    Write-Host "ATTENTION : le token est encore dans README.md !" -ForegroundColor Red
    exit 1
}
Write-Host "README.md propre." -ForegroundColor Green

Write-Host ""
Write-Host "=== Etape 1 : Sauvegarde de l'ancien .git ===" -ForegroundColor Cyan
if (Test-Path ".git.old") {
    Write-Host "Un .git.old existe deja. Suppression..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".git.old"
}
Rename-Item ".git" ".git.old"
Write-Host "Ancien historique sauvegarde dans .git.old/" -ForegroundColor Green
Write-Host "(tu peux le supprimer plus tard avec : Remove-Item -Recurse -Force .git.old)" -ForegroundColor Gray

Write-Host ""
Write-Host "=== Etape 2 : Initialisation du nouveau repo ===" -ForegroundColor Cyan
git init -b main
git config user.email "florian.chague2@gmail.com"
git config user.name "Florian Chague"
git config core.autocrlf true
Write-Host "Repo initialise." -ForegroundColor Green

Write-Host ""
Write-Host "=== Etape 3 : Premier commit ===" -ForegroundColor Cyan
git add .
$count = (git status --short | Measure-Object).Count
Write-Host "Fichiers stages : $count" -ForegroundColor Gray

git commit -m "Initial commit: portfolio monorepo" `
  -m "Monorepo containing portfolio (Nuxt 4) and several Docker-deployed projects:" `
  -m "- portfolio (Nuxt 4 + Vue 3 + Tailwind 4 + Pinia)" `
  -m "- cybersecurity-quiz (React + Vite)" `
  -m "- cybersecurity-planner (React + Vite)" `
  -m "- gantt (Vue + Node.js + Postgres)" `
  -m "- mario-game (HTML5 Canvas)" `
  -m "" `
  -m "Includes Docker-based CI/CD pipeline (GitHub Actions to GHCR, SSH deploy)."

Write-Host "Commit initial cree." -ForegroundColor Green

Write-Host ""
Write-Host "=== Etape 4 : A faire manuellement sur GitHub ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. Va sur https://github.com/new" -ForegroundColor White
Write-Host "  2. Nom du repo : portfolio" -ForegroundColor White
Write-Host "  3. Description : Portfolio personnel + projets full-stack (Nuxt, Vue, Node, Java)" -ForegroundColor White
Write-Host "  4. Public ou Prive selon ta preference (NAKWEB peut voir si public)" -ForegroundColor White
Write-Host "  5. NE PAS initialiser avec README/gitignore (on en a deja)" -ForegroundColor White
Write-Host "  6. Cree le repo" -ForegroundColor White
Write-Host ""
Write-Host "Puis lance :" -ForegroundColor Cyan
Write-Host ""
Write-Host "  git remote add origin https://github.com/IztochenValk/portfolio.git" -ForegroundColor Yellow
Write-Host "  git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "Optionnel : archive l'ancien repo portfolio-v2 sur GitHub" -ForegroundColor Gray
Write-Host "  Settings -> General -> Archive this repository" -ForegroundColor Gray
Write-Host ""
Write-Host "=== Termine ===" -ForegroundColor Green
