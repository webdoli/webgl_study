class WebGLUtils {
    getGLContext = ( canvas ) => {
        var gl = canvas.getContext(`webgl2`);
        gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
        gl.clear( gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT );
        return gl;
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

    createAndBindBuffer = ( bufferType, typeOfDrawing, data ) => {
        const buffer = gl.createBuffer();
        gl.bindBuffer( bufferType, buffer );
        gl.bufferData( bufferType, data, typeOfDrawing);
        gl.bindBuffer( bufferType, null );
        return buffer;

    }

    linkGPUAndCPU = ( obj ) => {
        const position = gl.getAttribLocation( obj.program, obj.gpuVariable );
        gl.enableVertexAttribArray( position );
        gl.bindBuffer( obj.channel, obj.buffer );
        gl.vertexAttribPointer( position, obj.dims, obj.dataType, obj.normalize, obj.stride, obj.offset );
        return position;
    }
}