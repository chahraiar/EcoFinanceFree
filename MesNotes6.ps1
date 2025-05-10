# Script de résolution radicale pour EcoFinance
# Version: 4.0 - Solution complète sans expo-font

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
    "expo": "~53.0.0",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-native": "0.73.8",
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
npm install --save expo-splash-screen@~0.20.5 @expo/vector-icons@^13.0.0 --legacy-peer-deps
Write-Host "✅ Étape 3/3 terminée.`n" -ForegroundColor Green

# Création d'un exemple avec navigation pour tester
Write-Host "📝 Création d'un exemple avec navigation..." -ForegroundColor Cyan
$appWithNav = @"
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Écrans de base
function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Accueil</Text>
      <Button 
        title="Voir Détails"
        onPress={() => navigation.navigate('Details')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Détails</Text>
      <Text style={styles.subtitle}>Voici la page de détails</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.subtitle}>Votre profil utilisateur</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Paramètres</Text>
      <Text style={styles.subtitle}>Configurer votre application</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Navigation empilée pour l'accueil
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <HomeStack.Screen name="Details" component={DetailsScreen} options={{ title: 'Détails' }} />
    </HomeStack.Navigator>
  );
}

// Navigation par onglets
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ProfileTab') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'SettingsTab') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStackScreen} 
          options={{ 
            headerShown: false,
            title: 'Accueil'
          }} 
        />
        <Tab.Screen 
          name="ProfileTab" 
          component={ProfileScreen}
          options={{ title: 'Profil' }} 
        />
        <Tab.Screen 
          name="SettingsTab" 
          component={SettingsScreen}
          options={{ title: 'Paramètres' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});
"@
Set-Content -Path "AppWithNavigation.js" -Value $appWithNav -Encoding UTF8
Write-Host "✅ Exemple avec navigation créé dans AppWithNavigation.js`n" -ForegroundColor Green

# Instructions pour tester les deux versions
Write-Host "📝 Création d'un fichier d'instructions..." -ForegroundColor Cyan
$instructions = @"
# Instructions pour EcoFinance

## Pour tester l'application basique
1. Assurez-vous que App.js est le fichier principal (pas besoin de modification)
2. Exécutez: npx expo start

## Pour tester l'application avec navigation
1. Renommez App.js en AppSimple.js
2. Renommez AppWithNavigation.js en App.js
3. Exécutez: npx expo start

## Dépannage
Si vous rencontrez des problèmes:
- Videz le cache: npx expo start --clear
- Redémarrez votre terminal et essayez à nouveau
- Vérifiez les versions dans package.json

## Ajouter des fonctionnalités
Pour ajouter d'autres fonctionnalités comme expo-sqlite ou d'autres modules:
1. Installez un module à la fois: npm install --save [module] --legacy-peer-deps
2. Testez l'application après chaque installation
"@
Set-Content -Path "INSTRUCTIONS.md" -Value $instructions -Encoding UTF8
Write-Host "✅ Fichier d'instructions créé.`n" -ForegroundColor Green

# Message final
Write-Host "🎉 Configuration radicale terminée avec succès!" -ForegroundColor Green
Write-Host "Le projet a été recréé de zéro avec:" -ForegroundColor White
Write-Host "- Expo SDK 53.0.0" -ForegroundColor White
Write-Host "- React Native 0.73.8" -ForegroundColor White
Write-Host "- React Navigation v6" -ForegroundColor White
Write-Host "- SANS expo-font (pour éviter les erreurs)" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Deux versions de l'application ont été créées:" -ForegroundColor Cyan
Write-Host "1. App.js - Version minimaliste" -ForegroundColor White
Write-Host "2. AppWithNavigation.js - Version avec navigation complète" -ForegroundColor White
Write-Host ""
Write-Host "📱 Pour démarrer l'application:" -ForegroundColor Yellow
Write-Host "   npx expo start" -ForegroundColor Yellow
Write-Host ""
Write-Host "📖 Consultez le fichier INSTRUCTIONS.md pour plus de détails" -ForegroundColor Magenta