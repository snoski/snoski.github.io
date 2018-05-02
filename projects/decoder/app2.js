function drawOnCanvas(){
    console.log('yup, the code is being executed.');
    var pic = document.getElementById("adidas");
    var ctx = document.getElementById("myCanvas").getContext("2d");
    var image = new Image();
    image.onload = function(){
        ctx.drawImage(image,0,0);
    }
    image.src = pic.src;
    pic.style.display = "none";
}

function drawOnCanvas2(){
    var pic2 = document.getElementById("adidas2");
    var ctx = document.getElementById("myCanvas2").getContext("2d");
    var image = new Image();
    image.onload = function(){
        ctx.drawImage(image,0,0);
    }
    image.src = pic2.src;
    pic2.style.display = "none";
}

function decode(){
    //decodes message
    var readCtx = document.getElementById("myCanvas").getContext("2d");
    var readCtx2 = document.getElementById("myCanvas2").getContext("2d");
	var ht = 365;
	var wd = 238;
    var imgData = readCtx.getImageData(0,0,ht,wd);
    var imgData2 = readCtx2.getImageData(0,0,ht,wd);
    var msg = "";
    for (i = 0; i < imgData.data.length; i += 4) {
        img1Red = imgData.data[i];
        img2Red = imgData2.data[i];
        if (img1Red !== img2Red){
            var index = img2Red - img1Red;
            var msg = msg + String.fromCharCode(index);
        }
    }
    console.log('THIRD CHECK');
    document.getElementById("hidHead").innerHTML = "Your Secret Message Is:";
    document.getElementById("hidPara").innerHTML = msg;
}

function encode(){
    //encodes message on encode page
    
    //define message and message length
    var msg = document.getElementById("myMsg").value;
    var len = msg.length;
    
    //get Image Data for 1st Canvas    
    var ctx = document.getElementById("myCanvas").getContext("2d");
	var ht = 365;
	var wd = 238;
    var imgData = ctx.getImageData(0,0,ht,wd);
    
    //get Image Data for 2nd Canvas
    var ctx2 = document.getElementById("myCanvas2").getContext("2d");
    var img2Data = ctx2.getImageData(0,0,ht,wd);
    
    //define gap to be used in for loop that spaces out the altered pixels based on the size of the message    
    var gap = (ht*wd)/len;
    gap = Math.floor(Math.floor(gap)/4)*16;
    
    //for loop to encode the message in the 2nd canvas
    var i = 0; //counter for msg length
    var j = 0; //counter for pixel number
    for (i = 0; i < len; i++) {
        img1Red = imgData.data[j];
        img2Red = img2Data.data[j];
        var char = msg.charCodeAt(i);
        if (img1Red + char < 255){
            img2Data.data[j] = img1Red + char;
            j+=gap;
        } else {
            if (img1Red - char >= 0){
                img2Data.data[j] = img1Red - char;
                j+=gap;
            } else {
                if (img1Red + 1 < 255){
                    img2Data.data[j] = img1Red + 1;
                } else {
                    img2Data.data[j] = img1Red - 1;
                }
            }
        }    
    }
    ctx2.putImageData(img2Data,0,0);
}