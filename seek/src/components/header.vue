<template>
  <canvas id="canvas"></canvas>
</template>
<script>
export default {
  data:function() {
    var that = this;
    return {
      canvas: null,
      ctx: null,
      w: null,
      h: null,
      laser: null,
      text: null,
      particles: null
    };
  },
  methods: {
    Laser: function (options) {
      options = options || {};
      this.lifespan = options.lifespan || Math.round(Math.random() * 20 + 20);
      this.maxlife = this.lifespan;
      this.color = options.color || '#fd2423';
      this.x = options.x || Math.random() * w;
      this.y = options.y || Math.random() * h;
      this.width = options.width || 2;

      this.update = function(index, array) {
        this.lifespan > 0 && this.lifespan--;
        this.lifespan <= 0 && this.remove(index, array);
      }

      this.render = function(ctx) {
        if (this.lifespan <= 0) return;
        ctx.beginPath();
        ctx.globalAlpha = this.lifespan / this.maxlife;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(w, this.y);
        ctx.stroke();
        ctx.closePath();
      }

      this.remove = function(index, array) {
        array.splice(index, 1);
      }
    },
    Spark: function (options) {
      options = options || {};
      this.x = options.x || this.w * 0.5;
      this.y = options.y || this.h * 0.5;
      this.v = options.v || { direct: Math.random() * Math.PI * 2, weight: Math.random() * 10 + 2, friction: 0.94 };
      this.a = options.a || { change: Math.random() * 0.2 - 0.1, min: this.v.direct - Math.PI * 0.4, max: this.v.direct + Math.PI * 0.4 };
      this.g = options.g || { direct: Math.PI * 0.5 + (Math.random() * 0.4 - 0.2), weight: Math.random() * 0.5 + 0.5 };
      this.width = options.width || Math.random() * 3;
      this.lifespan = options.lifespan || Math.round(Math.random() * 20 + 40);
      this.maxlife = this.lifespan;
      this.color = options.color || '#fdab23';
      this.prev = { x: this.x, y: this.y };

      this.update = function(index, array) {
        this.prev = { x: this.x, y: this.y };
        this.x += Math.cos(this.v.direct) * this.v.weight;
        this.x += Math.cos(this.g.direct) * this.g.weight;
        this.y += Math.sin(this.v.direct) * this.v.weight;
        this.y += Math.sin(this.g.direct) * this.g.weight;
        this.v.weight *= this.v.friction;
        this.v.direct += this.a.change;
        (this.v.direct > this.a.max || this.v.direct < this.a.min) && (this.a.change *= -1);
        this.lifespan > 0 && this.lifespan--;
        this.lifespan <= 0 && this.remove(index, array);
      }

      this.render = function(ctx) {
        if (this.lifespan <= 0) return;
        ctx.beginPath();
        ctx.globalAlpha = this.lifespan / this.maxlife;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.prev.x, this.prev.y);
        ctx.stroke();
        ctx.closePath();
      }

      this.remove = function(index, array) {
        array.splice(index, 1);
      }
    },
    Particles: function (options) {
      options = options || {};
      this.max = options.max || Math.round(Math.random() * 20 + 10);
      this.sparks = [...new Array(this.max)].map(() => new this.Spark(options));

      this.update = function() {
        this.sparks.forEach((s, i) => s.update(i, this.sparks));
      }

      this.render = function(ctx) {
        this.sparks.forEach(s => s.render(ctx));
      }
    },
    Text: function (options) {
      options = options || {};
      const pool = document.createElement('canvas');
      const buffer = pool.getContext('2d');
      pool.width = this.w;
      buffer.fillStyle = '#000000';
      buffer.fillRect(0, 0, pool.width, pool.height);

      this.size = options.size || 100;
      this.copy = (options.copy || `Hello!`) + ' ';
      this.color = options.color || '#fecd96';
      this.delay = options.delay || 4;
      this.basedelay = this.delay;
      buffer.font = `${this.size}px Comic Sans MS`;
      this.bound = buffer.measureText(this.copy);
      this.bound.height = this.size * 1.5;
      this.x = options.x || this.w * 0.5 - this.bound.width * 0.5;
      this.y = options.y || this.h * 0.5 - this.size * 0.5;

      buffer.strokeStyle = this.color;
      buffer.strokeText(this.copy, 0, this.bound.height * 0.8);
      this.data = buffer.getImageData(0, 0, this.bound.width, this.bound.height);
      this.index = 0;

      this.update = function() {
        if (this.index >= this.bound.width) {
          this.index = 0;
          return;
        }
        const data = this.data.data;
        for (let i = this.index * 4; i < data.length; i += (4 * this.data.width)) {
          const bitmap = data[i] + data[i + 1] + data[i + 2] + data[i + 3];
          if (bitmap > 255 && Math.random() > 0.86) {
            const x = this.x + this.index;
            const y = this.y + (i / this.bound.width / 4);
            this.laser.push(new this.Laser({
              x: x,
              y: y
            }));
            Math.random() > 0.7 && this.particles.push(new Particles({
              x: x,
              y: y
            }));
          }
        }
        this.delay-- < 0 && (this.index++ && (this.delay += this.basedelay));
      }

      this.render = function(ctx) {
        ctx.putImageData(this.data, this.x, this.y, 0, 0, this.index, this.bound.height);
      }
    },
    update: function () {
      this.text.update();
      this.laser.forEach((l, i) => l.update(i, this.laser));
      this.particles.forEach(p => p.update());
    },
    render: function () {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.globalAlpha = 0.9;
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.w, this.h);
      //
      this.ctx.globalCompositeOperation = 'screen';
      this.text.render(this.ctx);
      this.laser.forEach(l => l.render(this.ctx));
      this.particles.forEach(p => p.render(this.ctx));
    },
    loop: function () {
      this.update();
      this.render();
      requestAnimationFrame(this.loop);
    },
  },
  mounted() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.laser = [];
    this.particles = [];
    //
    this.text = new this.Text({
      copy: 'Anh Yêu Em!'
    });
    this.canvas.addEventListener('click', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      this.laser.push(new this.Laser({
        x: x,
        y: y
      }));
      this.particles.push(new Particles({
        x: x,
        y: y
      }));
    });
    let cb = 0;
    //
    this.loop();
  }
};
</script>

