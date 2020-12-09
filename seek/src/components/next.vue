<template>
  <div class="arrow up"></div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@-webkit-keyframes uparrow {
  0% { -webkit-transform: translateY(0); opacity: 0.4 }
  100% { -webkit-transform: translateY(-0.4em); opacity: 0.9 }
}
@-webkit-keyframes downarrow {
  0% { -webkit-transform: translateY(0); opacity: 0.4 }
  100% { -webkit-transform: translateY(0.4em); opacity: 0.9 }
}
.arrow {
  border-color:transparent;
  border-style:solid;
  border-width:0 2em;
  display:block;
  height:0;
  margin:10em auto;
  opacity:0.4;
  text-indent:-9999px;
  transform-origin: 50% 50%;
  width:0;
}
.up {
  -webkit-animation: uparrow 0.6s infinite alternate ease-in-out;
  border-bottom:2em solid #ffffff;
  margin: 0;
}
.down {
  -webkit-animation: downarrow 0.6s infinite alternate ease-in-out;
  border-top:2em solid #ffffff;
}

</style>
