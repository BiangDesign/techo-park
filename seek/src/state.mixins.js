import {playPro , playBackStop, playOneAudio} from './utils/playAudio'
import {flowStructure, } from './utils/flowStructure'

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}
export default {
  data() {
    return {
      step: 0,
      curStep: -1,
      canClick: true,
      isFinish: false,
      // 公园背景
      back1: null,
      // 宁夏
      back2: null,
      // 打闹
      back3: null,
      // 车流
      back4: null,
    }
  },
  methods: {
    prefix(names) {
      return `http://my-bucket-1302247330.cos-website.ap-guangzhou.myqcloud.com/voices/${names}.mp3`
    },
    /**开始 */
    async start() {
      // 这是一次声音的实验，我们要求您佩戴好耳机，跟随我们的脚步一起进入一段轻松的旅程
      this.canClick = true
      this.step = 1
      // 等待点击屏幕
    },
    /**点击屏幕 */
    async clickScreen() {
      const stories = flowStructure.scenes[this.step].stories
      const storie = stories[0]
      console.log(storie)
      for(let item in stories[1].sounds) {
        console.log(item)
        sleep(1000)
        await playOneAudio(stories[1].sounds[item])
      }
      for(let item in storie.sounds) {
        console.log(item)
        sleep(1000)
        await playOneAudio(storie.sounds[item])
      }
      this.step = 2
      this.canClick = true
      this.curStep++
    },
    async clickUp() {
      this.canClick = false
      const stories = flowStructure.scenes[this.step].stories
      const storie = stories[0]
      console.log(storie)
      for(let item in storie.sounds) {
        console.log(item)
        sleep(1000)
        await playOneAudio(storie.sounds[item])
      }
      this.canClick = true
      this.curStep++
    },
    /**step2 向前滑动播放宁夏 */
    async playSummer() {
      this.canClick = false
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[1].sounds) {
        console.log(stories[1].sounds[item])
        sleep(1000)
        await playOneAudio(stories[1].sounds[item])
      }
      this.step = 3
      this.rubbish()
    },
    // 垃圾桶
    async rubbish() {
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[0].sounds) {
        console.log(stories[0].sounds[item])
        sleep(1000)
        await playOneAudio(stories[0].sounds[item])
      }
      // 等待如意左转
      this.canClick = true
      this.curStep++
    },
    async truanLeft() {
      this.canClick = false
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[1].sounds) {
        console.log(stories[1].sounds[item])
        sleep(1000)
        await playOneAudio(stories[1].sounds[item])
      }
      this.step = 4
      this.crossStreet()
    },
    async crossStreet() {
      const stories = flowStructure.scenes[this.step].stories

      for(let item in stories[1].sounds) {
        console.log(stories[1].sounds[item])
        sleep(1000)
        await playOneAudio(stories[1].sounds[item])
      }
      
      for(let item in stories[0].sounds) {
        console.log(stories[0].sounds[item])
        sleep(1000)
        await playOneAudio(stories[0].sounds[item])
      }
      // 等待如意调用过红绿灯
      this.canClick = true
      this.curStep++
    },
    async crossStreetAction() {
      this.canClick = false
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[2].sounds) {
        console.log(stories[2].sounds[item])
        sleep(1000)
        await playOneAudio(stories[2].sounds[item])
      }
      this.step = 5
      this.turnRight()
    },
    async turnRight() {
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[0].sounds) {
        console.log(stories[0].sounds[item])
        sleep(1000)
        await playOneAudio(stories[0].sounds[item])
      }

      // 等待如意右边转
      this.canClick = true
      this.step = 6
      this.curStep++
    },
    // 调用成功，进入花店
    async turnRightAction() {
      this.canClick = false
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[0].sounds) {
        console.log(stories[0].sounds[item])
        sleep(1000)
        await playOneAudio(stories[0].sounds[item])
      }
      this.canClick = true
      this.curStep++
    },
    // 进商店，播放背景音乐
    async flowerShop() {
      this.canClick = false
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[1].sounds) {
        sleep(1000)
        await playOneAudio(stories[1].sounds[item])
      }
      this.step = 7
      this.buyFlower()
    },
    async buyFlower() {
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[0].sounds) {
        console.log(stories[0].sounds[item])
        sleep(1000)
        await playOneAudio(stories[0].sounds[item])
      }
      this.canClick = true
      this.curStep++
    },
    async buyFlowerAction() {
      this.canClick = false
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[1].sounds) {
        console.log(stories[1].sounds[item])
        sleep(1000)
        await playOneAudio(stories[1].sounds[item])
      }
      this.canClick = true
      this.curStep++
    },
    // 支付成功
    async longClick() {
      this.canClick = false
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[2].sounds) {
        console.log(stories[2].sounds[item])
        sleep(1000)
        await playOneAudio(stories[2].sounds[item])
      }
      this.step = 8
      this.goHome()
    },
    async goHome() {
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[0].sounds) {
        console.log(stories[0].sounds[item])
        sleep(1000)
        await playOneAudio(stories[0].sounds[item])
      }
      // 向前滑动唤醒门锁
      this.canClick = true
      this.curStep++
    },
    async sliderDoor() {
      this.canClick = false
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[1].sounds) {
        console.log(stories[1].sounds[item])
        sleep(1000)
        await playOneAudio(stories[1].sounds[item])
      }
      this.step = 9
      this.curStep++
      this.ending()
    },
    // 上滑屏幕回顾小明走过的路
    async ending() {
      const stories = flowStructure.scenes[this.step].stories
      for(let item in stories[0].sounds) {
        console.log(stories[0].sounds[item])
        sleep(1000)
        await playOneAudio(stories[0].sounds[item])
      }
      this.canClick = true
    },
  }
}