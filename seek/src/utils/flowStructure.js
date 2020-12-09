import { Howl } from "howler";

export const flowStructure = {
  name: 'backHome',
  scenesNums: 11,
  scenes: [
  {
    name: 'open'
  }, 
  {
    name: 'getUp',
    stories: [{
      sounds: ['ai_2_0', 'tips_2_0']
    }, {
      sounds: ['bgm_2_0']
    }]
  }, 
  {
    name: 'setOff',
    stories: [{
      sounds: ['ai_3_0', 'tips_3_0']
    }, {
      sounds: ['bgm_3_0']
    }]
  }, 
  {
    name: 'turnLeft',
    stories: [{
      sounds: ['ai_4_0', 'tips_4_0']
    }, {
      sounds: ['ai_4_1', 'tips_4_1']
    }]
  }, 
  {
    name: 'crossStreet',
    stories: [{
      sounds: ['ai_5_0', 'tips_5_0']
    }, {
      sounds: ['bgm_5_0']
    }, {
      sounds: ['ai_5_1']
    }]
  }, 
  {
    name: 'turnRight',
    stories: [{
      sounds: ['tips_6_0']
    }]
  }, 
  {
    name: 'flowerShop',
    stories: [{
      sounds: ['ai_7_0', 'tips_7_0']
    }, {
      sounds: ['bgm_7_0']
    }]
  }, {
    name: 'buyFlower',
    stories: [{
      sounds: ['boss_8_0', 'tisp_8_0']
    }, {
      sounds: ['boss_8_1', 'tips_8_1']
    }, {
      sounds: ['tips_8_2']
    }]
  }, {
    name: 'arrivedHome',
    stories: [{
      sounds: ['ai_9_0', 'tips_9_0']
    }, {
      sounds: ['bgm_9_0', 'ai_9_1']
    }]
  }]
};

const soundPauseTime = 1000;

function awaitTime(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function splicingUrl(name) {
  return `http://my-bucket-1302247330.cos-website.ap-guangzhou.myqcloud.com/voices/${name}.mp3`
}

function playAudio(audioName) {
  let audioUrl = splicingUrl(audioName);
  return new Promise(resolve => {
    let soundHowl = new Howl({
      src: [audioUrl],
      onend: function() {
        resolve(soundHowl);
      }
    });
    soundHowl.play();
  });
}

export function playPro(s, text) {
  return new Promise((resolve) => {
    let a = 2
    setTimeout(() => {
      resolve()
      console.log(text)
    }, s)
    return a
  })
}
export function playOneAudio(url) {
  return new Promise(resolve => {
    let sound = new Howl({
      src: [url],
      onend() {
        resolve(sound);
      }
    });
    sound.play();
    return sound
  })
}
// export async function playStory(scenesStep, story) {
//   return new Promise(resolve => {
//     let sounds = flowStructure.scenes[scenesStep].stories[story].sounds;
//     sounds.forEach(item => {
//       await playAudio(item);
//       await awaitTime(soundPauseTime);
//     });
//     resolve();
//   });
// }

/**
 * 
 * step: 2
 * 向前滑动，回调 clickUp curStep:0
 * 向前滑动，回调 playSummer curStep:1
 * step: 3
 * 等待左转, 回调 truanLeft curStep:2
 * step: 4
 * 向前过红绿灯，回调 crossStreetAction curStep:3
 * step: 6
 * 右转，回调 turnRightAction curStep:4
 * 上滑，进入商店 回调 flowerShop curStep:5
 * step: 7
 * 上滑买花：buyFlowerAction curStep:6
 * 长按支付：longClick curStep:7
 * step：8
 * 上滑解锁：sliderDoor curStep:8
 * 
 */