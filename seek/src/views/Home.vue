<template>
  <div class="" @click="moveTo(1)">
    <div class="fullpage-vertical">
      <div class="" v-fullpage="opts" ref="fullpage">
        <div class="page-1 page" :class="{'show-page-1': !isLoading}">
          <loading v-if=isLoading />
          <div class="page-1-content">
            <div class="part-1-note">
              <img src="../../public/img/headset.gif" alt="headset">
            </div>
            <div>
              <h1 class="part-1-title">看“见”</h1>
              <typed :text="typedText" @finished="handleTypedFinished"></typed>
            </div>
<!--            <div>-->
<!--              <button class="part-1 part-1-btn" @click="moveTo(1)">点击屏幕开始吧</button>-->
<!--            </div>-->
          </div>
        </div>
        <div class="page-2 page"
            v-tap="(e) => vueTouch('单击', e, false)"
            v-longtap="(e) => longTap('长按', e)"
            v-swipeleft="(e) => swipeLeft('left', e)"
            v-swiperight="(e) => swipeRight('right', e)"
            v-swipeup="(e) => swipeTop('top', e)"
             v-swipedown="(e) => swipeBottom('bottom', e)"
        >
          <div class="location-box">
            <direction location="top" v-if="(curStep === 0 || curStep === 1 ||curStep === 3 ||curStep === 5 ||curStep === 6 ||curStep === 8 )&& canClick"/>
            <direction location="left" v-if="(curStep === 2 )&& canClick"/>
            <direction location="right" v-if="(curStep === 4 )&& canClick"/>
          </div>
          <div class="next-page" v-if="curStep >= 9">
            <button @click="moveTo(2)">
              <up />
            </button>
          </div>
          <div class="fullpage-horizontal">
            <div v-fullpage="horizontalOpts" ref="fullpageHorizontal">
              <div class="page-2 page">
                <h2 class="part-2" v-animate="{value: 'bounceInRight'}">场景操作</h2>
                <p v-animate="{value: 'bounceInRight'}">各种滑动</p>
<!--                <button @click="start">开始</button>-->
<!--                <button @click="clickScreen">点击屏幕开始</button>-->
<!--                <button @click="clickUp">向前滑动</button>-->
<!--                &lt;!&ndash; <button @click="">继续向前</button> &ndash;&gt;-->
<!--                <button @click="clickLeft">向左滑动</button>-->
<!--                <button @click="throughRoodFinish">第五步 前进</button>-->
<!--                <button @click="stepSixRight">第六步</button>-->
<!--                <button @click="longTouch">长按</button>-->
                <!-- <button @click="setDisabled()">禁止滚动</button> -->
              </div>
            </div>
<!--            <div class="fullpage-pagination">-->
<!--              <div class="fullpage-pagination-bullet"-->
<!--                   v-for="(i,index) in [0,1]"-->
<!--                   :class="{'fullpage-pagination-bullet__active':active2==index}"></div>-->
<!--            </div>-->
          </div>
        </div>
        <div class="page-3 page">
          <h2 class="part-3" v-animate="{value: 'bounceInLeft'}">各种场景展示</h2>
          <h3 class="" v-animate="{value: 'bounceIn'}">场景一</h3>
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
  </div>
</template>

<script>
import stateMixins from '../state.mixins'
import loading from "./../components/loading";
import up from "./../components/up";
import direction from "./../components/direction";
import header from "./../components/header";
import typed from "../components/typed";
export default {
  components: {
    loading,
    up,
    direction,
    'v-header': header,
    typed
  },
  mixins: [stateMixins],
  data:function() {
    var that = this;
    return {
      typedText: '这是一次声音的实验<br>我们要求您佩戴好耳机<br>跟随我们的脚步<br>一起进入一段轻松的旅程',
      disabledScroll: false,
      isLoading: true,
      index: 0,
      pageNum: 0,
      disabled: false,
      opts: {
        start: 0,
        dir: 'v',
        loop: false,
        duration: 300,
        beforeChange: function(ele, current, next) {
          console.log('before', current, next)
          that.index = next;
        },
        afterChange: function(ele, current) {
          that.index = current;
          console.log('after', current)
        }
      },
      horizontalOpts:{
        start:0,
        dir:'h',
        loop: false,
        afterChange: function(ele, current) {
          that.active2 = current;
        }
      },
      active2:0,
      canvasObj: {
        canvas: null,
        ctx: null,
        w: null,
        h: null,
        laser: null,
        text: null,
        particles: null
      }
    };
  },
  watch: {
    index: {
      handler(newName, oldName) {
        console.log('watch:' + 'oldName= '+ oldName + ', newName = ' + newName + ';');
        if (newName === 1 && this.step < 8) {
            this.setDisabled(true)
        }
      },
      immediate: true
    },
    step: {
      handler(newName, oldName) {
        console.log('watch:' + 'oldName= '+ oldName + ', newName = ' + newName + ';');
        if (this.index === 1 && newName >= 8) {
            this.setDisabled(false)
        }
      },
      immediate: true
    }
  },
  methods: {
    moveTo: function(index) {
      if (this.step === 1 && this.canClick && index === 1) {  // 当第一页语音播放完成后 按钮可点击
        this.clickScreen()
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
    setDisabled(flag){
       this.disabledScroll = flag;
      console.log(this.disabledScroll);
      this.$refs.fullpage.$fullpage.setDisabled(this.disabledScroll)
    },
    vueTouch(s, e) {
      console.log(s, e);
    },

    slideTouch(s, e) {
      console.log(s, e);
    },
    // 第一步 第三步
    swipeTop(s, e) {
      console.error('123', this.step, this.canClick)
      if (this.curStep === 0 && this.canClick) {
        this.clickUp();
      }
      // 播放宁夏
      if (this.curStep === 1 && this.canClick) {
        this.playSummer();
      }

      // 过红绿灯
      if (this.curStep === 3 && this.canClick) {
        this.crossStreetAction();
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
      }
    },
    // 第四步
    swipeRight(s, e) {
      if (this.curStep === 4 && this.canClick) {
        console.log(s, e);
        this.turnRightAction()
      }
    },
    // 第五部：长按
    longTap(s, e) {
      if (this.curStep === 7 && this.canClick) {
        console.log(s, e);
        this.longClick()
      }
    },
    // 向下
    swipeBottom(s, e) {
      console.log(s, e)
    },
    // 打字机效果播放结束之后
    handleTypedFinished() {

    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
      this.start()
    }, 3000)
  }
};
</script>

<style lang="less" scoped>
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
  background-image: url("../../public/img/homepage_bkg.jpg");
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .page-1-content {
    opacity: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .part-1-note {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      img {
        width: 200px;
      }
    }
  .part-1-title {
    margin-bottom: 20px;
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
  &:hover, &:active, &:focus {
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
      &:hover, &:active, &:focus {
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
.page-4{
  padding-top:200px;
  background-color: palevioletred;
}
.page-5{
  padding-top:200px;
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
  background: rgba(255, 255, 255, .5);
  -webkit-border-radius: 10px;
  border-radius: 10px;
  padding: 9px 18px;
  border: none;
  outline: none;
}
.fullpage-horizontal,
.fullpage-vertical{
  position: absolute;
  width:100%;
  height: 100%;

}

.fullpage-pagination-bullet{
  margin:0 6px;
  display: block;
  cursor: pointer;
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
  opacity: .2;
}

.fullpage-pagination-bullet__active{
  background: #1bbc9b;
  opacity: 1;
}

.fullpage-horizontal >.fullpage-pagination{
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%,0);
}

.fullpage-vertical > .fullpage-pagination{
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translate(0,-50%);
  display: flex;
  flex-flow: column;
}

.fullpage-vertical > .fullpage-pagination > .fullpage-pagination-bullet{
  margin:6px 0;
}

.fullpage-vertical > .fullpage-pagination > .fullpage-pagination-bullet__active{
  background: #4D7CFE;
}


.button-group button.active {
  background: rgba(0, 0, 0, .5);
  color: #fff;
}
button.disabled-btn{
  background: red;
  color: #fff;
}
.location-box {
   position: absolute;
    bottom: 50%;
    width: 100%;
    left: 0;
    z-index: 1;

}
</style>
