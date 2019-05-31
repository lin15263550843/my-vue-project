<!--Created by dhc on 2019/5/27 11:18-->
<template>
    <div>
        <div v-if="searchable && searchPlace === 'top'" class="tables-search-con">
            <Select v-model="searchKey" class="con-select">
                <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key"
                        :key="`tables-search-select-${item.key}`">
                    {{item.title}}
                </Option>
            </Select>
            <Input @on-change="handleClear" v-model="searchValue" clearable placeholder="输入关键字搜索..." class="con-input"/>
            <Button @click="handleSearch" class="search-btn" type="primary">
                <Icon type="search"/>
                <span>搜索</span>
            </Button>
        </div>
        <Table :data="insideTableData"
               :columns="insideColumns">

        </Table>

    </div>
</template>

<script>
    import PageOption from "iview/src/components/page/options";
    import handleBts from './handle-btns'

    export default {
        name: "Tables",
        components: {PageOption},
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            /**
             * @description 全局设置是否可编辑
             */
            editable: {
                type: Boolean,
                default: false
            },
            /**
             * @description 是否可搜索
             */
            searchable: {
                type: Boolean,
                default: false
            },
            /**
             * @description 搜索控件所在位置，'top' / 'bottom'
             */
            searchPlace: {
                type: String,
                default: 'top'
            }
        },
        data() {
            return {
                insideColumns: [],
                insideTableData: [],
                edittingCellId: '',
                edittingText: '',
                searchValue: '',
                searchKey: ''
            }
        },
        computed: {},
        methods: {
            suportEdit(item, index) {
                // item.render = (h, params)=>{
                //     return h()
                // }
                return item
            },
            surportHandle(item) {
                let options = item.options || []
                let insideBts = []
                options.forEach(item => {
                    if (handleBts[item]) insideBts.push(handleBts[item])

                })
                let bts = item.button ? [].concat(insideBts, item.button) : insideBts
                item.render = (h, params) => {
                    params.tableData = this.value
                    return h('div', bts.map(item => item(h, params, this)))
                }
                return item
            },
            handleClear(e) {
                if (e.target.value === '') this.insideTableData = this.value;
            },
            handleSearch() {
                this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
            },
            handleColumns(columns) {
                this.insideColumns = columns.map((item, index) => {
                    let res = item
                    if (res.editable) res = this.suportEdit(res, index)
                    if (res.key === 'handle') res = this.surportHandle(res)
                    return res
                })
                this.vLog('insideColumns', this.insideColumns)
            },
            handleTableData() {
                this.insideTableData = this.value.map((item, index) => {
                    let res = item
                    res.initRowIndex = index
                    return res
                })
            },
            setDefaultSearchKey () {
                this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
            },
        },
        watch: {
            columns(columns) {
                this.handleColumns(columns)
                this.setDefaultSearchKey()
            },
            value() {
                this.handleTableData()
                if (this.searchable) this.handleSearch()
            }
        },
        mounted() {
            this.handleColumns(this.columns)
            this.setDefaultSearchKey()
            this.handleTableData()
        }
    }
</script>

<style scoped lang="less">
    .tables-search-con {
        padding-bottom: 10px;
        .con-select {
            display: inline-block;
            width: 200px;
            margin-right: 5px;
        }
        .con-input {
            display: inline-block;
            width: 200px;
            margin-right: 5px;
        }
    }

</style>