# Script de résolution des conflits de dépendances pour EcoFinance
# Version: 3.0 - Correction des problèmes de dépendances et expo-font

# Nettoyage complet du projet
Write-Host "🧹 Nettoyage complet du projet..." -ForegroundColor Cyan
Remove-Item -Path node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path package-lock.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path yarn.lock -Force -ErrorAction SilentlyContinue
Remove-Item -Path .expo -Recurse -Force -ErrorAction SilentlyContinue
npm cache clean --force
Write-Host "✅ Nettoyage terminé.`n" -ForegroundColor Green

# Installation des versions de base compatibles
Write-Host "📦 Installation des versions de base compatibles..." -ForegroundColor Cyan
npm install --save react@18.2.0 react-native@0.73.8 react-dom@18.2.0 --legacy-peer-deps
Write-Host "✅ Installation des versions de base terminée.`n" -ForegroundColor Green

# Installation d'Expo SDK 53 (version exacte pour éviter les incompatibilités)
Write-Host "🚀 Installation d'Expo SDK 53..." -ForegroundColor Cyan
npm install --save expo@~53.0.0 --legacy-peer-deps
Write-Host "✅ Installation d'Expo terminée.`n" -ForegroundColor Green

# Installation des modules natifs spécifiques
Write-Host "📱 Installation des modules natifs spécifiques..." -ForegroundColor Cyan
npm install --save react-native-gesture-handler@~2.12.0 react-native-reanimated@~3.3.0 react-native-safe-area-context@4.6.3 react-native-screens@~3.22.0 --legacy-peer-deps
Write-Host "✅ Installation des modules natifs terminée.`n" -ForegroundColor Green

# Installation d'expo-font en version spécifique compatible - CORRECTION
Write-Host "🖋️ Installation d'expo-font en version compatible..." -ForegroundColor Cyan
npm install --save expo-font@~11.6.0 --legacy-peer-deps
Write-Host "✅ Installation d'expo-font terminée.`n" -ForegroundColor Green

# Installation des autres modules Expo
Write-Host "📦 Installation des autres modules Expo..." -ForegroundColor Cyan
npm install --save expo-status-bar@~1.6.0 expo-blur@~12.4.0 expo-sqlite@~11.3.0 --legacy-peer-deps
Write-Host "✅ Installation des autres modules Expo terminée.`n" -ForegroundColor Green

# Installation de SplashScreen pour l'App.js exemple
Write-Host "📦 Installation d'expo-splash-screen..." -ForegroundColor Cyan
npm install --save expo-splash-screen@~0.20.5 --legacy-peer-deps
Write-Host "✅ Installation d'expo-splash-screen terminée.`n" -ForegroundColor Green

# Installation des dépendances de navigation compatibles - CORRECTION
Write-Host "🧭 Installation des dépendances de navigation compatibles..." -ForegroundColor Cyan
npm install --save @react-navigation/native@6.1.9 @react-navigation/native-stack@6.9.17 @react-navigation/bottom-tabs@6.5.11 --legacy-peer-deps
Write-Host "✅ Installation des dépendances de navigation terminée.`n" -ForegroundColor Green

# Installation d'autres dépendances
Write-Host "📦 Installation des autres dépendances..." -ForegroundColor Cyan
npm install --save @expo/vector-icons@^13.0.0 @react-native-community/datetimepicker@7.2.0 react-native-svg@13.9.0 --legacy-peer-deps
Write-Host "✅ Installation des autres dépendances terminée.`n" -ForegroundColor Green

# Installation des dépendances de développement
Write-Host "🛠️ Installation des dépendances de développement..." -ForegroundColor Cyan
npm install --save-dev @types/react@^18.2.0 babel-preset-expo@~9.9.0 --legacy-peer-deps
Write-Host "✅ Installation des dépendances de développement terminée.`n" -ForegroundColor Green

# Installation des modules web
Write-Host "🌐 Installation des modules web..." -ForegroundColor Cyan
npm install --save react-native-web@~0.19.6 --legacy-peer-deps
Write-Host "✅ Installation des modules web terminée.`n" -ForegroundColor Green

# Installation de metro-config
Write-Host "🔧 Installation de metro-config..." -ForegroundColor Cyan
npm install --save-dev metro-config@~0.76.5 --legacy-peer-deps
Write-Host "✅ Installation de metro-config terminée.`n" -ForegroundColor Green

# Création du fichier babel.config.js correct
Write-Host "📝 Création du fichier babel.config.js..." -ForegroundColor Cyan
$babelConfig = @"
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
"@
Set-Content -Path babel.config.js -Value $babelConfig
Write-Host "✅ Fichier babel.config.js créé.`n" -ForegroundColor Green

# Création d'un fichier metro.config.js amélioré
Write-Host "📝 Création du fichier metro.config.js..." -ForegroundColor Cyan
$metroConfig = @"
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Résolution des problèmes de Metro avec les versions récentes
config.resolver = {
  ...config.resolver,
  resolverMainFields: ['react-native', 'browser', 'main'],
  sourceExts: ['js', 'jsx', 'ts', 'tsx', 'cjs', 'json', 'mjs']
};

// Fix pour les problèmes de module ESM/CJS
config.transformer = {
  ...config.transformer,
  enableBabelRuntime: false,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer')
};

// Ajout de la configuration pour résoudre les problèmes d'expo-font
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'expo-font': require.resolve('expo-font')
};

module.exports = config;
"@
Set-Content -Path metro.config.js -Value $metroConfig
Write-Host "✅ Fichier metro.config.js créé.`n" -ForegroundColor Green

# Création d'un fichier app.json si absent
if (-not (Test-Path app.json)) {
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
}

# Création d'un exemple d'App.js minimaliste amélioré
Write-Host "📝 Création d'un fichier App.js minimaliste de test..." -ForegroundColor Cyan
$appJs = @"
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

// Ne pas importer Font directement pour éviter les problèmes potentiels
// import * as Font from 'expo-font';

// Gardez l'écran de démarrage visible pendant le chargement des ressources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simuler un délai de chargement des ressources
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Le chargement de polices est commenté pour éviter des problèmes potentiels
        // Pour charger des polices, décommentez ce bloc après avoir testé que l'app démarre
        // correctement et placé les fichiers de police dans le dossier assets/fonts
        /*
        const loadFonts = async () => {
          try {
            const { loadAsync } = require('expo-font');
            await loadAsync({
              'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
            });
            console.log('Fonts loaded successfully');
          } catch (e) {
            console.warn('Error loading fonts:', e);
          }
        };
        
        await loadFonts();
        */
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.title}>EcoFinance</Text>
      <Text style={styles.subtitle}>Votre application démarre correctement!</Text>
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

# Nettoyage du cache Metro
Write-Host "🧹 Nettoyage du cache Metro..." -ForegroundColor Cyan
Remove-Item -Path node_modules/.cache -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "✅ Cache Metro nettoyé.`n" -ForegroundColor Green

# Création d'un fichier package.json correct
Write-Host "📝 Vérification du fichier package.json..." -ForegroundColor Cyan
$packageJsonContent = Get-Content -Path package.json -Raw | ConvertFrom-Json
$packageJsonContent.main = "./node_modules/expo/AppEntry.js"

# S'assurer que expo-router n'est pas installé pour éviter les conflits
Write-Host "🔍 Vérification et suppression d'expo-router s'il est présent..." -ForegroundColor Cyan
if ($packageJsonContent.dependencies.'expo-router') {
  $packageJsonContent.dependencies.PSObject.Properties.Remove('expo-router')
  Write-Host "⚠️ expo-router supprimé des dépendances pour éviter les conflits." -ForegroundColor Yellow
}

$packageJsonContent | ConvertTo-Json -Depth 10 | Set-Content -Path package.json
Write-Host "✅ Fichier package.json vérifié.`n" -ForegroundColor Green

# Message final
Write-Host "🎉 Configuration terminée avec succès!" -ForegroundColor Green
Write-Host "Le projet est maintenant configuré avec:" -ForegroundColor White
Write-Host "- React 18.2.0" -ForegroundColor White
Write-Host "- React Native 0.73.8" -ForegroundColor White
Write-Host "- Expo SDK 53.0.0" -ForegroundColor White
Write-Host "- Navigation v6 (compatible)" -ForegroundColor White
Write-Host ""
Write-Host "🚨 IMPORTANT : Vérifiez ces points si vous rencontrez des problèmes:" -ForegroundColor Red
Write-Host "1. Si vous avez besoin de polices, décommentez la section dans App.js" -ForegroundColor Yellow
Write-Host "2. Assurez-vous que expo-router n'est PAS installé (il cause des conflits)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pour démarrer votre projet:" -ForegroundColor Yellow
Write-Host "   npx expo start" -ForegroundColor Yellow
Write-Host "   npx expo start --web" -ForegroundColor Yellow
Write-Host "   npx expo start --android" -ForegroundColor Yellow
Write-Host "   npx expo start --ios" -ForegroundColor Yellow