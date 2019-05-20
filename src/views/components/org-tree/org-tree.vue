<!--Created by dhc on 2019/5/17 08:05-->
<template>
    <Card shadow class="org-tree-con" style="height: 100%;width: 100%;overflow:hidden">
        <div class="title">
            <span>powered by </span>
            <a target="blank" href="https://github.com/lison16">Lison</a>
            <a target="blank" href="https://github.com/lison16/v-org-tree">v-org-tree文档</a>
        </div>
        <div class="zoom-box">
            <zoom-controller v-model="zoom" :min="20" :max="200" :step="20"></zoom-controller>
        </div>
        <div class="view-box">
            <org-view v-if="data" :data="data">
            </org-view>
        </div>
    </Card>
</template>

<script>
    import ZoomController from './zoom-controller'
    import OrgView from './org-view'
    import {getOrgData} from '@api/data'

    export default {
        name: "org_tree_page",
        components: {ZoomController, OrgView},
        data() {
            return {
                data: null,
                zoom: 50
            }
        },
        computed: {},
        methods: {
            getDepartmentData() {
                getOrgData().then(res => {
                    const {data} = res
                    this.data = data
                    this.vLog('data', data)
                })
            }
        },
        watch: {},
        mounted() {
            this.getDepartmentData()
        }
    }
</script>

<style lang="less">
    .org-tree-con {
        width: 100%;
        height: 100%;
        .title {
            font-weight: bold;
            span {
                margin-right: 20px;
            }
            a {
                margin-right: 20px;
            }
        }
        .zoom-box {
            position: absolute;
            right: 30px;
            bottom: 25px;
            z-index: 2;
        }
        .view-box {

        }
    }
</style>