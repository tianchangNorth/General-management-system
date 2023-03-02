<template>
  <div class="tag-group">
    <el-tag
      v-for="item in tabsList"
      :key="item.label"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      :closable="item.name !== 'home'"
      @close="CloseTag(item)"
      style="margin-left: 10px"
      size="mini"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {
      items: [
        { type: "", label: "标签一" },
        { type: "success", label: "标签二" },
        { type: "info", label: "标签三" },
        { type: "danger", label: "标签四" },
        { type: "warning", label: "标签五" },
      ],
    };
  },
  methods: {
    CloseTag(item) {
      this.$store.commit("tab/CloseTag", item);
      this.$router.back();
    },
  },
  computed: {
    ...mapState("tab", ["tabsList"]),
  },
};
</script>

<style>
</style>