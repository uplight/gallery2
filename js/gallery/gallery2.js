/**
 * Created by VladHome on 2/13/2016.
 */
///<reference path="../typing/jquery.d.ts"/>
///<reference path="ImagesPreloader.ts"/>
///<reference path="ImagesRow2.ts"/>
///<reference path="../typing/hammerjs.d.ts"/>
///<reference path="ImageDrag.ts"/>
var gallery2;
(function (gallery2) {
    var Main = (function () {
        function Main($view, opt) {
            var _this = this;
            this.opt = opt;
            this.loadData();
            this.imageCover = $('#DragCover').hide();
            this.imageCover.click(function () {
                _this.imageDrag.hide();
                _this.imageCover.hide();
            });
        }
        Main.prototype.initRows = function () {
            var _this = this;
            var ar = this.opt.gals;
            console.log(ar);
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                out.push(new gallery.ImagesRow2(ar[i], this.preloader, this.opt, i));
            }
            gallery.ImagesRow2.onImageSelected = function (i, x, y, w, h) {
                console.log(i, x, y, w, h);
                _this.imageCover.show();
                _this.imageDrag.loadImage(i, x, y, w, h);
            };
        };
        Main.prototype.loadData = function () {
            var _this = this;
            $.get(this.opt.getimages).done(function (res) {
                _this.preloader = new uplight.ImagesPreloader(res, _this.opt);
                _this.imageDrag = new gallery2.ImageDrag(_this.preloader);
                _this.imageDrag.onHitPoint = function (img) {
                    _this.imageDrag.hide();
                    _this.imageCover.hide();
                };
                uplight.ImagesPreloader.onImageLoaded = function (i) {
                    if (i === 50)
                        _this.initRows();
                };
            });
        };
        return Main;
    })();
    gallery2.Main = Main;
})(gallery2 || (gallery2 = {}));
//# sourceMappingURL=gallery2.js.map