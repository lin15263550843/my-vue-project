<template>
    <layout class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" class="left-sider">
            <side-menu accordion :menu-list="menuList" :collapsed="collapsed" @on-select="turnToPage">
                <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
                <div class="logo-con" @click="outLogin">
                    <img v-show="!collapsed" src="../../assets/images/logo.jpg" key="max-logo"/>
                    <img v-show="collapsed" src="../../assets/images/logo-min.jpg" key="min-logo"/>
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
            <Content class="main-content-con">
                <Breadcrumb class="bared-con">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Content class="content-wrapper">
                    <keep-alive>
                        <router-view/>
                    </keep-alive>
                </Content>
            </Content>
        </Layout>
    </layout>
</template>
<script>
    import sideMenu from './side-menu/side-menu.vue'
    import {setToken, getToken} from '../../libs/util'

    export default {
        nane: 'Main',
        components: {
            sideMenu
        },
        data() {
            return {
                collapsed: false
            }
        },
        computed: {
            menuList() {
                this.vLog('menuList', this.$store.getters.menuList);
                return this.$store.getters.menuList
            },
            // tagNavList() {
            //     return this.$store.state.app.tagNavList
            // },
            // cacheList() {
            //     const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
            //     return list
            // },
        },
        methods: {
            turnToPage(route) {
                this.vLog('route', route)
                let {name, params, query} = {}
                if (typeof route === 'string') name = route
                else {
                    name = route.name
                    params = route.params
                    query = route.query
                }
                if (name.indexOf('isTurnByHref_') > -1) {
                    window.open(name.split('_')[1])
                    return
                }
                this.$router.push({
                    name,
                    params,
                    query
                })

            },
            outLogin() {
                this.vLog('退出登录', getToken(this.$config.passwordName))
                setToken(this.$config.passwordName, '')
            }
        }
    }
</script>
<style lang="less">
    .main {
        height: 100%;
        .left-sider {
            overflow: hidden; /*为了隐藏滚动条*/
            .ivu-layout-sider-children {
                overflow-y: scroll;
                margin-right: -18px;
            }
        }
        .logo-con {
            height: 64px;
            padding: 10px;
            img {
                height: 44px;
                width: auto;
                display: block;
                margin: 0 auto;
            }
        }
        .header-con {
            background: #fff;
            padding: 0 20px;
            width: 100%;
        }
        .main-content-con {
            /*height: ~"calc(100% - 60px)";*/
            height: 100%;
            overflow: hidden;
            .bared-con{
                height: 50px;
                padding: 14px;
                background: beige;
            }
            .content-wrapper {
                padding: 15px;
                /*height: 100%;*/
                height: ~"calc(100% - 50px)";
                overflow: auto;
            }
        }
    }
</style>