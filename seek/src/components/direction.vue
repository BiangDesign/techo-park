<template>
  <div class="mouse_scroll" :class="{'flex-box': location === 'left' || location === 'right'}">
    <div :class="{'flex': location === 'left' || location === 'right'}">
      <span class="m_scroll_arrows unu" :class="location"></span>
      <span class="m_scroll_arrows doi" :class="location"></span>
      <span class="m_scroll_arrows trei" :class="location"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    location: {
      default: "top",
      type: "top" | "left" | "right" | "bottom",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mouse_scroll {
  display: block;
  margin: 0 auto;
  width: 24px;
}
.flex-box {
  width: 60px;
}
.flex {
  display: flex;
}

.m_scroll_arrows {
  display: block;
  width: 5px;
  height: 5px;
  -ms-transform: rotate(225deg); /* IE 9 */
  -webkit-transform: rotate(225deg); /* Chrome, Safari, Opera */
  transform: rotate(225deg);
  margin: 0 0 3px 4px;
  width: 16px;
  height: 16px;
}

.top {
  border-right: 2px solid white;
  border-bottom: 2px solid white;
}

.bottom {
  border-left: 2px solid white;
  border-top: 2px solid white;
}

.left {
  border-right: 2px solid white;
  border-top: 2px solid white;
}

.right {
  border-bottom: 2px solid white;
  border-left: 2px solid white;
}
.unu {
  margin-top: 1px;
}

.unu,
.doi,
.trei {
  -webkit-animation: mouse-scroll 1s infinite;
  -moz-animation: mouse-scroll 1s infinite;
  animation: mouse-scroll 1s infinite;
}

.unu {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -webkit-animation-direction: alternate;

  animation-direction: alternate;
  animation-delay: alternate;
}

.doi {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -webkit-animation-direction: alternate;

  animation-delay: 0.2s;
  animation-direction: alternate;

  margin-top: -6px;
}

.trei {
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  -webkit-animation-direction: alternate;

  animation-delay: 0.1s;
  animation-direction: alternate;

  margin-top: -6px;
}

.left {
  margin-top: 0px;
}

.right {
  margin-top: 0px;
}

@-webkit-keyframes mouse-wheel {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    -webkit-transform: translateY(6px);
    -ms-transform: translateY(6px);
    transform: translateY(6px);
  }
}
@-moz-keyframes mouse-wheel {
  0% {
    top: 1px;
  }
  25% {
    top: 2px;
  }
  50% {
    top: 3px;
  }
  75% {
    top: 2px;
  }
  100% {
    top: 1px;
  }
}
@-o-keyframes mouse-wheel {
  0% {
    top: 1px;
  }
  25% {
    top: 2px;
  }
  50% {
    top: 3px;
  }
  75% {
    top: 2px;
  }
  100% {
    top: 1px;
  }
}
@keyframes mouse-wheel {
  0% {
    top: 1px;
  }
  25% {
    top: 2px;
  }
  50% {
    top: 3px;
  }
  75% {
    top: 2px;
  }
  100% {
    top: 1px;
  }
}

@-webkit-keyframes mouse-scroll {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes mouse-scroll {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes mouse-scroll {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes mouse-scroll {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
