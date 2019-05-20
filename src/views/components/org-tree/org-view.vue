<!--Created by dhc on 2019/5/17 15:19-->
<template>
    <div>
        <div class="org-tree-wrapper" :style="orgTreeStyle">
            <v-org-tree
                    v-if="data"
                    :data="data"
            ></v-org-tree>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrgView",
        props: {
            zoomHandled: {
                type: Number,
                default: 1
            },
            data: Object
        },
        components: {},
        data() {
            return {
                currentContextMenuId: '',
                orgTreeOffsetLeft: 0,
                orgTreeOffsetTop: 0,
                initPageX: 0,
                initPageY: 0,
                oldMarginLeft: 0,
                oldMarginTop: 0,
                canMove: false
            }
        },
        computed: {
            orgTreeStyle () {
                return {
                    // transform: `translate(-50%, -50%) scale(${this.zoomHandled}, ${
                    //     this.zoomHandled
                    //     })`,
                    // marginLeft: `${this.orgTreeOffsetLeft}px`,
                    // marginTop: `${this.orgTreeOffsetTop}px`
                }
            }
        },
        methods: {},
        watch: {},
        mounted() {
        }
    }
</script>

<style scoped lang="less">

</style>