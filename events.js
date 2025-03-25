
let initializeEvents = ( gl, onDragCallback ) => {

    console.log('이벤트 초기화');
    
    const canvas = gl.canvas;
    let isDown = false;
    let startX, startY, endX, endY;
    
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
            onDragCallback( startX, startY, endX, endY );
        }
    });

};

export { initializeEvents }