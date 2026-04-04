
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

var komplekt = 16;
var result16 = -1;
var result19 = 0;

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

let dictionary = ["RT0402FRD0751RL", "NFE31PT222Z1E9", "NFM18CC222R1C3", "М2,5-6gx8.36.10.013", "RT0402FRE0722RL",
  "2,5-200 HV-A2", "М2,5х16-А2-70", "T491D107K020AT", "7.860.001-05", "T491X226K050AT", 
  "GRM155C81C225KE11D", "GRM155C80J475MEAAJ", "М2,5x12-А2-70", "GRM31BR73A472KW01L", "12105C475KAT2A", "GRM033R61A104ME84D", "RC0603FR-074K7L"];
let dictionaryRight = [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,0, 1,1];

var maxND = 17;
var ND = maxND - Math.floor(Math.random() * 5);
var iD = 0;
let ctext = ["", "", "", "", "", "", ""];
let cright = [0,0,0,0,0, 0,0];

let cexist = [1, 1, 1, 1, 1, 1, 1];
let cx = [10, cvs.width/9, 2*cvs.width/9, 3*cvs.width/9, 4*cvs.width/9, 5*cvs.width/9, 6*cvs.width/9  ];
let cy = [150, 450, 250, 100, 350, 200, 300];
let cy_delta = [1,1,1,1,1,1,1];
var N = 7;
var exist = 0;
var rightExist = 0;
var caughtD = 0;

var isAlert = 0;
var textAlert = "";
var youWin = 0;


function draw() {

    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    if (isMobile) ctx.font = "36px arial"; else ctx.font = "24px arial";
    if (komplekt == 19) ctx.strokeText("Ловите изделия для 19 к., пока не стемнело", 16, 24);
    if (komplekt == 16) ctx.strokeText("Ловите изделия для 16 к., пока не стемнело", 16, 24);
    if (isMobile) ctx.font = "32px arial"; else ctx.font = "20px arial";

    // ящик
    ctx.drawImage(box, boxX, boxY);
    ctx.strokeText(caughtD + " из " + ND, boxX+50, boxY+155);

   // счёт
   if (result16 > 0) ctx.strokeText("Поставок по 16 к.: " + result16, 10, cvs.height-40);
   if (result19 > 0) ctx.strokeText("Поставок по 19 к.: " + result19, 10, cvs.height-20);

    // сумерки
    if (red > 100) red -=0.3;
    if (green > 100) green -=0.3;
    if (blue > 120) blue -= 0.2;
    if (isAlert == 1)
    {
        ctx.strokeText(alertText, boxX-20, boxY+190);
    }
    else if (youWin == 1) 
    {
        ctx.strokeText(alertText, boxX-20, boxY+190);
    }
    else if (blue < 160)
    {
        ctx.strokeText("Стемнело, но можно продолжать", boxX-20, boxY+190);
    }
    else if ((red > 255) && (green > 255) && (blue > 255))
    {
        ctx.strokeText("Рассвело, но можно продолжать", boxX-20, boxY+190);
    }


    ctx.strokeText("На экране правильных: " + rightExist, 10, 50);


    for (var i=0; i < N; i++) 
    {
       if (cexist[i] == 1)
       { 
           // вывод номенклатуры
           ctx.strokeText(ctext[i], cx[i], cy[i]);
           cy[i] += cy_delta[i];
           
           if (cy[i] > window.innerHeight) cy[i] = 32;
           // проверка попадания
           if ((cx[i] > boxX - 112) && (cx[i] < boxX + 112) &&
               (cy[i] > boxY + 40) && (cy[i] < boxY + 60))
           {   
               caughtD++;
               red+=20; green+=20; blue+=20;
               // ошибочный
               if (cright[i] == 0) 
               {
                   isAlert = 1; alertText = "Ошибка, " + ctext[i] + " нет в составе ";  ctx.strokeText(ctext[i], 20, 300);  caughtD--; ND--;
               } 
               else  
               {  
                   isAlert = 0;
                   alertText = "";
                   youWin = 0;
                }

               // добавляем номенклатуру из словаря, если в нем есть ещё что-то
               if (iD < ND) 
               {
                 cexist[i] = 1; 
                 ctext[i] = dictionary[iD];
                 cright[i] = dictionaryRight[iD];
                 if (cright[i] == 0) rightExist--;
                 iD++;
                 cy[i] += 180;
               }
               else
               {
                 cexist[i] = 0;
	         exist--;
                 if (cright[i] == 1) rightExist--;
               }
               

              // проверяем выигрыш
               if (rightExist == 0)
               { 
                     youWin = 1; 
                     if (exist > 0) 
                     {
                        alertText = "Комплект собран, но верните на склад ";
                        for (var j=0; j< N; j++) if ((cexist[j]==1) && (cright[j]==0)) alertText += (ctext[j] + " ");
                     }
                     else  alertText = "Комплект собран, приступаем к следующему";
                }
           }
        }
    } 
    // обновление комплекта
    if (exist == 0)
    {  
       exist = N;
       ND = maxND ; //- Math.floor(Math.random() * 5);
       caughtD = 0;
       rightExist=0;

       if (komplekt==19) result19++; else result16++;

       komplekt = 35 - komplekt;
       cy[0] = 150; cy[1] = 450; cy[2] = 250; cy[3] = 100; cy[4] = 350; cy[5] = 200; cy[6] = 300;
       for (var i=0; i < N; i++) 
       {
           cexist[i] = 1;
           cy_delta[i] = 0.5 + Math.random();    
           if ((cy[i] > boxY + 40) && (cy[i] < boxY + 60)) cy[i] += 80;
           ctext[i] = dictionary[i];
           cright[i] = dictionaryRight[i];
           if (cright[i] == 1) rightExist++;
       } 
       iD = N;

       // alert12105C475KAT2A = 0;
    }
 

    requestAnimationFrame(draw); // Вызов функции постоянно
}

box.onload = draw;



