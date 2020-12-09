function setImgage() {
  let imgs = [];
  for (let i = 0; i < 356; i++) {
    const img = null;
    if (i < 10) {
      img = require(`./../assets/images/01_000${i}.jpg`);
    }
    if (i >= 10 && i < 100) {
      img = require(`./../assets/images/01_00${i}.jpg`);
    }
    if (i >= 100) {
      img = require(`./../assets/images/01_0${i}.jpg`);
    }
    imgs.push(img);
  }
  return imgs
}
class Video {
  constructor(step) {
    console.log('step', step)
    
    let _this = this;
    // 初始化进度
    _this.store = { length: 0 };
    _this.type = step;
    _this.percent = 0;
    _this.imgList = setImgage();
    console.log( setImgage())
    // if (!document.getElementById('loading')) {
    //   let spansn = document.createElement("span")
    //   <span id="loading" class="loading" data-percent="0"></span>
    // }
    _this.eleContainer = document.getElementById('container');
    _this.eleLoading = document.getElementById('loading');
    _this.index = 1;
    _this.loading();

    if (step === 1) {
      _this.play(1)
    }
    if (step === 2) {
      _this.play(2)
    }
  }

  loading() {
    let _this = this;
    if (_this.type === 1) {
      _this.indexRange = [1, 66];
    }
    if (_this.type === 2) {
      _this.indexRange = [66, 81];
    }
    if (_this.type === 2) {
      _this.indexRange = [66, 81];
    }
    if (_this.type === 7) {
      _this.indexRange = [82, 105];
    }
    if (_this.type === 3) {
      _this.indexRange = [106, 148];
    }
    if (_this.type === 4) {
      _this.indexRange = [148, 173];
    }
    if (_this.type === 5) {
      _this.indexRange = [174, 223];
    }
    if (_this.type === 6) {
      _this.indexRange = [224, 278];
    }
    _this.store = { length: 0 };
    _this.percent = 0;
    _this.eleContainer = document.getElementById('container');
    _this.eleLoading = document.getElementById('loading');
    _this.maxLength = _this.indexRange[1] - _this.indexRange[0] + 1; // 66张图
    // 图片序列预加载
    for (var start = _this.indexRange[0]; start <= _this.indexRange[1]; start++) {
      (function (index) {
        var img = new Image();
        img.onload = function () {
          _this.store.length++;
          img.style.position = 'absolute';
          img.style.top = '0';
          img.style.left = '0';
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.zIndex = '1';
          // 存储预加载的图片对象
          _this.store[index] = this;
          _this.play();
        };
        img.onerror = function () {
          _this.store.length++;
          _this.play();
        };
        // img.src = 'seq_0_' + (index === 0 ? 0 : index - 1) + '.png';
        img.src = _this.imgList[index]
      })(start);
    }
  }

  play(type) {
    let _this = this;
    // 进度
    if (_this.type === 1) {
      _this.startRange = [1, 66];
    }
    if (_this.type === 2) {
      _this.startRange = [66, 81];
    }
    if (_this.type === 3) {
      _this.startRange = [106, 148];
    }
    if (_this.type === 4) {
      _this.startRange = [148, 173];
    }
    if (_this.type === 5) {
      _this.startRange = [174, 223];
    }
    if (_this.type === 6) {
      _this.startRange = [224, 278];
    }
    if (_this.type === 7) {
      _this.startRange = [82, 105];
    }
    _this.percent = Math.round(100 * _this.store.length / _this.maxLength);
    // console.log(_this.store.length, _this.percent)
    // _this.eleLoading.setAttribute('data-percent', _this.percent);
    // if (type === 2) {
    //   debugger
    // }
    // _this.eleLoading.style.backgroundSize = _this.percent + '% 100%';

    // 全部加载完毕，无论成功还是失败
    if (_this.percent == 100) {
      var index = _this.startRange[0];
      _this.eleContainer.innerHTML = '';
      // 依次append图片对象
      var stepAN = function () {
        if (_this.store[index - 1]) {
          _this.eleContainer.removeChild(_this.store[index - 1]);
        }
        _this.eleContainer.appendChild(_this.store[index]);
        // 序列增加
        index++;
        // 如果超过最大限制
        if (index <= _this.startRange[1]) {
          if (_this.type === 4) {
            setTimeout(stepAN, 250);
          } else if (_this.type === 3) {
            setTimeout(stepAN, 100);
          } else if (_this.type === 5) {
            setTimeout(stepAN, 100);
          } else if (_this.type === 7) {
            setTimeout(stepAN, 250);
          } else {
            setTimeout(stepAN, 80);
          }
        } else {
          // 本段播放结束回调
          // 我这里就放一个重新播放的按钮
          // _this.eleContainer.insertAdjacentHTML('beforeEnd', '<button onclick="play()">再看一遍英姿</button>');
        }
      };
      // 等100%动画结束后执行播放
      setTimeout(stepAN, 100);
    }
  }
}

function video(step = 1) {
  console.log(step)
  new Video(step)
}
export default video