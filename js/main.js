let field = $(".field"),
  circle = $(".circle"),
  red = $(".red"),
  blue = $(".blue"),
  horizontalMax = field.width() - circle.width(),
  verticalMax = field.height() - circle.height(),
  keys = [],
  x = 3;

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
