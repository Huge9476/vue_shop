<template>
  <div>
    <el-button type="primary" round @click="logOut">退  出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logOut () {
      // 清空sessionStorage中的token值
      window.sessionStorage.clear()
      // 重定向到login页面
      this.$router.push('login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
