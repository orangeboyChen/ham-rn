cd ..
rm -rf build
mkdir build
# react-native bundle --assets-dest build/android/CodePush --bundle-output build/android/CodePush/index.android.bundle --dev false --entry-file index.js --platform android
appcenter codepush release-react -a orangeboy/ham_android -t "*" -o build/andorid
