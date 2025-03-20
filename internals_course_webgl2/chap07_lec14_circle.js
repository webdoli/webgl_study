import WebGLUtils from "../utils.js";

const canvas = document.getElementById('Canvas');
const utils = new WebGLUtils();
const bgColor = [ 1.0, 1.0, 1.0, 1.0 ];
utils.setCanvasSize( canvas, { width: 800, height: 500 } );
const gl = utils.getGLContext( canvas, bgColor );

// 1단계
const vertexShader = `#version 300 es
    precision mediump float;
    in vec2 position;
    void main()
    {
        gl_Position = vec4( position, 0.0, 1.0 );
        gl_PointSize = 2.0;
    }
`;

const fragmentShader =`#version 300 es
    precision mediump float;
    out vec4 color;
    void main()
    {
        color = vec4( 0.0, 0.0, 1.0, 1.0 );
    }
`;

// 2단계
const program = utils.getProgram( gl, vertexShader, fragmentShader );

// 3단계
const getCircleCoordinates = () => {

    let centerX = 0.0, centerY = 0.0, radiusX = 0.4;
    let numOfPoints = 100;
    let circleCoords = [];
    let radiusY = radiusX / gl.canvas.height * gl.canvas.width;
    for( let i = 0; i < numOfPoints; i++ ) {
        // 원둘레 공식: 2 * Math.PI * r
        let circumference = 2 * Math.PI * ( i/numOfPoints );
        let x = centerX + radiusX * Math.cos(circumference);
        let y = centerY + radiusY * Math.sin(circumference);
        circleCoords.push( x, y );
    } 
    return circleCoords;
};

const vertices = getCircleCoordinates();
const data = new Float32Array( vertices );
const buffer = utils.createAndBindBuffer( gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, data );

// 4단계 GPU연결
gl.useProgram( program );
const position = utils.linkGPUAndCPU( gl, {
    program: program,
    dims: 2,
    buffer: buffer,
    gpuVariable: 'position'
});

// 5단계 랜더
// gl.drawArrays( gl.POINTS, 0, vertices.length/2 );
gl.drawArrays( gl.LINES, 0, vertices.length/2 );