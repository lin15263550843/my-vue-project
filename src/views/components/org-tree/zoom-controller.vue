<!--Created by dhc on 2019/5/17 09:14-->
<template>
    <div class="zoom-wrapper">
        <button class="zoom-button" @click="scale('minus')">
            <Icon type="md-remove" :size="16" color="#fff"/>
        </button>
        <span class="zoom-number">{{value}}%</span>
        <button class="zoom-button" @click="scale('add')">
            <Icon type="md-add" :size="16" color="#fff"/>
        </button>
    </div>
</template>

<script>
    export default {
        name: "ZoomController",
        props: {
            value: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 10
            },
            min: {
                type: Number,
                default: 10
            },
            max: {
                type: Number,
                default: 500
            }
        },
        components: {},
        data() {
            return {}
        },
        computed: {},
        methods: {
            scale(type) {
                this.vLog(this.value)
                const zoom = this.value + ('add' == type ? this.step : -this.step)
                if (('add' == type && zoom > this.max) || ('minus' == type && zoom < this.min)) {
                    return
                }
                this.$emit('input', zoom)
            }
        },
        watch: {},
        mounted() {
        }
    }
</script>

<style lang="less">
    .trans(@duration) {
        transition: ~"all @{duration} ease-in";
    }

    .zoom-wrapper {
        .zoom-button {
            width: 25px;
            height: 25px;
            border-radius: 100%;
            background: rgba(157, 162, 172, 1);
            border: none;
            box-shadow: 0px 0px 5px 1px rgba(218, 220, 223, 0.7);
            cursor: pointer;
            outline: none;
            &:active {
                box-shadow: 0px 0px 5px 5px rgba(218, 220, 223, 0.5) inset;
            }
            .trans(0.1s);
            &:hover {
                background-color: #1890ff;
            }
        }
        .zoom-number {
            font-size: 16px;
            font-weight: bold;
            margin: 0 10px;
            border-bottom: 1px solid #c3c3c3;
            color: #777;
        }
    }

</style>