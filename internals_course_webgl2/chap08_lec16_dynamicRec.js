import WebGLUtils from "../utils.js";
import { initializeEvents } from "../events.js";

const canvas = document.getElementById('Canvas');
const utils = new WebGLUtils();
const bgColor = [ 1.0, 1.0, 1.0, 1.0 ];
utils.setCanvasSize( canvas, { width: 800, height: 500 } );
const gl = utils.getGLContext( canvas, bgColor );

let startX, startY, endX, endY;

const updateRectangle = () => {

    const coordsObj = {
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY
    };

    const v_ = utils.getGPUCoords( gl, coordsObj )
    const color = utils.getTextureColor( gl, coordsObj );

    const vertices = [
        v_.startX, v_.startY, v_.endX, v_.startY, v_.startX, v_.endY,
        v_.startX, v_.endY, v_.endX, v_.endY, v_.endX, v_.startY  
    ]
    
    const data = new Float32Array( vertices );
    const buffer = utils.createAndBindBuffer( gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, data );

    gl.useProgram( program );
    const position = utils.linkGPUAndCPU(gl, {
        program: program,
        buffer: buffer,
        gpuVariable: 'position',
        dims: 2
    });

    const location = gl.getUniformLocation( program, 'flipY' );
    gl.uniform1f( location, -1.0 );
    const inputColor = gl.getUniformLocation( program, 'inputColor' );
    gl.uniform4fv( inputColor, [ color.red, color.green, color.blue, color.alpha ])
    gl.drawArrays( gl.TRIANGLES, 0, vertices.length/2 );

}


// 1단계
const vertexShader =`#version 300 es
    precision mediump float;
    in vec2 position;
    uniform float flipY;
    void main()
    {
        gl_Position = vec4( position.x, position.y * flipY, 0.0, 1.0 );
    }
`;

const fragmentShader = `#version 300 es
    precision mediump float;
    out vec4 color;
    uniform vec4 inputColor;
    void main()
    {
        color = inputColor;
    }
`;

// 2단계
const program = utils.getProgram( gl, vertexShader, fragmentShader );

// 이벤트 초기화
initializeEvents( gl, ( sx, sy, ex, ey ) => {
    startX = sx;
    startY = sy;
    endX = ex;
    endY = ey;
    updateRectangle();
})