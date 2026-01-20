package com.nowcent.ham.rndebug

import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import com.facebook.react.ReactRootView
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2026/1/21 01:01
 */
@Composable
fun RNContainer(
    moduleName: String,
    onCreateBridge: (bridge: DeviceEventManagerModule.RCTDeviceEventEmitter) -> Unit = { _ -> },
    modifier: Modifier = Modifier,
) {
    val context = LocalContext.current
    val host =
        remember {
            (context.applicationContext as MainApplication).reactNativeHost
        }
    DisposableEffect(Unit) {
        host.reactInstanceManager.onHostResume(null)
        onDispose {
            host.reactInstanceManager.onHostDestroy(null)
        }
    }

    AndroidView(
        factory = {
            ReactRootView(it).apply {
                startReactApplication(host.reactInstanceManager, moduleName, null)
                currentReactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    ?.let(onCreateBridge)
            }
        },
        modifier = modifier
    )
}
