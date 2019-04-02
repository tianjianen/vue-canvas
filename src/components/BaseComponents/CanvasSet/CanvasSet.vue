<template>
  <el-submenu index="6">
    <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">{{title}}</span>
    </template>
    <el-menu-item-group>
      <div class="step">
        <el-button class="clearn" @click="ClearnCanvas"></el-button>
        <el-button class="canvasundo" @click="CanvasUndo"></el-button>
        <el-button class="canvasredo" @click="CanvasRedo"></el-button>
      </div>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
export default {
  props: {
    title: {
      default: "画图设置",
      type: String
    }
  },
  methods: {
    ClearnCanvas() {
      this.$emit("clearncanvas");
    },
    CanvasUndo() {
      this.$emit("canvasUndo");
    },
    CanvasRedo() {
      this.$emit("canvasRedo");
    }
  }
};
</script>

<style scoped>
</style>