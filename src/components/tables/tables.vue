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
        <Table :stripe="stripe"
               :data="insideTableData"
               :columns="insideColumns"
               :border="border"
               :show-header="showHeader"
               :width="width"
               :height="height"
               :loading="loading"
               :disabled-hover="disabledHover"
               :highlight-row="highlightRow"
               :row-class-name="rowClassName"
               :size="size"
               :no-data-text="noDataText"
               :no-filtered-data-text="noFilteredDataText"
               @on-current-change="onCurrentChange"
               @on-select="onSelect"
               @on-select-cancel="onSelectCancel"
               @on-select-all="onSelectAll"
               @on-selection-change="onSelectionChange"
               @on-sort-change="onSortChange"
               @on-filter-change="onFilterChange"
               @on-row-click="onRowClick"
               @on-row-dblclick="onRowDblclick"
               @on-expand="onExpand"
               ref="tablesMainddd">
            <slot name="header" slot="header"></slot>
            <slot name="footer" slot="footer"></slot>
            <slot name="loading" slot="loading"></slot>
        </Table>

    </div>
</template>

<script>
    import PageOption from "iview/src/components/page/options";
    import handleBts from './handle-btns'
    import TablesEdit from './edit.vue'

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
            },
            /**
             * @description 是否显示斑马线
             */
            stripe: {
                type: Boolean,
                default: false
            },
            size: String,
            width: {
                type: [Number, String]
            },
            height: {
                type: [Number, String]
            },
            border: {
                type: Boolean,
                default: false
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            highlightRow: {
                type: Boolean,
                default: false
            },
            rowClassName: {
                type: Function,
                default() {
                    return ''
                }
            },
            context: {
                type: Object
            },
            noDataText: {
                type: String
            },
            noFilteredDataText: {
                type: String
            },
            disabledHover: {
                type: Boolean
            },
            loading: {
                type: Boolean,
                default: false
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
        /**
         * Events
         * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
         * @on-cancel-edit 返回值 {Object} 同上
         * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
         */
        methods: {
            suportEdit(item) {
                item.render = (h, params) => {
                    return h(TablesEdit, {
                        props: {
                            value: this.insideTableData[params.index][params.column.key],
                            edittingCellId: this.edittingCellId,
                            params: params,
                            editable: this.editable
                        },
                        on: {
                            'input': val => {
                                this.edittingText = val
                            },
                            'on-start-edit': (params) => {
                                this.edittingCellId = `editting-${params.index}-${params.column.key}`
                                this.vLog('edittingCellId', this.edittingCellId)
                                this.edittingText = ''
                                // this.$emit('on-start-edit', params)
                            },
                            'on-cancel-edit': (params) => {
                                this.edittingCellId = ''
                                this.$emit('on-cancel-edit', params)
                            },
                            'on-save-edit': (params) => {
                                this.vLog('params', params)
                                if (this.edittingText) {
                                    this.value[params.row.initRowIndex][params.column.key] = this.edittingText
                                }
                                // this.$emit('input', this.value)
                                // this.$emit('on-save-edit', Object.assign(params, { value: this.edittingText }))
                                this.edittingCellId = ''
                            }
                        }
                    })
                }
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
            setDefaultSearchKey() {
                this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
            },
            onCurrentChange(currentRow, oldCurrentRow) {
                this.$emit('on-current-change', currentRow, oldCurrentRow)
            },
            onSelect(selection, row) {
                this.$emit('on-select', selection, row)
            },
            onSelectCancel(selection, row) {
                this.$emit('on-select-cancel', selection, row)
            },
            onSelectAll(selection) {
                this.$emit('on-select-all', selection)
            },
            onSelectionChange(selection) {
                this.$emit('on-selection-change', selection)
            },
            onSortChange(column, key, order) {
                this.$emit('on-sort-change', column, key, order)
            },
            onFilterChange(row) {
                this.$emit('on-filter-change', row)
            },
            onRowClick(row, index) {
                this.$emit('on-row-click', row, index)
            },
            onRowDblclick(row, index) {
                this.$emit('on-row-dblclick', row, index)
            },
            onExpand(row, status) {
                this.$emit('on-expand', row, status)
            },
            exportCsv(params) {
                this.vLog(0)
                this.$refs.tablesMainddd.exportCsv(params)
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