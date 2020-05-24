<template>
  <div>
    <!-- 地址导航栏-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>账号列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 数据区-->
    <el-card>
      <!-- 添加栏-->
      <el-row :gutter="20">
        <el-col :span="6" :offset="8">
            <el-input placeholder="请输入内容" v-model="param.condition" class="input-with-select" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
        </el-col>
        <el-col :span="6">
            <el-button type="primary" @click="add">添  加</el-button>
        </el-col>
      </el-row>

      <!-- 列表展示栏-->
      <el-table :data="userList.users" border stripe>
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
        <el-table-column label="激活状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="param.pageNo"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="param.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.total"
      style="margin-top: 20px"
      align="center">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userList: {
        total: 0,
        pageNo: 1,
        pageSize: 10,
        users: []
      },
      param: {
        condition: '',
        pageNo: 1,
        pageSize: 10
      }
    }
  },

  created () {
    this.getUserList()
  },

  methods: {
    // 获取用户列表
    async getUserList () {
      const { data: res } = await this.$http.post('/getUserList', this.param)
      console.log(res)
      this.userList = res.data
    },
    // 添加用户
    add () {

    },
    // 处理用户信息编辑
    handleEdit (index, row) {

    },
    // 处理用户信息删除
    handleDelete (index, row) {

    },
    // 监听页面size切换
    handleSizeChange (newSize) {
      this.param.pageSize = newSize
      this.getUserList()
    },
    // 监听页面pageNo切换
    handleCurrentChange (newPage) {
      this.param.pageNo = newPage
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
