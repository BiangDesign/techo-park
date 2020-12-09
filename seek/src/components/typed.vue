<template>
  <div class="section__typed" :class="classess" @click="bindComplete">
    <vue-typed-js
      :strings="[text]"
      :typeSpeed="100"
      :startDelay="4000"
      :showCursor="false"
      @onComplete="bindComplete"
    >
      <div class="typing"></div>
    </vue-typed-js>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    classess: {
      type: String,
      default: "",
    },
  },
  methods: {
    bindComplete() {
      this.$emit("finished");
    },
  },
};
</script>

<style lang="less" scoped>
.section__typed {
  .typing {
    width: 100%;
    padding: 40px 20px;
    font-size: 14px;
    line-height: 32px;
    font-weight: bold;
    text-align: center;
    box-sizing: border-box;
  }
}
</style>
