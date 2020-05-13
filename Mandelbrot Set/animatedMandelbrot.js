var minXval = -2;
var maxXval = 2;
var minYval = -2;
var maxYval = 2;
var zoom = 1.05
//Domain for the mandelbrot set
var i = 0;
var j = 0;
var fps = 60;
var mx = 130.50980392156862;
var my = 220.86274509803923;


function setup() {

  createCanvas(512, 512);
  updateSet();

}

function draw() {
  if (i * fps + j <= 1800) {
    var across = maxXval - minXval;
    var up = maxYval - minYval;

    if (j >= fps) {
      j = 0;
      i++;
    }

    minXval = map(mx, 0, width, minXval, maxXval) - ((map(mx, 0, width, minXval, maxXval) - minXval) / (zoom));
    minYval = map(my, 0, height, minYval, maxYval) - ((map(my, 0, height, minYval, maxYval) - minYval) / (zoom));

    maxXval = minXval + across / zoom;

    maxYval = minYval + up / zoom;

    updateSet();
    //saveCanvas('Mandelbrot' + ' ' + (i + 1) + '#' + (j + 1), 'png')
    j++;
    strokeWeight(10)
    stroke(255, 0, 0)
    point(mx, my)
    strokeWeight(1)

  }
}

function updateSet() {

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var a = map(x, 0, width, minXval, maxXval);
      var b = map(y, 0, height, minYval, maxYval);

      var ca = a;
      var cb = b;

      var iteration = 0;
      var maxiterations = 16000;

      while (iteration < maxiterations) {
        var aResult = a * a - b * b;
        var bResult = 2 * a * b;
        a = aResult + ca;
        b = bResult + cb;
        if (a * a + b * b > 16) {
          break;
        }
        iteration++;
      }

      var brightness = map(iteration, 0, maxiterations, 0, 1);
      brightness = map(sqrt(brightness), 0, 1, 0, 255);

      var pix = (x + y * width) * 4;

      brightness = 255 - brightness;
      if (brightness == 0) {
        stroke(0);
        point(x, y);
      } else if (brightness < 64) {
        stroke(255, brightness * 4, 0);
        point(x, y);

      } else if (brightness < 128) {
        stroke(255 - (brightness * 2), 0, brightness * 2);
        point(x, y);

      } else {
        stroke(0, 255 - brightness, 255);
        point(x, y);
      }


    }
  }

}

function mousePressed() {
  mx = mouseX;
  my = mouseY;


}