const canvas = document.getElementById('Canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var gl = canvas.getContext(`webgl2`);
gl.clearColor( .1, .2, .3, .5 );
gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

const triagleCoords = [
    0.0, -1.0, 0.0, 1.0, 1.0, -1.0
];

// 1단계: 쉐이더 작성
// 2단계: 쉐이더 프로그램 생성
// 3단계: 버퍼 생성
// 4단계: CPU에서 데이터를 GPU에 보냄 
// 5단계: 랜더링