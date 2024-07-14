cd ..
rm -rf build
mkdir build
# react-native bundle --assets-dest build/CodePush --bundle-output build/CodePush/main.jsbundle --dev false --entry-file index.js --platform ios
appcenter codepush release-react -a orangeboy/ham_ios -m -t "*" -o build/ios
