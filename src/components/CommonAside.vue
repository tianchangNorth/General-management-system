<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "通用管理系统" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="showPage(item)"
    >
      <i :class="`el-icon-${item.icon}`" i></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
        <el-menu-item :index="subItem.name" @click="showPage(subItem)">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "CommonAside",
  data() {
    return {
      // isCollapse: false,
      menuData: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //   console.log(key, keyPath);
    },
    showPage(item) {
      this.$router.push(item.path, () => {});
      this.$store.commit("tab/selectMenu", item);
    },
  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    ...mapState("tab", ["isCollapse"]),
  },
};
</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: 0;
  height: 100vh;
  overflow-x: hidden;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>