import WebGLUtils from "../utils.js";

const utils = new WebGLUtils();
const canvas = document.getElementById('Canvas');
utils.setCanvasSize( canvas, { width: 800, height: 500 } );
const bgColor = [ 1.0, 1.0, 1.0, 1.0 ];
const gl = utils.getGLContext( canvas, bgColor );

// 1단계 vertex 쉐이더 작성
const vertexShader = `#version 300 es
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

// 2단계 프로그램 생성
const program = utils.getProgram( gl, vertexShader, fragmentShader );

// 3단계 버퍼 생성: GPU로 데이터 전송하기
const data = new Float32Array([ 
    -.3, -.3, .3, .3, -.3, .3,
    -.3, -.3, .3, .3, .3, -.3
])
const buffer = utils.createAndBindBuffer( gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, data );
gl.useProgram( program );

// 4단계: CPU와 GPU연결하기
const position = utils.linkGPUAndCPU( gl, {
    program: program,
    gpuVariable: 'position',
    channel: gl.ARRAY_BUFFER,
    buffer: buffer,
    dims: 2,
    dataType: gl.FLOAT,
    normalize: gl.FALSE,
    stride: 0,
    offset: 0
});

// 5단계: 랜더링
gl.drawArrays( gl.TRIANGLES, 0, 6)