const canvas = document.getElementById('Canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var gl = canvas.getContext(`webgl2`);
gl.clearColor( .1, .2, .3, .5 );
gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
