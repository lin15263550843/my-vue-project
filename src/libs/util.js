import config from '@/config'
import Cookies from 'js-cookie'

const {title, useI18n, cookieExpires} = config;

export const getRouteTitleHandled = (route) => {
    let router = {...route}
    let meta = {...route.meta}
    let title = ''
    if (meta.title) {
        if (typeof meta.title === 'function') {
            meta.__titleIsFunction__ = true
            title = meta.title(router)
        } else title = meta.title
    }
    meta.title = title
    router.meta = meta
    return router
}

export const showTitle = (item, vm) => {
    let {title, __titleIsFunction__} = item.meta
    if (!title) return
    if (useI18n) {
        if (title.includes('{{') && title.includes('}}') && useI18n) title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
        else if (__titleIsFunction__) title = item.meta.title
        else title = vm.$t(item.name)
    } else title = (item.meta && item.meta.title) || item.name
    return title
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
    // window.console.log('routeItem===>>>', routeItem)
    // window.console.log('vm===>>>', vm)
    const handledRoute = getRouteTitleHandled(routeItem)
    const pageTitle = showTitle(handledRoute, vm)
    const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
    window.document.title = resTitle
}

export const TOKEN_KEY = 'token';
/**
 * 保存用户 token
 * @param key
 * @param token
 */
export const setToken = (key, token) => {
    Cookies.set(key, token, {expires: cookieExpires || 1});
};
/**
 * 获取用户 token
 * @param key
 * @returns {*}
 */
export const getToken = (key) => {
    const token = Cookies.get(key);
    if (token) {
        return token;
    } else {
        return false;
    }
};