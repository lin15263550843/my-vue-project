<!--Created by dhc on 2019-06-16 22:16:44-->
<template>
    <div class="icons-con">
        <Row>
            <i-col span="3" v-for="item in customIconList" :key="`custom-icon-${item}`">
                <Card class="icons-style">
                    <icons :type="item" :size="20"/>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import Icons from '@c/icons'

    export default {
        name: 'icons_page',
        components: {
            Icons
        },
        data() {
            return {
                customIconList: [
                    'iconbear',
                    'iconqq',
                    'icondaxiao',
                    'iconemoji_line',
                    'iconemoji_line1',
                    'iconfrown',
                    'iconmeh',
                    'iconsmile'
                ]
            }
        },
        computed: {},
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
        .icons-style {
            text-align: center;
        }
    }
</style>