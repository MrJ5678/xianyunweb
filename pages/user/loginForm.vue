<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"> </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password">
      </el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "", // 登录用户名/手机
        password: "" // 登录密码
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      // 验证表单
      this.$refs["form"].validate(valid => {
        // 为true表示没有错误
        if (valid) {
          this.$store.dispatch("user/login", this.form)
            .then(res => {
              console.log(res)
              this.$message({ type: "success", message: "登录成功！" })
              this.$router.push('/')
            })
            // catch到的内容 放到 plugin/axios.js 中 全局处理错误
            // .catch(err => {
            //   // console.dir(err);
            //   this.$message({
            //     type: "warning",
            //     message: err.response.data.message 
            //   });
            // });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.form {
  width: 400px;
  height: 232px;
  padding: 25px;
  box-sizing: border-box;

  .form-text {
    width: 100%;
    height: 12px;
    color: rgb(99, 143, 176);
    font-size: 12px;
    line-height: 1;
    text-align: right;
  }

  .submit {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    padding: 12px 20px;
  }
}
</style>
