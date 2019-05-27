<!--Created by dhc on 2019/5/17 15:19-->
<template>
    <div class="org-tree-drag-wrapper"
         @mousedown="mousedownView"
         @contextmenu="handleDocumentContextmenu">
        <div class="org-tree-wrapper" :style="orgTreeStyle">
            <v-org-tree
                    v-if="data"
                    :data="data"
                    collapsable
                    :horizontal="false"
                    :expand-all="true"
                    :node-render="nodeRender"
                    @on-node-click="handleNodeClick"
            ></v-org-tree>
        </div>
    </div>
</template>

<script>
    import { on, off } from '@/libs/tools'

    const menuList = [
        {
            key: 'edit',
            label: '编辑部门'
        },
        {
            key: 'detail',
            label: '查看部门'
        },
        {
            key: 'new',
            label: '新增子部门'
        },
        {
            key: 'delete',
            label: '删除部门'
        }
    ]

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
            orgTreeStyle() {
                return {
                    transform: `translate(-50%, -50%) scale(${this.zoomHandled}, ${this.zoomHandled})`,
                    marginLeft: `${this.orgTreeOffsetLeft}px`,
                    marginTop: `${this.orgTreeOffsetTop}px`
                }
            }
        },
        methods: {
            nodeRender (h, data) {
                return (
                    <div
            class={[
                        'custom-org-node',
                    data.children && data.children.length ? 'has-children-label' : ''
            ]}
                on-mousedown={event => event.stopPropagation()}
                on-contextmenu={this.contextmenu.bind(this, data)}
            >
                {data.label}
            <dropdown
                trigger="custom"
            class="context-menu"
                visible={this.currentContextMenuId === data.id}
                nativeOn-click={this.handleDropdownClick}
                on-on-click={this.handleContextMenuClick.bind(this, data)}
                style={{
                    transform: `scale(${1 / this.zoomHandled}, ${1 /
                    this.zoomHandled})`
                }}
                v-click-outside={this.closeMenu}
            >
            <dropdown-menu slot="list">
                    {menuList.map(item => {
                        return (
                            <dropdown-item name={item.key}>{item.label}</dropdown-item>
                    )
                    })}
            </dropdown-menu>
                </dropdown>
                </div>
            )
            },
            handleNodeClick(e, data, expand) {
                expand()
            },
            contextmenu(data, $event) {
                let event = $event || window.event
                event.preventDefault
                    ? event.preventDefault()
                    : (event.returnValue = false)
                this.currentContextMenuId = data.id
            },
            handleDropdownClick(event) {
                event.stopPropagation()
            },
            handleContextMenuClick(data, key) {
                this.$emit('on-menu-click', {data, key})
            },
            closeMenu() {
                this.currentContextMenuId = ''
            },
            mousedownView (event) {
                this.canMove = true
                this.initPageX = event.pageX
                this.initPageY = event.pageY
                this.oldMarginLeft = this.orgTreeOffsetLeft
                this.oldMarginTop = this.orgTreeOffsetTop
                on(document, 'mousemove', this.mousemoveView)
                on(document, 'mouseup', this.mouseupView)
            },
            mousemoveView (event) {
                if (!this.canMove) return
                const { pageX, pageY } = event
                this.orgTreeOffsetLeft = this.oldMarginLeft + pageX - this.initPageX
                this.orgTreeOffsetTop = this.oldMarginTop + pageY - this.initPageY
            },
            mouseupView () {
                this.canMove = false
                off(document, 'mousemove', this.mousemoveView)
                off(document, 'mouseup', this.mouseupView)
            },
            handleDocumentContextmenu () {
                this.canMove = false
            },
        },
        watch: {},
        mounted () {
            on(document, 'contextmenu', this.handleDocumentContextmenu)
        },
        beforeDestroy () {
            off(document, 'contextmenu', this.handleDocumentContextmenu)
        }
    }
</script>

<style lang="less">
    .org-tree-drag-wrapper {
        width: 100%;
        height: 100%;
    }

    /*使用absolute与transform配合实现 div 居中*/
    /*position:absolute; 首先给文本绝对定位；*/
    /*left:50%;top:50%; 让文本距离盒子左边和上边分别为50%，*/
    /*transform:translate(-50%,-50%); 再用transform向左（上）平移它自己宽度（高度）的50%，也就达到居中效果了。*/
    .org-tree-wrapper {
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: transform 0.2s ease-out;
        .org-tree-node-label {
            box-shadow: 0px 2px 12px 0px rgba(143, 154, 165, 0.4);
            border-radius: 4px;
            .org-tree-node-label-inner {
                padding: 0;
                .custom-org-node {
                    padding: 14px 41px;
                    background: #738699;
                    user-select: none;
                    white-space: nowrap;
                    border-radius: 4px;
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                    transition: background 0.1s ease-in;
                    cursor: default;
                    &:hover {
                        background: #5d6c7b;
                        transition: background 0.1s ease-in;
                    }
                    &.has-children-label {
                        cursor: pointer;
                    }
                    .context-menu {
                        position: absolute;
                        right: -10px;
                        bottom: 20px;
                        z-index: 10;
                    }
                }
            }
        }
    }
</style>