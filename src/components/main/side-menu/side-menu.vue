<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu v-show="!collapsed" :theme="theme" width="auto" @on-select="handleSelect">
            <template v-for="item in menuList">
                <template v-if="item.children && item.children.length===1">
                    <side-menu-item v-if="showChildren(item)"
                                    :key="`s-m-i-${item.name}`"
                                    :parent-item="item">
                    </side-menu-item>
                    <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
                        <Icon :type="item.children[0].icon || ''"></Icon>
                        <span>{{ showTitle(item.children[0]) }}</span>
                    </menu-item>
                </template>
                <template v-else>
                    <side-menu-item v-if="showChildren(item)"
                                    :key="`s-m-i-${item.name}`"
                                    :parent-item="item">
                    </side-menu-item>
                    <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
                        <Icon :type="item.icon || ''"></Icon>
                        <span>{{ showTitle(item) }}</span>
                    </menu-item>
                </template>
            </template>
        </Menu>
    </div>
</template>

<script>
    import SideMenuItem from './side-menu-item.vue'
    import {showTitle} from '@/libs/util'

    export default {
        name: 'sideMenu',
        components: {SideMenuItem},
        props: {
            menuList: {
                type: Array,
                default() {
                    return []
                }
            },
            collapsed: {
                type: Boolean
            },
            theme: {
                type: String,
                default: 'dark'
            }
        },
        methods: {
            handleSelect(name) {
                this.$emit('on-select', name)
            },
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

<style lang="less">
    .side-menu-wrapper {
        /*做网页的时候，有些文字我们需要能被选中，有些我们不要能被选中，那么这就需要用到一个css属性了，那就是 user-select*/
        /*属性值：*/
        /*none :  元素和子元素的文本将无法被选中*/
        /*text :  文本可以被选中*/
        /*auto :  文本将根据浏览器的默认属性进行选择*/
        /*all  :  当所有内容作为一个整体时可以被选择。如果双击或者在上下文上点击子元素，那么被选择的部分将是以该子元素向上回溯的最高祖先元素*/
        /*contain、element :  可以选择文本，但选择范围受元素边界的约束，也就是选择的文本将包含在该元素的范围内。只支持Internet Explorer*/
        user-select: none;
        /*color: white;*/
        .menu-collapsed {
            padding-top: 10px;

            .ivu-dropdown {
                width: 100%;
                .ivu-dropdown-rel a {
                    width: 100%;
                }
            }
            .ivu-tooltip {
                width: 100%;
                .ivu-tooltip-rel {
                    width: 100%;
                }
                .ivu-tooltip-popper .ivu-tooltip-content {
                    .ivu-tooltip-arrow {
                        border-right-color: #fff;
                    }
                    .ivu-tooltip-inner {
                        background: #fff;
                        color: #495060;
                    }
                }
            }

        }
        a.drop-menu-a {
            display: inline-block;
            padding: 6px 15px;
            width: 100%;
            text-align: center;
            color: #495060;
        }
    }

</style>