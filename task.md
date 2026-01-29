1.  CasMobileLoginView继续i18n

2. ```html
<label for="rememberMe" class="jqmdl">近期免登录</label>
```
这个元素的文字i18n

3. ```html
<a id="mobileGetPasswordControllerId" href="https://cas.whu.edu.cn/face/getBackPwd" class="a forget-psw1" style="float: right;">忘记密码？</a>
```
这个元素不展示

4. ```html
<div class="login-idx-opt">
            <!-- 智慧珞珈隐私协议：-->
            <input type="checkbox" name="isAgree" id="isAgree">
            <label for="isAgree" class="jqmdl">我已阅读并同意智慧珞珈</label><label><a href="https://homewh.chaoxing.com/agree/privacyPolicy?appId=1000028" target="_blank" style="text-decoration:underline">《隐私协议》</a>
            </label>
   </div>
可视文字部分i18n
```

5. ```html
<div class="language-wrap" id="languages">
        <img src="/authserver/custom/images/language.png" alt="logo">
        <span>English</span>
    </div>
```
不展示这个元素

6. ```html
<header>
        武汉大学
    ...
```

参照CasMobileLoginView修改代码
