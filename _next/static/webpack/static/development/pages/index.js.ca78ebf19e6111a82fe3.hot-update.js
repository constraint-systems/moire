webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "/Users/grant.custer/Sites/constraint-systems/moire/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;



function getDist(p1, p2) {
  var a = p2[0] - p1[0];
  var b = p2[1] - p1[1];
  return Math.sqrt(a * a + b * b);
}

var Home = function Home() {
  var canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
  var shipRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
  var requestRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
  var ship_position = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])([80, 400]);
  var velocity = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])([4, 0]);
  var angle = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(0);
  var keymap = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])({});
  var playing = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(true);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(true),
      help = _useState[0],
      setHelp = _useState[1];

  function KeyTip(letter) {
    return __jsx("span", {
      className: "keytip",
      onClick: function onClick() {
        keymap.current[letter] = true;
        keyAction(letter, false);
        setTimeout(function () {
          keymap.current[letter] = false;
        }, 200);
      },
      style: {
        outline: 'solid 1px black',
        paddingLeft: '0.5ch',
        paddingRight: '0.5ch',
        textAlign: 'center',
        display: 'inline-block',
        userSelect: 'none',
        cursor: 'default'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }, letter === ' ' ? 'spacebar' : letter);
  }

  var animate = function animate(time) {
    var dimensions = [window.innerWidth, window.innerHeight];
    var ctx = canvasRef.current.getContext('2d');
    var stx = shipRef.current.getContext('2d');
    requestRef.current = requestAnimationFrame(animate);
    var pw = 30;
    var ph = 20;
    var sp = ship_position.current;
    var kc = keymap.current;
    var a = 0;

    if (kc['d']) {
      angle.current += 1;
    }

    if (kc['a']) {
      angle.current -= 1;
    }

    var ac = angle.current;
    var rad = ac * (Math.PI / 180);

    function pmove(x, y) {
      ctx.moveTo(Math.round(x + sp[0]), Math.round(y + sp[1]));
    }

    function pline(x, y) {
      ctx.lineTo(Math.round(x + sp[0]), Math.round(y + sp[1]));
    }

    function spmove(x, y) {
      stx.moveTo(x + sp[0], y + sp[1]);
    }

    function spline(x, y) {
      stx.lineTo(x + sp[0], y + sp[1]);
    }

    function rotate(rad, ox, oy) {
      return [Math.cos(rad) * ox - Math.sin(rad) * oy, Math.sin(rad) * ox + Math.cos(rad) * oy];
    }

    var vc = velocity.current;
    var v = vc;
    var mag = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    var max = 4;
    var target = [Math.cos(rad) * max, Math.sin(rad) * max];

    if (kc['w']) {
      var normalize = function normalize(v) {
        return [v[0] / Math.sqrt(v[0] * v[0] + v[1] * v[1]), v[1] / Math.sqrt(v[0] * v[0] + v[1] * v[1])];
      };

      var diff = [target[0] - v[0], target[1] - v[1]];
      var u = normalize(diff);
      var dist = getDist(target, vc);
      if (isNaN(dist)) dist = 0;
      if (isNaN(u[0])) u[0] = 0;
      if (isNaN(u[1])) u[1] = 0;
      var mult = Math.min(0.1, dist);
      var new_v = [v[0] + u[0] * mult, v[1] + u[1] * mult];
      velocity.current = new_v;
    }

    var va;

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
    var bend = mag / max * Math.PI / 4;
    var trail_length = Math.sqrt(dimensions[0] * dimensions[0] + dimensions[1] + dimensions[1]) + 20;
    ctx.beginPath();
    pmove.apply(void 0, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(rotate(rad - Math.PI - Math.PI / 8, 0, trail_length)));
    pline(0, 0);
    pline.apply(void 0, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(rotate(rad + Math.PI / 8, 0, trail_length)));
    ctx.stroke();
    var debug = false;

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
      pmove(0, 0); // pline(...rotate(rad, 100, 0));

      pline(0 + target[0] * 20, 0 + target[1] * 20);
      ctx.stroke();
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(sp[0], sp[1], max * 20, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.fillStyle = 'black';
    if (debug && kc['w']) ctx.fillStyle = 'green';
    stx.clearRect.apply(stx, [0, 0].concat(dimensions));
    stx.fillStyle = 'black';
    stx.beginPath();
    spmove.apply(void 0, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(rotate(rad, -pw * (3 / 8), -ph / 2)));
    spline.apply(void 0, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(rotate(rad, pw / 2, 0)));
    spline.apply(void 0, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(rotate(rad, -pw * (3 / 8), ph / 2)));
    stx.closePath();
    stx.fill();

    if (kc['w']) {
      stx.fillStyle = 'magenta';
      stx.beginPath();
      spmove.apply(void 0, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(rotate(rad, -pw * (3 / 8), -ph / 2)));
      spline.apply(void 0, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(rotate(rad, -pw * 0.625, 0)));
      spline.apply(void 0, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(rotate(rad, -pw * (3 / 8), ph / 2)));
      stx.closePath();
      stx.fill();
    }
  };

  function keyAction(letter, repeat) {
    var c = canvasRef.current;
    var ctx = c.getContext('2d');

    if (letter === ' ' && !repeat) {
      if (playing.current) {
        cancelAnimationFrame(requestRef.current);
        playing.current = false;
      } else {
        requestRef.current = requestAnimationFrame(animate);
        playing.current = true;
      }
    } else if (letter === 'j' && !repeat) {
      var link = document.createElement('a');

      var revokeURL = function revokeURL() {
        var me = this;
        requestAnimationFrame(function () {
          URL.revokeObjectURL(me.href);
          me.href = null;
        });
        this.removeEventListener('click', revokeURL);
      };

      ctx.canvas.toBlob(function (blob) {
        link.setAttribute('download', 'moire.png');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.addEventListener('click', revokeURL);
        link.dispatchEvent(new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window
        }));
      });
    } else if (letter === 'l') {
      var dimensions = [window.innerWidth, window.innerHeight];
      ctx.fillStyle = 'white';
      ctx.fillRect.apply(ctx, [0, 0].concat(dimensions));
    } else if (letter === '?') {
      setHelp(function (prevState) {
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

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var dimensions = [window.innerWidth, window.innerHeight];
    var dpr = window.devicePixelRatio || 1;
    var c = canvasRef.current;
    var s = shipRef.current;
    ship_position.current = [80, dimensions[1] / 2];
    c.width = dimensions[0] * dpr;
    c.height = dimensions[1] * dpr;
    c.style.width = dimensions[0] + 'px';
    c.style.height = dimensions[1] + 'px';
    var ctx = canvasRef.current.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.translate(0.5, 0.5);
    ctx.fillStyle = 'white';
    ctx.fillRect.apply(ctx, [0, 0].concat(dimensions));
    ctx.lineWidth = 1;
    s.width = dimensions[0] * dpr;
    s.height = dimensions[1] * dpr;
    s.style.width = dimensions[0] + 'px';
    s.style.height = dimensions[1] + 'px';
    var stx = shipRef.current.getContext('2d');
    stx.scale(dpr, dpr);
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    requestRef.current = requestAnimationFrame(animate);
    return function () {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  return __jsx("div", {
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 299
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 300
    },
    __self: this
  }, __jsx("title", {
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 301
    },
    __self: this
  }, "Moire")), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: "143920748",
    __self: this
  }, "@font-face{font-family:'custom';src:url('/static/fonts/IBMPlexMono-Regular.woff2') format('woff2'), url('/static/fonts/IBMPlexMono-Regular.woff') format('woff');}*{box-sizing:border-box;}html{font-family:custom,monospace;font-size:14px;line-height:1.5;}html.loaded{background:#ddd;}body{margin:0;overflow:auto;}textarea{font-family:inherit;font-size:inherit;line-height:inherit;}p{margin:0;}a{color:inherit;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudC5jdXN0ZXIvU2l0ZXMvY29uc3RyYWludC1zeXN0ZW1zL21vaXJlL3BhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThTeUIsQUFHZ0MsQUFLQyxBQUdRLEFBS2QsQUFHUCxBQUlXLEFBS1gsQUFHSyxTQVhBLEFBU2hCLEtBR0EsRUFmQSxJQU9vQixDQW5CNEMsQ0FJaEUsQ0FZQSxNQVRpQixTQWFLLE1BWkosY0FhbEIsRUFaQSwwRkFSQSIsImZpbGUiOiIvVXNlcnMvZ3JhbnQuY3VzdGVyL1NpdGVzL2NvbnN0cmFpbnQtc3lzdGVtcy9tb2lyZS9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcblxuZnVuY3Rpb24gZ2V0RGlzdChwMSwgcDIpIHtcbiAgbGV0IGEgPSBwMlswXSAtIHAxWzBdO1xuICBsZXQgYiA9IHAyWzFdIC0gcDFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG59XG5cbmxldCBIb21lID0gKCkgPT4ge1xuICBsZXQgY2FudmFzUmVmID0gdXNlUmVmKCk7XG4gIGxldCBzaGlwUmVmID0gdXNlUmVmKCk7XG4gIGxldCByZXF1ZXN0UmVmID0gdXNlUmVmKCk7XG4gIGxldCBzaGlwX3Bvc2l0aW9uID0gdXNlUmVmKFs4MCwgNDAwXSk7XG4gIGxldCB2ZWxvY2l0eSA9IHVzZVJlZihbNCwgMF0pO1xuICBsZXQgYW5nbGUgPSB1c2VSZWYoMCk7XG4gIGxldCBrZXltYXAgPSB1c2VSZWYoe30pO1xuICBsZXQgcGxheWluZyA9IHVzZVJlZih0cnVlKTtcbiAgbGV0IFtoZWxwLCBzZXRIZWxwXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGZ1bmN0aW9uIEtleVRpcChsZXR0ZXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3NOYW1lPVwia2V5dGlwXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIGtleW1hcC5jdXJyZW50W2xldHRlcl0gPSB0cnVlO1xuICAgICAgICAgIGtleUFjdGlvbihsZXR0ZXIsIGZhbHNlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBrZXltYXAuY3VycmVudFtsZXR0ZXJdID0gZmFsc2U7XG4gICAgICAgICAgfSwgMjAwKVxuICAgICAgICB9fVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIG91dGxpbmU6ICdzb2xpZCAxcHggYmxhY2snLFxuICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMC41Y2gnLFxuICAgICAgICAgIHBhZGRpbmdSaWdodDogJzAuNWNoJyxcbiAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgICBjdXJzb3I6ICdkZWZhdWx0JyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2xldHRlciA9PT0gJyAnID8gJ3NwYWNlYmFyJyA6IGxldHRlcn1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgYW5pbWF0ZSA9IHRpbWUgPT4ge1xuICAgIGxldCBkaW1lbnNpb25zID0gW3dpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuXG4gICAgbGV0IGN0eCA9IGNhbnZhc1JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgbGV0IHN0eCA9IHNoaXBSZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgcmVxdWVzdFJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuXG4gICAgbGV0IHB3ID0gMzA7XG4gICAgbGV0IHBoID0gMjA7XG5cbiAgICBsZXQgc3AgPSBzaGlwX3Bvc2l0aW9uLmN1cnJlbnQ7XG5cbiAgICBsZXQga2MgPSBrZXltYXAuY3VycmVudDtcbiAgICBsZXQgYSA9IDA7XG5cbiAgICBpZiAoa2NbJ2QnXSkge1xuICAgICAgYW5nbGUuY3VycmVudCArPSAxO1xuICAgIH1cbiAgICBpZiAoa2NbJ2EnXSkge1xuICAgICAgYW5nbGUuY3VycmVudCAtPSAxO1xuICAgIH1cblxuICAgIGxldCBhYyA9IGFuZ2xlLmN1cnJlbnQ7XG4gICAgbGV0IHJhZCA9IGFjICogKE1hdGguUEkgLyAxODApO1xuXG4gICAgZnVuY3Rpb24gcG1vdmUoeCwgeSkge1xuICAgICAgY3R4Lm1vdmVUbyhNYXRoLnJvdW5kKHggKyBzcFswXSksIE1hdGgucm91bmQoeSArIHNwWzFdKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBsaW5lKHgsIHkpIHtcbiAgICAgIGN0eC5saW5lVG8oTWF0aC5yb3VuZCh4ICsgc3BbMF0pLCBNYXRoLnJvdW5kKHkgKyBzcFsxXSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzcG1vdmUoeCwgeSkge1xuICAgICAgc3R4Lm1vdmVUbyh4ICsgc3BbMF0sIHkgKyBzcFsxXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNwbGluZSh4LCB5KSB7XG4gICAgICBzdHgubGluZVRvKHggKyBzcFswXSwgeSArIHNwWzFdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByb3RhdGUocmFkLCBveCwgb3kpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIE1hdGguY29zKHJhZCkgKiBveCAtIE1hdGguc2luKHJhZCkgKiBveSxcbiAgICAgICAgTWF0aC5zaW4ocmFkKSAqIG94ICsgTWF0aC5jb3MocmFkKSAqIG95LFxuICAgICAgXTtcbiAgICB9XG5cbiAgICBsZXQgdmMgPSB2ZWxvY2l0eS5jdXJyZW50O1xuICAgIGxldCB2ID0gdmM7XG5cbiAgICBsZXQgbWFnID0gTWF0aC5zcXJ0KHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0pO1xuICAgIGxldCBtYXggPSA0O1xuICAgIGxldCB0YXJnZXQgPSBbTWF0aC5jb3MocmFkKSAqIG1heCwgTWF0aC5zaW4ocmFkKSAqIG1heF07XG5cbiAgICBpZiAoa2NbJ3cnXSkge1xuICAgICAgbGV0IGRpZmYgPSBbdGFyZ2V0WzBdIC0gdlswXSwgdGFyZ2V0WzFdIC0gdlsxXV07XG4gICAgICBmdW5jdGlvbiBub3JtYWxpemUodikge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHZbMF0gLyBNYXRoLnNxcnQodlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSksXG4gICAgICAgICAgdlsxXSAvIE1hdGguc3FydCh2WzBdICogdlswXSArIHZbMV0gKiB2WzFdKSxcbiAgICAgICAgXTtcbiAgICAgIH1cblxuICAgICAgbGV0IHUgPSBub3JtYWxpemUoZGlmZik7XG4gICAgICBsZXQgZGlzdCA9IGdldERpc3QodGFyZ2V0LCB2Yyk7XG5cbiAgICAgIGlmIChpc05hTihkaXN0KSkgZGlzdCA9IDA7XG4gICAgICBpZiAoaXNOYU4odVswXSkpIHVbMF0gPSAwO1xuICAgICAgaWYgKGlzTmFOKHVbMV0pKSB1WzFdID0gMDtcblxuICAgICAgbGV0IG11bHQgPSBNYXRoLm1pbigwLjEsIGRpc3QpO1xuXG4gICAgICBsZXQgbmV3X3YgPSBbdlswXSArIHVbMF0gKiBtdWx0LCB2WzFdICsgdVsxXSAqIG11bHRdO1xuXG4gICAgICB2ZWxvY2l0eS5jdXJyZW50ID0gbmV3X3Y7XG4gICAgfVxuXG4gICAgbGV0IHZhO1xuICAgIGlmICh2WzBdID4gMCkge1xuICAgICAgdmEgPSBNYXRoLmF0YW4odlsxXSAvIHZbMF0pIC0gTWF0aC5QSSAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhID0gTWF0aC5hdGFuKHZbMV0gLyB2WzBdKSArIE1hdGguUEkgLyAyO1xuICAgIH1cblxuICAgIHNwWzBdICs9IHZbMF07XG4gICAgc3BbMV0gKz0gdlsxXTtcbiAgICBpZiAoc3BbMF0gPCAwKSBzcFswXSA9IGRpbWVuc2lvbnNbMF07XG4gICAgaWYgKHNwWzBdID4gZGltZW5zaW9uc1swXSkgc3BbMF0gPSAwO1xuICAgIGlmIChzcFsxXSA8IDApIHNwWzFdID0gZGltZW5zaW9uc1sxXTtcbiAgICBpZiAoc3BbMV0gPiBkaW1lbnNpb25zWzFdKSBzcFsxXSA9IDA7XG5cbiAgICBsZXQgYmVuZCA9ICgobWFnIC8gbWF4KSAqIE1hdGguUEkpIC8gNDtcblxuICAgIGxldCB0cmFpbF9sZW5ndGggPVxuICAgICAgTWF0aC5zcXJ0KGRpbWVuc2lvbnNbMF0gKiBkaW1lbnNpb25zWzBdICsgZGltZW5zaW9uc1sxXSArIGRpbWVuc2lvbnNbMV0pICtcbiAgICAgIDIwO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBwbW92ZSguLi5yb3RhdGUocmFkIC0gTWF0aC5QSSAtIE1hdGguUEkgLyA4LCAwLCB0cmFpbF9sZW5ndGgpKTtcbiAgICBwbGluZSgwLCAwKTtcbiAgICBwbGluZSguLi5yb3RhdGUocmFkICsgTWF0aC5QSSAvIDgsIDAsIHRyYWlsX2xlbmd0aCkpO1xuICAgIGN0eC5zdHJva2UoKTtcblxuICAgIGxldCBkZWJ1ZyA9IGZhbHNlO1xuICAgIGlmIChkZWJ1Zykge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgcG1vdmUoMCwgMCk7XG4gICAgICBwbGluZSh2WzBdICogMjAsIHZbMV0gKiAyMCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZWQnO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgcG1vdmUodlswXSAqIDIwLCB2WzFdICogMjApO1xuICAgICAgcGxpbmUoMCArIHRhcmdldFswXSAqIDIwLCAwICsgdGFyZ2V0WzFdICogMjApO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnZ3JlZW4nO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgcG1vdmUoMCwgMCk7XG4gICAgICAvLyBwbGluZSguLi5yb3RhdGUocmFkLCAxMDAsIDApKTtcbiAgICAgIHBsaW5lKDAgKyB0YXJnZXRbMF0gKiAyMCwgMCArIHRhcmdldFsxXSAqIDIwKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcblxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyhzcFswXSwgc3BbMV0sIG1heCAqIDIwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgaWYgKGRlYnVnICYmIGtjWyd3J10pIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICAgIHN0eC5jbGVhclJlY3QoMCwgMCwgLi4uZGltZW5zaW9ucyk7XG4gICAgc3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgc3R4LmJlZ2luUGF0aCgpO1xuICAgIHNwbW92ZSguLi5yb3RhdGUocmFkLCAtcHcgKiAoMyAvIDgpLCAtcGggLyAyKSk7XG4gICAgc3BsaW5lKC4uLnJvdGF0ZShyYWQsIHB3IC8gMiwgMCkpO1xuICAgIHNwbGluZSguLi5yb3RhdGUocmFkLCAtcHcgKiAoMyAvIDgpLCBwaCAvIDIpKTtcbiAgICBzdHguY2xvc2VQYXRoKCk7XG4gICAgc3R4LmZpbGwoKTtcblxuICAgIGlmIChrY1sndyddKSB7XG4gICAgICBzdHguZmlsbFN0eWxlID0gJ21hZ2VudGEnO1xuICAgICAgc3R4LmJlZ2luUGF0aCgpO1xuICAgICAgc3Btb3ZlKC4uLnJvdGF0ZShyYWQsIC1wdyAqICgzIC8gOCksIC1waCAvIDIpKTtcbiAgICAgIHNwbGluZSguLi5yb3RhdGUocmFkLCAtcHcgKiAwLjYyNSwgMCkpO1xuICAgICAgc3BsaW5lKC4uLnJvdGF0ZShyYWQsIC1wdyAqICgzIC8gOCksIHBoIC8gMikpO1xuICAgICAgc3R4LmNsb3NlUGF0aCgpO1xuICAgICAgc3R4LmZpbGwoKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24ga2V5QWN0aW9uKGxldHRlciwgcmVwZWF0KSB7XG4gICAgbGV0IGMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmIChsZXR0ZXIgPT09ICcgJyAmJiAhcmVwZWF0KSB7XG4gICAgICBpZiAocGxheWluZy5jdXJyZW50KSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlcXVlc3RSZWYuY3VycmVudCk7XG4gICAgICAgIHBsYXlpbmcuY3VycmVudCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdFJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICAgICBwbGF5aW5nLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnaicgJiYgIXJlcGVhdCkge1xuICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgIHZhciByZXZva2VVUkwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwobWUuaHJlZik7XG4gICAgICAgICAgbWUuaHJlZiA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmV2b2tlVVJMKTtcbiAgICAgIH07XG5cbiAgICAgIGN0eC5jYW52YXMudG9CbG9iKGZ1bmN0aW9uKGJsb2IpIHtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ21vaXJlLnBuZycpO1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpO1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmV2b2tlVVJMKTtcbiAgICAgICAgbGluay5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBNb3VzZUV2ZW50KGBjbGlja2AsIHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmlldzogd2luZG93LFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGxldHRlciA9PT0gJ2wnKSB7XG4gICAgICBsZXQgZGltZW5zaW9ucyA9IFt3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIC4uLmRpbWVuc2lvbnMpO1xuICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnPycpIHtcbiAgICAgIHNldEhlbHAocHJldlN0YXRlID0+IHtcbiAgICAgICAgcmV0dXJuICFwcmV2U3RhdGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkb3duSGFuZGxlcihlKSB7XG4gICAga2V5bWFwLmN1cnJlbnRbZS5rZXldID0gdHJ1ZTtcbiAgICBrZXlBY3Rpb24oZS5rZXksIGUucmVwZWF0KTtcbiAgICBpZiAoZS5rZXkgPT09ICcgJyAmJiAhZS5yZXBlYXQpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cEhhbmRsZXIoZSkge1xuICAgIGtleW1hcC5jdXJyZW50W2Uua2V5XSA9IGZhbHNlO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgZGltZW5zaW9ucyA9IFt3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XTtcblxuICAgIGxldCBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgbGV0IGMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBsZXQgcyA9IHNoaXBSZWYuY3VycmVudDtcblxuICAgIHNoaXBfcG9zaXRpb24uY3VycmVudCA9IFs4MCwgZGltZW5zaW9uc1sxXSAvIDJdO1xuXG4gICAgYy53aWR0aCA9IGRpbWVuc2lvbnNbMF0gKiBkcHI7XG4gICAgYy5oZWlnaHQgPSBkaW1lbnNpb25zWzFdICogZHByO1xuICAgIGMuc3R5bGUud2lkdGggPSBkaW1lbnNpb25zWzBdICsgJ3B4JztcbiAgICBjLnN0eWxlLmhlaWdodCA9IGRpbWVuc2lvbnNbMV0gKyAncHgnO1xuXG4gICAgbGV0IGN0eCA9IGNhbnZhc1JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LnNjYWxlKGRwciwgZHByKTtcbiAgICBjdHgudHJhbnNsYXRlKDAuNSwgMC41KTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCAuLi5kaW1lbnNpb25zKTtcblxuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuXG4gICAgcy53aWR0aCA9IGRpbWVuc2lvbnNbMF0gKiBkcHI7XG4gICAgcy5oZWlnaHQgPSBkaW1lbnNpb25zWzFdICogZHByO1xuICAgIHMuc3R5bGUud2lkdGggPSBkaW1lbnNpb25zWzBdICsgJ3B4JztcbiAgICBzLnN0eWxlLmhlaWdodCA9IGRpbWVuc2lvbnNbMV0gKyAncHgnO1xuXG4gICAgbGV0IHN0eCA9IHNoaXBSZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5zY2FsZShkcHIsIGRwcik7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvd25IYW5kbGVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cEhhbmRsZXIpO1xuICAgIHJlcXVlc3RSZWYuY3VycmVudCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvd25IYW5kbGVyKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwSGFuZGxlcik7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyZXF1ZXN0UmVmLmN1cnJlbnQpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPk1vaXJlPC90aXRsZT5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnY3VzdG9tJztcbiAgICAgICAgICBzcmM6IHVybCgnL3N0YXRpYy9mb250cy9JQk1QbGV4TW9uby1SZWd1bGFyLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxuICAgICAgICAgICAgdXJsKCcvc3RhdGljL2ZvbnRzL0lCTVBsZXhNb25vLVJlZ3VsYXIud29mZicpIGZvcm1hdCgnd29mZicpO1xuICAgICAgICB9XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbCB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IGN1c3RvbSwgbW9ub3NwYWNlO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICB9XG4gICAgICAgIGh0bWwubG9hZGVkIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZGRkO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgICAgfVxuICAgICAgICB0ZXh0YXJlYSB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgICAgICAgZm9udC1zaXplOiBpbmhlcml0O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgICAgIHAge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgfVxuICAgICAgICBhIHtcbiAgICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuXG4gICAgICA8ZGl2PlxuICAgICAgICA8Y2FudmFzXG4gICAgICAgICAgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogMCB9fVxuICAgICAgICAgIHJlZj17Y2FudmFzUmVmfVxuICAgICAgICAvPlxuICAgICAgICA8Y2FudmFzXG4gICAgICAgICAgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogMCB9fVxuICAgICAgICAgIHJlZj17c2hpcFJlZn1cbiAgICAgICAgLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgIG91dGxpbmU6ICdzb2xpZCAxcHggYmxhY2snLFxuICAgICAgICAgICAgZGlzcGxheTogaGVscCA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICAgICAgICBtYXhXaWR0aDogYGNhbGMoMTAwJSAtIDNyZW0pYCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOCknLFxuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcyY2gnLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMmNoJyxcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcwLjc1cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcwLjc1cmVtJyxcbiAgICAgICAgICAgIHJpZ2h0OiAnMS41cmVtJyxcbiAgICAgICAgICAgIGJvdHRvbTogJzEuNXJlbScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMC43NXJlbScsIG1heFdpZHRoOiAnNjBjaCcgfX0+XG4gICAgICAgICAgICBNb2lyZSBsZXRzIHlvdSBnZW5lcmF0ZSBhbmd1bGFyIHNreXNjYXBlcyB1c2luZ3snICd9XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQXN0ZXJvaWRzXyh2aWRlb19nYW1lKVwiXG4gICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEFzdGVyb2lkc1xuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgLWxpa2Ugc2hpcCBjb250cm9scy5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzAuNzVyZW0nIH19Pk1vdmU8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzAuNzVyZW0nIH19PlxuICAgICAgICAgICAge0tleVRpcCgnYScpfSDihqombmJzcDsge0tleVRpcCgndycpfSB0aHJ1c3QmbmJzcDsge0tleVRpcCgnZCcpfXsnICd9XG4gICAgICAgICAgICDihqkmbmJzcDtcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzAuNzVyZW0nIH19PlNwZWNpYWw8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEuNXJlbScgfX0+XG4gICAgICAgICAgICB7S2V5VGlwKCcgJyl9IHBhdXNlJm5ic3A7IHtLZXlUaXAoJ2onKX0gc2F2ZSBhcyBwbmcmbmJzcDt7JyAnfVxuICAgICAgICAgICAge0tleVRpcCgnbCcpfSBjbGVhciZuYnNwOyB7S2V5VGlwKCc/Jyl9IGhlbHBcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9jb25zdHJhaW50LXN5c3RlbXMvbW9pcmVcIlxuICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBWaWV3IHNvdXJjZeKGl1xuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAge2hlbHAgPyBudWxsIDogKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgcmlnaHQ6ICcxLjVyZW0nLFxuICAgICAgICAgICAgYm90dG9tOiAnMS41cmVtJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOCknLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7S2V5VGlwKCc/Jyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXX0= */\n/*@ sourceURL=/Users/grant.custer/Sites/constraint-systems/moire/pages/index.js */"), __jsx("div", {
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 337
    },
    __self: this
  }, __jsx("canvas", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0
    },
    ref: canvasRef,
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 338
    },
    __self: this
  }), __jsx("canvas", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0
    },
    ref: shipRef,
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 342
    },
    __self: this
  }), __jsx("div", {
    style: {
      position: 'fixed',
      outline: 'solid 1px black',
      display: help ? 'block' : 'none',
      maxWidth: "calc(100% - 3rem)",
      background: 'rgba(255,255,255,0.8)',
      paddingLeft: '2ch',
      paddingRight: '2ch',
      paddingBottom: '0.75rem',
      paddingTop: '0.75rem',
      right: '1.5rem',
      bottom: '1.5rem'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 346
    },
    __self: this
  }, __jsx("div", {
    style: {
      marginBottom: '0.75rem',
      maxWidth: '60ch'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 361
    },
    __self: this
  }, "Moire lets you generate angular skyscapes using", ' ', __jsx("a", {
    href: "https://en.wikipedia.org/wiki/Asteroids_(video_game)",
    target: "_blank",
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 363
    },
    __self: this
  }, "Asteroids"), "-like ship controls."), __jsx("div", {
    style: {
      marginBottom: '0.75rem'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 371
    },
    __self: this
  }, "Move"), __jsx("div", {
    style: {
      marginBottom: '0.75rem'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 372
    },
    __self: this
  }, KeyTip('a'), " \u21AA\xA0 ", KeyTip('w'), " thrust\xA0 ", KeyTip('d'), ' ', "\u21A9\xA0"), __jsx("div", {
    style: {
      marginBottom: '0.75rem'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 376
    },
    __self: this
  }, "Special"), __jsx("div", {
    style: {
      marginBottom: '1.5rem'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 377
    },
    __self: this
  }, KeyTip(' '), " pause\xA0 ", KeyTip('j'), " save as png\xA0", ' ', KeyTip('l'), " clear\xA0 ", KeyTip('?'), " help"), __jsx("div", {
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 381
    },
    __self: this
  }, __jsx("a", {
    href: "https://github.com/constraint-systems/moire",
    target: "_blank",
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 382
    },
    __self: this
  }, "View source\u2197")))), help ? null : __jsx("div", {
    style: {
      position: 'fixed',
      right: '1.5rem',
      bottom: '1.5rem',
      background: 'rgba(255,255,255,0.8)'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 392
    },
    __self: this
  }, KeyTip('?')));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.ca78ebf19e6111a82fe3.hot-update.js.map