package com.nowcent.ham.rndebug.module

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2026/1/21 01:18
 */
class RNCustomPackage : ReactPackage {
    override fun createNativeModules(context: ReactApplicationContext): MutableList<NativeModule> {
        return mutableListOf(
            RNLogModule(context),
            RNEducationModule(context),
            RNCasMobileLoginModule(context),
            RNEventModule(context),
            RNCasModule(context),
            RNScoreCalcModule(context),
            RNCommonModule(context)
        )
    }

    override fun createViewManagers(p0: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return mutableListOf()
    }
}
