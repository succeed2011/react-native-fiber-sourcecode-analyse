# react-native-doc
## 手动打包
RN版本0.51.0
一般情况下我们是不需要手动对RN的js代码进行打包生成index.bundle.js文件的，或者我们可以在调试模式下使用浏览器手动复制代码保存，但是有些情况我们是需要使用程序帮我们自动完成打包操作的。

为此我写了一个脚本文件。使用步骤为：
1. 新建packager.js文件，将文件放在`./node_modules/react-native`目录内；
2. 在项目根目录上执行 node ./node_modules/react-native/packager.js
3. 打包后的js文件保存在项目根目录，后缀为`.bundle.js`

附上packager.js文件代码：

'use strict';

require('./local-cli/cli.js');

const log = require('./local-cli/util/log').out('bundle');
const Server = require('metro-bundler/src/Server');
const Terminal = require('metro-bundler/src/lib/Terminal');
const TerminalReporter = require('metro-bundler/src/lib/TerminalReporter');
const TransformCaching = require('metro-bundler/src/lib/TransformCaching');
const outputBundle = require('metro-bundler/src/shared/output/bundle');
//const saveAssets = require('./local-cli/saveAssets');
const defaultAssetExts = require('metro-bundler/src/defaults').assetExts;
const defaultSourceExts = require('metro-bundler/src/defaults').sourceExts;
const defaultPlatforms = require('metro-bundler/src/defaults').platforms;
const defaultProvidesModuleNodeModules = require('metro-bundler/src/defaults').providesModuleNodeModules;
const {ASSET_REGISTRY_PATH} = require('./local-cli/core/Constants');

const path = require('path');
const fs = require('fs');

const terminal = new Terminal(process.stdout);

//需要打包的文件,项目根目录的文件
const reqUrlArr = ['a.bundle'];

//项目跟路径
const projectRoots = path.resolve(__dirname.slice(0,__dirname.indexOf('node_modules')));

const createServerOpts = {
    assetExts: defaultAssetExts,
    assetRegistryPath: ASSET_REGISTRY_PATH,
    blacklistRE: /(node_modules[\/\\]react[\/\\]dist[\/\\].*|website\/node_modules\/.*|heapCapture\/bundle\.js|.*\/__tests__\/.*)$/,
    cacheVersion: '3',
    enableBabelRCLookup: false,
    extraNodeModules: {},
    getPolyfills: require('./rn-get-polyfills'),
    //getTransformOptions: [Function: getTransformOptions],
    globalTransformCache: null,
    hasteImpl: undefined,
    maxWorkers: 3,
    moduleFormat: 'haste',
    platforms: [ 'ios', 'android', 'windows', 'web' ],
    polyfillModuleNames: [],
    //postProcessModules: [Function: postProcessModules],
    //postMinifyProcess: [Function: postMinifyProcess],
    //postProcessBundleSourcemap: [Function: postProcessBundleSourcemap],
    projectRoots: [projectRoots],
    providesModuleNodeModules: [ 'react-native', 'react-native-windows' ],
    reporter: new TerminalReporter(terminal),
    resetCache: false,
    runBeforeMainModule: [path.join(projectRoots, 'node_modules/react-native/Libraries/Core/InitializeCore.js')],
    silent: false,
    sourceExts: ['js', 'json'],
    transformCache: TransformCaching.useTempDir(),
    transformModulePath: path.join(projectRoots, 'node_modules/metro-bundler/src/transformer.js'),
    useDeltaBundler: false,
    watch: false,
    workerPath: null
}

const server = new Server(createServerOpts);

var count = 0;
console.log('开始处理... ...');
reqUrlArr.forEach(function(reqUrl) {
    
    //platform决定是哪个平台，因为有些控件在不同平台加载的代码不一样
    server.buildBundleFromUrl(reqUrl + '?platform=ios').then(function(p) {
        const code = p.getSource({
            inlineSourceMap: true,
            minify: false,
        });
        const bundlePath = path.resolve(path.dirname(__filename), '../../' + reqUrl + '.bundle.js');
        fs.writeFileSync(bundlePath, code);
        console.log('写入文件：' + bundlePath + '成功!')

        if(++count === reqUrlArr.length) {
            console.log('打包完毕!!!');
            process.exit(0);
        }
    });
})



