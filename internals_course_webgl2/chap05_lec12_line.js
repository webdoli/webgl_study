import WebGLUtils from "../utils.js";

const utils = new WebGLUtils();
const canvas = document.getElementById('Canvas');
utils.setCanvasSize( canvas, { width: 500, height: 300 });
const bgColor = [ 1.0, 1.0, 1.0, 1.0 ];
const gl = utils.getGLContext( canvas, bgColor );

// 1단계
const vertexShader =`#version 300 es
    precision mediump float;
    in vec2 position;
    void main()
    {
        gl_Position = vec4( position, 0.0, 1.0 );
    }
`;

const fragmentShader = `#version 300 es
    precision mediump float;
    out vec4 color;
    void main()
    {
        color = vec4( 0.0, 1.0, 0.0, 1.0 );
    }
`;

const program = utils.getProgram( gl, vertexShader, fragmentShader );

// 2단계 버퍼
const data = new Float32Array(
    [
        -.6, 0, .6, 0
    ]
);

const buffer = utils.createAndBindBuffer( gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, data );

// 3단계
gl.useProgram( program );
const position = utils.linkGPUAndCPU( gl, {
    program: program,
    buffer: buffer,
    gpuVariable: 'position',
    channel: gl.ARRAY_BUFFER,
    stride: 0,
    offset: 0,
    dims: 2,
    dataType: gl.FLOAT,
    normalize: gl.FALSE
});

// 4단계
gl.drawArrays( gl.LINES, 0, 2 );