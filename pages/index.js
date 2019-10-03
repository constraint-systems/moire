import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';

function getDist(p1, p2) {
  let a = p2[0] - p1[0];
  let b = p2[1] - p1[1];
  return Math.sqrt(a * a + b * b);
}

let Home = () => {
  let canvasRef = useRef();
  let shipRef = useRef();
  let requestRef = useRef();
  let ship_position = useRef([80, 400]);
  let velocity = useRef([4, 0]);
  let angle = useRef(0);
  let keymap = useRef({});
  let playing = useRef(true);
  let [help, setHelp] = useState(true);

  function KeyTip(letter) {
    return (
      <span
        className="keytip"
        onClick={() => {
          keymap.current[letter] = true;
          keyAction(letter, false);
          keymap.current[letter] = false;
        }}
        style={{
          outline: 'solid 1px black',
          paddingLeft: '0.5ch',
          paddingRight: '0.5ch',
          textAlign: 'center',
          display: 'inline-block',
          userSelect: 'none',
          cursor: 'default',
        }}
      >
        {letter === ' ' ? 'spacebar' : letter}
      </span>
    );
  }

  const animate = time => {
    let dimensions = [window.innerWidth, window.innerHeight];

    let ctx = canvasRef.current.getContext('2d');
    let stx = shipRef.current.getContext('2d');

    requestRef.current = requestAnimationFrame(animate);

    let pw = 30;
    let ph = 20;

    let sp = ship_position.current;

    let kc = keymap.current;
    let a = 0;

    if (kc['d']) {
      angle.current += 1;
    }
    if (kc['a']) {
      angle.current -= 1;
    }

    let ac = angle.current;
    let rad = ac * (Math.PI / 180);

    function pmove(x, y) {
      ctx.moveTo(x + sp[0], y + sp[1]);
    }
    function pline(x, y) {
      ctx.lineTo(x + sp[0], y + sp[1]);
    }
    function spmove(x, y) {
      stx.moveTo(x + sp[0], y + sp[1]);
    }
    function spline(x, y) {
      stx.lineTo(x + sp[0], y + sp[1]);
    }

    function rotate(rad, ox, oy) {
      return [
        Math.cos(rad) * ox - Math.sin(rad) * oy,
        Math.sin(rad) * ox + Math.cos(rad) * oy,
      ];
    }

    let vc = velocity.current;
    let v = vc;

    let mag = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    let max = 4;
    let target = [Math.cos(rad) * max, Math.sin(rad) * max];

    if (kc['w']) {
      let diff = [target[0] - v[0], target[1] - v[1]];
      function normalize(v) {
        return [
          v[0] / Math.sqrt(v[0] * v[0] + v[1] * v[1]),
          v[1] / Math.sqrt(v[0] * v[0] + v[1] * v[1]),
        ];
      }

      let u = normalize(diff);
      let dist = getDist(target, vc);

      if (isNaN(dist)) dist = 0;
      if (isNaN(u[0])) u[0] = 0;
      if (isNaN(u[1])) u[1] = 0;

      let mult = Math.min(0.1, dist);

      let new_v = [v[0] + u[0] * mult, v[1] + u[1] * mult];

      velocity.current = new_v;
    }

    let va;
    if (v[0] > 0) {
      va = Math.atan(v[1] / v[0]) - Math.PI / 2;
    } else {
      va = Math.atan(v[1] / v[0]) + Math.PI / 2;
    }

    sp[0] += v[0];
    sp[1] += v[1];
    if (sp[0] < 0) sp[0] = dimensions[0];
    if (sp[0] > dimensions[0]) sp[0] = 0;
    if (sp[1] < 0) sp[1] = dimensions[1];
    if (sp[1] > dimensions[1]) sp[1] = 0;

    let bend = ((mag / max) * Math.PI) / 4;

    let trail_length =
      Math.sqrt(dimensions[0] * dimensions[0] + dimensions[1] + dimensions[1]) +
      20;
    ctx.beginPath();
    pmove(...rotate(rad - Math.PI - Math.PI / 8, 0, trail_length));
    pline(0, 0);
    pline(...rotate(rad + Math.PI / 8, 0, trail_length));
    ctx.stroke();

    let debug = false;
    if (debug) {
      ctx.beginPath();
      pmove(0, 0);
      pline(v[0] * 20, v[1] * 20);
      ctx.stroke();

      ctx.strokeStyle = 'red';
      ctx.beginPath();
      pmove(v[0] * 20, v[1] * 20);
      pline(0 + target[0] * 20, 0 + target[1] * 20);
      ctx.stroke();

      ctx.strokeStyle = 'green';
      ctx.beginPath();
      pmove(0, 0);
      // pline(...rotate(rad, 100, 0));
      pline(0 + target[0] * 20, 0 + target[1] * 20);
      ctx.stroke();

      ctx.strokeStyle = 'black';

      ctx.beginPath();
      ctx.arc(sp[0], sp[1], max * 20, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.fillStyle = 'black';
    if (debug && kc['w']) ctx.fillStyle = 'green';
    stx.clearRect(0, 0, ...dimensions);
    stx.fillStyle = 'black';
    stx.beginPath();
    spmove(...rotate(rad, -pw * (3 / 8), -ph / 2));
    spline(...rotate(rad, pw / 2, 0));
    spline(...rotate(rad, -pw * (3 / 8), ph / 2));
    stx.closePath();
    stx.fill();

    if (kc['w']) {
      stx.fillStyle = 'magenta';
      stx.beginPath();
      spmove(...rotate(rad, -pw * (3 / 8), -ph / 2));
      spline(...rotate(rad, -pw * 0.625, 0));
      spline(...rotate(rad, -pw * (3 / 8), ph / 2));
      stx.closePath();
      stx.fill();
    }
  };

  function keyAction(letter, repeat) {
    let c = canvasRef.current;
    let ctx = c.getContext('2d');
    if (letter === ' ' && !repeat) {
      if (playing.current) {
        cancelAnimationFrame(requestRef.current);
        playing.current = false;
      } else {
        requestRef.current = requestAnimationFrame(animate);
        playing.current = true;
      }
    } else if (letter === 'j' && !repeat) {
      let link = document.createElement('a');

      var revokeURL = function() {
        let me = this;
        requestAnimationFrame(function() {
          URL.revokeObjectURL(me.href);
          me.href = null;
        });
        this.removeEventListener('click', revokeURL);
      };

      ctx.canvas.toBlob(function(blob) {
        link.setAttribute('download', 'sliptrace.png');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.addEventListener('click', revokeURL);
        link.dispatchEvent(
          new MouseEvent(`click`, {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
      });
    } else if (letter === 'l') {
      let dimensions = [window.innerWidth, window.innerHeight];
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ...dimensions);
    } else if (letter === '?') {
      setHelp(prevState => {
        return !prevState;
      });
    }
  }

  function downHandler(e) {
    keymap.current[e.key] = true;
    keyAction(e.key, e.repeat);
    if (e.key === ' ' && !e.repeat) {
      e.preventDefault();
    }
  }

  function upHandler(e) {
    keymap.current[e.key] = false;
  }

  useEffect(() => {
    let dimensions = [window.innerWidth, window.innerHeight];

    let dpr = window.devicePixelRatio || 1;

    let c = canvasRef.current;
    let s = shipRef.current;

    c.width = dimensions[0] * dpr;
    c.height = dimensions[1] * dpr;
    c.style.width = dimensions[0] + 'px';
    c.style.height = dimensions[1] + 'px';

    let ctx = canvasRef.current.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.translate(0.5, 0.5);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ...dimensions);

    ctx.lineWidth = 1;

    s.width = dimensions[0] * dpr;
    s.height = dimensions[1] * dpr;
    s.style.width = dimensions[0] + 'px';
    s.style.height = dimensions[1] + 'px';

    let stx = shipRef.current.getContext('2d');
    stx.scale(dpr, dpr);

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Sliptrace</title>
      </Head>
      <style jsx global>{`
        @font-face {
          font-family: 'custom';
          src: url('/static/fonts/IBMPlexMono-Regular.woff2') format('woff2'),
            url('/static/fonts/IBMPlexMono-Regular.woff') format('woff');
        }
        * {
          box-sizing: border-box;
        }
        html {
          font-family: custom, monospace;
          font-size: 14px;
          line-height: 1.5;
        }
        html.loaded {
          background: #ddd;
        }
        body {
          margin: 0;
          overflow: auto;
        }
        textarea {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        p {
          margin: 0;
        }
        a {
          color: inherit;
        }
      `}</style>

      <div>
        <canvas
          style={{ position: 'absolute', left: 0, top: 0 }}
          ref={canvasRef}
        />
        <canvas
          style={{ position: 'absolute', left: 0, top: 0 }}
          ref={shipRef}
        />
        <div
          style={{
            position: 'fixed',
            outline: 'solid 1px black',
            display: help ? 'block' : 'none',
            maxWidth: `calc(100% - 3rem)`,
            background: 'rgba(255,255,255,0.8)',
            paddingLeft: '2ch',
            paddingRight: '2ch',
            paddingBottom: '1.5rem',
            paddingTop: '0.75rem',
            right: '1.5rem',
            bottom: '1.5rem',
          }}
        >
          <div style={{ marginBottom: '0.75rem', maxWidth: '60ch' }}>
            Sliptrace lets you generate angular skyscapes using{' '}
            <a
              href="https://en.wikipedia.org/wiki/Asteroids_(video_game)"
              target="_blank"
            >
              Asteroids
            </a>
            -like ship controls.
          </div>
          <div style={{ marginBottom: '0.75rem' }}>Move</div>
          <div style={{ marginBottom: '0.75rem' }}>
            {KeyTip('a')} ↪&nbsp; {KeyTip('w')} thrust&nbsp; {KeyTip('d')}{' '}
            ↩&nbsp;
          </div>
          <div style={{ marginBottom: '0.75rem' }}>Special</div>
          <div>
            {KeyTip(' ')} pause&nbsp; {KeyTip('j')} save as png&nbsp;{' '}
            {KeyTip('l')} clear&nbsp; {KeyTip('?')} help
          </div>
        </div>
      </div>
      {help ? null : (
        <div
          style={{
            position: 'fixed',
            right: '1.5rem',
            bottom: '1.5rem',
            background: 'rgba(255,255,255,0.8)',
          }}
        >
          {KeyTip('?')}
        </div>
      )}
    </div>
  );
};

export default Home;
