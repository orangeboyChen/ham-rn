package com.nowcent.ham.rndebug.module

import android.content.Intent
import android.net.Uri
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2026/1/21 01:42
 */
@ReactModule(name = "CommonModule")
class RNCommonModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CommonModule"

    @ReactMethod
    fun openUrl(url: String) {
        Log.i("CommonModule", "openUrl: url=$url")
    }

    @ReactMethod
    fun showToast(type: String, message: String, hint: String) {
        Log.i("CommonModule", "showToast: type=$type, message=$message, hint=$hint")
        Toast.makeText(reactContext.applicationContext, message, Toast.LENGTH_LONG).show()
    }
}
