<template>
  <el-submenu index="7">
    <template slot="title">
      <i class="el-icon-picture-outline"></i>
      <span slot="title">图片保存</span>
    </template>
    <el-menu-item-group>
      <div class="picture">
        <el-button type="success" @click="CanvasSave()">保存图像</el-button>
        <el-button type="danger" @click="CanvasClean()">清除图像</el-button>
        <div id="savedCopyContainer">
          <img id="savedImageCopy">
          <br>使用右键保存图像 ...
        </div>
      </div>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
export default {
	props:{
		title:{
			default:'保存图片',
			type: String
		}
	},
	methods:{
		CanvasSave() {
			this.$emit('saveCanvas');
		},
		CanvasClean() {
			this.$emit('clearCanvas');
		}
	}
};
</script>

<style scoped>
</style>