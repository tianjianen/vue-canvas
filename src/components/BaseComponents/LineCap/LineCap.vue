<template>
  <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">{{title}}</span>
    </template>
    <el-menu-item-group>
      <div class="linecap">
        <el-button type="primary" @click="changeLineCap('butt')" icon="el-icon-edit" circle></el-button>
        <el-button
          type="success"
          @click="changeLineCap('round')"
          icon="el-icon-edit-outline"
          circle
        ></el-button>
      </div>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
export default {
  props: {
    title: {
      default: "线条类型",
      type: String
    }
  },
  methods: {
    changeLineCap(val) {
      this.$emit("changelineCap", val);
    }
  }
};
</script>

<style scoped>
</style>