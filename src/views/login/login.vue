<template>
    <div class="login">
        <div class="login-con">
            <Card shadow :bordered="false" title="欢迎登录">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" @keydown.enter.native="handleSubmit()">
                    <Form-item prop="user">
                        <i-input type="text" v-model="formInline.user" placeholder="请输入用户名">
                            <Icon :size="16" type="ios-person" slot="prepend"></Icon>
                        </i-input>
                    </Form-item>
                    <Form-item prop="password">
                        <i-input type="password" v-model="formInline.password" placeholder="请输入密码">
                            <Icon size="14" type="md-lock" slot="prepend"></Icon>
                        </i-input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit" long>登录</Button>
                    </Form-item>
                </Form>
                <p class="login-tip">输入任意用户名和密码即可</p>
            </Card>
        </div>
    </div>
</template>

<script>
    import {setToken} from '../../libs/util'

    export default {
        name: "login",
        data() {
            return {
                formInline: {
                    user: 'super_admin',
                    password: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur'},
                        {validator: this.isPassword, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$refs.formInline.validate((valid) => {
                    if (valid) {
                        // this.$Message.success('提交成功!');
                        // this.$emit('on-success-valid', {
                        //     userName: this.formInline.user,
                        //     password: this.formInline.password
                        // })
                        setToken(this.$config.passwordName, this.formInline.password)
                        this.$router.push({
                            name: this.$config.homeName
                        })

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            isPassword(rule, value, callback) {

                // if (pattern.test(value)) {
                // var pattern = /^1[34578]\d{9}$/
                var pattern = true;
                if (pattern) {
                    return callback()
                }
                return callback(new Error('您不能输入密码'))
            }
        }
    }
</script>

<style scoped lang="less">

</style>
<style lang="less">
    @import './login.less';
</style>