npm install -g eas-cli
eas build:configure
eas build -p android --profile preview

Log in to EAS with email or username (exit and run eas login --help to see other login options)
√ Email or username ... cccadamccc
√ Password ... ***********
EAS project not configured.
√ Would you like to automatically create an EAS project for @cccadamccc/bolt-expo-nativewind? ... yes
✔ Created @cccadamccc/bolt-expo-nativewind: https://expo.dev/accounts/cccadamccc/projects/bolt-expo-nativewind on EAS
✔ Linked local project to EAS project 61a1d11c-600b-488a-9ffa-ed3903a37290
💡 The following process will configure your iOS and/or Android project to be compatible with EAS Build. These changes only apply to your local project files and you can safely revert them at any time.

√ Which platforms would you like to configure for EAS Build? » Android

√ Generated eas.json. Learn more: https://docs.expo.dev/build-reference/eas-json/

🎉 Your project is ready to build.

- Run eas build when you are ready to create your first build.     
- Once the build is completed, run eas submit to upload the app to app stores.
- Learn more about other capabilities of EAS Build: https://docs.expo.dev/build/introduction
(node:19296) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
Resolved "preview" environment for the build. Learn more: https://docs.expo.dev/eas/environment-variables/#setting-the-environment-for-your-builds
No environment variables with visibility "Plain text" and "Sensitive" found for the "preview" environment on EAS.

No remote versions are configured for this project, versionCode will be initialized based on the value from the local project.        
✔ Initialized versionCode with 1.
✔ Using remote Android credentials (Expo server)
√ Generate a new Android Keystore? ... yes
✔ Created keystore

Compressing project files and uploading to EAS Build. Learn more: https://expo.fyi/eas-build-archive
✔ Compressed project files 1s (678 KB)
✔ Uploaded to EAS 2s

Build details: https://expo.dev/accounts/cccadamccc/projects/bolt-expo-nativewind/builds/8b283db0-af66-4e5a-8e68-45a826051f83

Waiting for build to complete. You can press Ctrl+C to exit.       
/ Build in progress...