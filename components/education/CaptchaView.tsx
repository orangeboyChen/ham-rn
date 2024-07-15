import React from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/16 00:36
 */
const CaptchaView = ({
  onGetToken,
}: {
  onGetToken: (token: string) => void;
}): React.ReactElement => {
  const html = require('../../resources/captcha-page.html');
  return (
    <WebView
      source={html}
      onMessage={(e: WebViewMessageEvent) => {
        const data = JSON.parse(e.nativeEvent.data) as {token: string};
        onGetToken(data.token);
      }}
    />
  );
};

export {CaptchaView};
