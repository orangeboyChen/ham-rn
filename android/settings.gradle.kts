pluginManagement { includeBuild("../node_modules/@react-native/gradle-plugin") }
plugins { id("com.facebook.react.settings") }
extensions.configure<com.facebook.react.ReactSettingsExtension> { autolinkLibrariesFromCommand() }

rootProject.name = "ham_rn"
include(":app")
includeBuild("../node_modules/@react-native/gradle-plugin")
include(":app", ":react-native-code-push")
project(":react-native-code-push").projectDir = File(rootProject.projectDir, "../node_modules/react-native-code-push/android/app")
