<template>
  <div
    class="home"
    v-tap="(e) => vueTouch('单击', e, false)"
    v-longtap="(e) => longTap('长按', e)"
    v-swipeleft="(e) => swipeLeft('left', e)"
    v-swiperight="(e) => swipeRight('right', e)"
    v-swipeup="(e) => swipeTop('top', e)"
    v-swipedown="(e) => swipeBottom('bottom', e)"
  >
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <button @click="playAudio">播放</button> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import mixin from "./../state.maxim";
// import { playAudioByStep } from "../utils/playAudio.js";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mixins: [mixin],
  data() {
    return {
      direction: "top",
    };
  },
  created() {
    // 第一次调用初始化声音
    // ture
  },
  methods: {
    // playAudio() {
    //   playAudioByStep(this.setp);
    // },
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
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow: hidden;
}
</style>