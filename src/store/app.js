import routers from "../router/routers";
import {getMenuByRouter} from "../libs/util";


export default {
    state: {
    },
    getters: {
        menuList: (state, getters, rootState) => getMenuByRouter(routers),
        // menuList: () => routers
    },
    mutations: {},
    actions: {}
}
