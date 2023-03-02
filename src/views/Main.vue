<template>
  <el-container>
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container>
      <el-header><CommonHeader></CommonHeader></el-header>
      <CommonTag></CommonTag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonTag from "../components/CommonTag.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
};
</script>

<style scoped>
.el-header {
  padding: 0px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-main {
  padding-top: 10px;
  padding-bottom: 0px;
}
</style>