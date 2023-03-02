<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu "
        size="mini"
        @click="collapseMenu"
        style="margin-right: 20px"
      ></el-button>
      <!-- 面包屑区域  -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabsList"
          :key="item.name"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/image/user.png" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Header",
  methods: {
    ...mapMutations("tab", ["collapseMenu"]),
    logout() {
      //清除cookie中的token
      Cookie.remove("token");
      //跳转登录页
      this.$router.push({ name: "login" });
    },
  },
  computed: {
    ...mapState("tab", ["tabsList"]),
  },
  mounted() {
    console.log(this.tabsList);
  },
};
</script>

<style lang='less' scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
.text {
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
}
.r-content .user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.l-content {
  display: flex;
  align-items: center;
}
/deep/.el-breadcrumb__item {
  .el-breadcrumb__inner {
    font-weight: normal;
    &.is-link {
      color: #666;
    }
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #fff;
    }
  }
}
</style>