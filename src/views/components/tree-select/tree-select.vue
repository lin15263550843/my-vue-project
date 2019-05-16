<!--Created by dhc on 2019/5/16 -->
<template>
    <div>
        <tree-select class="tree-select-w"
                     :data="treeData"
                     v-model="treeSelected"
                     check-strictly
                     :load-data="loadData"
                     @on-change="handleTreeSelectChange"
                     @on-toggle-expand="handleTreeSelectExpand"
                     @on-check-change="handleTreeSelectCheckChange"
                     @on-select-change="handleTreeSelectClick">
        </tree-select>
        <Button @click="changeTreeSelectData" class="bottom-update">
            <span>更新选中数据</span>
        </Button>
        <Button @click="changeTreeData">
            <span>更新树数据</span>
        </Button>
        <div class="selected_item_con" v-for="(item,index) in treeSelected" :key="`selected_item_${index}`">
            {{item}}
        </div>
    </div>
</template>

<script>
    import TreeSelect from '@c/tree-select'
    import {newTreeData} from '@/mock/data/tree-select'
    import {getTreeSelectData} from '@/api/data'

    export default {
        name: "tree_select_page",
        components: {
            TreeSelect
        },
        data() {
            return {
                treeSelected: [],
                treeData: []
            }
        },
        computed: {},
        methods: {
            changeTreeSelectData() {
                this.vLog('treeSelected', this.treeSelected)
                this.treeSelected = [111, 114, 121]
            },
            changeTreeData() {
                this.treeData = newTreeData
                // this.treeSelected = [];
            },
            handleTreeSelectChange(list) {
                // console.log('=-========', list);
            },
            handleTreeSelectExpand(item) {
                // console.log('toggle expand', item);
            },
            handleTreeSelectCheckChange(selectedArray, item) {
                // console.log(selectedArray, item);
            },
            handleTreeSelectClick(selectArray, item) {
                // console.log(selectArray, item);
            },
            loadData(item, callback) {
                setTimeout(() => {
                    let data = [
                        {
                            id: 111,
                            title: '1-1-1 德玛西亚之力 盖伦 大宝剑'
                        },
                        {
                            id: 112,
                            title: '1-1-2 拉克丝 光辉女郎 盖伦妹妹'
                        },
                        {
                            id: 113,
                            title: '1-1-3 🐊  鳄鱼 雷克顿 荒漠屠夫'
                        },
                        {
                            id: 114,
                            title: '1-1-4 盲僧 李青 瞎子 一库'
                        }
                    ]
                    callback(data)
                }, 500)
            }
        },
        watch: {},
        mounted() {
            getTreeSelectData().then(res => {
                const {data} = res
                this.treeData = data;
            })
            // this.vLog('treeSelected', this.treeSelected)
            // this.treeData = newTreeData
        }
    }
</script>

<style scoped lang="less">
    .tree-select-w {
        width: 350px;
    }

    .bottom-update {
        margin: 0 20px;
    }

    .selected_item_con {
        width: 350px;
        margin-top: 10px;
        padding: 10px;
        background-color: antiquewhite;
        border-radius: 5px;
    }
</style>