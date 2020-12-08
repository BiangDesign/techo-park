<template>
  <div class="">
    <div class="fullpage-vertical">
      <div class="" v-fullpage="opts" ref="fullpage">
        <div class="page-1 page" :class="{'show-page-1': !isLoading}">
          <loading v-if=isLoading />
          <div class="page-1-content">
            <h1 class="part-1" v-animate="{value: 'bounceInLeft'}">盲人世界</h1>
            <h3 class="" v-animate="{value: 'bounceInLeft'}">这是一次声音的实验，我们要求您佩戴好耳机，跟随我们的脚步，一起进入一段轻松的旅程</h3>
            <div>
              <button class="part-1 part-1-btn" @click="moveTo(1)">点击屏幕开始吧</button>
            </div>
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
          <div class="next-page">
            <button @click="moveTo(2)">
              <up />
            </button>
          </div>
          <div class="fullpage-horizontal">
            <div v-fullpage="horizontalOpts" ref="fullpageHorizontal">
              <div class="page-2 page">
                <h2 class="part-2" v-animate="{value: 'bounceInRight'}">场景操作</h2>
                <p v-animate="{value: 'bounceInRight'}">各种滑动</p>
                <button @click="start">开始</button>
                <button @click="clickScreen">点击屏幕开始</button>
                <button @click="clickUp">向前滑动</button>
                <!-- <button @click="">继续向前</button> -->
                <button @click="clickLeft">向左滑动</button>
                <button @click="throughRoodFinish">第五步 前进</button>
                <button @click="stepSixRight">第六步</button>
                <button @click="longTouch">长按</button>
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
export default {
  components: {
    loading,
    up,
  },
  mixins: [stateMixins],
  data:function() {
    var that = this;
    return {
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
      active2:0
    };
  },
  mixins: [stateMixins],
  methods: {
    moveTo: function(index) {
      this.$refs.fullpage.$fullpage.moveTo(index, true, true);
    },
    showPage: function() {
      this.pageNum++;
      this.$refs.fullpage.$fullpage.$update();
    },
    setDisabled(){
      this.disabled = !this.disabled
      this.$refs.fullpage.$fullpage.setDisabled(this.disabled)
    },
    vueTouch(s, e) {
      console.log(s, e);
    },

    slideTouch(s, e) {
      console.log(s, e);
    },
    // 第一步 第三步
    swipeTop(s, e) {
      if (this.$data.step === 1) {
        console.log(s, e);
      }

      if (this.$data.step === 3) {
        console.log(s, e);
      }
    },
    // 第二步
    swipeLeft(s, e) {
      if (this.$data.step === 2) {
        console.log(s, e);
      }
    },
    // 第四步
    swipeRight(s, e) {
      if (this.$data.step === 4) {
        console.log(s, e);
      }
    },
    // 第五部：长按
    longTap(s, e) {
      if (this.$data.step === 5) {
        console.log(s, e);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
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
  background: #ababab;
  position: relative;
  .page-1-content {
    opacity: 0;
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
</style>
