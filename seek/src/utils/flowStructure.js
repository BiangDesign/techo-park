import { Howl } from "howler";

const flowStructure = {
  name: 'backHome',
  scenesNums: 11,
  scenes: [{
    name: 'open'
  }, {
    name: 'getUp',
    stories: [{
      sounds: ['ai_2_0', 'tips_2_0']
    }, {
      sounds: ['bgm_2_0']
    }]
  }, {
    name: 'setOff',
    stories: [{
      sounds: ['ai_3_0', 'tips_3_0']
    }, {
      sounds: ['bgm_3_0']
    }]
  }, {
    name: 'turnLeft',
    stories: [{
      sounds: ['ai_4_0', 'tips_4_0']
    }, {
      sounds: ['ai_4_1', 'tips_4_1']
    }]
  }, {
    name: 'crossStreet',
    stories: [{
      sounds: ['ai_5_0', 'tips_5_0']
    }, {
      sounds: ['bgm_5_0']
    }, {
      sounds: ['ai_5_1']
    }]
  }, {
    name: 'turnRight',
    stories: [{
      sounds: ['tips_6_0']
    }]
  }, {
    name: 'flowerShop',
    stories: [{
      sounds: ['ai_7_0', 'tips_7_0']
    }, {
      sounds: ['bgm_7_0']
    }]
  }, {
    name: 'buyFlower',
    stories: [{
      sounds: ['boss_8_0', 'tips_8_0']
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
      sounds: ['bgm_9_1', 'ai_9_1']
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

export async function playStory(scenesStep, story) {
  return new Promise(resolve => {
    let sounds = flowStructure.scenes[scenesStep].stories[story].sounds;
    sounds.forEach(item => {
      await playAudio(item);
      await awaitTime(soundPauseTime);
    });
    resolve();
  });
}