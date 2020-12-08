<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="playAudio">播放</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { playAudioByStep } from '../utils/playAudio.js';

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data () {
    return {
      setp: 0
    }
  },
  methods: {
    playAudio() {
      playAudioByStep(this.setp);
    }
  }
};
</script>
