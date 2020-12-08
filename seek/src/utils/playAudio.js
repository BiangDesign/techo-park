import { Howl } from "howler";

const audioList = [
  ["traffic", "dog", "water"]
];

export function playAudioByStep(step) {
  audioList[step].forEach(item => {
    let temp = require(`../assets/audio/${item}.mp3`);
    new Howl({
      src: [temp]
    }).play();
  });
}
