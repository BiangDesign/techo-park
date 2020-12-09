<template>
  <div class="section__typed" @click="bindComplete">
    <vue-typed-js :strings="[text]"
                  :typeSpeed="100"
                  :startDelay="4000"
                  :showCursor="false"
                  @onComplete="bindComplete">
      <div class="typing"></div>
    </vue-typed-js>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    bindComplete() {
      this.$emit('finished');
    }
  }
}
</script>

<style lang="less" scoped>
.section__typed {
  .typing {
    text-align: left;
    padding: 40px;
    font-size: 16px;
    line-height: 32px;
    font-weight: bold;
  }
}
</style>