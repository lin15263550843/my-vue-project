<template>
    <Submenu name="`${parentName}`">
        <template slot="title">
            <Icon :type="parentItem.icon || ''"></Icon>
            <span>{{showTitle(parentItem)}}</span>
        </template>
        <!--<MenuItem name="1-1">Option 1</MenuItem>-->
        <!--<MenuItem name="1-2">Option 2</MenuItem>-->
        <!--<MenuItem name="1-3">Option 3</MenuItem>-->
    </Submenu>
    <!--<Submenu name="2">-->
    <!--<template slot="title">-->
    <!--<Icon type="ios-keypad"></Icon>-->
    <!--Item 2-->
    <!--</template>-->
    <!--<MenuItem name="2-1">Option 1</MenuItem>-->
    <!--<MenuItem name="2-2">Option 2</MenuItem>-->
    <!--</Submenu>-->
    <!--<Submenu name="3">-->
    <!--<template slot="title">-->
    <!--<Icon type="ios-analytics"></Icon>-->
    <!--Item 3-->
    <!--</template>-->
    <!--<MenuItem name="3-1">Option 1</MenuItem>-->
    <!--<MenuItem name="3-2">Option 2</MenuItem>-->
    <!--</Submenu>-->
</template>

<script>
    import {showTitle} from '@/libs/util'

    export default {
        name: "SideMenuItem",
        props: {
            parentItem: {
                type: Object,
                default: () => {
                }
            },
            theme: String,
            iconSize: Number
        },
        computed: {
            parentName() {
                return this.parentItem.name
            },
            children() {
                return this.parentItem.children
            },
            textColor() {
                return this.theme === 'dark' ? '#fff' : '#495060'
            }
        },
        methods: {
            showTitle(item) {
                return showTitle(item, this)
            },
            showChildren(item) {
                return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
            },
            getNameOrHref(item, children0) {
                return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
            }
        }
    }
</script>

<style scoped>

</style>