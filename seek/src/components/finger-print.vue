<template>
  <div class="finger-container">
    <div class="finger-print"></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.finger-container {
  display: flex;
  justify-content: center;
}
.finger-print {
  border-radius: 50%;
  background: url(../../public/img/finger-print.png) no-repeat center;
  background-size: contain;
  width: 75px;
  height: 75px;
  animation: glint 2s linear 2s infinite;
}

@keyframes glint {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
