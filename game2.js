
var cvs = document.getElementById("gameCanvas");
var ctx = cvs.getContext("2d");

var box = new Image();
box.src = "i1.png";

var boxX = 100;
var boxY = 100;
var boxKey = ' ';

var deltaBox = 8;

var red = 240;
var green = 240;
var blue = 255;

ctx.fillStyle = "#d0e0f0"; // Цвет фона
ctx.fillRect(0, 0, 1200, 600);
 

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

function draw() {

    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillRect(0, 0, 1200, 600);

    if (boxX < 0) boxX = 0;
    if (boxX > 1136) boxX = 1136;
    if (boxY < 0) boxY = 0;
    if (boxY > 500) boxY = 500;
    ctx.drawImage(box, boxX, boxY);

    if (red > 100) red -=0.1;
    if (green > 100) green -=0.1;
    if (blue > 100) blue -= 0.1;

    if (blue < 160)
    {
      ctx.font = "16px comic";
      ctx.strokeText("Стемнело, но можно продолжать", boxX, boxY+70);
    }

    for (var i=0; i < 2; i++) 
    {
       if (cexist[i] == 1)
       { 
           ctx.font = "16px comic";
           ctx.strokeText(ctext[i], cx[i], cy[i]);
           cy[i] ++;
           if (cy[i] > 400) cy[i] = 0;
       }
    } 
 
    requestAnimationFrame(draw); 
}

box.onload = draw;



