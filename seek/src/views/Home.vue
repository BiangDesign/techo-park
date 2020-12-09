<template>
  <div class="">
    <div class="fullpage-vertical">
      <div class="" v-fullpage="opts" ref="fullpage">
        <div class="page-1 page" :class="{ 'show-page-1': !isLoading }">
          <loading v-if="isLoading" />
          <div class="page-1-content">
            <div class="next-page">
              <button @click="moveTo(1)">
                <up />
              </button>
            </div>
            <div class="part-1-note">
              <img src="../../public/img/headset.gif" alt="headset" />
              <h1 class="part-1-title">听 · 见</h1>
            </div>
            <!--            <div>-->
            <!--              <button class="part-1 part-1-btn" @click="moveTo(1)">点击屏幕开始吧</button>-->
            <!--            </div>-->
            <typed :text="typedText" @finished="handleTypedFinished"></typed>
            <!--            <div>-->
            <!--              <button class="part-1 part-1-btn" @click="moveTo(1)">点击屏幕开始吧</button>-->
            <!--            </div>-->
          </div>
        </div>
        <div
          class="page-2 page"
          v-tap="(e) => vueTouch('单击', e, false)"
          v-longtap="(e) => longTap('长按', e)"
          v-swipeleft="(e) => swipeLeft('left', e)"
          v-swiperight="(e) => swipeRight('right', e)"
          v-swipeup="(e) => swipeTop('top', e)"
          v-swipedown="(e) => swipeBottom('bottom', e)"
        >
          <div id="container" class="container">
            <!-- <span id="loading" class="loading" data-percent="0"></span> -->
          </div>
          <div class="location-box">
            <direction
              location="top"
              v-if="
                (curStep === 0 ||
                  curStep === 1 ||
                  curStep === 3 ||
                  curStep === 5 ||
                  curStep === 6 ||
                  curStep === 8) &&
                  canClick
              "
            />
            <direction location="left" v-if="curStep === 2 && canClick" />
            <direction location="right" v-if="curStep === 4 && canClick" />
            <fingerPrint v-if="curStep === 7 && canClick" />
          </div>
          <div class="next-page" v-if="curStep === 9">
            <button>
              <up />
            </button>
          </div>
          <div class="fullpage-horizontal">
            <div v-fullpage="horizontalOpts" ref="fullpageHorizontal">
              <div class="page-2 page"></div>
            </div>
          </div>
        </div>
        <div class="page-3 page">
          <h2 class="part-3" v-animate="{ value: 'bounceInLeft' }">
            各种场景展示
          </h2>
          <h3 class="" v-animate="{ value: 'bounceIn' }">场景一</h3>
        </div>
        <!--        <div class="page-2 page" v-for="page in pageNum">-->
        <!--          <h2 class="part-2" v-animate="{value: 'bounceInRight'}">page {{page}}</h2>-->
        <!--        </div>-->
      </div>
      <!--      <div class="fullpage-pagination">-->
      <!--        <div class="fullpage-pagination-bullet"-->
      <!--             v-for="(i,indx) in [0,1,2]"-->
      <!--             :class="{'fullpage-pagination-bullet__active':index==indx}"></div>-->
      <!--      </div>-->
    </div>
    <div class="big-image" v-if="showBigImage" @click="clickBigImage">
      <p>To Be Continue...</p>
      <img src="../assets/big_back.jpg" id="big-image" />
    </div>

    <typed
      v-if="showEnd"
      :text="endingWords"
      @finished="finishEndWords"
      classess="bottom-typed"
    ></typed>
  </div>
</template>

<script>
import stateMixins from "../state.mixins";
import loading from "./../components/loading";
import up from "../components/up";
import direction from "./../components/direction";
import fingerPrint from "./../components/finger-print";
import typed from "../components/typed";
import play from "../config/video";
export default {
  components: {
    loading,
    up,
    direction,
    fingerPrint,
    typed,
  },
  mixins: [stateMixins],
  data: function() {
    var that = this;
    return {
      typedText:
        "这是一次声音的实验<br>我们要求您佩戴好耳机<br>跟随我们的脚步<br>一起进入一段轻松的旅程",
      showEnd: false,
      showBigImage: false,
      endingWords: ``,
      bring: false,
      disabledScroll: false,
      isLoading: true,
      index: 0,
      pageNum: 0,
      disabled: false,
      opts: {
        start: 0,
        dir: "v",
        loop: false,
        duration: 300,
        beforeChange: function(ele, current, next) {
          console.log("before", current, next);
          that.index = next;
        },
        afterChange: function(ele, current) {
          that.index = current;
          console.log("after", current);
        },
      },
      horizontalOpts: {
        start: 0,
        dir: "h",
        loop: false,
        afterChange: function(ele, current) {
          that.active2 = current;
        },
      },
      active2: 0,
      canvasObj: {
        canvas: null,
        ctx: null,
        w: null,
        h: null,
        laser: null,
        text: null,
        particles: null,
      },
    };
  },
  watch: {
    index: {
      handler(newName, oldName) {
        console.log(
          "watch:" + "oldName= " + oldName + ", newName = " + newName + ";"
        );
        if (newName === 1 && this.curStep <= 8) {
          this.setDisabled(true);
        }
      },
      immediate: true,
    },
    curStep: {
      handler(newName, oldName) {
        console.log(
          "watch:" + "oldName= " + oldName + ", newName = " + newName + ";"
        );
        if (this.index === 1 && newName > 9) {
          this.setDisabled(false);
        }
      },
      immediate: true,
    },
  },
  methods: {
    clickBigImage() {
      if (this.bring) {
        this.setImgOpacity();
        setTimeout(() => {
          this.setImg();
        }, 3000);
      }
    },
    finishEndWords() {
      this.bring = true;
    },
    moveTo: function(index) {
      if (this.step === 1 && this.canClick && index === 1) {
        // 当第一页语音播放完成后 按钮可点击
        this.clickScreen();
        play();
        this.$refs.fullpage.$fullpage.moveTo(index, true, true);
      }
      if (index >= 2) {
        this.$refs.fullpage.$fullpage.moveTo(index, true, true);
      }
    },
    showPage: function() {
      this.pageNum++;
      this.$refs.fullpage.$fullpage.$update();
    },
    // 禁止翻页
    setDisabled(flag) {
      this.disabledScroll = flag;
      console.log(this.disabledScroll);
      this.$refs.fullpage.$fullpage.setDisabled(this.disabledScroll);
    },
    vueTouch(s, e) {
      console.log(s, e);
    },

    slideTouch(s, e) {
      console.log(s, e);
    },
    // 第一步 第三步
    swipeTop(s, e) {
      console.error("123", this.step, this.canClick);
      if (this.curStep === 0 && this.canClick) {
        this.clickUp();
        play(2);
      }
      // 播放宁夏
      if (this.curStep === 1 && this.canClick) {
        this.playSummer();
        play(7);
      }

      // 过红绿灯
      if (this.curStep === 3 && this.canClick) {
        this.crossStreetAction();
        play(4);
      }

      // 上滑，进入商店
      if (this.curStep === 5 && this.canClick) {
        this.flowerShop();
      }
      // 上滑买花：buyFlowerAction
      if (this.curStep === 6 && this.canClick) {
        this.buyFlowerAction();
      }
      // 上滑买花：buyFlowerAction
      if (this.curStep === 8 && this.canClick) {
        this.sliderDoor();
      }

      if (this.curStep === 9 && this.canClick) {
        play(8, () => {
          console.log("杜浩");
          this.showBigImage = true;
          this.showEnd = true;
          this.endingWords = `我想你已经猜到了<br>小明是一个视障人士<br>在刚刚的旅途中，通过 AI 眼镜配合雷达测距，我们让小明看“见”了垃圾桶，认准了红绿灯。<br>通过AI语音识别，让人机交互更准确便捷。<br>物联网和云计算，让复杂的道路情况变得简单安全。<br>生物识别也嵌在了每个地方，不仅是支付或者万物互联都变得安全快速......<br>而在中国有和小明一样的上千万的盲人和低视力群体<br>我们相信，<br>在不久的将来，科技也会让他们的世界变得五彩斑斓。<br>点击屏幕，点亮小明的世界`;
        });
      }
    },
    // 第二步
    swipeLeft(s, e) {
      // if (this.step === 3 && this.canClick) {
      //   console.log(s, e);
      //   this.clickLeft();
      // }
      if (this.curStep === 2 && this.canClick) {
        console.log(s, e);
        this.truanLeft();
        play(3);
      }
    },
    // 第四步
    swipeRight(s, e) {
      if (this.curStep === 4 && this.canClick) {
        console.log(s, e);
        this.turnRightAction();
        play(5);
      }
    },
    // 第五部：长按
    longTap(s, e) {
      if (this.curStep === 7 && this.canClick) {
        console.log(s, e);
        this.longClick();
        play(6);
      }
    },
    // 向下
    swipeBottom(s, e) {
      console.log(s, e);
    },
    // 打字机效果播放结束之后
    handleTypedFinished() {},
    setImg() {
      document.querySelector("#big-image").style.transition = "20s";
      document.querySelector("#big-image").style.width = "100%";
    },
    setImgOpacity() {
      document.querySelector("#big-image").style.opacity = "1";
      document.querySelector("#big-image").style.transition = "3s";
      document.querySelector(".big-image p").style.display = "block";
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
      this.start();
      this.setDisabled(true);
    }, 3000);
  },
};
</script>

<style lang="less" scoped>
.big-image {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999;
  p {
    position: absolute;
    color: white;
    bottom: 20px;
    left: 20px;
    z-index: 10;
    font-size: 20px;
    display: none;
  }
  img {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 1000px;
    opacity: 0;
  }
}
.bottom-typed {
  position: fixed;
  bottom: 450px;
  color: white;
  width: 100%;
}
.fullpage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.page {
  display: block;
  text-align: center;
  font-size: 26px;
  color: #eee;
}
.page-1 {
  position: relative;
  .page-1-content {
    background-image: url("../../public/img/homepage_bkg.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    opacity: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    .part-1-note {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: absolute;
      top: 80px;
      .part-1-title {
        position: absolute;
        top: 195px;
      }
      img {
        width: 200px;
      }
    }
    .section__typed {
      position: absolute;
      width: 100%;
      bottom: 100px;
    }
    .part-1-title {
      margin-bottom: 20px;
    }
    .next-page {
      position: absolute;
      bottom: 20px;
      width: 100%;
      z-index: 1;
      button {
        background: transparent;
        border: none;
        outline: none;
        &:hover,
        &:active,
        &:focus {
          border: none;
          outline: none;
        }
      }
    }
  }
}

.show-page-1 {
  .page-1-content {
    opacity: 1;
    transition: opacity 5s;
  }
}

.part-1-btn {
  border-radius: 50%;
  width: 110px;
  height: 110px;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: none;
    outline: none;
  }
}

.page-2 {
  background-color: #000000;
  position: relative;
  .next-page {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 1;
    button {
      background: #000000;
      border: none;
      outline: none;
      &:hover,
      &:active,
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
}

.page-3 {
  padding-top: 100px;
  background: #aabbcc;
}
.page-4 {
  padding-top: 200px;
  background-color: palevioletred;
}
.page-5 {
  padding-top: 200px;
  background-color: blueviolet;
}

h3,
p {
  font-size: 16px;
}

.button-group {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 9;
}

.button-group button {
  display: inline-block;
  margin: 10px;
  color: #000;
  background: #fff;
  background: rgba(255, 255, 255, 0.5);
  -webkit-border-radius: 10px;
  border-radius: 10px;
  padding: 9px 18px;
  border: none;
  outline: none;
}
.fullpage-horizontal,
.fullpage-vertical {
  position: absolute;
  width: 100%;
  height: 100%;
}

.fullpage-pagination-bullet {
  margin: 0 6px;
  display: block;
  cursor: pointer;
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
  opacity: 0.2;
}

.fullpage-pagination-bullet__active {
  background: #1bbc9b;
  opacity: 1;
}

.fullpage-horizontal > .fullpage-pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
}

.fullpage-vertical > .fullpage-pagination {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-flow: column;
}

.fullpage-vertical > .fullpage-pagination > .fullpage-pagination-bullet {
  margin: 6px 0;
}

.fullpage-vertical
  > .fullpage-pagination
  > .fullpage-pagination-bullet__active {
  background: #4d7cfe;
}

.button-group button.active {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
button.disabled-btn {
  background: red;
  color: #fff;
}
.location-box {
  position: absolute;
  bottom: 40px;
  width: 100%;
  left: 0;
  z-index: 1;
}
.container {
  width: 256px;
  height: 464px;
  margin: auto;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.container > img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.loading {
  background: #000000;
}
</style>
