import Main from '@/components/main';

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
        },
        component: () => import('@/views/login/login.vue')  // 路由懒加载
    },
    {
        path: '/',
        name: '_main',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'md-home',
                    hideInMenu: true,
                    notCache: true
                },
                component: () => import('@/views/home/home.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]