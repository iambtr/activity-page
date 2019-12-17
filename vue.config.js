const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/newretail': {
                target: 'http://10.128.12.109:8180/',//测试
                changeOrigin: true,
            }
        }
        // proxy:'http://10.128.12.122:8087/xftob-server'
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('$img', resolve('src/assets/img'))
    },
    publicPath: './',
    productionSourceMap: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            },
            less: {
                modifyVars: {
                }
            }
        }
    }
}
