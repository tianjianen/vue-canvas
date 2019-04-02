<template>
  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-edit"></i>
      <span slot="title">{{title}}</span>
    </template>
    <el-menu-item-group>
      <div class="linesize">
        <el-slider
          v-model="LineSize"
          :min="min"
          :max="max"
          :debounce="debounce"
          @change="changevalue"
        ></el-slider>
      </div>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
export default {
  props: {
    title: {
      default: "线条粗细",
      type: String
    },
    linevalue: {
      default: 4,
      type: Number
    },
    min: {
      default: 1,
      type: Number
    },
    max: {
      default: 50,
      type: Number
    },
    debounce: {
      default: 300,
      type: Number
    }
  },
  data() {
    return {
      LineSize: this.linevalue
    };
  },
  methods: {
    changevalue(val) {
      this.$emit("changeValue", val);
    }
  }
};
</script>

<style scoped>
</style>