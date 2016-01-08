var createCanvas = function(form){
  var canvas = new TEST_MODULES.RandomGenerator(form.nombre_canvas.value);
  canvas.setCanvasSize(form.ancho_canvas.value, form.alto_canvas.value);
  canvas.setPixelSize(form.ancho_pixel.value, form.alto_pixel.value, form.opacidad_pixel.checked);
  canvas.pixelize();
};

var resetCanvas = function(form){
  var canvas = new TEST_MODULES.RandomGenerator('fake');
  canvas.clearCanvas();
};
