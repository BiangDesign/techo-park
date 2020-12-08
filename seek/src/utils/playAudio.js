import { Howl } from "howler";


export function playAudioByStep(step) {
  audioList[step].forEach(item => {
    let temp = require(`../assets/audio/${item}.mp3`);
    new Howl({
      src: [temp]
    }).play();
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

export function playBackStop(url) {
  return new Promise(resolve => {
    let sound = new Howl({
      src: [url]
    });
    sound.play();
    resolve(sound)
    return sound
  })
}
export const audioList = [
  {
    ai: 'open'
  },
  {
    ai: ['ai_0_0'],
    tips: ['tips_0_0'],
    bg: ['bg_0_0']
  },
  {
    ai: ['ai_1_0'],
    tips: ['tips_1_0'],
    bg: ['bg_1_0', 'bg_1_1']
  },
  {
    ai: ['ai_2_0', 'ai_2_1'],
    tips: ['tips_2_0', 'tips_2_1']
  },
  {
    ai: ['ai_3_0', 'ai_3_1'],
    tips: ['tips_3_0'],
    bg: ['bg_3_0']
  },
  {
    tips: ['tips_4_0']
  },
  {
    ai: ['ai_5_0', 'ai_5_1'],
    tips: ['tips_5_0'],
    bg: ['bg_5_0'],
    boss: ['boss_5_0']
  },
  {
    ai: ['ai_6_0'],
    tips: ['tips_6_0', 'tips_6_1'],
    boss: ['boss_6_0'],
    user: ['user_6_0']
  },
  {
    ai: ['ai_7_0', 'ai_7_1'],
    tips: ['tips_7_0'],
    bg: ['bg_7_0']
  },
];