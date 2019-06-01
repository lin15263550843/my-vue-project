<!--Created by dhc on 2019/6/1 15:45-->
<template>
    <div class="tables-edit-outer">
        <div v-if="!isEditting" class="tables-edit-con">
            <span class="value-con">{{ value }}</span>
            <Button v-if="editable" @click="startEdit" type="text" class="tables-edit-btn">
                <Icon type="md-create"></Icon>
            </Button>
        </div>

        <div v-else >
            <Input :value="value" @input="handleInput" class="tables-editting-input"/>
            <Button @click="saveEdit"  type="text"><Icon type="md-checkmark"></Icon></Button>
            <Button @click="canceltEdit" type="text"><Icon type="md-close"></Icon></Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Edit",
        components: {},
        props: {
            value: [String, Number],
            edittingCellId: String,
            params: Object,
            editable: Boolean
        },
        data() {
            return {}
        },
        computed: {
            isEditting() {
                return this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}`
            }
        },
        methods: {
            handleInput(val) {
                this.$emit('input', val)
            },
            startEdit() {
                this.$emit('on-start-edit', this.params)
            },
            saveEdit() {
                this.$emit('on-save-edit', this.params)
            },
            canceltEdit() {
                this.$emit('on-cancel-edit', this.params)
            }
        },
        watch: {},
        mounted() {
        }
    }
</script>

<style scoped lang="less">
    .tables-edit-outer {
        .tables-edit-con {
            position: relative;
            .value-con {
                vertical-align: middle;
            }
            .tables-edit-btn {
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border-radius: 100%;
                padding: 0 15px;
                position: absolute;
                right: 10px;
                top: 0;
                display: none;
            }
            &:hover {
                .tables-edit-btn {
                    display: inline-block;
                }
            }
        }
        .tables-editting-input{
            width: ~"calc(100% - 100px)";
        }
    }
</style>