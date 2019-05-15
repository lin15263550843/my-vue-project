<template>
    <Card>
        <div class="drag-box-card">
            <drag-list :list1.sync="list1" :list2.sync="list2" :dropConClass="dropConClass" @on-change="handleChange">
                <h3 slot="left-title">待办事项</h3>
                <Card class="drag-item" slot="left" slot-scope="left">{{left.itemLeft.name}}</Card>
                <h3 slot="right-title">完成事项</h3>
                <Card class="drag-item" slot="right" slot-scope="right">{{right.itemRight.name}}</Card>
            </drag-list>
        </div>
        <Row :gutter="10" class="handle-log-box">
            <i-col span="4" class="handle-log-con">
                <h3>操作记录</h3>
                <Card v-if="handleList.length>0" class="log-c0n">
                    <p v-for="(item,index) in handleList" :key="`handle_item_${index}`">
                        <span>{{item}}</span>
                    </p>
                </Card>
                <Card v-else style="padding: 10px">
                    <span>🈚</span>
                </Card>
            </i-col>
            <i-col span="10" class="handle-log-con">
                <h3>list1</h3>
                <Card>
                    <pre class="list1-con">{{list1}}</pre>
                </Card>
            </i-col>
            <i-col span="10" class="handle-log-con">
                <h3>list2</h3>
                <Card>
                    <pre class="list2-con">{{list2}}</pre>
                </Card>
            </i-col>
        </Row>
    </Card>
</template>

<script>
    import DragList from "../../../components/drag-list/drag-list";

    export default {
        name: "drag_list_page",
        components: {DragList},
        data() {
            return {
                list1: [
                    {
                        "name": "率代经务好住情准布斯听间。",
                        "id": 10
                    },
                    {
                        "name": "率代经务好住情准布斯听间。",
                        "id": 10
                    },
                    {
                        "name": "第深来必安只化照规我越以七。",
                        "id": 20
                    },
                    {
                        "name": "为心何众史连学强平热成。",
                        "id": 30
                    },
                    {
                        "name": "种产心代县强查能海后且产。",
                        "id": 40
                    },
                    {
                        "name": "改划派百同个关米类者活全。",
                        "id": 50
                    },
                    {
                        "name": "改划派百同个关米类者活全。",
                        "id": 50
                    },
                    {
                        "name": "改划派百同个关米类者活全。",
                        "id": 50
                    },
                    {
                        "name": "改划派百同个关米类者活全。",
                        "id": 50
                    }
                ],
                list2: [{
                    "name": "烤麸偶的司法讲道理数据结构。",
                    "id": 60
                }],
                dropConClass: {
                    left: ['drop-box', 'left-drop-box'],
                    right: ['drop-box', 'right-drop-box']
                },
                handleList: []
            }
        },
        methods: {
            handleChange({src, target, oldIndex, newIndex}) {
                this.vLog('handleChange', `${src}=>${target},${oldIndex}=>${newIndex}`)
                this.handleList.push(`${src}=>${target} | ${oldIndex}=>${newIndex}`)
            }
        }
    }
</script>

<style lang="less">

    @hl: ~'handle-log';

    .drag-box-card {
        height: 500px;
        .drag-item {
            margin: 10px;
        }
        h3 {
            padding: 10px 15px;
        }
        .drop-box {
            overflow: hidden;
            overflow-y: scroll;
            border: 1px solid #eeeeee;
            height: 455px;
            border-radius: 5px;
        }
        .left-drop-box {
            margin-right: 10px;
        }
        .right-drop-box {
            //
        }
    }

    .@{hl}-box {
        /*margin-top: 10px;*/
        .@{hl}-con {
            /*width: 165px;*/

            overflow: hidden;
            h3 {
                padding: 10px 15px;
            }
            .ivu-card-body {
                padding: 0 10px;
                p {
                    padding: 10px 0;
                    border-radius: 5px;
                    border-bottom: dashed #eee 1px;
                }
            }
        }
        .log-c0n{
            height: 300px;
            overflow-y: scroll;
        }
        .list1-con{
            height: 300px;
            overflow-y: scroll;
        }
        .list2-con{
            height: 300px;
            overflow-y: scroll;
        }
    }
</style>