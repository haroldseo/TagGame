let red = $(".red"),
  blue = $(".blue"),
  horizontalMax = $(".field").width() - $(".player").width() + 15,
  verticalMax = $(".field").height() - $(".player").height() + 15,
  keys = [],
  x = 3,
  time = null,
  redMovement = null,
  blueMovement = null,
  currentPlayer = 1,
  started = false;

function horizontal(v, a, b) {
  let newh = parseInt(v, 10) - (keys[a] ? x : 0) + (keys[b] ? x : 0);
  return newh < 15 ? 15 : newh > horizontalMax ? horizontalMax : newh;
}

function vertical(v, a, b) {
  let newv = parseInt(v, 10) - (keys[a] ? x : 0) + (keys[b] ? x : 0);
  return newv < 15 ? 15 : newv > verticalMax ? verticalMax : newv;
}

function distance(a, b) {
  return Math.sqrt(Math.pow(b[0].offsetLeft - a[0].offsetLeft, 2) + Math.pow(b[0].offsetTop - a[0].offsetTop, 2));
}

$(window).keydown(function (evt) {
  keys[evt.which] = true;
});
$(window).keyup(function (evt) {
  keys[evt.which] = false;
});

//Player Movement
function movement() {
  redMovement = setInterval(function () {
    red.css({
      left: function (i, v) {
        return horizontal(v, 65, 68);
      },
      top: function (i, v) {
        return vertical(v, 87, 83);
      },
    });

    //Collision Detection
    if (currentPlayer === 1) {
      let d = distance(red, blue);
      if (d <= 30) {
        clearInterval(redMovement);
        clearInterval(blueMovement);
        clearInterval(time);
        $(".redScore").text(seconds);
        switchSides();
      }
    }
  }, 10);

  blueMovement = setInterval(function () {
    blue.css({
      left: function (i, v) {
        return horizontal(v, 37, 39);
      },
      top: function (i, v) {
        return vertical(v, 38, 40);
      },
    });

    //Collision Detection
    if (currentPlayer === 2) {
      let d = distance(red, blue);
      if (d <= 30) {
        clearInterval(redMovement);
        clearInterval(blueMovement);
        clearInterval(time);
        $(".blueScore").text(seconds);
        $(".instructions").text("TAG!!").fadeIn(800);
        winner = setInterval(function () {
          if ($(".blueScore").text() < $(".redScore").text()) {
            $(".instructions").text("BLUE WINS!!");
            clearInterval(winner);
          } else if ($(".blueScore").text() > $(".redScore").text()) {
            $(".instructions").text("RED WINS!!");
            clearInterval(winner);
          } else {
            $(".instructions").text("ITS A TIE!!");
            clearInterval(winner);
          }
        }, 2000);
      }
    }
  }, 10);
}

//Switch
function switchSides() {
  $(".instructions").text("TAG!!").fadeIn(800);
  if (currentPlayer === 1) {
    currentPlayer = 2;
  }
  setTimeout(function () {
    $(".instructions").text("Blue is IT!!");
    red.css({
      left: 10 + "%",
      top: 50 + "%",
    });
    blue.css({
      left: 90 + "%",
      top: 50 + "%",
    });
    timeleft = 3;
    countdownTimer();
    seconds = 0;
    timer[0].innerText = 0;
    setTimeout(function () {
      time = setInterval(addTime, 1000);
      movement();
    }, 4000);
  }, 2000);
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
function countdownTimer() {
  countdown = setInterval(function () {
    if (timeleft <= 0) {
      $(".instructions").text("Go!!").fadeOut(800);
      clearInterval(countdown);
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
    countdownTimer();
    setTimeout(function () {
      time = setInterval(addTime, 1000);
      movement();
    }, 4000);
    started = true;
  }
});
