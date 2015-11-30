var TEST_MODULES = TEST_MODULES || {};
TEST_MODULES.RandomGenerator =
    function(canvasId) {
        this.id = canvasId;
        this.canvas = document.getElementById(canvasId);
        if (this.id && this.canvas) {
            this.context = this.canvas.getContext("2d");
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.pixelWidth;
            this.pixelHeight;
            this.pixelOpacity;
        } else {
            console.error("Canvas can not be found, did you provide correct ID?");
        }
    };

TEST_MODULES.RandomGenerator.prototype = (function() {
    var generateImageColor, createPixel, fillCanvas;

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
            } else {
                image.data[i + 3] = 255;
            }
        }
        ctx.putImageData(image, x, y);
    };

    fillCanvas = function(width, height, opacity) {

        var currentX = 0,
            currentY = 0;

        this.pixelWidth = width || 1;
        this.pixelHeight = height || 1;
        this.pixelOpacity = opacity || false;
        while (currentY < this.height) {
            currentX = 0;
            while (currentX < this.width) {
                createPixel(this.context, this.pixelWidth, this.pixelHeight, currentX, currentY, this.pixelOpacity);
                currentX += this.pixelWidth;
            }
            currentY += this.pixelHeight;
        }
    };
    return {
        constructor: TEST_MODULES.RandomGenerator,
        pixelize: fillCanvas

    };
})();
