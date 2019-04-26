import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.config.productionTip = false;

Vue.use(iView);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

// Vue({}).$mount("#app")
// 当Vue实例没有el属性时，则该实例尚没有挂载到某个dom中；
// 假如需要延迟挂载，可以在之后手动调用vm.$mount()方法来挂载。例如：