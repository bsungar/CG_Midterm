
var canvas;
var gl;
var program;
var vPosition;
 
var letter1vertices, letter2vertices;
var buffer1, buffer2;
 
var translationX = 0.0;
var translationY = 0.0;
var scaleX = 1.0;
var scaleY = 1.0;
var red = 1.0;
var green = 0.0;
var blue = 0.0;
 
window.onload = function init() {
  canvas = document.getElementById("gl-canvas");
 
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }
 
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
 
  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);
 
  letter1vertices = [
    vec2(-0.6, -0.6),
    vec2(-0.4, -0.6),
    vec2(-0.6, 0.6),
    vec2(-0.4, 0.6),

    vec2(-0.4, 0.6),
    vec2(0.0, 0.3),
    vec2(-0.4, 0.0),
    

    vec2(-0.4, 0.0),
    vec2(0.0, -0.3),
    vec2(-0.4, -0.6),


   
   ];
 
  letter2vertices = [
    vec2(0.24, 0.32),
    vec2(0.24, 0.24),
    vec2(0.64, 0.32),
    vec2(0.64, 0.32),
    vec2(0.64, 0.24),
    vec2(0.24, 0.24),
    vec2(0.24, 0.04),
    vec2(0.24, 0.24),
    vec2(0.32, 0.24),
    vec2(0.24, 0.04),
    vec2(0.32, 0.04),
    vec2(0.32, 0.24),
    vec2(0.64, 0.04),
    vec2(0.24, 0.04),
    vec2(0.24, -0.04),
    vec2(0.64, 0.04),
    vec2(0.24, -0.04),
    vec2(0.64, -0.04),
    vec2(0.52, -0.24),
    vec2(0.52, -0.04),
    vec2(0.64, -0.04),
    vec2(0.64, -0.04),
    vec2(0.64, -0.24),
    vec2(0.52, -0.24),
    vec2(0.64, -0.24),
    vec2(0.64, -0.32),
    vec2(0.24, -0.32),
    vec2(0.64, -0.24),
    vec2(0.24, -0.24),
    vec2(0.24, -0.32),

  ];
 
  buffer1 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW);
 
  buffer2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW);
 
  vPosition = gl.getAttribLocation(program, "vPosition");
 
  document.getElementById("posX").oninput = function (event) {
    translationX = parseFloat(event.target.value);
  };
  document.getElementById("posY").oninput = function (event) {
    translationY = parseFloat(event.target.value);
  };
  document.getElementById("scaleX").oninput = function (event) {
    scaleX = parseFloat(event.target.value);
  };
  document.getElementById("scaleY").oninput = function (event) {
    scaleY = parseFloat(event.target.value);
  };
  document.getElementById("redSlider").oninput = function (event) {
    red = parseFloat(event.target.value);
  };
  document.getElementById("greenSlider").oninput = function (event) {
    green = parseFloat(event.target.value);
  };
  document.getElementById("blueSlider").oninput = function (event) {
    blue = parseFloat(event.target.value);
  };
 
  render();
};
 
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
 
  var uTranslation = gl.getUniformLocation(program, "uTranslation");
  gl.uniform2f(uTranslation, translationX, translationY);
 
  var uScale = gl.getUniformLocation(program, "uScale");
  gl.uniform2f(uScale, scaleX, scaleY);
 
  var uColor = gl.getUniformLocation(program, "uColor");
  gl.uniform3f(uColor, red, green, blue);
 
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter1vertices.length);
  
  gl.uniform3f(uColor, 1.0 - red, 1.0 - green, 1.0 - blue);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter2vertices.length);
 
  window.requestAnimationFrame(render);
}
 