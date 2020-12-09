import seq_0_1 from './../assets/images/seq_0_0.png';
import seq_0_2 from './../assets/images/seq_0_1.png';
import seq_0_3 from './../assets/images/seq_0_2.png';
import seq_0_4 from './../assets/images/seq_0_3.png';
import seq_0_5 from './../assets/images/seq_0_4.png';
import seq_0_6 from './../assets/images/seq_0_5.png';
import seq_0_7 from './../assets/images/seq_0_6.png';
import seq_0_8 from './../assets/images/seq_0_7.png';
import seq_0_9 from './../assets/images/seq_0_8.png';
class Video {
  constructor(step) {
    console.log('step', step)
    let _this = this;
    // 初始化进度
    _this.store = {};
    _this.percent = 0;
    _this.eleContainer = document.getElementById('container');
    _this.eleLoading = document.getElementById('loading');
    _this.index = 1;
    _this.indexRange = [1, 9];
    _this.maxLength =  _this.indexRange[1] -  _this.indexRange[0] + 1; // 9张图
    // 图片序列预加载
    for (var start = _this.indexRange[0]; start <= _this.indexRange[1]; start++) {
      (function (index) {
        var img = new Image();
        if(img.complete) {  
          img.style.position = 'absolute';
          img.style.top = '0';
          img.style.left = '0';
          img.style.width = '100%';
          img.style.height = '100%';
          // _this.store.length++;
          console.log(this, img)
          // 存储预加载的图片对象
          _this.store[index] = img;
        }  
        img.onload = function () {
          // _this.store.length++;
          console.log(this)
          // 存储预加载的图片对象
          _this.store[index] = this;
          // _this.play();
        };
        img.onerror = function () {
          // store.length++;
          // _this.play();
        };
        // img.src = 'seq_0_' + (index === 0 ? 0 : index - 1) + '.png';
        if (index === 1) {
          img.src = seq_0_1
        }
        if (index === 2) {
          img.src = seq_0_2
        }
        if (index === 3) {
          img.src = seq_0_3
        }
        if (index === 4) {
          img.src = seq_0_4
        }
        if (index === 5) {
          img.src = seq_0_5
        }
        if (index === 6) {
          img.src = seq_0_6
        }
        if (index === 7) {
          img.src = seq_0_7
        }
        if (index === 8) {
          img.src = seq_0_8
        }
        if (index === 9) {
          img.src = seq_0_9
        }
      })(start);
    }

    if (step === 1) {
      _this.play(1)
    }
  }

  play(type) {
    let _this = this;

    
    // 进度
    _this.percent = Math.round(100 * 9 / _this.maxLength);
    console.log(_this.store, _this.percent)
    _this.eleLoading.setAttribute('data-percent', _this.percent);
    _this.eleLoading.style.backgroundSize = _this.percent + '% 100%';

    // 全部加载完毕，无论成功还是失败
    if (_this.percent == 100) {
      var index = _this.indexRange[0];
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
        if (index <= _this.indexRange[1]) {
          setTimeout(stepAN, 42);
        } else {
          // 本段播放结束回调
          // 我这里就放一个重新播放的按钮
          _this.eleContainer.insertAdjacentHTML('beforeEnd', '<button onclick="play()">再看一遍英姿</button>');
        }
      };
      // 等100%动画结束后执行播放
      setTimeout(stepAN, 100);
    }
  }
}

function video(step = 1) {
  new Video(step)
} 
export default video