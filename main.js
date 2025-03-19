const canvas = document.getElementById('Canvas');
const gl = canvas.getContext(`webgl`);

if( gl ) console.log( 'gl: ', gl );

let x = .5;
let y = .5;
let z = 0;

const triangle_vertices = [
    0, y, z,
    -x, -y, z,
    x, -y, z
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
    void main()
    {
        gl_Position = vec4( positions, 1.0 );
    }
`;

const triangle_vertex_shader = gl.createShader( gl.VERTEX_SHADER );
gl.shaderSource( triangle_vertex_shader, triangle_vertex_code );
gl.compileShader( triangle_vertex_shader );


// 2-2] 삼각형 Fragment Shader생성
const triangle_fragment_code = 
`
    void main()
    {
        gl_FragColor = vec4( 1, 1, 0, 1 );
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
gl.vertexAttribPointer( pos, 3, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( pos );  //vertex attribute 속성 활성화


// 5] 랜더링
function render() {
    gl.clearColor( 0.2, 0.3, 0.4, 1 );
    gl.enable( gl.DEPTH_TEST ); //겹치는 물체가 있을 시 카메라에 정보를 전달하여 깊이에 따라 배제함
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.drawArrays( gl.TRIANGLES, 0, triangle_vertices.length/3 );
    requestAnimationFrame( render );
}

render();
