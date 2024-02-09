# Upgrade Labs Mobile App

# Requirements

- [Node JS](https://nodejs.org): >= 18
- [Yarn](https://yarnpkg.com/getting-started/install) >= 1.22.19
- [Cocoapods](https://cocoapods.org/): >= 1.14.3
- [Xcode](https://developer.apple.com/xcode/): >= 15.2
- [Android Studio](https://developer.android.com/studio): >= Android Studio Hedgehog | 2023.1.1 Patch 2
- [Ruby](https://rvm.io): >= ruby 3.3.0 (2023-12-25 revision 5124f9ac75) [x86_64-darwin22]
- iOS: >= 14
- Android: >= 6.0

# Setup development environment

1. Run following commands
   ```
   yarn install
   yarn pod-install
   yarn start
   yarn ios
   yarn android
   ```

# FAQ

**Fix java command not found issue**  
if Android studio is installed then Add the following to ~/.bash_profile

```
export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"
```

**Fix adb command not found issue**  
Add the following to ~/.bash_profile

```
export ANDROID_HOME=/Users/{your_username}/Library/Android/sdk
export PATH=$ANDROID_HOME/platform-tools:$PATH
export PATH=$ANDROID_HOME/tools:$PATH
```

**Steps to update clear Xcode cache**

```
rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

**Fix Xcode not opening**

1. Delete `Podfile.lock` file `rm -r ios/Podfile.lock`
2. Delete Pods directory `sudo rm -r ios/Pods`
3. Delete `WatsonMvp.xcworkspace` file `rm -r ios/WatsonMvp.xcworkspace`
4. Install packages `yarn install`
5. Install Pods `yarn pod-install`

**Fix bash: pod: command not found**
add these environment variables in `~/.bash_profile`

```
export GEM_HOME=$HOME/.gem
export PATH=$GEM_HOME/bin:$PATH
```

# Dependencies

For Package Dependencies, see this [link](/DEPENDENCIES)
