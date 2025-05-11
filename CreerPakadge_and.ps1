# Script de résolution radicale pour EcoFinance
# Version: 4.1 - Réinitialisation complète avec configuration stable

# --- Nettoyage complet du projet ---
Write-Host "🧹 Nettoyage complet du projet..." -ForegroundColor Cyan

# Liste des dossiers/fichiers à supprimer
$itemsToDelete = @(
    "node_modules",
    "package-lock.json",
    "yarn.lock",
    ".expo",
    "android/.gradle",
    "android/build",
    "android/app/build"
)

foreach ($item in $itemsToDelete) {
    $fullPath = Join-Path -Path $PWD -ChildPath $item
    if (Test-Path $fullPath) {
        try {
            Remove-Item -Path $fullPath -Recurse -Force -ErrorAction Stop
            Write-Host "🗑️ Supprimé : $item"
        } catch {
            Write-Host "⚠️ Impossible de supprimer : $item" -ForegroundColor Yellow
        }
    }
}

# Nettoyage du cache npm
npm cache clean --force

Write-Host "✅ Nettoyage terminé.`n" -ForegroundColor Green


# --- Installation des dépendances de base ---
Write-Host "📦 Installation des dépendances de base..." -ForegroundColor Cyan

# Installation des dépendances spécifiques
npm install @react-native-community/datetimepicker --save
npm install @supabase/supabase-js --save

# Installation des dépendances globales
npm install --legacy-peer-deps

Write-Host "✅ Installation des dépendances de base terminée.`n" -ForegroundColor Green


# --- Compilation de l'APK Android ---
$androidPath = Join-Path -Path $PWD -ChildPath "android"

if (Test-Path $androidPath) {
    Write-Host "⚙️ Lancement de la compilation APK Android..." -ForegroundColor Cyan
    Push-Location $androidPath

    ./gradlew clean
    ./gradlew assembleRelease

    Pop-Location
    Write-Host "✅ Compilation APK terminée. Fichier généré dans : android/app/build/outputs/apk/release/" -ForegroundColor Green
} else {
    Write-Host "❌ Dossier Android introuvable. La compilation est ignorée." -ForegroundColor Red
}

# --- Instructions de démarrage ---
Write-Host "`n🚀 Projet EcoFinance prêt à être lancé !" -ForegroundColor Green
Write-Host "💡 Utilise 'npx expo start' ou 'npx expo start --web --clear' pour démarrer ton projet." -ForegroundColor Yellow
