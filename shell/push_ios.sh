cd ..
rm -rf build
mkdir build
mkdir -p build/ios/CodePush
react-native bundle --assets-dest build/ios/CodePush --bundle-output build/ios/CodePush/main.jsbundle --dev false --entry-file index.js --platform ios
#appcenter codepush release-react -a orangeboy/ham_ios -m -t "*" -o build/ios
