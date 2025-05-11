# TODO : Reprendre la résolution des erreurs Expo SDK 50 / Gradle

## Checklist à suivre pour corriger les erreurs de build

1. **Vérifier chaque module natif Expo** (expo-blur, expo-camera, expo-constants, expo-document-picker, expo-file-system, expo-font, expo-haptics, expo-linear-gradient, expo-splash-screen, expo-system-ui...) :
   - Ouvrir le fichier `node_modules/<module>/android/build.gradle`.
   - S'assurer qu'il contient :
     - Un bloc `android { ... }` avec la ligne :
       ```groovy
       compileSdkVersion rootProject.ext.has('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 34
       ```
     - Aucune occurrence de :
       - `publishing { ... }`
       - `singleVariant("release") { ... }`
       - `if (!safeExtGet(...)) { ... }`
       - `from components.release`
   - Si besoin, remplacer tout le fichier par la version corrigée (voir exemple dans expo-keep-awake ou expo-sqlite corrigés).

2. **Vérifier la racine**
   - `android/build.gradle` doit bien exposer toutes les variables ext (ce qui est déjà le cas).
   - `android/gradle.properties` doit contenir les bonnes versions SDK.

3. **Après chaque correction**
   - Lancer :
     ```powershell
     .\gradlew clean
     .\gradlew assembleDebug
     ```
   - Si erreur, relancer avec `--stacktrace` et identifier le module fautif.

4. **Si bloqué**
   - Copier ici le contenu du `build.gradle` du module qui pose souci ou la trace stacktrace complète.

---

**Courage ! Tu es tout près du but.**

---

*Dernière mise à jour : 2025-05-11*