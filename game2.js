
var cvs = document.getElementById("gameCanvas");

var ctx = cvs.getContext("2d");
cvs.width = window.innerWidth*0.98;
cvs.height = window.innerHeight*0.975;

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


var box = new Image();
box.src = "i1.png";

var boxX = 100;
var boxY = 300;
var boxKey = ' ';

var deltaBox = 8;

var red = 220;
var green = 220;
var blue = 255;

var komplekt = 19;

ctx.fillStyle = "#d0e0f0"; // Цвет фона


window.addEventListener("resize", () => {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
}, true);


document.addEventListener("mouseup", function (e) {
    
  x = event.clientX; // Координата X
  y = event.clientY; // Координата Y
  boxX = x - 112;
  boxY = y - 112;
});

document.addEventListener("keydown", function (e) {
  
  boxKey = event.key;

  if (boxKey == 'ArrowLeft') boxX-=deltaBox ;
  if (boxKey == 'ArrowRight') boxX+=deltaBox ;
  if (boxKey == 'ArrowUp') boxY-=deltaBox ;
  if (boxKey == 'ArrowDown') boxY+=deltaBox ;
  deltaBox+=2;

});

document.addEventListener("keyup", function (e) {
  
  boxKey = event.key;

  deltaBox=8;

});

let ctext = ["GRM155C81C225KE11D", "TRS3122ERGET", "М2,5x12-А2-70"];
let cright = ["1", "1", "1"];
let cexist = [1, 1, 1];
let cx = [100, 300, 500];
let cy = [150, 50, 250];
var N = 3;
var exist = N;

function draw() {

    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    if (isMobile) ctx.font = "40px comic"; else ctx.font = "24px comic";
    if (komplekt == 19) ctx.strokeText("Ловите изделия для 19 к., пока не стемнело", 16, 16);
    if (komplekt == 16) ctx.strokeText("Ловите изделия для 16 к., пока не стемнело", 16, 16);
    ctx.font = "20px comic";

    // ящик
    ctx.drawImage(box, boxX, boxY);
    ctx.strokeText(N-exist, boxX+108, boxY+150);

    // сумерки
    if (red > 100) red -=0.3;
    if (green > 100) green -=0.3;
    if (blue > 120) blue -= 0.2;
    if (blue < 160)
    {
        ctx.strokeText("Стемнело, но можно продолжать", boxX-20, boxY+170);
    }

    for (var i=0; i < N; i++) 
    {
       if (cexist[i] == 1)
       { 
           // вывод
           ctx.strokeText(ctext[i], cx[i], cy[i]);
           cy[i] ++;
           if (cy[i] > window.innerHeight) cy[i] = 32;

           if ((cx[i] > boxX - 112) && (cx[i] < boxX + 112) &&
               (cy[i] > boxY + 40) && (cy[i] < boxY + 60))
           {
                cexist[i] = 0;
	        exist--;
                red+=20; green+=20; blue+=20;
           }
        }
    } 
    if (exist == 0)
    {  
       exist = N;

       komplekt = 35 - komplekt;
       for (var i=0; i < N; i++) 
       {
           cexist[i] = 1;
           if ((cy[i] > boxY + 40) && (cy[i] < boxY + 60)) cy[i] -= 80;
       } 

    }
 

ctx.strokeText(red, 10, 50);
ctx.strokeText(green, 10, 90);
ctx.strokeText(blue, 10, 130);

    requestAnimationFrame(draw); // Вызов функции постоянно
}

box.onload = draw;



