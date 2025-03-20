let startX, startY, endX, endY;
let initializeEvents = (gl) => {

    console.log('이벤트 로그');
    
    const canvas = gl.canvas;
    let isDown = false;
    
    canvas.addEventListener('mouseup', () => {
        isDown = false;
    });

    canvas.addEventListener('mousedown', (e) => {
        startX = e.offsetX;
        startY = e.offsetY;
        isDown = true;
    });

    canvas.addEventListener('mousemove', e => {
        if( isDown ) {
            // 드래그 상태
            endX = e.offsetX;
            endY = e.offsetY;
            updateRectangle()
        }
    })

}

export { initializeEvents }