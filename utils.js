class WebGLUtils {
    getGLContext = ( canvas, bg_clr ) => {
        var gl = canvas.getContext(`webgl2`);
        gl.clearColor( bg_clr[0], bg_clr[1], bg_clr[2], bg_clr[3] );
        gl.clear( gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT );
        return gl;
    }

    setCanvasSize = ( canvas_, size_ ) => {
        const canvas = canvas_;
        const size = size_;

        canvas.width = (size) 
            ? canvas.width = size.width 
            : window.innerWidth;
        canvas.height = (size)
            ? canvas.height = size.height
            : window.innerHeight;
    }

    getShader = ( gl, shaderSource, shaderType ) => {
        let shader = gl.createShader( shaderType );
        gl.shaderSource( shader, shaderSource );
        gl.compileShader( shader );
        if( !gl.getShaderParameter( shader, gl.COMPILE_STATUS )) {
            console.error( gl.getShaderInfoLog( shader ) );
        }
        return shader;
    }

    getProgram = ( gl, vertexShaderSource, fragmentShaderSource ) => {

        let vs = this.getShader( gl, vertexShaderSource, gl.VERTEX_SHADER );
        let fs = this.getShader( gl, fragmentShaderSource, gl.FRAGMENT_SHADER );
        let program = gl.createProgram();
        gl.attachShader( program, vs );
        gl.attachShader( program, fs );
        gl.linkProgram( program );
        if( !gl.getProgramParameter( program, gl.LINK_STATUS )) {
            console.error( gl.getProgramInLog( program ));
        }
        return program;
    }

    createAndBindBuffer = ( gl, bufferType, typeOfDrawing, data ) => {
        const buffer = gl.createBuffer();
        gl.bindBuffer( bufferType, buffer );
        gl.bufferData( bufferType, data, typeOfDrawing);
        gl.bindBuffer( bufferType, null );
        return buffer;

    }

    linkGPUAndCPU = ( gl, obj ) => {
        const position = gl.getAttribLocation( obj.program, obj.gpuVariable );
        gl.enableVertexAttribArray( position );
        gl.bindBuffer( obj.channel || gl.ARRAY_BUFFER, obj.buffer );
        gl.vertexAttribPointer( 
            position, 
            obj.dims, 
            obj.dataType || gl.FLOAT,
            obj.normalize || gl.FALSE, 
            obj.stride || 0, 
            obj.offset || 0 
        );
        return position;
    }
}

export default WebGLUtils