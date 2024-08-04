import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CookieManager, {Cookies} from '@react-native-cookies/cookies';
import {Platform, StyleSheet} from 'react-native';
import CasMobileLoginModule from '../../modules/CasMobileLoginModule.ts';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

const runFirst = `
   function sendMessage(status, type, username, password) {
      const messageBody = { username, password, type };
      const event = {
          type: 'postMessage',
          data: messageBody
      }
      window.ReactNativeWebView.postMessage(JSON.stringify(event));
   };
   document.getElementsByClassName('social-aut-login')[0].remove();
   const usernameElement = document.getElementById('mobileUsername');
   const passwordElement = document.getElementById('mobilePassword');
   usernameElement.addEventListener('change', () => {
        sendMessage(true, 'usernameChange', usernameElement.value, passwordElement.value);
   });
   
   passwordElement.addEventListener('change', () => {
        sendMessage(true, 'passwordChange', usernameElement.value, passwordElement.value);
   });
   const loginElement = document.getElementById('load');
   usernameElement.setAttribute('placeholder', '学号');
   loginElement.onclick = (e) => {
       if (usernameElement.value.length !== 13) {
           showTips("请输入正确的学号");
           return false;  
       }
       sendMessage(true, 'login', usernameElement.value, passwordElement.value);
       submitLoginForm(e);
   };
   
   if (document.getElementsByClassName('main') && document.getElementsByClassName('main').length) {
       document.getElementsByClassName('main')[0].setAttribute('style', \`height: ${'$'}{window.innerHeight}px\`);
   }
true;
`;

interface UserInfo {
  studentId?: string;
  password?: string;
}

function CasMobileLoginView(): React.JSX.Element {
  useEffect(() => {
    CookieManager.clearAll(true).then(result => {
      console.log('clearCookie', result);
    });
  }, []);

  const [userInfo, setUserInfo] = useState<UserInfo>({});
  return (
    <WebView
      source={{
        uri: 'https://cas.whu.edu.cn/authserver/login?service=https%3A%2F%2Fcas.whu.edu.cn%2Fauthserver%2Fmobile%2Fcallback%3FappId%3D985180443&login_type=mobileLogin',
      }}
      injectedJavaScript={runFirst}
      style={webviewStyle}
      webviewDebuggingEnabled={false}
      onMessage={message => {
        const event: {type: string; data: any} = JSON.parse(
          message.nativeEvent.data,
        );
        if (event.type === 'postMessage') {
          const {username, password} = event.data;
          setUserInfo({
            studentId: username,
            password,
          });
        }
      }}
      onShouldStartLoadWithRequest={() => {
        const cookieHandler = (cookies: Cookies) => {
          if (
            (cookies.CASTGC?.value?.length ?? 0) > 0 &&
            (cookies.JSESSIONID?.value?.length ?? 0) > 0
          ) {
            const result = Object.keys(cookies)
              .map(key => `${key}=${cookies[key].value}`)
              .join(';');
            CasMobileLoginModule.onRequestSuccess(
              userInfo.studentId ?? '',
              userInfo.password ?? '',
              result,
            );
            console.log(result);
          }
        };
        if (Platform.OS === 'ios') {
          CookieManager.getAll(true).then(allCookie => {
            const cookie: Cookies = {};
            Object.keys(allCookie)
              .filter(key => allCookie[key].domain === 'cas.whu.edu.cn')
              .forEach(key => {
                cookie[key] = allCookie[key];
              });
            cookieHandler(cookie);
          });
        } else if (Platform.OS === 'android') {
          CookieManager.get('https://cas.whu.edu.cn/authserver/').then(
            cookies => {
              cookieHandler(cookies);
            },
          );
        }

        return true;
      }}
    />
  );
}

const webviewStyle = StyleSheet.create({
  backgroundColor: Colors.lighter,
});

export default CasMobileLoginView;
