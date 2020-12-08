/**
 * 点击、长按、上下左右滑动事件
 */

import Vue from "vue";

class Touch {
  /**
   * @param {HTMLElemtnt} el 绑定的dom
   * @param {object} binding 参数
   * @param {string} type 滑动类型
   */
  constructor(el, binding, type) {
    let _this = this;
    _this.dom = el;
    _this.binding = binding;
    _this.touchType = type;
    _this.time = null;
    _this.start_moveLeft = 0;
    _this.start_moveRight = 0;
    _this.start_moveUp = 0;
    _this.start_moveDown = 0;
    _this.direction = [];
    _this.callBack = typeof binding.value === "object" ? binding.value.fn : binding.value;
    // 初始化均为false
    _this.moveLeft = false;
    _this.moveRight = false;
    _this.moveUp = false;
    _this.moveDown = false;
    /* eslint-disable */
    const mc = new Hammer(_this.dom);
    _this.hammer = mc;
    // 执行事件
    switch (type) {
      case 'tap':
        _this.tap()
        break;
      case 'press':
        _this.press()
        break;
      case 'swipeleft':
        _this.swipeleft()
        break;
      case 'swiperight':
        _this.swiperight()
        break;
      case 'swipeup':
        _this.swipeup()
        break;
      case 'swipedown':
        _this.swipedown()
        break;
      case 'swipeend':
        _this.panstart()
        break;
      default:
        break;
    }
  }

  tap() {
    const _this = this;
    _this.hammer.on('tap', function (ev) {
      _this.touchType === "tap" && _this.callBack(ev, _this.binding.value);
    });
  }

  press() {
    const _this = this;
    _this.hammer.on('press', function (ev) {
      _this.touchType === "press" && _this.callBack(ev, _this.binding.value);
    });
  }
  swipe() {
    const _this = this;
    // 启用垂直方向
    // _this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    _this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  }

  swipeleft() {
    const _this = this;
    _this.hammer.on('swipeleft', function (ev) {
      console.log(ev)
      if (ev.direction === 2) {
        _this.touchType === "swipeleft" && _this.callBack(1, _this.binding.value);
      }
    });
  }

  swiperight() {
    const _this = this;
    _this.hammer.on('swiperight', function (ev) {
      if (ev.direction === 4) {
        _this.touchType === "swiperight" && _this.callBack(1, _this.binding.value);
      }
    });
  }

  swipeup() {
    const _this = this;
    _this.swipe();
    _this.hammer.on('swipeup', function (ev) {
      if (ev.direction === 8) {
        _this.touchType === "swipeup" && _this.callBack(1, _this.binding.value);
      }
    });
  }

  swipedown() {
    const _this = this;
    _this.swipe();
    _this.hammer.on('swipedown', function (ev) {
      if (ev.direction === 16) {
        _this.touchType === "swipedown" && _this.callBack(1, _this.binding.value);
      }
    });
  }
}

// 单击
Vue.directive("tap", {
  bind(el, binding) {
    new Touch(el, binding, "tap");
  }
});
// 长按
Vue.directive("longtap", {
  bind: function (el, binding) {
    new Touch(el, binding, "press");
  }
});
// 左滑动
Vue.directive("swipeleft", {
  bind: function (el, binding) {
    new Touch(el, binding, "swipeleft");
  }
});

//  右滑动
Vue.directive("swiperight", {
  bind: function (el, binding) {
    new Touch(el, binding, "swiperight");
  }
});

// 上滑动
Vue.directive("swipeup", {
  bind: function (el, binding) {
    new Touch(el, binding, "swipeup");
  }
});

// 下滑动
Vue.directive("swipedown", {
  bind: function (el, binding) {
    new Touch(el, binding, "swipedown");
  }
});
