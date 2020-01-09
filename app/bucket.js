import { canvas, context, inpColor } from '../app.js'
import { flagN } from './draw.js'
import { funcLocal } from './localSt.js'


const floodFill = (e) => {
    context.globalCompositeOperation = 'source-over';
    const colorToRgba = () => {
            const col = (inpColor.value).replace( "#", "" ) ;
            const bigint = parseInt(col, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return {r:r,
                    g:g,
                    b:b,
                    a:255} ;
    }
    const color = colorToRgba();

    let x = Math.round(e.layerX / flagN.n);
    let y = Math.round(e.layerY / flagN.n);
    let pixelStack = [{x:x, y:y}] ;
    let pixels = context.getImageData( 0, 0, canvas.width, canvas.height ) ;
    let linearCords = ( y * canvas.width + x ) * 4 ;
    const originalColor = {r:pixels.data[linearCords],
                      g:pixels.data[linearCords+1],
                      b:pixels.data[linearCords+2],
                      a:pixels.data[linearCords+3]} ;
    
    if(color.r === originalColor.r && color.g === originalColor.g && color.b === originalColor.b && color.a === originalColor.a) {
        return;
    }

    while( pixelStack.length > 0 ) {
        const newPixel = pixelStack.shift() ;
        x = newPixel.x ;
        y = newPixel.y ;

        linearCords = ( y * canvas.width + x ) * 4 ;
        // console.log(linearCords);
        while( y-->=0 &&
               (pixels.data[linearCords]==originalColor.r &&
                pixels.data[linearCords+1]==originalColor.g &&
                pixels.data[linearCords+2]==originalColor.b &&
                pixels.data[linearCords+3]==originalColor.a) ) {
                linearCords -= canvas.width * 4 ;
        }
        linearCords += canvas.width * 4 ;
        y++ ;

        let reachedLeft = false ;
        let reachedRight = false ;
        while( y++<canvas.height &&
               (pixels.data[linearCords]==originalColor.r &&
                pixels.data[linearCords+1]==originalColor.g &&
                pixels.data[linearCords+2]==originalColor.b &&
                pixels.data[linearCords+3]==originalColor.a) ) {
            pixels.data[linearCords]   = color.r ;
            pixels.data[linearCords+1] = color.g ;
            pixels.data[linearCords+2] = color.b ;
            pixels.data[linearCords+3] = color.a ;

            if( x>0 ) {
                if( pixels.data[linearCords-4]==originalColor.r &&
                    pixels.data[linearCords-4+1]==originalColor.g &&
                    pixels.data[linearCords-4+2]==originalColor.b &&
                    pixels.data[linearCords-4+3]==originalColor.a ) {
                    if( !reachedLeft ) {
                        pixelStack.push( {x:x-1, y:y} ) ;
                        reachedLeft = true ;
                    }
                } else if( reachedLeft ) {
                    reachedLeft = false ;
                }
            }
        
            if( x<canvas.width-1 ) {
                if( pixels.data[linearCords+4]==originalColor.r &&
                    pixels.data[linearCords+4+1]==originalColor.g &&
                    pixels.data[linearCords+4+2]==originalColor.b &&
                    pixels.data[linearCords+4+3]==originalColor.a ) {
                    if( !reachedRight ) {
                        pixelStack.push( {x:x+1,y:y} ) ;
                        reachedRight = true ;
                    }
                } else if( reachedRight ) {
                    reachedRight = false ;
                }
            }
            
            linearCords += canvas.width * 4 ;
        }
    }
    context.putImageData( pixels, 0, 0 ) ;
    funcLocal();
}



export { floodFill }