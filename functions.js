/**
 * Convert base64 format to File object
 * @param {*} dataurl 
 * @param {*} filename 
 */
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), 
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
/**
 * Convert image to data url base64 format
 * @param {*} src 
 * @param {*} callback 
 * @param {*} outputFormat 
 */
function _toDataURL(src, callback, outputFormat, imageSize) {
    // console.log('_toDataURL', src)
    let img = new Image();
    let scale = 1;
    // let hScale = 0.5;
    // let wScale = 0.5;
    img.src = src;
    img.crossOrigin = 'Anonymous';
    
    img.onload = function() {
        let canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            dataURL;  
        if (Math.floor( ( img.width % 100000) / 1000 ) && img.width > img.height) {
            scale = scale - (0.25 * (Math.floor((img.width % 100000) / 1000 ) < 4 ? Math.floor( ( img.width % 100000) / 1000 ):0.75));
        } else if (Math.floor( ( img.height % 100000) / 1000 ) && img.width < img.height) {
            scale = scale - (0.25 * (Math.floor((img.height % 100000) / 1000 ) < 4 ?Math.floor( ( img.height % 100000) / 1000 ):0.75));
        }
        // if (img.width > img.height) {
        //     if (Math.floor( ( img.width % 100000) / 1000 )) {
        //         img.width  = (0.5 / Math.floor( ( img.width % 100000) / 1000 ) ) * img.width ;
        //         img.height = (0.5 / Math.floor( ( img.width % 100000) / 1000 ) ) * img.width ;
        //     }
        // } else {
        //     if (Math.floor( ( img.height % 100000) / 1000 )) {
        //         img.width  = (0.5 / Math.floor( ( img.height % 100000) / 1000 ) ) * img.height ;
        //         img.height = (0.5 / Math.floor( ( img.height % 100000) / 1000 ) ) * img.height ; 
        //     } 
        // }
        // if (Math.floor( ( img.width % 100000) / 1000 )) {
        //     img.width = (0.5 / Math.floor( ( img.width % 100000) / 1000 ) ) * img.width ;
        // }
        // if (Math.floor( ( img.height % 100000) / 1000 )) {
        //     img.height = (0.5 / Math.floor( ( img.height % 100000) / 1000 ) ) * img.height ;
        // }
        img.width = img.width * scale;
        img.height = img.height * scale;

        canvas.width = img.width ;
        canvas.height = img.height ;

        ctx.drawImage(img, 0, 0, img.width, img.height);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };
    
    if (img.complete || img.complete === undefined) {
      img.src = "";
      img.src = src;
    }
}