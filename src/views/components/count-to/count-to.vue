<template>
    <div class="count-to-con">
        <Row type="flex" justify="center" align="middle" :gutter="20" class="count-to-row">
            <i-col span="6" class="row-col">
                <div class="col-title">
                    <span>count-to组件基础用法</span>
                </div>
                <div class="col-con">
                    <count-to :end="2534"/>
                </div>
            </i-col>
            <i-col span="6" class="row-col">
                <div class="col-title">
                    <span>可添加左右文字</span>
                </div>
                <div class="col-con">
                    <count-to :end="2534">
                        <span slot="left">默认：</span>
                        <span slot="right"> kg</span>
                    </count-to>
                </div>
            </i-col>
            <i-col span="6" class="row-col">
                <div class="col-title">
                    <span>自定义样式</span>
                </div>
                <div class="col-con">
                    <count-to :end="2534" count-class="count-text" unit-class="unit-class">
                        <span slot="left">默认：</span>
                        <span slot="right"> kg</span>
                    </count-to>
                </div>
            </i-col>
            <i-col span="6" class="row-col">
                <div class="col-title">
                    <span>设置数据格式</span>
                </div>
                <div class="col-con">
                    <count-to :end="2534" :decimals="2">
                        <span slot="left">默认：</span>
                        <span slot="right"> km/h</span>
                    </count-to>
                </div>
            </i-col>
        </Row>
        <Row :gutter="20" type="flex" align="middle" class="count-to-row row-margin-top">
            <i-col span="6" class="row-col">
                <div class="col-title">
                    <span>转换单位简化数据</span>
                </div>
                <div class="col-con">
                    <count-to :end="2534" :simplify="true" count-class="count-text" unit-class="unit-class">
                        <span slot="left">默认：</span>
                        <span slot="right"> kg</span>
                    </count-to>
                </div>
            </i-col>
            <i-col span="6" class="row-col">
                <div class="col-title">
                    <span>自定义单位</span>
                </div>
                <div class="col-con">
                    <count-to :end="25346" :simplify="true" :unit="unit" count-class="count-text"
                              unit-class="unit-class">
                        <span slot="left">原始数据：25346&nbsp;=>&nbsp;</span>
                    </count-to>
                </div>
            </i-col>
            <i-col span="6" class="row-col">
                <div class="col-title">
                    <span>可异步更新数据</span>
                </div>
                <div class="col-con">
                    <count-to :end="asynEndVal" :simplify="true" count-class="count-text" unit-class="unit-class">
                        <span slot="left">默认：</span>
                        <span slot="right"> kg</span>
                    </count-to>
                </div>
            </i-col>
            <i-col span="6" class="row-col">
                <div class="col-title">
                    <span>综合实例</span>
                </div>
                <div class="col-con">
                    <count-to :delay="500" :end="integratedEndVal" :simplify="true" :unit="unit2"
                              count-class="count-text" unit-class="unit-class">
                        <span slot="left">原始数据：{{integratedEndVal}}&nbsp;=>&nbsp;</span>
                        <span slot="right"> kg</span>
                    </count-to>
                </div>
            </i-col>
        </Row>
        <Row :gutter="20" type="flex" align="middle" class="count-to-row row-margin-top">
            <i-col span="24" class="row-col">
                <div class="col-title">
                    <span>自定义单位</span>
                </div>
                <div class="col-con">
                    <count-to :end="534" :simplify="true" :unit="unit2" count-class="count-text"
                              unit-class="unit-class">
                        <span slot="left">原始数据：254&nbsp;=>&nbsp;</span>
                    </count-to>
                    <count-to :end="2534" :simplify="true" :unit="unit2" count-class="count-text" class="row-margin-top"
                              unit-class="unit-class">
                        <span slot="left">原始数据：2534&nbsp;=>&nbsp;</span>
                    </count-to>
                    <count-to :end="25346" :simplify="true" :unit="unit2" count-class="count-text" class="row-margin-top"
                              unit-class="unit-class">
                        <span slot="left">原始数据：25346&nbsp;=>&nbsp;</span>
                    </count-to>
                    <count-to :end="253426" :simplify="true" :unit="unit2" count-class="count-text" class="row-margin-top"
                              unit-class="unit-class">
                        <span slot="left">原始数据：253426&nbsp;=>&nbsp;</span>
                    </count-to>
                    <count-to :end="2534256" :simplify="true" :unit="unit2" count-class="count-text" class="row-margin-top"
                              unit-class="unit-class">
                        <span slot="left">原始数据：2534256&nbsp;=>&nbsp;</span>
                    </count-to>
                    <count-to :end="23453467" :simplify="true" :unit="unit2" count-class="count-text"
                              class="row-margin-top" unit-class="unit-class">
                        <span slot="left">原始数据：23453467&nbsp;=>&nbsp;</span>
                    </count-to>
                    <count-to :end="234534678" :simplify="true" :unit="unit2" count-class="count-text"
                              class="row-margin-top" unit-class="unit-class">
                        <span slot="left">原始数据：234534678&nbsp;=>&nbsp;</span>
                    </count-to>
                </div>
            </i-col>

        </Row>
    </div>
</template>

<script>
    import CountTo from '../../../components/count-to/count-to.vue'

    export default {
        name: "count_to_page",
        components: {
            CountTo
        },
        data() {
            return {
                end: 0,
                unit: [[3, '千多'], [4, '万多'], [5, '十万多']],
                unit2: [[1, '十多'], [2, '百多'], [3, '千多'], [4, '万多'], [5, '十万多'], [6, '百万多'], [7, '千万多'], [8, '亿多']],
                asynEndVal: 100,
                integratedEndVal: 0
            }
        },
        methods: {
            init() {
                setInterval(() => {
                    this.asynEndVal += parseInt(Math.random() * 100)
                    this.integratedEndVal += parseInt(Math.random() * 1000)
                }, 1000)
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang="less">

    @baseColor: ~"fuchsia";

    .count-to-con {
        padding: 15px;
        border-radius: 5px;
        background-color: white;
        font-size: 16px;
        .row-margin-top {
            margin-top: 10px;
        }
        .count-to-row {
            vertical-align: middle;
            text-align: center;
            .row-col {
                .col-title {
                    font-weight: 500;
                    padding: 10px;
                    background-color: aqua;
                }
                .col-con {
                    padding: 10px;
                    background-color: antiquewhite;
                }
                .height-50 {
                    height: 45px;
                }
                .height-100 {
                    height: 110px;
                }
            }
        }
    }

    .count-text {
        font-size: 16px;
        color: @baseColor;
    }

    .unit-class {
        font-size: 14px;
        color: @baseColor;
    }
</style>