var TEST_MODULES = TEST_MODULES || {};
TEST_MODULES.RandomGenerator =
    function(canvasId) {
        setCanvas.call(this, canvasId);
    };

TEST_MODULES.RandomGenerator.prototype = (function() {
    var _CONTAINER = document.getElementById("pixels-container"),
        _DEFAULT_CANVAS_NAME = "test-canvas",
        generateImageColor,
        createPixel,
        fillCanvas,
        setCanvasSize,
        setPixelSize;

    setCanvas = function(canvasId) {
        var myCanvas = document.getElementById(canvasId)||document.createElement("CANVAS");
        this.id = canvasId || _DEFAULT_CANVAS_NAME;
        myCanvas.id = this.id;
        this.canvas = myCanvas;
        if (!document.getElementById(this.id)){
            _CONTAINER.appendChild(this.canvas);
        }
        this.context = this.canvas.getContext("2d");
        this.width = 0;
        this.height = 0;
        this.pixelWidth = 0;
        this.pixelHeight = 0;
        this.pixelOpacity = false;

    };

    setCanvasSize = function(height, width) {
        if (this.canvas) {
            if (height > 0) {
                this.canvas.height = parseFloat(height, 10);
                this.height = parseFloat(height, 10);
            }
            if (width > 0) {
                this.canvas.width = parseFloat(width, 10);
                this.width = parseFloat(width, 10);
            }
        }
    };

    setPixelSize = function(height, width, opacity) {
        if (height > 0) {
            this.pixelHeight = parseFloat(height, 10);
        }
        if (width > 0) {
            this.pixelWidth = parseFloat(width, 10);
        }
        this.pixelOpacity = opacity;
    };

    generateImageColor = function(opacity) {
        var items = opacity ? 4 : 3,
            colors = [];
        for (var i = 0; i < items; i++) {
            colors.push(Math.round((Math.random() * 255) + 1));
        }
        return colors;
    };

    createPixel = function(ctx, width, height, offsetX, offsetY, op) {
        var x = offsetX || 0,
            y = offsetY || 0,
            opacity = op || false,
            image, colors;
        image = ctx.createImageData(width, height);
        colors = generateImageColor(opacity);

        for (var i = 0; i < image.data.length; i += 4) {
            image.data[i + 0] = colors[0];
            image.data[i + 1] = colors[1];
            image.data[i + 2] = colors[2];
            if (opacity) {
                image.data[i + 3] = colors[3];
            }
            else {
                image.data[i + 3] = 255;
            }
        }
        ctx.putImageData(image, x, y);
    };

    fillCanvas = function(width, height, opacity) {

        var currentX = 0,
            currentY = 0;

        this.pixelWidth = width || this.pixelWidth;
        this.pixelHeight = height || this.pixelHeight;
        this.pixelOpacity = opacity || this.pixelOpacity;
        while (currentY < this.height) {
            currentX = 0;
            while (currentX < this.width) {
                createPixel(this.context, this.pixelWidth, this.pixelHeight, currentX, currentY, this.pixelOpacity);
                currentX += this.pixelWidth;
            }
            currentY += this.pixelHeight;
        }

    };
    clearCanvas = function() {
        while (_CONTAINER.firstChild) {
            _CONTAINER.removeChild(_CONTAINER.firstChild)
        }
    };
    return {
        constructor: TEST_MODULES.RandomGenerator,
        setCanvasSize: setCanvasSize,
        setPixelSize: setPixelSize,
        pixelize: fillCanvas,
        clearCanvas: clearCanvas
    };
})();
