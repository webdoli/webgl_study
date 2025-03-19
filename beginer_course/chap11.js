const canvas = document.getElementById('Canvas');
const gl = canvas.getContext(`webgl`);

if( gl ) console.log( 'gl: ', gl );

let x = .5;
let y = .5;
let z = 0;

const triangle_vertices = [
  //(x, y, z)  (r, g, b)
    -x, y, z,   1, 0, 0,
    -x, -y, z,  0, 1, 0,
    x, -y, z,   0, 0, 1,
    x, y, z,    1, 1, 0,
];

// 1] 버퍼 생성
const triangle_vertex_buffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, triangle_vertex_buffer );
gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( triangle_vertices ), gl.STATIC_DRAW );
gl.bindBuffer( gl.ARRAY_BUFFER, null ); //버터 삭제


// 2] Shader생성
// 2-1] 삼각형 vertex shader생성
const triangle_vertex_code = 
`
    attribute vec3 positions;
    attribute vec3 colors;
    varying vec3 vcolors;

    void main()
    {
        gl_Position = vec4( positions, 1.0 );
        vcolors = colors;
    }
`;

const triangle_vertex_shader = gl.createShader( gl.VERTEX_SHADER );
gl.shaderSource( triangle_vertex_shader, triangle_vertex_code );
gl.compileShader( triangle_vertex_shader );


// 2-2] 삼각형 Fragment Shader생성
const triangle_fragment_code = 
`
    precision mediump float;
    varying vec3 vcolors;
    void main()
    {
        gl_FragColor = vec4( vcolors, 1 );
    }
`;

const triangle_fragment_shader = gl.createShader( gl.FRAGMENT_SHADER );
gl.shaderSource( triangle_fragment_shader, triangle_fragment_code );
gl.compileShader( triangle_fragment_shader );


// 3] Program 생성
const shader_program = gl.createProgram();
gl.attachShader( shader_program, triangle_vertex_shader );
gl.attachShader( shader_program, triangle_fragment_shader );
gl.linkProgram( shader_program );
gl.useProgram( shader_program );


// 4] 조합
gl.bindBuffer( gl.ARRAY_BUFFER, triangle_vertex_buffer ); //변경된 vertex_buffer를 다시 한번 지정

const pos = gl.getAttribLocation( shader_program, `positions` );
gl.vertexAttribPointer( pos, 3, gl.FLOAT, false, 6*4, 0 ); // webGL에서 vertex데이터를 GPU에 올리고 처리하는 방식을 결정함
    // index(pos): attribute의 위치
    // size(3): 각 vertex속성의 구성 요소 개수, 3 => x, y, z의 좌표라는 의미
    // type(gl.FLOAT): 데이터 타입, gl.FLOAT => 32비트 부동소수점
    // normalized(false): 정규화 여부, false => 원래 값 유지, true => -1 ~ 1 범위로 정규화
    // stride(6*4): 한 vertex 데이터의 전체 크기(바이트 단위)
    // offset(0): 버퍼의 시작점에서 이 속성이 시작되는 위치(바이트 단위)
gl.enableVertexAttribArray( pos );  //vertex attribute 속성 활성화

const vpos = gl.getAttribLocation( shader_program, `colors` );
gl.vertexAttribPointer( vpos, 3, gl.FLOAT, false, 6*4, 3*4 );
gl.enableVertexAttribArray( vpos );  


// 5] 랜더링
function render() {
    gl.clearColor( 0, 0, 0, 1 );
    gl.enable( gl.DEPTH_TEST ); //겹치는 물체가 있을 시 카메라에 정보를 전달하여 깊이에 따라 배제함
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, triangle_vertices.length/3 ); //사각형 => gl.TRIANGLE_FAN 변경해야 함
    requestAnimationFrame( render );
}

render();