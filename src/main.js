import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import config from '@/config'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'

import {directive as clickOutside} from 'v-click-outside-x'

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')


Vue.use(VOrgTree)
Vue.use(iView);

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config


/*
自定义全局 console log
 */
Vue.prototype.vLog = (name, message) => {
    if (0 === name) {
        return window.console.log('=======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    } else {
        return window.console.log(name + '===>>>', message ? message : name)
    }
}

Vue.directive('clickOutside', clickOutside)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

// Vue({}).$mount("#app")
// 当Vue实例没有el属性时，则该实例尚没有挂载到某个dom中；
// 假如需要延迟挂载，可以在之后手动调用vm.$mount()方法来挂载。例如：