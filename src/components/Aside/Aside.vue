<template>
  <div>
    <div class="color">
      <sketch-picker
        @input="updateValue"
        :value="colors"
        :presetColors="[ 
			'#f00', '#00ff00', '#00ff0055', 'rgb(201, 76, 76)', 'rgba(0,0,255,1)', 'hsl(89, 43%, 51%)', 'hsla(89, 43%, 51%, 0.6)'
		]"
      ></sketch-picker>
    </div>
    <div class="linesize">
      <el-slider v-model="linevalue" :min="1" :max="50" :debounce="500" @change="changelinevalue"></el-slider>
    </div>
    <div class="linecap">
      <el-button type="primary" @click="changelineCap('butt')" icon="el-icon-edit" circle></el-button>
      <el-button type="success" @click="changelineCap('round')" icon="el-icon-edit-outline" circle></el-button>
    </div>
    <div class="copyright">
      <el-input
        placeholder="请输入作者"
        suffix-icon="el-icon-tickets"
        @change="changeText"
        v-model="copyval"
      ></el-input>
    </div>
    <div>
      <el-button type="success" @click="saveCanvas()">保存图像</el-button>
      <el-button type="danger" @click="clearCanvas()">清除图像</el-button>
      <div id="savedCopyContainer">
        <img id="savedImageCopy">
        <br>使用右键保存图像 ...
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>