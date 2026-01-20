package com.nowcent.ham.rndebug.module

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2026/1/21 01:29
 */
var casCookie: String = ""

@ReactModule(name = "CasModule")
class RNCasModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CasModule"

    @ReactMethod
    fun requestCasCookie(promise: Promise) {
        Log.i("RNCasModule", "requestCasCookie: cookie=$casCookie")
        promise.resolve(casCookie)
    }
}
