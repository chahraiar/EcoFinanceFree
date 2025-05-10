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

# Création d'un nouveau package.json de base
Write-Host "📝 Création d'un nouveau package.json..." -ForegroundColor Cyan
$packageJson = @"
{
  "name": "ecofinance",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-native": "0.73.0",
    "react-native-web": "~0.19.6"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
"@
Set-Content -Path package.json -Value $packageJson -Encoding UTF8
Write-Host "✅ Fichier package.json créé.`n" -ForegroundColor Green

# Création du fichier babel.config.js minimal
Write-Host "📝 Création du fichier babel.config.js..." -ForegroundColor Cyan
$babelConfig = @"
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
"@
Set-Content -Path babel.config.js -Value $babelConfig
Write-Host "✅ Fichier babel.config.js créé.`n" -ForegroundColor Green

# Création d'un fichier app.json
Write-Host "📝 Création du fichier app.json..." -ForegroundColor Cyan
$appJson = @"
{
  "expo": {
    "name": "EcoFinance",
    "slug": "eco-finance",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
"@
Set-Content -Path app.json -Value $appJson -Encoding UTF8
Write-Host "✅ Fichier app.json créé.`n" -ForegroundColor Green

# Création d'un fichier App.js basique
Write-Host "📝 Création d'un fichier App.js basique..." -ForegroundColor Cyan
$appJs = @"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoFinance</Text>
      <Text style={styles.subtitle}>Application démarrée avec succès!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
"@
Set-Content -Path App.js -Value $appJs -Encoding UTF8
Write-Host "✅ Fichier App.js créé.`n" -ForegroundColor Green

# Création du dossier assets s'il n'existe pas
if (-not (Test-Path -Path "assets")) {
  Write-Host "📁 Création du dossier assets..." -ForegroundColor Cyan
  New-Item -ItemType Directory -Path "assets" | Out-Null
  Write-Host "✅ Dossier assets créé.`n" -ForegroundColor Green
}

# Installation des dépendances de base
Write-Host "📦 Installation des dépendances de base..." -ForegroundColor Cyan
npm install --legacy-peer-deps
Write-Host "✅ Installation des dépendances de base terminée.`n" -ForegroundColor Green

# Installation des dépendances supplémentaires - étape par étape
Write-Host "📦 Installation des dépendances supplémentaires (étape 1/3)..." -ForegroundColor Cyan
npm install --save react-native-gesture-handler@~2.12.0 react-native-safe-area-context@4.6.3 react-native-screens@~3.22.0 --legacy-peer-deps
Write-Host "✅ Étape 1/3 terminée.`n" -ForegroundColor Green

Write-Host "📦 Installation des dépendances supplémentaires (étape 2/3)..." -ForegroundColor Cyan
npm install --save @react-navigation/native@6.1.9 @react-navigation/native-stack@6.9.17 @react-navigation/bottom-tabs@6.5.11 --legacy-peer-deps
Write-Host "✅ Étape 2/3 terminée.`n" -ForegroundColor Green

Write-Host "📦 Installation des dépendances supplémentaires (étape 3/3)..." -ForegroundColor Cyan
npm install --save react-native-vector-icons react-native-safe-area-context react-native-svg --legacy-peer-deps
Write-Host "✅ Étape 3/3 terminée.`n" -ForegroundColor Green

Write-Host "🚀 Projet EcoFinance prêt à être lancé !" -ForegroundColor Green
Write-Host "💡 Utilise 'npx expo start' ou 'npm run web' pour démarrer ton projet." -ForegroundColor Yellow
