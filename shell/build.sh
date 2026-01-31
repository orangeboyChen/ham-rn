cd ..
rm -rf build/
mkdir build/

mkdir -p build/android
react-native bundle --assets-dest build/android --bundle-output build/android/index.android.bundle --dev false --entry-file index.js --platform android

mkdir -p build/ios
react-native bundle --assets-dest build/ios --bundle-output build/ios/main.jsbundle --dev false --entry-file index.js --platform ios
