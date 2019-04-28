import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import config from '../config'
import {setTitle, getToken} from '../libs/util'

Vue.use(Router);

const LOGIN_PAGE_NAME = 'login';

const router = new Router({mode: 'history', routes});

router.beforeEach((to, from, next) => {
    const token = getToken(config.passwordName);
    window.console.log('token===>>>', token);
    window.console.log('to===>>>', to);
    if (!token && to.name !== LOGIN_PAGE_NAME) {
        next({name: LOGIN_PAGE_NAME});
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        next();
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        next({name: config.homeName})
    } else {
        next();
    }
});

router.afterEach(to => {
    setTitle(to, router.app);
    window.scrollTo(0, 0)
});
export default router;
