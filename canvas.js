var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var x= canvas.width/2;
var y = canvas.height-30;
var dx=2;
var dy=-2;
var ballRadius= 10;
var widthThanhNgang =100;
var heightThanhNgang=10;
var thanhNgangX = (canvas.width-widthThanhNgang)/2;
var rightPress= false;
var leftPress= false;
var brickRow=3;
var brickCol=5;
var brickWidth= 75;
var brickHeight= 20;
var brickPadding=10;
var brickOffsetTop= 30;
var brickOffsetLeft= 30;
var bricks=[];
var score=0;
rePlay()
function rePlay(){
    for( c=0; c< brickCol ; c++){
        bricks[c]=[];
        for( r=0; r< brickRow ; r++){
            bricks[c][r]={x:0, y:0 , status :1}
        }
    }
    x= canvas.width/2;
    y = canvas.height-30;
    score=0;
    speed = brickCol * brickRow +1
}
document.addEventListener("keydown", function(event){
    if(event.keyCode== 39){
        rightPress=true; 
    }
    else if(event.keyCode== 37){
        leftPress= true;
    }
},false);
document.addEventListener("keyup",function(event){
    if(event.keyCode== 39){
        rightPress=false;   
    }
    else if(event.keyCode== 37){
        leftPress= false;
    }
}, false);
document.addEventListener("mousemove",function(event){
    var relativeX = event.clientX- canvas.offsetLeft;
    if(relativeX >0 && relativeX< canvas.width){
        thanhNgangX= relativeX- widthThanhNgang/2;
    }
}, false);


function drawThanhNgang(){
    ctx.beginPath();
    ctx.rect(thanhNgangX,canvas.height-heightThanhNgang,widthThanhNgang,heightThanhNgang);
    ctx.fillStyle="green";
    ctx.fill();
    ctx.closePath();
}
function drawBall(){
    ctx.beginPath();    
    ctx.arc(x, y, ballRadius, 0, 2*Math.PI, false);
    ctx.fillStyle="#c0392b";
    ctx.fill();
    ctx.closePath();
}
function drawBrick(){
    for( c=0; c< brickCol ; c++){
        for( r=0; r< brickRow ; r++){
            if(bricks[c][r].status==1){
                var brickX= c*(brickWidth+ brickPadding) +brickOffsetLeft;
                var brickY= r*(brickHeight+ brickPadding) +brickOffsetTop;
                bricks[c][r].x=brickX;
                bricks[c][r].y=brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle="#2980b9";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function vaCham(){
    for( c=0; c< brickCol ; c++){
        for( r=0; r< brickRow ; r++){
            var b =bricks[c][r];
            if(b.status==1){
                if(x> b.x &&  x< b.x + brickWidth && y> b.y && y<b.y+ brickHeight){
                    dy=-dy;
                    b.status=0;
                    score++;
                    clearInterval(timer);
                    speed --;
                    timer = setInterval(draw, speed);
                    if(score==brickRow*brickCol){
                        alert("You Win!");
                    }
                } 
            }
        }
    }
}
function drawScore(){
    ctx.font="18px Tahoma";
    ctx.fillStyle="green";
    ctx.fillText("Score: " + score,10,20);
    ctx.closePath();
}
function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);// clear canvas ????? v??? l???i
    drawBall();
    drawThanhNgang();
    drawBrick();
    vaCham();
    drawScore()
    if(x+dx >canvas.width -ballRadius|| x+dx<ballRadius){
        dx=-dx;
    } 
    if (y+dy<ballRadius){
        dy=-dy;
    } else {
        if(y+dy >canvas.height -ballRadius){
            if(x>= thanhNgangX && x<= (thanhNgangX+ widthThanhNgang)){
                dy=-dy;
            } else{
                // document.location.reload();
                dy = -dy;
                dx = -dx;
                alert("You Loss!");
                rePlay()
            }
        }
    }
    x+=dx;
    y+=dy;
    if(rightPress && thanhNgangX < canvas.width- widthThanhNgang){
        thanhNgangX+=5;
    }
    if(leftPress && thanhNgangX>0){
        thanhNgangX-=5;
    }
    
}
var peed
var timer = setInterval(draw, speed);

$('.de').on('click', function(event) {
event.preventDefault();
widthThanhNgang=300;
});
$('.hard').on('click', function(event) {
event.preventDefault();
widthThanhNgang=150;
});
$('.imp').on('click', function(event) {
event.preventDefault();
widthThanhNgang=50;
});
