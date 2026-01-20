package com.nowcent.ham.rndebug.module

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2026/1/21 01:31
 */
@ReactModule(name = "EventModule")
class RNEventModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "EventModule"

    @ReactMethod
    fun postEvent(eventName: String, args: ReadableMap) {
        Log.i("RNEventModule", "postEvent: eventName=$eventName, args=$args")
    }
}
