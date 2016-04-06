/*
    pen.js 

    made by: Philip Stapelfeldt
    website: http://www.capshake.com
*/
window.pen = (function () {

    function Pen(els) {
        for (var i = 0; i < els.length; i++) {
            this[i] = els[i];
        }
        this.length = els.length;
    }

    var pen = function (selector) {
        if (selector === '' || typeof selector === 'undefined') {
            return;
        } else {
            selector = selector;

            if (typeof selector === "string") {
                els = document.querySelectorAll(selector);
            } else if (selector.length) {
                els = selector;
            } else {
                els = [selector];
            }
            return new Pen(els);
        }
    }

    Pen.prototype.forEach = function (callback) {
        this.map(callback);
        return this;
    }

    Pen.prototype.map = function (callback) {
        var results = [],
            i = 0;
        for (; i < this.length; i++) {
            results.push(callback.call(this, this[i], i));
        }
        return results;
    }

    Pen.prototype.html = function (html) {
        if (typeof html !== "undefined") {
            this.forEach(function (el) {
                el.innerHTML = html;
            });
            return this;
        } else {
            return this[0].innerHTML;
        }
    };

    Pen.prototype.append = function (html) {
        if (typeof html !== "undefined") {
            this.forEach(function (el) {
                el.innerHTML += html;
            });
            return this;
        }
    };


    Pen.prototype.after = function (html) {
        if (typeof html !== "undefined") {
            this.forEach(function (el) {
                el.insertAdjacentHTML('afterend', html)
            });
            return this;
        }
    };

    Pen.prototype.remove = function () {
        this.forEach(function (el) {
            el.parentNode.removeChild(el);
        });
        return this;
    };

    Pen.prototype.draw = function (options) {

        // vars
        var el,
            elType,
            cssStr,
            canvas = {},
            ctx = {},
            splitRow = '|',
            splitPixel = '+',
            splitColor = '=',
            type = (typeof options.type !== 'undefined' && this[0].localName === 'canvas') ? options.type : 'css';
        PIXEL_WH = (typeof options.pixelSize !== 'undefined' && options.pixelSize > 0) ? options.pixelSize : 20,
            rows = options.drawing.split(splitRow),
            rowCount = 0,
            pixelCount = 0,
            pixelsArr = [];

        // check element
        if (this[0].className === '' && this[0].id !== '') {
            el = '#' + this[0].id;
            elType = 'id';
        } else if (this[0].className === '' && this[0].id === '') {
            el = this[0].localName;
        } else if (this[0].className !== '' && this[0].id === '') {
            el = '.' + this[0].className;
            elType = 'class';
        }

        if (typeof el !== 'undefined' && el !== '') {

            // find max pixel width
            rows.forEach(function (row) {
                maxPixel = 0;
                row.split(splitPixel).forEach(function (pixels) {
                    maxPixel += parseFloat(pixels.split(splitColor)[0]);
                });
                pixelsArr.push(maxPixel);
            });


            // width & height
            var h = (rows.length * PIXEL_WH) * 1;
            var w = Math.max.apply(Math, pixelsArr) * PIXEL_WH;

            // type
            switch (type) {
            case 'css':
                cssStr = el + '{height: ' + h + 'px; width: ' + w + 'px; display:block; position: relative}' + el + ':after {content: "";position: absolute;top: 0;left: -' + PIXEL_WH + 'px;width: ' + PIXEL_WH + 'px;height: ' + PIXEL_WH + 'px;box-shadow:';
                break;
            case 'canvas':

                canvas = pen(el)[0];
                ctx = canvas.getContext("2d");

                canvas.height = h;
                canvas.width = w;
            }

            rows.forEach(function (row) {
                pixelCount = 0;
                row.split(splitPixel).forEach(function (pixels) {
                    pixels.split(splitPixel).forEach(function (pixel) {
                        pixelsArr.push(pixel.split(splitColor)[0]);
                        for (var i = 0; i < pixel.split(splitColor)[0]; i++) {

                            switch (type) {
                            case 'css':
                                cssStr += (PIXEL_WH + (pixelCount * PIXEL_WH)) * 1 + 'px ' + (rowCount * PIXEL_WH) * 1 + 'px ' + pixel.split(splitColor)[1] + ',';
                                break;
                            case 'canvas':
                                ctx.fillStyle = pixel.split(splitColor)[1];
                                ctx.fillRect((pixelCount * PIXEL_WH) * 1, (rowCount * PIXEL_WH) * 1, PIXEL_WH, PIXEL_WH);
                                    
                                break;
                            }

                            pixelCount++;
                        }
                    });
                });


                rowCount++;
            });


            // type
            switch (type) {
            case 'css':
                cssStr = cssStr.substring(0, cssStr.length - 1);
                cssStr += ';}';

                if (pen('head style').length > 0) {
                    pen('head style').append(cssStr);
                } else {
                    pen('head').append('<style>' + cssStr + '</style>');
                }

                break;
            case 'canvas':
                break;
            }
        }
    };

    return pen;
}());