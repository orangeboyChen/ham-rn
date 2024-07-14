cd ..
rm -rf build
mkdir build
# /react-native bundle --assets-dest build/CodePush --bundle-output build/CodePush/index.android.bundle --dev false --entry-file index.js --platform android
appcenter codepush release-react -a orangeboy/ham_android -t "*" -o build/andorid
