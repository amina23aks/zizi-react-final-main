import React, { useState, useRef, useEffect } from 'react';
import '../GiftBox.css';

const GiftBox = () => {
  const [opened, setOpened] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const handleToggle = () => {
    setOpened(!opened);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (opened) {
      audio.play().catch(err => console.error("Audio play failed", err));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [opened]);

  useEffect(() => {
    if (!opened) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const w = (canvas.width = 300);
    const h = (canvas.height = 200);
    const hw = w / 2;
    const hh = h / 2;

    const opts = {
      strings: ['HAPPY', 'BIRTHDAY!'],
      charSize: 16,
      charSpacing: 20,
      lineHeight: 25,
      fireworkPrevPoints: 6,
      fireworkBaseLineWidth: 2,
      fireworkAddedLineWidth: 3,
      fireworkSpawnTime: 200,
      fireworkBaseReachTime: 30,
      fireworkAddedReachTime: 30,
      gravity: 0.08,
      upFlow: -0.1,
      letterContemplatingWaitTime: 360,
      balloonSpawnTime: 20,
      balloonBaseInflateTime: 10,
      balloonAddedInflateTime: 10,
      balloonBaseSize: 10,
      balloonAddedSize: 5,
      balloonBaseVel: 0.2,
      balloonAddedVel: 0.2,
      balloonBaseRadian: -(Math.PI / 2 - 0.5),
      balloonAddedRadian: -1,
    };

    const Tau = Math.PI * 2;
    const TauQuarter = Tau / 4;
    const calc = {
      totalWidth: opts.charSpacing * Math.max(opts.strings[0].length, opts.strings[1].length),
    };
    const letters = [];

    function Letter(char, x, y) {
      this.char = char;
      this.x = x;
      this.y = y;
      this.dx = -ctx.measureText(char).width / 2;
      this.dy = opts.charSize / 2;
      this.fireworkDy = this.y - hh;

      const hue = (x / calc.totalWidth) * 360;
      this.color = `hsl(${hue},80%,50%)`;
      this.alphaColor = `hsla(${hue},80%,50%,alp)`;

      this.reset();
    }

    Letter.prototype.reset = function () {
      this.phase = 'firework';
      this.tick = 0;
      this.spawned = false;
      this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
      this.reachTime = (opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random()) | 0;
      this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
      this.prevPoints = [[0, hh, 0]];
    };

    Letter.prototype.step = function () {
      if (this.phase === 'firework') {
        if (!this.spawned) {
          ++this.tick;
          if (this.tick >= this.spawningTime) {
            this.tick = 0;
            this.spawned = true;
          }
        } else {
          ++this.tick;
          const linearProportion = this.tick / this.reachTime;
          const armonicProportion = Math.sin(linearProportion * TauQuarter);
          const x = linearProportion * this.x;
          const y = hh + armonicProportion * this.fireworkDy;

          if (this.prevPoints.length > opts.fireworkPrevPoints) this.prevPoints.shift();
          this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

          const lineWidthProportion = 1 / (this.prevPoints.length - 1);
          for (let i = 1; i < this.prevPoints.length; ++i) {
            const point = this.prevPoints[i];
            const point2 = this.prevPoints[i - 1];
            ctx.strokeStyle = this.alphaColor.replace('alp', i / this.prevPoints.length);
            ctx.lineWidth = point[2] * lineWidthProportion * i;
            ctx.beginPath();
            ctx.moveTo(point[0], point[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.stroke();
          }

          if (this.tick >= this.reachTime) {
            this.phase = 'contemplate';
            this.wait = opts.letterContemplatingWaitTime;
          }
        }
      } else if (this.phase === 'contemplate') {
        ctx.fillStyle = this.color;
        ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
        if (--this.wait <= 0) {
          this.phase = 'inflate';
          this.inflation = 0;
        }
      } else if (this.phase === 'inflate') {
        this.inflation += 0.02;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y - 10 * this.inflation, 10 * this.inflation, 0, Tau);
        ctx.fill();

        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - 10 * this.inflation);
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

        if (this.inflation >= 1) {
          this.phase = 'balloon';
          const rad = opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random();
          const vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();
          this.vx = Math.cos(rad) * vel;
          this.vy = Math.sin(rad) * vel;
        }
      } else if (this.phase === 'balloon') {
        this.x += this.vx;
        this.y += this.vy;

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, 10, 0, Tau);
        ctx.fill();

        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 20);
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
      }
    };

    function init() {
      ctx.font = `${opts.charSize}px Verdana`;
      letters.length = 0;
      for (let i = 0; i < opts.strings.length; ++i) {
        for (let j = 0; j < opts.strings[i].length; ++j) {
          letters.push(
            new Letter(
              opts.strings[i][j],
              j * opts.charSpacing + opts.charSpacing / 2 - (opts.strings[i].length * opts.charSize) / 2,
              i * opts.lineHeight + opts.lineHeight / 2 - (opts.strings.length * opts.lineHeight) / 2
            )
          );
        }
      }
      requestAnimationFrame(anim);
    }

    function anim() {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(hw, hh);
      for (const l of letters) l.step();
      ctx.restore();
      requestAnimationFrame(anim);
    }

    init();
  }, [opened]);

  return (
    <div className="box">
      <input
        type="checkbox"
        id="gift-toggle"
        checked={opened}
        onChange={handleToggle}
        hidden
      />
      <div className="gift-container">
        <label htmlFor="gift-toggle" className={`lid-wrapper ${opened ? 'hidden' : ''}`}>
          <div className={`gift-lid ${opened ? 'opened' : ''}`}>
            <div className="box-tape">
              <div className="box-tape-left"></div>
              <div className="box-tape-right"></div>
              <div className="box-tape-center"></div>
            </div>
          </div>
        </label>
        <div className={`gift-lid ${opened ? 'opened' : ''}`}></div>
      </div>
      <div className="box-gifts">
        <div className="box-gift-shadow"></div>
      </div>

      {/* Fireworks + audio */}
      <div className={`animation-section ${opened ? 'visible' : ''}`}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <audio ref={audioRef} src="/aud.mp3" />
    </div>
  );
};

export default GiftBox;
