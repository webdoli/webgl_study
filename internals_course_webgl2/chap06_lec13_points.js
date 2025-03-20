import WebGLUtils from "../utils.js";

const utils = new WebGLUtils();
const bgColor = [ 1.0, 1.0, 1.0, 1.0 ];
const canvas = document.getElementById('Canvas');
utils.setCanvasSize( canvas, { width: 500, height: 300 });
const gl = utils.getGLContext( canvas, bgColor );

// 1단계 쉐이더 생성
const vertexShader = `#version 300 es
    precision mediump float;
    in vec2 position;
    void main()
    {
        gl_Position = vec4( position, 0.0, 1.0 );
        gl_PointSize = 10.0;
    }
`;

const fragmentShader = `#version 300 es
    precision mediump float;
    out vec4 color;
    void main()
    {
        color = vec4( 0.0, 0.0, 1.0, 1.0 );
    }
`;

// 2단계 프로그램 생성
const program = utils.getProgram( gl, vertexShader, fragmentShader );

// 3단계 버퍼 생성
const vertices = [
    -.5, .5, .5, .5, -.5, -.5, .5, -.5 
];

const data = new Float32Array( vertices );
const buffer = utils.createAndBindBuffer( gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, data );

// 4단계 gpu연결
gl.useProgram( program );
const position = utils.linkGPUAndCPU( gl, {
    program: program,
    buffer: buffer,
    gpuVariable: 'position',
    dims: 2,
});

// 5단계 랜더
gl.drawArrays( gl.POINTS, 0, vertices.length/2 )
