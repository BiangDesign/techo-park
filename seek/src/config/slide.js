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
    _this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  }

  swipeleft() {
    const _this = this;
    _this.hammer.on('panleft', function (ev) {
      _this.moveLeft = true;
      _this.slideTouch('moveLeft', ev)
    });
    _this.panend('moveLeft');
  }

  swiperight() {
    const _this = this;
    _this.hammer.on('panright', function (ev) {
      _this.moveRight = true;
      _this.slideTouch('moveRight', ev);
    });
    _this.panend('moveRight');
  }

  swipeup() {
    const _this = this;
    _this.swipe();
    _this.hammer.on('panup', function (ev) {
      _this.moveUp = true;
      _this.slideTouch('moveUp', ev);
    });
    _this.panend('moveUp');
  }

  swipedown() {
    const _this = this;
    _this.swipe();
    _this.hammer.on('pandown', function (ev) {
      _this.moveDown = true;
      _this.slideTouch('moveDown', ev);
    });
    _this.panend('moveDown');
  }

  panend(type) {
    // debugger
    console.log(123123123123);
    const _this = this;



    _this.hammer.on('panend', function (ev) {
      console.log(ev, 'panend', _this.touchType)
      // left
      // _this.touchType === "swipeend" && _this.callBack(ev, _this.binding.value);
      _this[type] = false;
      _this.slideTouch(type, ev);
      _this.start_moveLeft = 0;
      _this.start_moveRight = 0;
      _this.start_moveUp = 0;
      _this.start_moveDown = 0;
    });


    
  }

  panstart() {
    const _this = this;
    _this.hammer.on('panstart', function (ev) {
      _this.start_moveLeft = 0;
      _this.start_moveRight = 0;
      _this.start_moveUp = 0;
      _this.start_moveDown = 0;
      // left
      _this.touchType === "swipeend" && _this.callBack(ev, _this.binding.value);
    });
  }


  slideTouch(type, ev) {
    const _this = this;
    if (_this[type] && _this.time === null) {
      
      _this.time = setInterval(() => {
        _this[`start_${type}`] += 1;
        if (ev.direction === 2) {
          _this.touchType === "swipeleft" && _this.callBack(_this[`start_${type}`], _this.binding.value);
        }

        if (ev.direction === 4) {
          _this.touchType === "swiperight" && _this.callBack(_this[`start_${type}`], _this.binding.value);
        }

        if (ev.direction === 8) {
          _this.touchType === "swipeup" && _this.callBack(_this[`start_${type}`], _this.binding.value);
        }
        if (ev.direction === 16) {
          _this.touchType === "swipedown" && _this.callBack(_this[`start_${type}`], _this.binding.value);
        }
      }, 300)
    } else if (!_this[type]) {
      clearInterval(_this.time);
      _this.time = null;
      const timer = _this[`start_${type}`];
      console.log('停止在第' + timer + '步', `start_${type}`);
    }
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

// 开始滑动
Vue.directive("swipestart", {
  bind: function (el, binding) {
    new Touch(el, binding, "swipeend");
  }
});
