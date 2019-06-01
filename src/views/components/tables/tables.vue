<!--Created by dhc on 2019/5/27 11:18-->
<template>
    <div>
        <Card>
            <tables ref="tables" searchable editable stripe search-place="top" v-model="tableData" :columns="columns"
                    @on-delete="handleDelete"/>
            <Button @click="exportExcel" type="primary" class="tables-bottom">导出为 CSV 文件</Button>
        </Card>
    </div>
</template>

<script>

    import Tables from '../../../components/tables'
    import {getTableData} from "../../../api/data";

    export default {
        name: "tables_page",
        components: {Tables},
        data() {
            return {
                columns: [
                    {title: '名称', key: 'name', sortable: true},
                    {title: '邮箱', key: 'email', editable: true},
                    {title: '创建时间', key: 'createTime'},
                    {
                        title: '操作',
                        key: 'handle',
                        options: ['delete', 'test'],
                        button: [
                            (h, params, vm) => {
                                return h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '你确定要删除吗?'
                                    },
                                    on: {
                                        'on-ok': () => {
                                            vm.$emit('on-delete', params)
                                            vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                                        }
                                    }
                                }, [
                                    h('Button', '自定义')
                                ])
                            }
                        ]
                    }
                ],
                tableData: []
            }
        },
        computed: {},
        methods: {
            handleDelete(params) {
                this.vLog('delete', params)
            },
            exportExcel() {
                this.$refs.tables.exportCsv({
                    filename: `多功能表格导出_${new Date().getTime()}.csv`
                })
            }
        },
        watch: {},
        mounted() {
            getTableData().then(res => {
                this.tableData = res.data
                // console.log('=======================>>>>>>>>>>>>..')
            })
        }
    }
</script>

<style scoped lang="less">
    .tables-bottom {
        margin-top: 10px;
    }
</style>