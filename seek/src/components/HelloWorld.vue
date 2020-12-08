<template>
  <div class="hello" 
    v-tap="e => vueTouch('单击', e)" 
    v-longtap="e => longTap('长按', e)" 
    v-swipeleft="e => swipeLeft('左滑动', e)" 
    v-swiperight="e => swipeLeft('右滑动', e)" 
    v-swipeup="e => swipeLeft('上滑动', e)" 
    v-swipedown="e => swipeLeft('下滑动', e)"  
    v-swipestart="e=>swipeEnd('开始', e)">
    <p>
      这是一次声音的实验，我们要求您佩戴好耳机，跟随我们的脚步，一起进入一段轻松的旅程
    </p>
    <h3></h3>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: () => {
   return {
     lock: false,
     direction: '上滑动'
   }
  },
  methods: {
    vueTouch(s, e) {
      console.log(s, e);
    },
    longTap(s, e) {
      console.log(s, e);
    },
    slideTouch(s, e) {
      console.log(s, e);
    },
    swipeLeft(s, e) {
      if (s === this.direction) {
         console.log(s)
        if(this.lock) {return}
         console.log(s, e);
        if (e >= 5) {
          this.direction = '左滑动';
          this.lock = true
        }
      }
    },
    swipeEnd(s, e) {
      this.lock = false;
      console.log(s, e)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  height: 100vh;
  box-sizing: border-box;
  padding: 80px 30px 80px;
}
h3 {
  margin-top: 100px;
}
</style>
