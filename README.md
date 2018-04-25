# react-native-doc
## 手动生成`index.bundle.js`文件
RN版本**0.51.0**

一般情况下我们是不需要手动对RN的js代码进行打包生成index.bundle.js文件的，或者我们可以在调试模式下使用浏览器手动复制代码保存，再或者直接通过RN提供的命令行参数生成，但是我感觉命令行写着太麻烦，所以自己写了一个打包入口文件，好处是可以调试打包代码，进而对打包代码进行修改，一个常见的需求就是分开打包base.js和业务js，这时就很需要对代码进行调试。

为此我写了一个脚本文件。使用步骤为：
1. 新建package.js文件，将文件放在`./node_modules/react-native`目录内；
2. 在项目根目录上执行 `node ./node_modules/react-native/package.js`;
3. 打包后的js文件保存在项目根目录，后缀为`.bundle.js`.

```
注: 
* 入口文件放在项目根目录中
* package.js中reqUrlArr变量中写的是入口js文件，可以写多个，比如入口文件为index1.js、index2.js，
那么 reqUrlArr = ['index1.bundle', 'index2.bundle']
```
