/**
 * Created by dhc on 2019-06-03 11:11:11
 *
 * 快速生成页面脚本
 */
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const os = require('os')
const sd = require('silly-datetime')

const log = msg => typeof msg !== 'object' ? console.log(chalk.blue(`${msg}`)) : console.log(msg)
const warLog = msg => typeof msg !== 'object' ? console.log(chalk.yellow(`${msg}`)) : console.log(msg)
const sucLog = msg => typeof msg !== 'object' ? console.log(chalk.green(`${msg}`)) : console.log(msg)
const errLog = msg => typeof msg !== 'object' ? console.log(chalk.red(`${msg}`)) : console.log(msg)

const {viewsTemplate, indexTemplate} = require('./template')
const userInfo = os.userInfo()
const basePath = 'src'
const viewsPath = 'views'
const cptPath = 'components'
const dirType = process.argv[2]
const inputPath = process.argv[3]
const inputDir = path.parse(inputPath).dir
const inputName = path.parse(inputPath).base
const fileExt = path.parse(inputPath).ext

const viewsDir = `${basePath}/${viewsPath}/${inputPath}`
const cptDir = `${basePath}/${cptPath}/${inputPath}`
const pageDir = `${basePath}/${inputDir}`
// const pathList = process.argv[3].split('/')
// const inputName = pathList[pathList.length - 1]
// const isNameType = inputName.search(/\.vue$|\.js$|\.html$|\.ts$|\.less$|\.json$/i) > 0

// 短横线转换为驼峰
const getCamelCase = name => {
    return (name.replace(/^./, (l) => l.toUpperCase())).replace(/-([a-z])/g, (all, i) => i.toUpperCase())
}
// 模板数据
let vtd = {
    inputName: inputName,
    name: getCamelCase(inputName),
    userName: userInfo.username,
    time: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
}
// 递归创建目录 同步方法（一般也就两三层，性能影响不大）
const createDirectory = dirName => {
    if (!!fs.existsSync(dirName)) {
        return true;
    } else {
        if (createDirectory(path.dirname(dirName))) {
            fs.mkdirSync(dirName);
            return true;
        }
    }
}
// 创建 views or components 文件
const createViewsFile = (dir, vueTemplate, indexTemplate) => {
    let vName = `${dir}/${inputName}.vue`
    let indexName = `${dir}/index.js`
    if (createDirectory(dir)) {
        if (!!fs.existsSync(vName)) {
            warLog(` 文件已存在：${vName}`)
        } else {
            log(`开始创建：${vName}`)
            try {
                fs.writeFileSync(vName, vueTemplate, 'utf8')
                if (indexTemplate) {
                    fs.writeFileSync(indexName, indexTemplate, 'utf8')
                }
                sucLog(`成功创建：${vName}`)
            } catch (e) {
                errLog(`创建失败：${vName}`)
                throw Error(e)
            }
        }
    } else {
        errLog(`目录创建失败：${dir}`)
    }
}
// 创建单文件
const createAloneFile = (dir) => {
    let pName = `${dir}/${inputName}`
    let data = ''
    if ('.vue' === fileExt) {
        vtd.inputName = vtd.inputName.split('.')[0]
        vtd.name = vtd.name.split('.')[0]
        data = viewsTemplate(vtd)
    }
    if (createDirectory(dir)) {
        if (!!fs.existsSync(pName)) {
            warLog(` 文件已存在：${pName}`)
        } else {
            log(`开始创建：${pName}`)
            try {
                fs.writeFileSync(pName, data, 'utf8')
                sucLog(`成功创建：${pName}`)
            } catch (e) {
                errLog(`创建失败：${pName}`)
                throw Error(e)
            }
        }
    } else {
        errLog(`目录创建失败：${dir}`)
    }
}
// 创建 vue 页面
if ('views' === dirType) {
    createViewsFile(viewsDir, viewsTemplate(vtd), null);
}
// 创建 vue 组件
if ('cpt' === dirType) {
    createViewsFile(cptDir, viewsTemplate(vtd), indexTemplate(vtd));
}
// 创建单文件
if ('page' === dirType) {
    createAloneFile(pageDir);
}