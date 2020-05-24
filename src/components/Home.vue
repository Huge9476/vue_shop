<template>
  <el-container class="home">
    <el-header>
      <!-- 头部区域-->
      <div>
        <img src="../assets/logo.png" style="width:50px; height:50px;">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="text" @click="logOut" class="el-icon-user-solid" style="font-size: 18px">当前用户：{{username}}</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏-->
      <el-aside width="300px">
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409bff" :unique-opened="true" :router="true" :default-active="$route.path">
          <!-- 一级菜单区域-->
          <el-submenu :index="item.parentId + ''" v-for="item in menuList" :key="item.parentId">
            <!-- 一级菜单的模板区域-->
            <template slot="title">
              <!-- 图标-->
              <i class="el-icon-location"></i>
              <!-- 描述-->
              <span>{{item.parentName}}</span>
            </template>
            <!-- 二级菜单-->
            <el-menu-item :index="subItem.childPath" v-for="subItem in item.children" :key="subItem.childId">
              <!-- 二级菜单的模板区域-->
              <template slot="title">
                <!-- 图标-->
                <i class="el-icon-menu"></i>
                <!-- 描述-->
                <span>{{subItem.childName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单列表
      menuList: [],
      username: window.sessionStorage.getItem('username')
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    // 注销事件
    logOut () {
      this.$confirm('是否退出当前用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空sessionStorage中的token值
        window.sessionStorage.clear()
        // 重定向到login页面
        this.$router.push('login')
      }).catch(() => {

      });
    },
    // 获取左侧栏列表
    async getMenuList () {
      // 调用/getMenuList，获取菜单列表
      const { data: res } = await this.$http.post('/getMenuList', {})
      console.log(res)
      if (!res.success) return this.$message.error(res.resMsg)
      this.menuList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
  }
  .el-header {
    height: 100px;
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: white;
    font-size: 20px;
    line-height: 1.7;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
</style>
