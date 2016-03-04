/**
 * Created by VladHome on 2/14/2016.
 */
///<reference path="../typing/jquery.d.ts"/>
///<reference path="ImagesPreloader.ts"/>
///<reference path="ImagesRow2.ts"/>
///<reference path="../typing/hammerjs.d.ts"/>
var gallery2;
(function (gallery2) {
    var ImageDrag = (function () {
        function ImageDrag(lib) {
            var _this = this;
            this.lib = lib;
            this.START_X = 0;
            this.START_Y = 0;
            this.transform = {
                translate: { x: this.START_X, y: this.START_Y },
                scale: 1,
                angle: 0,
                rx: 0,
                ry: 0,
                rz: 0
            };
            ////////////////////////////////////////////////
            this.initScale = 1;
            /////////////////////////////////////////////////////////
            this.initAngle = 0;
            this.view = document.getElementById('imageDrag');
            // this.image = new Image()
            // this.view.appendChild(this.image);
            var mc = new Hammer.Manager(this.view);
            mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
            mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
            mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
            var argsAr = [mc.get('pan'), mc.get('rotate')];
            mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith(argsAr);
            // mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
            // mc.add(new Hammer.Tap());
            mc.on("panstart panmove", function (evt) { return _this.onPan(evt); });
            mc.on("panstart", function (evt) { return _this.onPanStart(evt); });
            mc.on("rotate", function (evt) { return _this.onRotate(evt); });
            mc.on("rotatestart", function (evt) { return _this.onRotateStart(evt); });
            mc.on("pinchmove", function (evt) { return _this.onPinch(evt); });
            mc.on("pinchstart", function (evt) { return _this.onPinchStart(evt); });
            //  mc.on("swipe", (evt)=>this.onSwipe(evt));
            //  mc.on("tap", (evt)=>this.onTap(evt));
            //  mc.on("doubletap",(evt)=>this.onDoubleTap(evt));
            mc.on("hammer.input", function (ev) {
                if (ev.isFinal) {
                    _this.resetElement();
                }
            });
            //this.image.onload = ()=> {
            //  console.log('loaded');
            // }
        }
        ImageDrag.prototype.resetElement = function () {
            this.START_X = this.transform.translate.x;
            this.START_Y = this.transform.translate.y;
            // this.initAngle = this.transform.angle
        };
        ImageDrag.prototype.resetTransform = function () {
        };
        ////////////////////////////////////////////////////////
        ImageDrag.prototype.onPanStart = function (evt) {
            // this.START_X = this.transform.translate.x;
            // this.START_Y = this.transform.translate.y;
        };
        ImageDrag.prototype.onPan = function (evt) {
            var x = this.START_X + evt.deltaX;
            var y = this.START_Y + evt.deltaY;
            this.transform.translate = { x: x, y: y };
            console.log(evt);
            x = evt.pointers[0].pageX;
            y = evt.pointers[0].pageY;
            if (x > 500 && x < 550 && y > 1000 && y < 1050)
                this.onHitPoint(this.current);
            this.requestElementUpdate();
        };
        ImageDrag.prototype.onPinchStart = function (evt) { this.initScale = this.transform.scale; };
        ImageDrag.prototype.onPinch = function (ev) {
            this.transform.scale = this.initScale * ev.scale;
            this.requestElementUpdate();
        };
        ImageDrag.prototype.onRotateStart = function (evt) { this.initAngle = evt.rotation - this.transform.angle; };
        ImageDrag.prototype.onRotate = function (evt) {
            this.transform.angle = evt.rotation - this.initAngle;
            this.requestElementUpdate();
        };
        ImageDrag.prototype.onSwipe = function (ev) {
            console.log(ev.direction);
            //return;
            // var angle = 50;
            // this.transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
            /// this.transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
            // this.transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
            }, 300);
            this.ticking = false;
            this.requestElementUpdate();
        };
        ImageDrag.prototype.updateElementTransform = function () {
            var v = [
                'translate3d(' + this.transform.translate.x + 'px, ' + this.transform.translate.y + 'px, 0)',
                'scale(' + this.transform.scale + ', ' + this.transform.scale + ')',
                'rotate3d(' + this.transform.rx + ',' + this.transform.ry + ',' + this.transform.rz + ',' + this.transform.angle + 'deg)'
            ];
            var value = v.join(" ");
            this.view.style.webkitTransform = value;
            //this.view.style.mozTransform = value;
            this.view.style.transform = value;
            this.ticking = false;
        };
        ImageDrag.prototype.hide = function () {
            $(this.view).hide();
        };
        ImageDrag.prototype.loadImage = function (i, x, y, w, h) {
            $(this.view).show();
            this.transform.angle = 0;
            // this.transform.scale = 0.2;
            this.transform.rz = 1;
            this.startW = w;
            this.startH = h;
            var img = this.lib.getImageByI(i);
            this.current = img;
            var W = 1000;
            var H = 1000;
            var scale;
            if (img.w > img.h) {
                H = H * img.h / img.w;
                scale = h / H;
            }
            else {
                W = W * img.w / img.h;
                scale = w / W;
            }
            this.startSacle = scale;
            this.transform.scale = scale;
            $(this.view).css('background-image', 'url(' + img.large + ')');
            $(this.view).width(W);
            $(this.view).height(H);
            var midX = W / 2;
            var midY = H / 2;
            this.START_X = x - midX + (W * scale / 2);
            this.START_Y = y - midY + (H * scale / 2);
            this.transform.translate.x = this.START_X;
            this.transform.translate.y = this.START_Y;
            // this.image.src=img.large;
            // this.image.width = w;
            // this.image.height=h;
            // this.transform.translate = { x: x, y: y };
            this.requestElementUpdate();
        };
        ImageDrag.prototype.requestElementUpdate = function () {
            var _this = this;
            if (!this.ticking) {
                requestAnimationFrame(function () { return _this.updateElementTransform(); });
                this.ticking = true;
            }
        };
        return ImageDrag;
    })();
    gallery2.ImageDrag = ImageDrag;
})(gallery2 || (gallery2 = {}));
//# sourceMappingURL=ImageDrag.js.map