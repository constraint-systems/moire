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
        keymap.current[letter] = false;
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
    ship_position.current = [40, height / 2];
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
      lineNumber: 297
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 298
    },
    __self: this
  }, __jsx("title", {
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 299
    },
    __self: this
  }, "Moire")), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: "143920748",
    __self: this
  }, "@font-face{font-family:'custom';src:url('/static/fonts/IBMPlexMono-Regular.woff2') format('woff2'), url('/static/fonts/IBMPlexMono-Regular.woff') format('woff');}*{box-sizing:border-box;}html{font-family:custom,monospace;font-size:14px;line-height:1.5;}html.loaded{background:#ddd;}body{margin:0;overflow:auto;}textarea{font-family:inherit;font-size:inherit;line-height:inherit;}p{margin:0;}a{color:inherit;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudC5jdXN0ZXIvU2l0ZXMvY29uc3RyYWludC1zeXN0ZW1zL21vaXJlL3BhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRTeUIsQUFHZ0MsQUFLQyxBQUdRLEFBS2QsQUFHUCxBQUlXLEFBS1gsQUFHSyxTQVhBLEFBU2hCLEtBR0EsRUFmQSxJQU9vQixDQW5CNEMsQ0FJaEUsQ0FZQSxNQVRpQixTQWFLLE1BWkosY0FhbEIsRUFaQSwwRkFSQSIsImZpbGUiOiIvVXNlcnMvZ3JhbnQuY3VzdGVyL1NpdGVzL2NvbnN0cmFpbnQtc3lzdGVtcy9tb2lyZS9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcblxuZnVuY3Rpb24gZ2V0RGlzdChwMSwgcDIpIHtcbiAgbGV0IGEgPSBwMlswXSAtIHAxWzBdO1xuICBsZXQgYiA9IHAyWzFdIC0gcDFbMV07XG4gIHJldHVybiBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG59XG5cbmxldCBIb21lID0gKCkgPT4ge1xuICBsZXQgY2FudmFzUmVmID0gdXNlUmVmKCk7XG4gIGxldCBzaGlwUmVmID0gdXNlUmVmKCk7XG4gIGxldCByZXF1ZXN0UmVmID0gdXNlUmVmKCk7XG4gIGxldCBzaGlwX3Bvc2l0aW9uID0gdXNlUmVmKFs4MCwgNDAwXSk7XG4gIGxldCB2ZWxvY2l0eSA9IHVzZVJlZihbNCwgMF0pO1xuICBsZXQgYW5nbGUgPSB1c2VSZWYoMCk7XG4gIGxldCBrZXltYXAgPSB1c2VSZWYoe30pO1xuICBsZXQgcGxheWluZyA9IHVzZVJlZih0cnVlKTtcbiAgbGV0IFtoZWxwLCBzZXRIZWxwXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGZ1bmN0aW9uIEtleVRpcChsZXR0ZXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3NOYW1lPVwia2V5dGlwXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIGtleW1hcC5jdXJyZW50W2xldHRlcl0gPSB0cnVlO1xuICAgICAgICAgIGtleUFjdGlvbihsZXR0ZXIsIGZhbHNlKTtcbiAgICAgICAgICBrZXltYXAuY3VycmVudFtsZXR0ZXJdID0gZmFsc2U7XG4gICAgICAgIH19XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgb3V0bGluZTogJ3NvbGlkIDFweCBibGFjaycsXG4gICAgICAgICAgcGFkZGluZ0xlZnQ6ICcwLjVjaCcsXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMC41Y2gnLFxuICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgICAgICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7bGV0dGVyID09PSAnICcgPyAnc3BhY2ViYXInIDogbGV0dGVyfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICBjb25zdCBhbmltYXRlID0gdGltZSA9PiB7XG4gICAgbGV0IGRpbWVuc2lvbnMgPSBbd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodF07XG5cbiAgICBsZXQgY3R4ID0gY2FudmFzUmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBsZXQgc3R4ID0gc2hpcFJlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG5cbiAgICByZXF1ZXN0UmVmLmN1cnJlbnQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cbiAgICBsZXQgcHcgPSAzMDtcbiAgICBsZXQgcGggPSAyMDtcblxuICAgIGxldCBzcCA9IHNoaXBfcG9zaXRpb24uY3VycmVudDtcblxuICAgIGxldCBrYyA9IGtleW1hcC5jdXJyZW50O1xuICAgIGxldCBhID0gMDtcblxuICAgIGlmIChrY1snZCddKSB7XG4gICAgICBhbmdsZS5jdXJyZW50ICs9IDE7XG4gICAgfVxuICAgIGlmIChrY1snYSddKSB7XG4gICAgICBhbmdsZS5jdXJyZW50IC09IDE7XG4gICAgfVxuXG4gICAgbGV0IGFjID0gYW5nbGUuY3VycmVudDtcbiAgICBsZXQgcmFkID0gYWMgKiAoTWF0aC5QSSAvIDE4MCk7XG5cbiAgICBmdW5jdGlvbiBwbW92ZSh4LCB5KSB7XG4gICAgICBjdHgubW92ZVRvKE1hdGgucm91bmQoeCArIHNwWzBdKSwgTWF0aC5yb3VuZCh5ICsgc3BbMV0pKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGxpbmUoeCwgeSkge1xuICAgICAgY3R4LmxpbmVUbyhNYXRoLnJvdW5kKHggKyBzcFswXSksIE1hdGgucm91bmQoeSArIHNwWzFdKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNwbW92ZSh4LCB5KSB7XG4gICAgICBzdHgubW92ZVRvKHggKyBzcFswXSwgeSArIHNwWzFdKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3BsaW5lKHgsIHkpIHtcbiAgICAgIHN0eC5saW5lVG8oeCArIHNwWzBdLCB5ICsgc3BbMV0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZShyYWQsIG94LCBveSkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgTWF0aC5jb3MocmFkKSAqIG94IC0gTWF0aC5zaW4ocmFkKSAqIG95LFxuICAgICAgICBNYXRoLnNpbihyYWQpICogb3ggKyBNYXRoLmNvcyhyYWQpICogb3ksXG4gICAgICBdO1xuICAgIH1cblxuICAgIGxldCB2YyA9IHZlbG9jaXR5LmN1cnJlbnQ7XG4gICAgbGV0IHYgPSB2YztcblxuICAgIGxldCBtYWcgPSBNYXRoLnNxcnQodlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSk7XG4gICAgbGV0IG1heCA9IDQ7XG4gICAgbGV0IHRhcmdldCA9IFtNYXRoLmNvcyhyYWQpICogbWF4LCBNYXRoLnNpbihyYWQpICogbWF4XTtcblxuICAgIGlmIChrY1sndyddKSB7XG4gICAgICBsZXQgZGlmZiA9IFt0YXJnZXRbMF0gLSB2WzBdLCB0YXJnZXRbMV0gLSB2WzFdXTtcbiAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZSh2KSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgdlswXSAvIE1hdGguc3FydCh2WzBdICogdlswXSArIHZbMV0gKiB2WzFdKSxcbiAgICAgICAgICB2WzFdIC8gTWF0aC5zcXJ0KHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0pLFxuICAgICAgICBdO1xuICAgICAgfVxuXG4gICAgICBsZXQgdSA9IG5vcm1hbGl6ZShkaWZmKTtcbiAgICAgIGxldCBkaXN0ID0gZ2V0RGlzdCh0YXJnZXQsIHZjKTtcblxuICAgICAgaWYgKGlzTmFOKGRpc3QpKSBkaXN0ID0gMDtcbiAgICAgIGlmIChpc05hTih1WzBdKSkgdVswXSA9IDA7XG4gICAgICBpZiAoaXNOYU4odVsxXSkpIHVbMV0gPSAwO1xuXG4gICAgICBsZXQgbXVsdCA9IE1hdGgubWluKDAuMSwgZGlzdCk7XG5cbiAgICAgIGxldCBuZXdfdiA9IFt2WzBdICsgdVswXSAqIG11bHQsIHZbMV0gKyB1WzFdICogbXVsdF07XG5cbiAgICAgIHZlbG9jaXR5LmN1cnJlbnQgPSBuZXdfdjtcbiAgICB9XG5cbiAgICBsZXQgdmE7XG4gICAgaWYgKHZbMF0gPiAwKSB7XG4gICAgICB2YSA9IE1hdGguYXRhbih2WzFdIC8gdlswXSkgLSBNYXRoLlBJIC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmEgPSBNYXRoLmF0YW4odlsxXSAvIHZbMF0pICsgTWF0aC5QSSAvIDI7XG4gICAgfVxuXG4gICAgc3BbMF0gKz0gdlswXTtcbiAgICBzcFsxXSArPSB2WzFdO1xuICAgIGlmIChzcFswXSA8IDApIHNwWzBdID0gZGltZW5zaW9uc1swXTtcbiAgICBpZiAoc3BbMF0gPiBkaW1lbnNpb25zWzBdKSBzcFswXSA9IDA7XG4gICAgaWYgKHNwWzFdIDwgMCkgc3BbMV0gPSBkaW1lbnNpb25zWzFdO1xuICAgIGlmIChzcFsxXSA+IGRpbWVuc2lvbnNbMV0pIHNwWzFdID0gMDtcblxuICAgIGxldCBiZW5kID0gKChtYWcgLyBtYXgpICogTWF0aC5QSSkgLyA0O1xuXG4gICAgbGV0IHRyYWlsX2xlbmd0aCA9XG4gICAgICBNYXRoLnNxcnQoZGltZW5zaW9uc1swXSAqIGRpbWVuc2lvbnNbMF0gKyBkaW1lbnNpb25zWzFdICsgZGltZW5zaW9uc1sxXSkgK1xuICAgICAgMjA7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIHBtb3ZlKC4uLnJvdGF0ZShyYWQgLSBNYXRoLlBJIC0gTWF0aC5QSSAvIDgsIDAsIHRyYWlsX2xlbmd0aCkpO1xuICAgIHBsaW5lKDAsIDApO1xuICAgIHBsaW5lKC4uLnJvdGF0ZShyYWQgKyBNYXRoLlBJIC8gOCwgMCwgdHJhaWxfbGVuZ3RoKSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgbGV0IGRlYnVnID0gZmFsc2U7XG4gICAgaWYgKGRlYnVnKSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBwbW92ZSgwLCAwKTtcbiAgICAgIHBsaW5lKHZbMF0gKiAyMCwgdlsxXSAqIDIwKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JlZCc7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBwbW92ZSh2WzBdICogMjAsIHZbMV0gKiAyMCk7XG4gICAgICBwbGluZSgwICsgdGFyZ2V0WzBdICogMjAsIDAgKyB0YXJnZXRbMV0gKiAyMCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdncmVlbic7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBwbW92ZSgwLCAwKTtcbiAgICAgIC8vIHBsaW5lKC4uLnJvdGF0ZShyYWQsIDEwMCwgMCkpO1xuICAgICAgcGxpbmUoMCArIHRhcmdldFswXSAqIDIwLCAwICsgdGFyZ2V0WzFdICogMjApO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKHNwWzBdLCBzcFsxXSwgbWF4ICogMjAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICBpZiAoZGVidWcgJiYga2NbJ3cnXSkgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gICAgc3R4LmNsZWFyUmVjdCgwLCAwLCAuLi5kaW1lbnNpb25zKTtcbiAgICBzdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICBzdHguYmVnaW5QYXRoKCk7XG4gICAgc3Btb3ZlKC4uLnJvdGF0ZShyYWQsIC1wdyAqICgzIC8gOCksIC1waCAvIDIpKTtcbiAgICBzcGxpbmUoLi4ucm90YXRlKHJhZCwgcHcgLyAyLCAwKSk7XG4gICAgc3BsaW5lKC4uLnJvdGF0ZShyYWQsIC1wdyAqICgzIC8gOCksIHBoIC8gMikpO1xuICAgIHN0eC5jbG9zZVBhdGgoKTtcbiAgICBzdHguZmlsbCgpO1xuXG4gICAgaWYgKGtjWyd3J10pIHtcbiAgICAgIHN0eC5maWxsU3R5bGUgPSAnbWFnZW50YSc7XG4gICAgICBzdHguYmVnaW5QYXRoKCk7XG4gICAgICBzcG1vdmUoLi4ucm90YXRlKHJhZCwgLXB3ICogKDMgLyA4KSwgLXBoIC8gMikpO1xuICAgICAgc3BsaW5lKC4uLnJvdGF0ZShyYWQsIC1wdyAqIDAuNjI1LCAwKSk7XG4gICAgICBzcGxpbmUoLi4ucm90YXRlKHJhZCwgLXB3ICogKDMgLyA4KSwgcGggLyAyKSk7XG4gICAgICBzdHguY2xvc2VQYXRoKCk7XG4gICAgICBzdHguZmlsbCgpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBrZXlBY3Rpb24obGV0dGVyLCByZXBlYXQpIHtcbiAgICBsZXQgYyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKGxldHRlciA9PT0gJyAnICYmICFyZXBlYXQpIHtcbiAgICAgIGlmIChwbGF5aW5nLmN1cnJlbnQpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVxdWVzdFJlZi5jdXJyZW50KTtcbiAgICAgICAgcGxheWluZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0UmVmLmN1cnJlbnQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gICAgICAgIHBsYXlpbmcuY3VycmVudCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICdqJyAmJiAhcmVwZWF0KSB7XG4gICAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgdmFyIHJldm9rZVVSTCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChtZS5ocmVmKTtcbiAgICAgICAgICBtZS5ocmVmID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXZva2VVUkwpO1xuICAgICAgfTtcblxuICAgICAgY3R4LmNhbnZhcy50b0Jsb2IoZnVuY3Rpb24oYmxvYikge1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAnbW9pcmUucG5nJyk7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXZva2VVUkwpO1xuICAgICAgICBsaW5rLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IE1vdXNlRXZlbnQoYGNsaWNrYCwge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiB3aW5kb3csXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnbCcpIHtcbiAgICAgIGxldCBkaW1lbnNpb25zID0gW3dpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgLi4uZGltZW5zaW9ucyk7XG4gICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICc/Jykge1xuICAgICAgc2V0SGVscChwcmV2U3RhdGUgPT4ge1xuICAgICAgICByZXR1cm4gIXByZXZTdGF0ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRvd25IYW5kbGVyKGUpIHtcbiAgICBrZXltYXAuY3VycmVudFtlLmtleV0gPSB0cnVlO1xuICAgIGtleUFjdGlvbihlLmtleSwgZS5yZXBlYXQpO1xuICAgIGlmIChlLmtleSA9PT0gJyAnICYmICFlLnJlcGVhdCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwSGFuZGxlcihlKSB7XG4gICAga2V5bWFwLmN1cnJlbnRbZS5rZXldID0gZmFsc2U7XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBkaW1lbnNpb25zID0gW3dpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuXG4gICAgbGV0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICBsZXQgYyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGxldCBzID0gc2hpcFJlZi5jdXJyZW50O1xuXG4gICAgc2hpcF9wb3NpdGlvbi5jdXJyZW50ID0gWzQwLCBoZWlnaHQgLyAyXTtcblxuICAgIGMud2lkdGggPSBkaW1lbnNpb25zWzBdICogZHByO1xuICAgIGMuaGVpZ2h0ID0gZGltZW5zaW9uc1sxXSAqIGRwcjtcbiAgICBjLnN0eWxlLndpZHRoID0gZGltZW5zaW9uc1swXSArICdweCc7XG4gICAgYy5zdHlsZS5oZWlnaHQgPSBkaW1lbnNpb25zWzFdICsgJ3B4JztcblxuICAgIGxldCBjdHggPSBjYW52YXNSZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5zY2FsZShkcHIsIGRwcik7XG4gICAgY3R4LnRyYW5zbGF0ZSgwLjUsIDAuNSk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgLi4uZGltZW5zaW9ucyk7XG5cbiAgICBjdHgubGluZVdpZHRoID0gMTtcblxuICAgIHMud2lkdGggPSBkaW1lbnNpb25zWzBdICogZHByO1xuICAgIHMuaGVpZ2h0ID0gZGltZW5zaW9uc1sxXSAqIGRwcjtcbiAgICBzLnN0eWxlLndpZHRoID0gZGltZW5zaW9uc1swXSArICdweCc7XG4gICAgcy5zdHlsZS5oZWlnaHQgPSBkaW1lbnNpb25zWzFdICsgJ3B4JztcblxuICAgIGxldCBzdHggPSBzaGlwUmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBzdHguc2NhbGUoZHByLCBkcHIpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb3duSGFuZGxlcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBIYW5kbGVyKTtcbiAgICByZXF1ZXN0UmVmLmN1cnJlbnQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb3duSGFuZGxlcik7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cEhhbmRsZXIpO1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVxdWVzdFJlZi5jdXJyZW50KTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5Nb2lyZTwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICBmb250LWZhbWlseTogJ2N1c3RvbSc7XG4gICAgICAgICAgc3JjOiB1cmwoJy9zdGF0aWMvZm9udHMvSUJNUGxleE1vbm8tUmVndWxhci53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICAgIHVybCgnL3N0YXRpYy9mb250cy9JQk1QbGV4TW9uby1SZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcbiAgICAgICAgfVxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICAgIGh0bWwge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBjdXN0b20sIG1vbm9zcGFjZTtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgICAgfVxuICAgICAgICBodG1sLmxvYWRlZCB7XG4gICAgICAgICAgYmFja2dyb3VuZDogI2RkZDtcbiAgICAgICAgfVxuICAgICAgICBib2R5IHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgdGV4dGFyZWEge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICAgICAgICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgICAgICAgfVxuICAgICAgICBwIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIH1cbiAgICAgICAgYSB7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgPGRpdj5cbiAgICAgICAgPGNhbnZhc1xuICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAgfX1cbiAgICAgICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAgICAgLz5cbiAgICAgICAgPGNhbnZhc1xuICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAgfX1cbiAgICAgICAgICByZWY9e3NoaXBSZWZ9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICBvdXRsaW5lOiAnc29saWQgMXB4IGJsYWNrJyxcbiAgICAgICAgICAgIGRpc3BsYXk6IGhlbHAgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgICAgbWF4V2lkdGg6IGBjYWxjKDEwMCUgLSAzcmVtKWAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgyNTUsMjU1LDI1NSwwLjgpJyxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMmNoJyxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzJjaCcsXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnMC43NXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMC43NXJlbScsXG4gICAgICAgICAgICByaWdodDogJzEuNXJlbScsXG4gICAgICAgICAgICBib3R0b206ICcxLjVyZW0nLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzAuNzVyZW0nLCBtYXhXaWR0aDogJzYwY2gnIH19PlxuICAgICAgICAgICAgTW9pcmUgbGV0cyB5b3UgZ2VuZXJhdGUgYW5ndWxhciBza3lzY2FwZXMgdXNpbmd7JyAnfVxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FzdGVyb2lkc18odmlkZW9fZ2FtZSlcIlxuICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBBc3Rlcm9pZHNcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIC1saWtlIHNoaXAgY29udHJvbHMuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcwLjc1cmVtJyB9fT5Nb3ZlPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcwLjc1cmVtJyB9fT5cbiAgICAgICAgICAgIHtLZXlUaXAoJ2EnKX0g4oaqJm5ic3A7IHtLZXlUaXAoJ3cnKX0gdGhydXN0Jm5ic3A7IHtLZXlUaXAoJ2QnKX17JyAnfVxuICAgICAgICAgICAg4oapJm5ic3A7XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcwLjc1cmVtJyB9fT5TcGVjaWFsPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxLjVyZW0nIH19PlxuICAgICAgICAgICAge0tleVRpcCgnICcpfSBwYXVzZSZuYnNwOyB7S2V5VGlwKCdqJyl9IHNhdmUgYXMgcG5nJm5ic3A7eycgJ31cbiAgICAgICAgICAgIHtLZXlUaXAoJ2wnKX0gY2xlYXImbmJzcDsge0tleVRpcCgnPycpfSBoZWxwXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vY29uc3RyYWludC1zeXN0ZW1zL21vaXJlXCJcbiAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgVmlldyBzb3VyY2XihpdcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIHtoZWxwID8gbnVsbCA6IChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgIHJpZ2h0OiAnMS41cmVtJyxcbiAgICAgICAgICAgIGJvdHRvbTogJzEuNXJlbScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgyNTUsMjU1LDI1NSwwLjgpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge0tleVRpcCgnPycpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIl19 */\n/*@ sourceURL=/Users/grant.custer/Sites/constraint-systems/moire/pages/index.js */"), __jsx("div", {
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 335
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
      lineNumber: 336
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
      lineNumber: 340
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
      lineNumber: 344
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
      lineNumber: 359
    },
    __self: this
  }, "Moire lets you generate angular skyscapes using", ' ', __jsx("a", {
    href: "https://en.wikipedia.org/wiki/Asteroids_(video_game)",
    target: "_blank",
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 361
    },
    __self: this
  }, "Asteroids"), "-like ship controls."), __jsx("div", {
    style: {
      marginBottom: '0.75rem'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 369
    },
    __self: this
  }, "Move"), __jsx("div", {
    style: {
      marginBottom: '0.75rem'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 370
    },
    __self: this
  }, KeyTip('a'), " \u21AA\xA0 ", KeyTip('w'), " thrust\xA0 ", KeyTip('d'), ' ', "\u21A9\xA0"), __jsx("div", {
    style: {
      marginBottom: '0.75rem'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 374
    },
    __self: this
  }, "Special"), __jsx("div", {
    style: {
      marginBottom: '1.5rem'
    },
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 375
    },
    __self: this
  }, KeyTip(' '), " pause\xA0 ", KeyTip('j'), " save as png\xA0", ' ', KeyTip('l'), " clear\xA0 ", KeyTip('?'), " help"), __jsx("div", {
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 379
    },
    __self: this
  }, __jsx("a", {
    href: "https://github.com/constraint-systems/moire",
    target: "_blank",
    className: "jsx-143920748",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 380
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
      lineNumber: 390
    },
    __self: this
  }, KeyTip('?')));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.9465330ad54e828ef8ee.hot-update.js.map