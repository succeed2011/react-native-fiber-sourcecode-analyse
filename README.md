# react-native-doc
## 手动打包
RN版本0.51.0
一般情况下我们是不需要手动对RN的js代码进行打包生成index.bundle.js文件的，或者我们可以在调试模式下使用浏览器手动复制代码保存，但是有些情况我们是需要使用程序帮我们自动完成打包操作的。

为此我写了一个脚本文件。使用步骤为：
1. 新建packager.js文件，将文件放在`./node_modules/react-native`目录内；
2. 在项目根目录上执行 node ./node_modules/react-native/packager.js
3. 打包后的js文件保存在项目根目录，后缀为`.bundle.js`
