


/*
** Ich hab 96% hiervon nicht geschrieben bitte danke.
** Nur das was einen Kommi hat ist von mir.    - Titan
*/

let canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

let x = "black",
    y = 2,
bg = "white",
bgChosen = false;

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

// Set the color of the brush. The first time you pick a color it sets that as the background color.
// Unless you immediately start drawing, in that case the bg color is white.
function color(obj)
{
  if (obj.id == "eraser")
  {
    if (bgChosen)
    {
      x = bg;
      y = 14;
    }
  }
  else
  {
    if (!bgChosen)
    {
      fillBg(obj.id);
    }
    else
    {
      x = obj.id;
      y = 2;
    }
  }
}

function fillBg(color)
{
  bg = color;
  ctx.beginPath();
  ctx.rect(0, 0, w, h);
  ctx.fillStyle = color;
  ctx.fill();
  bgChosen = true;
}

function draw() {

// drawing without choosing a bg color sets the background to white
if (!bgChosen)
{
  fillBg("white");
}

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}
