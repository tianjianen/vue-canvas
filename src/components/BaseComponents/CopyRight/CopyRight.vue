<template>
  <el-submenu index="4">
    <template slot="title">
      <i class="el-icon-view"></i>
      <span slot="title">{{title}}</span>
    </template>
    <el-menu-item-group>
      <div class="copyright">
        <el-input
          placeholder="请输入作者"
          suffix-icon="el-icon-tickets"
          @change="updateText"
          v-model="text"
        ></el-input>
        <slider-picker :value="colors" @input="updateColors"/>
      </div>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
import { Slider } from "vue-color";
export default {
  props: {
    title: {
      default: "添加水印",
      type: String
    },
    copyval: {
      default: "",
      type: String
    },
    copyrightcolors: {
      default: () => {},
      type: Object
    }
  },
  components: {
    "slider-picker": Slider
  },
  data() {
    return {
      text: this.copyval,
      colors: this.copyrightcolors
    };
  },
  methods: {
    updateText(val) {
      this.$emit("changeText", val);
    },
    updateColors(val) {
      this.$emit("updateCopyRight", val);
    }
  }
};
</script>

<style scoped>
</style>