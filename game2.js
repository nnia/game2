
var cvs = document.getElementById("gameCanvas");

var ctx = cvs.getContext("2d");
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

var box = new Image();
box.src = "i1.png";

var boxX = 100;
var boxY = 100;
var boxKey = ' ';

var deltaBox = 8;

var red = 240;
var green = 240;
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

let ctext = ["GRM155C81C225KE11D", "TRS3122ERGET"];
let cright = ["1", "0"];
let cexist = [1, 1];
let cx = [100, 300];
let cy = [150, 50];
var N = 2;
var exist = N;

function draw() {

    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.font = "24px comic";
    if (komplekt == 19) ctx.strokeText("Ловите изделия для 19 к., пока не стемнело", 16, 16);
    if (komplekt == 16) ctx.strokeText("Ловите изделия для 16 к., пока не стемнело", 16, 16);
    ctx.font = "20px comic";

    // ящик
    ctx.drawImage(box, boxX, boxY);

    // сумерки
    if (red > 100) red -=0.1;
    if (green > 100) green -=0.1;
    if (blue > 100) blue -= 0.1;
    if (blue < 160)
    {
        ctx.strokeText("Стемнело, но можно продолжать", boxX, boxY+110);
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
               (cy[i] > boxY + 20) && (cy[i] < boxY + 40))
           {
                cexist[i] = 0;
	        exist--;
                red+=10; green+=10; blue+=10;
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
           if ((cy[i] > boxY + 20) && (cy[i] < boxY + 40)) cy[i] -= 80;
       } 

    }
 
    requestAnimationFrame(draw); // Вызов функции постоянно
}

box.onload = draw;



