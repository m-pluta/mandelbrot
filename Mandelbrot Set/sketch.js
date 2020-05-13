//noprotect        //Delete this line if the program crashes often.
var minXval = -2;
var maxXval = 2; //Inital domain for the mandelbrot set
var minYval = -2;
var maxYval = 2;
var zoom = 4; //Amount of zoom per iteration
var operations = 0; //Counter which shows how many operations took place per iteration
var maxiterations = 200; //How many iterations to check convergence per pixel

function setup() {

  createCanvas(256, 256); //Canvas size
  createP();

  let div = createDiv('Mandelbrot Set')

  updateSet(); //Inital load of the Mandelbrot

}

function draw() {

}

function updateSet() {
  operations = 0;

  for (var x = 0; x < width; x++) { //Goes through all the pixels
    for (var y = 0; y < height; y++) {
      var a = map(x, 0, width, minXval, maxXval); //Determines coefficient of a in a+bi
      var b = map(y, 0, height, minYval, maxYval); //Determines coefficient of b in a+bi

      var ca = a; //Saves the original value of a
      var cb = b; //Saves the original value of b

      var iteration = 0; //Initialises counter

      while (iteration < maxiterations) { //Goes through each iteration
        var aResult = a * a - b * b;
        var bResult = 2 * a * b; //Works out new coefficients
        a = aResult + ca;
        b = bResult + cb; //Adds on previous coefficient
        operations++; //Increases operation counter
        if (a * a + b * b > 8) {
          break; //If a^2+b^2 is bigger than 8 (arbitrary value) then the while loop stops
        }
        iteration++; //Increases iteration counter
      }

      var brightness = map(iteration, 0, maxiterations, 0, 1); //Converts how close a point was to being in the set to a brightness value between 0-1
      brightness = map(sqrt(brightness), 0, 1, 255, 0); //Adjusts brightness to 0-255


      if (brightness == 0) { //Black Colour
        stroke(0);
        point(x, y);
      } else if (brightness < 64) {
        stroke(0, brightness * 4, 255 - brightness * 4); //Blue to Green Fade
        point(x, y);

      } else if (brightness < 192) {
        stroke(brightness * (4 / 3), 255 - brightness, 0); //Green to Red Fade
        point(x, y);

      } else {
        stroke(255, 64, 0); //Red
        point(x, y);
      }


    }
  }
  print(nfc(operations, 0))
}


function mousePressed() {
  var across = maxXval - minXval; //Works out the size of the domain in the x axis
  var up = maxYval - minYval; //Works out the size of the domain in the y axis


  minXval = map(mouseX, 0, width, minXval, maxXval) - ((map(mouseX, 0, width, minXval, maxXval) - minXval) / (zoom)); //Adjusts size of x domain based on position of zoom
  minYval = map(mouseY, 0, height, minYval, maxYval) - ((map(mouseY, 0, height, minYval, maxYval) - minYval) / (zoom)); //Adjusts size of x domain based on position of zoom

  maxXval = minXval + across / zoom; //Calculates position of max value of domain

  maxYval = minYval + up / zoom; //Calculates position of max value of domain
  updateSet(); //Updates the image based on the new position after the zoom
}