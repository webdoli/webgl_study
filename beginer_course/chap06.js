const canvas = document.getElementById('Canvas');
const gl = canvas.getContext(`webgl`);

if( gl ) console.log( 'gl: ', gl );

let x = .5;
let y = .5;
let z = 0;

const vertices = [
    0, y, z,
    -x, -y, z,
    x, -y, z
];

const colors_coords = [
    // ( r, g, b )
    1,0,0,
    0,1,0,
    0,0,1,
];

//1] 버퍼 생성
const vertex_buffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, vertex_buffer );
gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
gl.bindBuffer( gl.ARRAY_BUFFER, null );

const color_buffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, color_buffer );
gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors_coords ), gl.STATIC_DRAW );
gl.bindBuffer( gl.ARRAY_BUFFER, null );

//2] 쉐이더 생성
const vertex_code = `
    attribute vec3 positions;
    attribute vec3 colors;
    varying vec3 vcolors;

    void main()
    {
        gl_Position = vec4( positions, 1.0 ) + vec4( -.5, -.5, 0, 0 );
        vcolors = colors;
    }
`;
const vertex_shader = gl.createShader( gl.VERTEX_SHADER );
gl.shaderSource( vertex_shader, vertex_code );
gl.compileShader( vertex_shader );


const fragment_code = `
    precision mediump float;
    varying vec3 vcolors;

    void main()
    {
        gl_FragColor = vec4( vcolors, 1 );
    }
`;
const fragment_shader = gl.createShader( gl.FRAGMENT_SHADER );
gl.shaderSource( fragment_shader, fragment_code );
gl.compileShader( fragment_shader );

//3] Program 생성
const program = gl.createProgram();
gl.attachShader( program, vertex_shader );
gl.attachShader( program, fragment_shader );
gl.linkProgram( program );
gl.useProgram( program );

//4] 조합, 속성 지정 가져오기
// vertex용
gl.bindBuffer( gl.ARRAY_BUFFER, vertex_buffer );

const pos = gl.getAttribLocation( program, `positions` );
gl.vertexAttribPointer( pos, 3, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( pos );

//color용
gl.bindBuffer( gl.ARRAY_BUFFER, color_buffer );

const vpos = gl.getAttribLocation( program, `colors` );
gl.vertexAttribPointer( vpos, 3, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vpos );

//5] render
function render() {
    gl.clearColor( 0, 0, 0, 1 );
    gl.enable( gl.DEPTH_TEST );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.drawArrays( gl.TRIANGLES, 0, vertices.length/3 );
    requestAnimationFrame( render );
}

render();