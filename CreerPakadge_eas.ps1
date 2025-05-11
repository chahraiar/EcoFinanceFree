
# Script de résolution radicale pour EcoFinance
# Version: 4.1 - Réinitialisation complète avec configuration stable

# Nettoyage complet du projet
Write-Host "🧹 Nettoyage complet du projet..." -ForegroundColor Cyan
Remove-Item -Path node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path package-lock.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path yarn.lock -Force -ErrorAction SilentlyContinue
Remove-Item -Path .expo -Recurse -Force -ErrorAction SilentlyContinue
npm cache clean --force
Write-Host "✅ Nettoyage terminé.`n" -ForegroundColor Green



# Installation des dépendances de base
Write-Host "📦 Installation des dépendances de base..." -ForegroundColor Cyan

npm install @react-native-community/datetimepicker
npm install @supabase/supabase-js
npm install #--legacy-peer-deps


Write-Host "✅ Installation des dépendances de base terminée.`n" -ForegroundColor Green

Write-Host "🚀 Projet EcoFinance prêt à être lancé !" -ForegroundColor Green
Write-Host "💡 Utilise 'npx expo start' ou 'npx expo start --web --clear' pour démarrer ton projet." -ForegroundColor Yellow



npm install -g eas-cli
eas build:configure
eas build -p android --profile preview

