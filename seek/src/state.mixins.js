import {playPro, audioList, playOneAudio, playBackStop} from './utils/playAudio'
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
      const url = audioList[this.step].ai
      await playOneAudio(this.prefix(url))
      this.canClick = true
      this.step = 1
      // 等待点击屏幕
    },
    /**点击屏幕 */
    async clickScreen() {
      this.canClick = false
      // 播放背景音乐
      // const back1Url = audioList[this.step].bg[0]
      // this.back1 = await playOneAudio(this.prefix(back1Url))
      const aiUrl = audioList[this.step].ai[0]
      await playOneAudio(this.prefix(aiUrl))
      const tipUrl = audioList[this.step].tips[0]
      await playOneAudio(this.prefix(tipUrl))
      // await playPro(1000, 'Hi，小明，你终于睡醒了，我们已经来公园玩了两个小时了，得回家啦，刚才妈妈发来消息说中午做了你最爱吃的红烧肉，快点站起来走啦')
      // await playPro(1000, '已规划好回家路线，大约需要十分钟，向前滑动屏幕前进')
      this.step = 2
      this.canClick = true
      // 等待向前滑动...
    },
    /**step2: 如意调用向前滑动 */
    async clickUp() {
      this.canClick = false
      const aiUrl = audioList[this.step].ai[0]
      await playOneAudio(this.prefix(aiUrl))
      // 开始播放宁夏
      const tipUrl = audioList[this.step].tips[0]
      await playOneAudio(this.prefix(tipUrl))
      // 播放歌曲
      const back1Url = audioList[this.step].bg[0]
      this.back2 = await playBackStop(this.prefix(back1Url))
      // 环境音
      const back2Url = audioList[this.step].bg[1]
      this.back3 = await playBackStop(this.prefix(back2Url))
      // 这里存疑
      // 播放宁夏
      // this.back2 = await playPro(0, '播放宁夏')
      // this.back3 = await playPro(0, '打闹背景')
      this.step = 3
      this.TreeWalker()
    },
    /**step4:继续向前 */
    async TreeWalker() {
      
      await sleep(5000)
      const aiUrl1 = audioList[this.step].ai[0]
      await playOneAudio(this.prefix(aiUrl1))
      const tip1 = audioList[this.step].tips[0]
      await playOneAudio(this.prefix(tip1))
      this.canClick = true
      // 等待向左滑动
    },
    /**step4: 左边滑动 */
    async clickLeft() {
      this.canClick = false
      this.back2.stop()
      this.back3.stop()
      const aiUrl2 = audioList[this.step].ai[1]
      await playOneAudio(this.prefix(aiUrl2))
      const tip2 = audioList[this.step].tips[1]
      await playOneAudio(this.prefix(tip2))
      await playPro(1000, '好棒，躲开了垃圾桶')
      this.step = 4
      this.throughRood()
    },
    /**step5: 过马路 */
    async throughRood() {
      
      // 滴滴马路声音
      const back1Url = audioList[this.step].bg[0]
      this.back4 = await playBackStop(this.prefix(back1Url))
      // 一会儿要过马路了，这次勇敢一些哈，有我呢，不害怕
      const aiUrl1 = audioList[this.step].ai[0]
      await playOneAudio(this.prefix(aiUrl1))
      // 前方人行道红灯，倒计时，5，4，3，2，1，请前进
      const tip1 = audioList[this.step].tips[0]
      await playOneAudio(this.prefix(tip1))
      // 等待向上滑动
      this.canClick = true
    },
    // step5: 如意调用前进
    async throughRoodFinish() {
      this.canClick = false
      // 小明好棒，我们又完成了一次大冒险，没那么难吧，相信我哦，过马路易如反掌，哈哈哈哈
      const aiUrl2 = audioList[this.step].ai[1]
      await playOneAudio(this.prefix(aiUrl2))
      this.trueRight()
    },
    // step6:
    async trueRight() {
      this.step = 5
      const tip1 = audioList[this.step].tips[0]
      await playOneAudio(this.prefix(tip1))
      // 等待屏幕向右边滑动
      this.canClick = true
    },
    // step6: 如意调用向右
    async stepSixRight() {
      this.canClick = false
      this.step = 6
      // 马上要到那个漂亮小姐姐的花店了，今天给妈妈带什么花回去呢
      const aiUrl1 = audioList[this.step].ai[0]
      await playOneAudio(this.prefix(aiUrl1))
      // 距离花店五米，四米，三米，两米，一米，到达花店
      const tip1 = audioList[this.step].tips[0]
      await playOneAudio(this.prefix(tip1))

      // 花店背景
      const back1Url = audioList[this.step].bg[0]
      this.back4 = await playBackStop(this.prefix(back1Url))
      // 偷偷告诉你，小姐姐今天穿着一条粉色的长裙，还是那么漂亮，嘿嘿嘿。。。
      const aiUrl2 = audioList[this.step].ai[1]
      await playOneAudio(this.prefix(aiUrl2))
      // 女声：小明你来啦，今天要买什么花呀
      const bossUrl = audioList[this.step].boss[0]
      await playOneAudio(this.prefix(bossUrl))
      this.buyFlower();
    },
    async buyFlower() {
      this.step = 7
      // 前面这束白色的百合非常漂亮，左边的玫瑰花也不错，红色的，妈妈一定喜欢
      const aiUrl1 = audioList[this.step].ai[0]
      await playOneAudio(this.prefix(aiUrl1))
      // 女声：那我帮你把这束玫瑰包起来啦，一共68块
      const bossUrl = audioList[this.step].boss[0]
      await playOneAudio(this.prefix(bossUrl))
      // 花香物语向你发来支付请求，68元，点说出“确认支付”,长按屏幕
      const tip1 = audioList[this.step].tips[0]
      await playOneAudio(this.prefix(tip1))
      this.canClick = true
    },
    // step8: 如意调用长按语音
    async longTouch() {
      this.canClick = false
      await sleep(1000)
      const tip2 = audioList[this.step].tips[1]
      await playOneAudio(this.prefix(tip2))
      await sleep(1000)
      this.goHome()
    },
    async goHome() {
      this.step = 8
      // 开心，马上到家咯 上台阶了，这里你最熟悉了，自己来吧
      const aiUrl1 = audioList[this.step].ai[0]
      await playOneAudio(this.prefix(aiUrl1))

      const back1Url = audioList[this.step].bg[0]
      await playOneAudio(this.prefix(back1Url))
      await sleep(1000)
      // 已唤醒门锁
      const tip1 = audioList[this.step].tips[0]
      await playOneAudio(this.prefix(tip1))
      // 小明快去洗手吃饭吧，我也得充电了，开心的一天～
      const aiUrl2 = audioList[this.step].ai[1]
      await playOneAudio(this.prefix(aiUrl2))


    },
    async throughUp() {
      await playPro(2000, '小明好棒，我们又完成了一次大冒险，没那么难吧，相信我哦，过马路易如反掌，哈哈哈哈')
      this.step = 6
    }

  }
}