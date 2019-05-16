<!--Created by dhc on 2019/5/16 19:23-->
<template>
    <Card>
        <h3 class="title">drag-drawer组件是对iview的drawer组件的封装，在支持drawer所有api的基础上，支持可拖动和footer底部插槽</h3>
        <div class="menu-bar">
            <b class="menu-bar-text">方向</b>
            <i-switch class="menu-bar-text" v-model="placement">
                <span slot="open">左</span>
                <span slot="close">右</span>
            </i-switch>
            <b class="menu-bar-text">是否可拖动</b>
            <i-switch v-model="draggable" class="menu-bar-text"></i-switch>
            <Button @click="showContainerBDrawer = !showContainerBDrawer" type="primary" class="menu-bar-text">
                <span>{{showContainerBDrawer ? '关闭' : '打开' }}容器内抽屉</span>
            </Button>
            <Button @click="showWindowBDrawer = true" type="primary">打开全屏抽屉</Button>
        </div>
        <div class="drag-drawer-inner-box">
            <drag-drawer v-model="showContainerBDrawer"
                         :width.sync="width2"
                         :inner="true"
                         :transfer="false"
                         :draggable="draggable"
                         @on-resize="handleResize"
                         :scrollable="true"
                         :placement="placementComputed">
                <div slot="header">
                    <Icon type="md-aperture" :size="18"></Icon>
                    <b>这是标题</b>
                </div>
                <p v-for="n in 200" :key="n">{{ n*100000000000000 }}</p>
                <div slot="footer">
                    <p>123123</p>
                    <p>21312</p>
                </div>
            </drag-drawer>
        </div>
        <drag-drawer v-model="showWindowBDrawer"
                     :width.sync="width1"
                     :min-width="300"
                     :placement="placementComputed"
                     :draggable="draggable"
                     :scrollable="true">
            <div slot="header">
                <Icon type="md-aperture" :size="18"></Icon>
                <b>这是标题</b>
            </div>
            <Button @click="showBDrawer3 = true">显示多层</Button>
            <p v-for="n in 200" :key="n">{{ n*100000000000000000 }}</p>
        </drag-drawer>
    </Card>
</template>

<script>
    import DragDrawer from '@c/drag-drawer'

    export default {
        name: "drag_drawer_page",
        components: {DragDrawer},
        data() {
            return {
                showWindowBDrawer: false,
                showContainerBDrawer: false,
                showBDrawer3: false,
                width1: 300,
                width2: 30,
                placement: true,
                draggable: true
            }
        },
        computed: {
            placementComputed() {
                return this.placement ? 'left' : 'right'
            }
        },
        methods: {
            handleResize(event) {
                const {atMin} = event
                /* eslint-disable */
                this.vLog(atMin);
            },
        },
        watch: {},
        mounted() {
        }
    }
</script>

<style scoped lang="less">
    .title {
        padding: 10px 0;
    }

    .menu-bar {
        .menu-bar-text {
            margin-right: 20px;
        }
        .margin-left {
            margin-left: 10px
        }
    }

    .drag-drawer-inner-box {
        position: relative;
        width: 100%;
        height: 500px;
        background: aqua;
        border: 1px solid pink;
    }
</style>