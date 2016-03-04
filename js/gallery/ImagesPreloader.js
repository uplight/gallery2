/**
 * Created by VladHome on 1/29/2016.
 */
///<reference path="../typing/jquery.d.ts"/>
var uplight;
(function (uplight) {
    var ImageM = (function () {
        function ImageM(obj, i) {
            var _this = this;
            this.i = i;
            for (var str in obj)
                this[str] = obj[str];
            this.cats = obj.cats.split(',').map(Number);
            var image = new Image();
            image.src = this.thumb;
            image.onload = function (evt) {
                _this.w = image.naturalWidth;
                _this.h = image.naturalHeight;
                ImagesPreloader.onImageLoaded(i);
            };
            this.image = image;
        }
        return ImageM;
    })();
    uplight.ImageM = ImageM;
    var ImagesPreloader = (function () {
        function ImagesPreloader(ar, options) {
            this.options = options;
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(new ImageM(ar[i], i)); //  this.addImages(i,this.renderSet(ar[i],i.toString()));
            ImagesPreloader.images = out;
            this.current = 0;
        }
        ImagesPreloader.prototype.getNext = function () {
            this.current++;
            if (this.current >= ImagesPreloader.images.length)
                this.current = 0;
            var img = ImagesPreloader.images[this.current];
            return img;
        };
        ImagesPreloader.prototype.getImageByI = function (i) {
            return ImagesPreloader.images[i];
        };
        ImagesPreloader.onImageLoaded = function (i) { };
        return ImagesPreloader;
    })();
    uplight.ImagesPreloader = ImagesPreloader;
})(uplight || (uplight = {}));
//# sourceMappingURL=ImagesPreloader.js.map