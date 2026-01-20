package com.nowcent.ham.rndebug.module

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.module.annotations.ReactModule

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2026/1/21 01:25
 */
@ReactModule(name = "EducationModule")
class RNEducationModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "EducationModule"

    @ReactMethod
    fun onGetCourseList(courseList: ReadableMap, errorMessage: String?) {
        Log.i(
            "RNEducationModule",
            "onGetCourseList: courseList=$courseList, errorMessage=$errorMessage"
        )
    }

    @ReactMethod
    fun getCourseConfig(promise: Promise) {
        Log.i("RNEducationModule", "getCourseConfig")
        val map = WritableNativeMap().apply {
            putInt("year", 2026)
            putInt("semester", 1)
        }
        promise.resolve(map)
    }

    @ReactMethod
    fun onGetScoreList(scoreListStr: String, userInfoStr: String, errorMessage: String?) {
        Log.i(
            "RNEducationModule",
            "onGetScoreList: scoreListStr=$scoreListStr, userInfoStr=$userInfoStr, errorMessage=$errorMessage"
        )
    }
}
