出于业务需要，有时需要将base.js和业务代码分开打包，这时就需要修改打包代码，具体为：

1. 找到文件：node_modules\metro-bundler\src\Bundler\BundleBase.js
2. BundleBase类中的getSource函数就是返回需要打包的模块，默认它会返回所有引用到的模块，我们需要在这里处理让它返回业务模块或者框架模块
3. 通过文件的路径来区分，凡是路径中含有`node_modules`的就是框架模块，其他的是业务模块，具体代码如下：

getSource(options) {
    this.assertFinalized();

    // if (this._source) {
      // return this._source;
    // }

    if(global.bundleType === 'business') {
        var tempModules = this.__modules.concat();
        tempModules.splice(tempModules.length - 2, 1);
        this._source = tempModules
                      .filter(module => module.sourcePath.indexOf('node_modules') === -1)
                      .map(module => module.code).join('\n');
    } else if(global.bundleType === 'base') {
      var tempModules = this.__modules.filter(module => module.sourcePath.indexOf('node_modules') > -1);
      
      //注意这句是将`require("react-native/Libraries/Core/InitializeCore");`添加到base.js中，相当于base的初始化入口
      tempModules = tempModules.concat(this.__modules[this.__modules.length - 2]);
      
      this._source = tempModules.map(module => module.code).join('\n');
    } else {
      this._source = this.__modules.map(module => module.code).join('\n');
    }

    return this._source;
 }


通过全局变量`global.bundleType`来区分当前打包的是框架代码还是业务代码，不设置的话会全打包。
