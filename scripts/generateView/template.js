/**
 * 预定义模板
 *
 * @type {{vueTemplate: (function(*): string)}}
 */
module.exports = {
    viewsTemplate: params => {
        return `<!--Created by ${params.userName} on ${params.time}-->
<template>
    <div class="${params.inputName}-con">
        
    </div>
</template>

<script>
    export default {
        name: '${params.name}',
        components: {},
        data() {
            return {}
        },
        computed: {},
        methods: {},
        watch: {},
        mounted() {},
        beforeDestroy() {}
    }
</script>

<style lang="less" scoped>
    .${params.inputName}-con {

    }
</style>
             `
    },
    cptTemplate: params => {
        return `<!--Created by ${params.userName} on ${params.time}-->
<template>
    <div class="${params.name}-con">
    
    </div>
</template>

<script>
    export default {
        name: '${params.name}',
        props:{}
        components: {},
        data() {
            return {}
        },
        computed: {},
        methods: {},
        watch: {},
        mounted() {},
        beforeDestroy() {}
    }
</script>

<style lang="less" scoped>
    .${params.inputName}-con {
        
    }
</style>
             `
    },
    indexTemplate: params => {
        return `export { default } from './${params.inputName}'`
    }
}