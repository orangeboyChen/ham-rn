package com.nowcent.ham.rndebug.module

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2026/1/21 01:38
 */
@ReactModule(name = "ScoreCalcModule")
class RNScoreCalcModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "ScoreCalcModule"

    @ReactMethod
    fun getCurrentCalc(promise: Promise) {
        Log.i("RNScoreCalcModule", "getCurrentCalc")
        promise.resolve("")
    }

    @ReactMethod
    fun selectCalc(item: ReadableMap, promise: Promise) {
        Log.i("RNScoreCalcModule", "selectCalc: item=$item")
        promise.resolve(true)
    }

    @ReactMethod
    fun openDetail(item: ReadableMap) {
        Log.i("RNScoreCalcModule", "openDetail: item=$item")
    }

    @ReactMethod
    fun testItem(item: ReadableMap, promise: Promise) {
        Log.i("RNScoreCalcModule", "testItem: item=$item")
        promise.resolve(true)
    }

    @ReactMethod
    fun addListener(eventName: String) {
        Log.i("RNScoreCalcModule", "addListener: eventName=$eventName")
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        Log.i("RNScoreCalcModule", "removeListeners: count=$count")
    }
}
