const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //针对antd实现按需打包，根据import来打包()
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'true',//自动打包相关的样式
    }),
    //使用less-loader对源码中的less的变量进行全局
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': 'pink' },
    }),
);