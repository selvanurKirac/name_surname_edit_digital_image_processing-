var canvas;
var gl;
var program;
var vPosition;
var red = 1.0;
var green = 0.0;
var blue = 0.0;
var scaleX = 1.0;
var scaleY = 1.0;
var posX = 0.0;
var posY = 0.0;
 
 
 
 
var letter1vertices,letter2vertices, letter3vertices, letter4vertices, letter5vertices;
var buffer1, buffer2, buffer3, buffer4, buffer5;
 
 
// TODO: define any global variables you need
 
window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
 
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
 
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
 
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
 
    // Create geometry data
    letter1vertices = [vec2(-0.46, 0.375),
        vec2(-0.41, 0.38),
        vec2(-0.50, 0.41),
        vec2(-0.47, 0.425),
        vec2(-0.50, 0.435),
        vec2(-0.41, 0.46),
        vec2(-0.46, 0.46)
    ];
 
    letter2vertices = [
        vec2(-0.55, 0.375),
        vec2(-0.50, 0.375),
        vec2(-0.55, 0.46),
        vec2(-0.50, 0.46)
    ];
   
   
 
letter3vertices = [vec2(-0.67,  0.375),  //0
        vec2(-0.74, 0.39),  //1
        vec2(-0.60, 0.39),   //2
        vec2(-0.74, 0.40),   //3
        vec2(-0.60, 0.40)  //4
        ];
 
letter4vertices = [
        vec2(-0.67, 0.465),   //5 //0
        vec2(-0.60, 0.445),   //6 //1
        vec2(-0.74, 0.445),   //7 //2
        vec2(-0.60, 0.425),   //8 //3
        vec2(-0.74, 0.425),   //9 //4
        ];
 
letter5vertices = [
        vec2(-0.74, 0.425),   //9 //4
        vec2(-0.67, 0.425),   //10
        vec2(-0.67, 0.400),   //11
        vec2(-0.60,0.400)];//12
   
    buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );
 
 
    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );
 
    buffer3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter3vertices), gl.STATIC_DRAW );
 
    buffer4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer4 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter4vertices), gl.STATIC_DRAW );
   
    buffer5 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer5 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter5vertices), gl.STATIC_DRAW );  
 
 
   
   
    document.getElementById("posX").oninput = function(event) {
        posX = event.target.value;
    };    
    document.getElementById("posY").oninput = function(event) {
        posY = event.target.value;
    };
    document.getElementById("scaleX").oninput = function(event) {
        scaleX = event.target.value;
       
       
    };
    document.getElementById("scaleY").oninput = function(event) {
        scaleY = event.target.value;
    };  
    document.getElementById("redSlider").oninput = function(event) {
        red = event.target.value;
       
    };
    document.getElementById("greenSlider").oninput = function(event) {
        green = event.target.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        blue = event.target.value;
    };
   
   
 
    render();
};
 
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    var scaleLoc = gl.getUniformLocation(program, "scaleX");
    gl.uniform1f(scaleLoc, scaleX);
    var scaleLoc = gl.getUniformLocation(program, "scaleY");
    gl.uniform1f(scaleLoc, scaleY);
    var posLoc = gl.getUniformLocation(program, "posX");
    gl.uniform1f(posLoc, posX);
    var posLoc = gl.getUniformLocation(program, "posY");
    gl.uniform1f(posLoc, posY);
 
    var colorLoc =  gl.getUniformLocation(program,"color");
    gl.uniform4fv(colorLoc,vec4(red,green,blue,1.0) );
 
    // TODO: Send necessary uniform variables to shader and
    // perform draw calls for drawing letters
 
    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
   
    // draw triangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter1vertices.length);
 
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter2vertices.length);
 
 
   
   
    // draw rectangle
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer3);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
 
    gl.uniform4fv(colorLoc, vec4(Math.abs(1-red),  Math.abs(1-green),  Math.abs(1-blue),1.0) );
    // draw rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter3vertices.length);
 
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer4 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter4vertices.length);
 
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer5 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter5vertices.length);
   
 
 
 
    window.requestAnimationFrame(render);
}
 