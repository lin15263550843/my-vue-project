import Main from '@/components/main';

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            hideInMenu: true
        },
        component: () => import('@/views/login/login.vue')  // 路由懒加载
    },
    {
        path: '/',
        name: '_main',
        redirect: '/home',
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
        meta: {
            title: 'about',
            hideInMenu: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // 路由级代码分裂
        // 这会为此路由生成一个单独的块（约。[hash] .js）
        // 访问路径时延迟加载。
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '',
        name: 'doc',
        meta: {
            title: '文档',
            href: 'https://lison16.github.io/iview-admin-doc/#/',
            icon: 'ios-book'
        }
    },
    {
        path: '/join',
        name: 'join',
        component: Main,
        meta: {
            hideInBread: true
        },
        children: [
            {
                path: 'join_page',
                name: 'join_page',
                meta: {
                    icon: 'logo-octocat',
                    title: 'QQ群'
                },
                component: () => import('@/views/About.vue')
            }
        ]
    },
    {
        path: '/components',
        name: 'components',
        meta: {
            icon: 'logo-buffer',
            title: '组件',
        },
        component: Main,
        children: [
            {
                path: 'tree_select_page',
                name: 'tree_select_page',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '树状下拉选择器'
                },
                component: () => import('@/views/components/tree-select/tree-select.vue')
            },
            {
                path: 'count_to_page',
                name: 'count_to_page',
                meta: {
                    icon: 'md-trending-up',
                    title: '数字渐变'
                },
                component: () => import('@/views/components/count-to/count-to.vue')
            },
            {
                path: 'drag_list_page',
                name: 'drag_list_page',
                meta: {
                    icon: 'ios-infinite',
                    title: '拖拽列表'
                },
                component: () => import('@/views/components/drag-list/drag-list.vue')
            },
            {
                path: 'drag_drawer_page',
                name: 'drag_drawer_page',
                meta: {
                    icon: 'md-list',
                    title: '可拖拽抽屉'
                },
                component: () => import('@v/components/drag-drawer/drag-drawer.vue')
            },
            {
                path: 'org_tree_page',
                name: 'org_tree_page',
                meta: {
                    icon: 'ios-people',
                    title: '组织结构树'
                },
                component: () => import('@v/components/org-tree/org-tree.vue')
            },
            {
                path: 'tables_page',
                name: 'tables_page',
                meta: {
                    icon: 'md-grid',
                    title: '多功能表格'
                },
                component: () => import('@v/components/tables/tables.vue')
            },
            {
                path: 'icons_page',
                name: 'icons_page',
                meta: {
                    icon: '_bear',
                    title: '自定义图标'
                },
                component: () => import('@v/components/icons/icons.vue')
            },
        ]
    }, /*Automatic generation of routing*/

]