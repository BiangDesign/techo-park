<template>
  <div class="hello">
    <p>
      这是一次声音的实验，我们要求您佩戴好耳机，跟随我们的脚步，一起进入一段轻松的旅程
    </p>
    <h3>点击屏幕开始吧</h3>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    this.$EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
     console.log(msg)
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  padding: 80px 30px 80px;
}
h3 {
  margin-top: 100px;
}
</style>
