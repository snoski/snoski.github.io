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
    console.log('yup, the SECOND is being executed.');
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();
    var image2 = new Image();

    var ctx = document.getElementById("myCanvas2").getContext("2d");
    image2.onload = function(){
        ctx.drawImage(image2,0,0);
    }
    reader.onloadend = function () {
       image2.src = reader.result;
    }

    if (file) {
       reader.readAsDataURL(file); //reads the data as a URL
    } else {
       image2.src = "";
    }
}

function decode(){
    //decodes message
    var readCtx = document.getElementById("myCanvas").getContext("2d");
    var readCtx2 = document.getElementById("myCanvas2").getContext("2d");
    var imgData = readCtx.getImageData(0,0,365,238);
    var imgData2 = readCtx2.getImageData(0,0,365,238);
    var msg = "";
    for (i = 0; i < imgData.data.length; i += 4) {
        img1Red = imgData.data[i];
        img2Red = imgData2.data[i];
        if (img1Red !== img2Red){
            var index = Math.abs(img2Red - img1Red);
            var msg = msg + String.fromCharCode(index);
        }
    }
    console.log('THIRD CHECK');
    document.getElementById("hidHead").innerHTML = "Your Secret Message Is:";
    document.getElementById("hidPara").innerHTML = msg;
}