<template>
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span slot="title">{{title}}</span>
    </template>
    <el-menu-item-group>
      <div class="color">
        <sketch-picker
          @input="update"
          :value="colors"
          :presetColors="[ 
			'#f00', '#00ff00', '#00ff0055', 'rgb(201, 76, 76)', 'rgba(0,0,255,1)', 'hsl(89, 43%, 51%)', 'hsla(89, 43%, 51%, 0.6)'
		]"
        ></sketch-picker>
      </div>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
import { Sketch } from "vue-color";
export default {
  props: {
		colors:{
			default: {},
			type: Object
		},
		title:{
			default:'线条颜色',
			type: String
		}
	},
  components: {
    "sketch-picker": Sketch
  },
  data() {
    return {};
  },
  methods: {
    update(val) {
      this.$emit("updateValue", val);
    }
  }
};
</script>

<style scoped>
</style>