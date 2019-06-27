<!--Created by dhc on 2019-06-17 08:54:47-->
<template>
    <i :class="`iconfont ${type}`" :style="styles"></i>
</template>

<script>
    export default {
        name: 'Icons',
        props: {
            type: {
                type: String,
                required: true
            },
            color: {
                type: String,
                default: '#387ef5'
            },
            size: {
                type: Number,
                default: 16
            }
        },
        components: {},
        data() {
            return {}
        },
        computed: {
            styles() {
                return {
                    fontSize: `${this.size}px`,
                    color: this.color
                }
            }
        },
        methods: {},
        watch: {},
        mounted() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .icons-con {

    }
</style>
             