let red = $(".red"),
  blue = $(".blue"),
  horizontalMax = $(".field").width() - $(".player").width(),
  verticalMax = $(".field").height() - $(".player").height(),
  keys = [],
  x = 3,
  started = false;

function horizontal(v, a, b) {
  let newh = parseInt(v, 10) - (keys[a] ? x : 0) + (keys[b] ? x : 0);
  return newh < 0 ? 0 : newh > horizontalMax ? horizontalMax : newh;
}

function vertical(v, a, b) {
  let newv = parseInt(v, 10) - (keys[a] ? x : 0) + (keys[b] ? x : 0);
  return newv < 0 ? 0 : newv > verticalMax ? verticalMax : newv;
}

$(window).keydown(function (evt) {
  keys[evt.which] = true;
});
$(window).keyup(function (evt) {
  keys[evt.which] = false;
});

function movement() {
  setInterval(function () {
    red.css({
      left: function (i, v) {
        return horizontal(v, 65, 68);
      },
      top: function (i, v) {
        return vertical(v, 87, 83);
      },
    });
  }, 10);

  setInterval(function () {
    blue.css({
      left: function (i, v) {
        return horizontal(v, 37, 39);
      },
      top: function (i, v) {
        return vertical(v, 38, 40);
      },
    });
  }, 10);
}

//Timer
let timer = $(".timer"),
  seconds = 0;

function addTime() {
  seconds = seconds + 1;
  timer[0].innerText = seconds;
}

//Countdown
let timeleft = 3;
function countdown() {
  setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(countdown);
      $(".instructions").text("Go!!").fadeOut(800);
    } else {
      $(".instructions").text(timeleft);
    }
    timeleft -= 1;
  }, 1000);
}

//Start Game
$(document).keypress(function (evt) {
  if (evt.which === 32 && !started) {
    $(".instructions").text("Red is IT!!");
    countdown();
    setTimeout(function () {
      setInterval(addTime, 1000);
      movement();
    }, 3000);
    started = true;
  }
});
