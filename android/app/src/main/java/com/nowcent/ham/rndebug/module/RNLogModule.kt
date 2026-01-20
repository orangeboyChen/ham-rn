package com.nowcent.ham.rndebug.module

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2026/1/21 01:15
 */
@ReactModule(name = "LogModule")
class RNLogModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "LogModule"

    @ReactMethod
    fun i(tag: String, message: String) {
        Log.i(tag.makeTag(), message)
    }

    @ReactMethod
    fun e(tag: String, message: String) {
        Log.e(tag.makeTag(), message)
    }

    private fun String.makeTag() = "[ReactNative]$this"
}
