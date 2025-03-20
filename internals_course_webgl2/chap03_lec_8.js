const util = new WebGLUtils();
const canvas = document.getElementById('Canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = util.getGLContext( canvas );

const triangle_vertices = [
    0.0, -1.0, 
    0.0,  1.0,
    1.0, -1.0,
];

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
        color = vec4(0.0, 0.0, 1.0, 1.0);
    }
`;

// 2단계: shaders로부터 Program 생성
const program = util.getProgram( gl, vertexShader, fragmentShader );

//3단계: 버퍼 생성
const buffer = util.createAndBindBuffer( gl.ARRAY_BUFFER, gl.STATIC_DRAW, new Float32Array(triangle_vertices) );

//4단계: GPU와 CPU연결 및 데이터 전송
gl.useProgram( program );
const position = util.linkGPUAndCPU({
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

//5단계: 랜더링
gl.drawArrays( gl.TRIANGLES, 0, 3 );