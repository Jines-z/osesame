/* ========================================================

    ** 配置文件 **

    1、html     ：在 index.html 中，使用 <%= htmlWebpackPlugin.options.xxx %> 来访问 html 中的属性，可扩展
    2、theme    ：主题配置
    3、global   ：全局变量，使用时前后加“__”，字母变大写，例如 __ENV__，可扩展
    4、branch   ：所在分支，可用于打包时判断（测试/线上）环境，等等
    5、proxy    ：本地代理，请在 proxy.config.js 中配置你需要代理的地址
    6、env      ：环境变量，开发环境为 development，生产环境为 production
    7、relative ：相对路径，开启时，publicPath 将变为 './'，dist 目录下所有文件在同一层级，可直接访问 index.html
    8、vendor   ：用于生成 dll 包，当 (dll不存在) (vendor被改变) (包的版本被更换) 时，请 npm run dll
    9、config   ：用于扩展 webpack 配置

   ====================================================== */
const NODE_ENV = process.env.NODE_ENV || 'development'
const fs       = require('fs')
const path     = require('path')
const dayAWP   = require('antd-dayjs-webpack-plugin')
const branch   = fs.existsSync(path.join(__dirname, '.git')) ? fs.readFileSync(path.resolve(__dirname, '.git', 'HEAD'), 'utf-8').trim().split(': ')[1].split('heads')[1].replace(/^\//, '') : 'master'
const isDev    = NODE_ENV === 'development'

module.exports = {
    html: {
        title: 'OSesame',
        fav: 'https://jines-z.github.io/images/osesame.ico'
    },
    theme: {
        'primary-color'       : '#495060',
        'menu-dark-bg'        : '#495060',
        'menu-dark-submenu-bg': '#363e4f',
        'normal-color'        : '#282C32',
        'text-color'          : '#282C32',
        'border-radius-base'  : '2px',
        'border-radius-sm'    : '2px',
        'font-family'         : 'Microsoft YaHei'
    },
    global     : { env: NODE_ENV, branch },
    port       : 8080,
    env        : NODE_ENV,
    basePath   : __dirname,
    srcDir     : path.resolve(__dirname, 'src', 'renderer'),
    outDir     : path.resolve(__dirname, 'dist'),
    dllDir     : path.resolve(__dirname, 'dll'),
    publicPath : './',
    open       : false,
    esLint     : true,
    relative   : true,
    update     : false,
    vendor     : ['react', 'react-dom', 'react-router-dom', 'react-loadable', 'mobx', 'mobx-react', 'crypto-js', 'classnames'],
    config     : {
        entry: [path.resolve(__dirname, 'src', 'renderer')],
        plugins: isDev ? [] : [new dayAWP()]
    }
}
