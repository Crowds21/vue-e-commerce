<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像-->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!--表单登录-->
            <!--ref相当于返回DOM 对象,即将这个元素看作一个对象，获取这个对象-->
            <!--DOM 文档对象模型-->
            <el-form ref="loginFormRef"
                     :model="loginForm"
                     :rules="loginFormRules"
                     label-width="0px"
                     class="login_form">
                <!-- 账号-->
                <el-form-item prop="username">
                    <!--prefix-icon前置图标-->
                    <el-input v-model="loginForm.username"
                              prefix-icon="el-icon-user">
                    </el-input>
                </el-form-item>
                <!-- 密码-->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"
                              prefix-icon="el-icon-key"
                              type="password">
                    </el-input>
                </el-form-item>
                <!--按钮-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                //绑定的数据对象
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                //表单验证规则对象
                loginFormRules: {
                    //验证用户名
                    username: [
                        //trigger 触发规则
                        {required: true, message: '请输入用户名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    //验证密码
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            //重置
            resetLoginForm() {
                // console.log(this);
                this.$refs.loginFormRef.resetFields();
            },
            //登录验证
            login() {
                //valid为布尔值，为验证结果
                //如没有入账号密码，则valid为false
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) {
                        console.log("valid错误");
                        return;
                    }
                    //获取服务器返回信息
                    //解构赋值，只保留返回的data属性，并重命名为res
                    const {data: res} = await this.$http.post('login', this.loginForm);
                    if (res.meta.status !== 200) {
                        console.log("登录失败");
                        return this.$message.error("账户或密码错误！")
                    }
                    this.$message.success("登陆成功！")
                    console.log(res);
                    //保存Token
                    window.sessionStorage.setItem('token',res.data.token);
                    //成功登录后跳转到/home
                    this.$router.push('/home');
                });
            }
        }
    }
</script>

<style lang="less" scoped>

    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        //设置居中
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar_box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #eee; //外框 向外扩散，宽度，颜色
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%); //百分比的对象是该盒子的高度
            background-color: #fff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }

    }

    .login_form {
        //底部对齐
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box; //默认为content
    }

    .btns {
        //将按钮设置在右侧
        display: flex;
        justify-content: flex-end;
    }


</style>
