import WebGLUtils from "../utils.js";
import { initializeEvents } from "../events.js";

const canvas = document.getElementById('Canvas');
const utils = new WebGLUtils();
const bgColor = [ 1.0, 1.0, 1.0, 1.0 ];
utils.setCanvasSize( canvas, { width: 800, height: 500 } );
const gl = utils.getGLContext( canvas, bgColor );
initializeEvents( gl );

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
        color = vec4( 1.0, 0.0, 0.0, 1.0 );
    }
`;

// 2단계
const program = utils.getProgram( gl, vertexShader, fragmentShader );

var updateRectangle = () => { //전역 선언?

    console.log('updateRectangle 실행');

}