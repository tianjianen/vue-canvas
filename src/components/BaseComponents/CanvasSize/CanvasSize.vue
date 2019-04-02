<template>
  <el-submenu index="5">
    <template slot="title">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">{{title}}</span>
    </template>
    <el-menu-item-group>
      <div class="canvassize">
        <div class="Cwidth">
          <el-button>宽度</el-button>
          <el-input-number v-model="CanvasWdith" :min="min" :step="step" @change="changeWdith"></el-input-number>
        </div>
        <div class="Cheight">
          <el-button>高度</el-button>
          <el-input-number v-model="CanvasHeight" :min="min" :step="step" @change="changeHeight"></el-input-number>
        </div>
      </div>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
export default {
	props:{
		title:{
			default:'画布大小',
			type: String
		},
		min:{
			default:500,
			type: Number
		},
		step:{
			default: 20,
			type: Number
		},
		canvasheight:{
			default: 500,
			// type: Number
		},
		canvaswidth:{
			default: 600,
			// type: Number
		}
	},
	data() {
		return {
			CanvasWdith: this.canvaswidth,
			CanvasHeight: this.canvasheight
		}
	},
	methods:{
		changeWdith(val) {
			this.$emit('changeWsize', val);
		},
		changeHeight(val) {
			this.$emit('changeHsize', val);
		}
	}
};
</script>

<style scoped>
</style>