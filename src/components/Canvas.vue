<template>
  <div class="main">
    <el-container>
      <el-header>
        <Header/>
      </el-header>

      <el-container>
        <el-aside style="width:auto; min-width:200px;">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="true">
              <span class="el-icon-arrow-left"></span>
            </el-radio-button>

            <el-radio-button :label="false">
              <span class="el-icon-arrow-right"></span>
            </el-radio-button>
          </el-radio-group>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
          <!-- 颜色设置 -->
          <Color @updateValue='updateValue' :colors="colors"/>
          <!-- 线条粗细 -->
          <LineSize @changeValue ='changelinevalue' :linevalue='linevalue'/>
          <!-- 线条类型 -->
          <LineCap  @changelineCap='changelineCap' />
          <!-- 画布大小 -->
          <CanvasSize @changeWsize='changeWsize' @changeHsize='changeHsize' :canvaswidth='canvaswidth' :canvasheight='canvasheight' />
          <!-- 画布设置 -->
          <CanvasSet @clearncanvas='clearncanvas' @canvasUndo='canvasUndo' @canvasRedo='canvasRedo' />
          <!-- 添加水印 -->
          <CopyRight :copyval='copyval' :copyrightcolors='copyrightcolors' @changeText='changeText' @updateCopyRight='updateCopyRight'/>
          <!-- 保存图片 -->
          <CanvasSave @saveCanvas="saveCanvas" @clearCanvas="clearCanvas"/>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
           <Content/>
          </el-main>
          <el-footer>
            <Footer/>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";
import Color from './BaseComponents/Color/Color';
import LineSize from './BaseComponents/LineSize/LineSize';
import LineCap from './BaseComponents/LineCap/LineCap';
import CanvasSize from './BaseComponents/CanvasSize/CanvasSize';
import CanvasSet from './BaseComponents/CanvasSet/CanvasSet';
import CopyRight from './BaseComponents/CopyRight/CopyRight';
import CanvasSave from './BaseComponents/CanvasSave/CanvasSave';

export default {
  components: {
    Header,
    Footer,
    Content,
    Color,
    LineSize,
    LineCap,
    CanvasSize,
    CanvasSet,
    CopyRight,
    CanvasSave
  },
  data() {
    return {
      isCollapse: true,
      copyrightcolors: {
        hex: "#194d33",
        hex8: "#194d33",
        hsl: {
          h: 150,
          s: 0.5,
          l: 0.2,
          a: 1
        },
        hsv: {
          h: 150,
          s: 0.66,
          v: 0.3,
          a: 1
        },
        rgba: {
          r: 25,
          g: 77,
          b: 51,
          a: 1
        },
        a: 1
      },
      colors: {
        hex: "#194d33",
        hex8: "#194d33",
        hsl: {
          h: 150,
          s: 0.5,
          l: 0.2,
          a: 1
        },
        hsv: {
          h: 150,
          s: 0.66,
          v: 0.3,
          a: 1
        },
        rgba: {
          r: 25,
          g: 77,
          b: 51,
          a: 1
        },
        a: 1
      },
      copyval: "",
      linevalue: 4,
      canvas: "",
      context: "",
      isDrawing: "", // 记录当前是否在画图
      previousColorElement: "", // 保存之前选择的颜色的画笔 <img> 元素标签
      previousThicknessElement: "", // 保存之前选择的粗细的画笔 <img> 元素标签
      canvaswidth: "500",
      canvasheight: "600",
      eraserEnabled: false, //橡皮
      canvasHistory: [], //保存画图历史路径
      step: 0 //上一步（撤销功能）
    };
  },
  computed: {
    currcolor() {
      return this.colors.hex8;
    }
  },
  methods: {
    // 撤销
    canvasUndo() {
      if (this.step >= 0) {
        this.step--;
        this.context.clearRect(0, 0, this.canvaswidth, this.canvasheight);
        let canvasPic = new Image();
        canvasPic.src = this.canvasHistory[this.step];
        canvasPic.addEventListener("load", () => {
          this.context.drawImage(canvasPic, 0, 0);
        });
      } else {
        console.log("不能再继续撤销了");
      }
    },
    // 反撤销方法
    canvasRedo() {
      if (this.step < this.canvasHistory.length) {
        this.step++;
        let canvasPic = new Image();
        canvasPic.src = this.canvasHistory[this.step];
        canvasPic.addEventListener("load", () => {
          this.context.clearRect(0, 0, this.canvaswidth, this.canvasheight);
          this.context.drawImage(canvasPic, 0, 0);
        });
      } else {
        console.log("已经是最新的记录了");
      }
    },
    clearncanvas() {
      this.eraserEnabled = true;
    },
    changeWsize(val) {
      // 把变化之前的画布内容copy一份，然后重新画到画布上
      let imgData = this.context.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      let pageWidth = document.documentElement.clientWidth;
      let pageHeight = document.documentElement.clientHeight;
      this.canvaswidth = val;
      console.log(pageWidth);
      this.canvas.width = val;
      this.canvas.height = val;
      this.context.putImageData(imgData, 0, 0);
    },
    changeHsize(val) {
      // 把变化之前的画布内容copy一份，然后重新画到画布上
      let imgData = this.context.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      let pageWidth = document.documentElement.clientWidth;
      let pageHeight = document.documentElement.clientHeight;
      this.canvasheight = val;
      console.log(pageWidth);
      this.canvas.width = val;
      this.canvas.height = val;
      this.context.putImageData(imgData, 0, 0);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    changeText(val) {
      console.log(val);
      this.drawText(200, 550, 0, 0, val + "@copy right");
    },
    copyStyle() {},
    drawText(tsx, tsy, x, y, txt) {
      console.log(this.copyrightcolors.hex8);
      console.log(this.context);
      var text = txt;
      this.context.save(); //保存原来的状态  绘制字体都是需要旋转倾斜  那么之前绘制的图片就要进行状态的保存
      // this.context.rotate(-Math.PI / 6); //绘制倾斜字体
      this.context.translate(tsx, tsy); //发生位移进行位移的恢复
      this.context.font = "24px serif";
      this.context.fillStyle = this.copyrightcolors.hex8;
      this.context.fillText(text, x, y);
      this.context.restore(); //状态的恢复
    },
    // 设置lineCap
    changelineCap(style) {
      console.log(style);
      this.context.lineCap = style;
    },
    // 更新线条的粗细
    changelinevalue(val) {
      // console.log(val)
      this.linevalue = val;
      this.changeThickness(this.linevalue);
    },
    updateCopyRight(val) {
      this.copyrightcolors = val;
      console.log(this.copyrightcolors);
    },
    // 更新颜色
    updateValue(val) {
      this.colors = val;
      console.log(val);

      this.changeColor(this.currcolor);
    },
    // 开始画图
    startDrawing(e) {
      console.log("strat drawing...");

      console.log(this.step);

      this.step++;

      if (this.step < this.canvasHistory.length) {
        this.canvasHistory.length = this.step;
      }
      // this.canvasHistory.push(imgData);

      this.isDrawing = true;
      // 创建一个新的绘图路径
      this.context.beginPath();

      // 把画笔移动到鼠标位置
      if (this.isDrawing === true && this.eraserEnabled === false) {
        console.log(this.currcolor);
        console.log("drawing");
        this.context.globalCompositeOperation = "source-over";
        this.context.strokeStyle = this.currcolor;
        this.context.lineWidth = this.linevalue;
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
        this.context.moveTo(
          e.pageX - this.canvas.offsetLeft,
          e.pageY - this.canvas.offsetTop
        );
        console.log(this.context);
      }
      if (this.eraserEnabled === true && this.isDrawing === true) {
        console.log("clean");
        this.context.globalCompositeOperation = "destination-out";
        // this.context.strokeStyle = '#fff';
        this.context.lineWidth = this.linevalue;
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
        // this.context.beginPath();
        this.context.moveTo(
          e.pageX - this.canvas.offsetLeft,
          e.pageY - this.canvas.offsetTop
        );
      }
      this.canvasHistory.push(this.canvas.toDataURL());
    },

    // 停止画图
    stopDrawing() {
      this.isDrawing = false;
      this.eraserEnabled = false;
      this.saveCanvas();
    },

    //画图中
    draw(event) {
      var e = event || window.event;
      var x = e.pageX - this.canvas.offsetLeft;
      var y = e.pageY - this.canvas.offsetTop;
      // 画一条直线到鼠标最新位置
      if (isNaN(x)) {
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;
      }
      if (this.isDrawing == true && this.eraserEnabled === false) {
        // 找到鼠标最新位置
        console.log("drawing....");

        this.context.lineTo(x, y);
        this.context.stroke();
      }
      if (this.eraserEnabled === true && this.isDrawing === true) {
        this.context.lineTo(x, y);
        this.context.stroke();
        //鼠标第一次点下的时候擦除一个圆形区域，同时记录第一个坐标点
        // this.context.save();
        // this.context.globalCompositeOperation = "destination-out";
        // this.context.beginPath();
        // this.context.arc(x, y, 10, 0, 2 * Math.PI);
        // this.context.clip();
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.context.restore();
      }
    },
    // 改变画笔颜色
    changeColor(color) {
      this.context.strokeStyle = color;
      console.log(color);
    },

    // 改变画笔粗细
    changeThickness(thickness) {
      this.context.lineWidth = thickness;
    },
    // 橡皮擦
    eraserwork() {
      this.context.lineWidth = 30;
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.beginPath();
      this.context.moveTo(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height
      );
      for (var i = 0; i < 10; i++) {
        this.context.lineTo(
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height
        );
      }
      this.context.stroke();
    },
    // 清除画布
    clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    // 保存画布
    saveCanvas() {
      // 找到预览的 <img> 元素标签
      var imageCopy = document.getElementById("savedImageCopy");
      // 将画布内容在img元素中显示
      imageCopy.src = this.canvas.toDataURL();
      // 显示右键保存的提示
      var imageContainer = document.getElementById("savedCopyContainer");
      imageContainer.style.display = "block";
    },
    canvasSetSize() {
      let imgData = this.context.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      let pageWidth = document.documentElement.clientWidth - 300;
      let pageHeight = document.documentElement.clientHeight - 300;
      this.canvaswidth = pageWidth;
      this.canvasheight = pageHeight;
      this.canvas.width = pageWidth;
      this.canvas.height = pageHeight;
      this.context.putImageData(imgData, 0, 0);
    },

    // 初始化
    init() {
      // 获取画布已经绘图上下文
      this.canvas = document.getElementById("drawingCanvas");
      this.context = this.canvas.getContext("2d");

      if (document.body.ontouchstart !== undefined) {
        // 使用touch事件
        this.canvas.ontouchstart = e => {
          // 开始触摸
          // console.log('hello');
          this.startDrawing(e);
        };
        this.canvas.ontouchmove = e => {
          // 开始滑动
          console.log(e);
          console.log("hello");
          this.draw(e);
        };
        this.canvas.ontouchend = e => {
          // 滑动结束
          this.stopDrawing(e);
        };
      } else {
        // 画布添加鼠标事件
        this.canvas.onmousedown = this.startDrawing;
        this.canvas.onmouseup = this.stopDrawing;
        this.canvas.onmouseout = this.stopDrawing;
        this.canvas.onmousemove = this.draw;
      }
    }
  },
  mounted() {
    this.init();
    this.canvasSetSize();
    window.onresize = () => {
      this.canvasSetSize();
    };
  }
};
</script>

<style >
.el-menu .el-menu--inline {
  padding: 10px;
}
.el-aside > div {
  margin: 10px;
}
.color .vc-sketch {
  margin: 0 auto;
}

.copyright .vc-slider {
  width: auto;
  margin: 10px 0;
}
.linesize {
  margin: 0 10px;
}
.linecap {
  margin: 0 10px;
}
.step {
  margin: 0 10px;
}
.copyright {
  margin: 0 10px;
}
.canvassize {
  margin: 0 10px;
}
.picture {
  margin: 0 10px;
}
.el-button.clearn {
  background-image: url("../assets/xiangpica.png");
  background-repeat: no-repeat;
  background-position: center center;
  width: 32px;
  height: 32px;
}
.el-button.canvasundo {
  background-image: url("../assets/canvasundo.png");
  background-repeat: no-repeat;
  background-position: center center;
  width: 32px;
  height: 32px;
}
.el-button.canvasredo {
  background-image: url("../assets/canvasredo.png");
  background-repeat: no-repeat;
  background-position: center center;
  width: 32px;
  height: 32px;
}
.canvassize .Cwidth {
  margin: 10px 0;
}
canvas {
  border: 1px solid #7b899b;
}

#savedCopyContainer {
  display: none;
  margin: 20px;
}

#savedCopyContainer img {
  width: 250px;
  height: 125px;
  border: 1px solid #7b899b;
}
</style>

