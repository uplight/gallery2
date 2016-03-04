/**
 * Created by VladHome on 1/28/2016.
 */
///<reference path="../typing/jquery.d.ts"/>
/// <reference path="../typing/tweenjs.d.ts" />
/// <reference path="../typing/easeljs.d.ts" />
///<reference path="ImagesPreloader.ts"/>
///<reference path="MouseController.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gallery;
(function (gallery) {
    var Container = createjs.Container;
    var ImageContainer = (function (_super) {
        __extends(ImageContainer, _super);
        function ImageContainer(imgM, thumbWidth, thumbHeight) {
            _super.call(this);
            this.imgM = imgM;
            this.i = imgM.i;
            var img = imgM.image;
            var w = img.naturalWidth;
            var h = img.naturalHeight;
            var sW = thumbWidth / w;
            var sH = thumbHeight / h;
            var scale = (sW < sH) ? sW : sH;
            // var cont:Container = new Container();
            var graphics = new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, thumbWidth, thumbHeight);
            var shape = new createjs.Shape(graphics);
            this.addChild(shape);
            var bmp = new createjs.Bitmap(img);
            bmp.name = 'bmp';
            bmp.scaleX = scale;
            bmp.scaleY = scale;
            w = w * scale;
            h = h * scale;
            this.imgW = w;
            this.imgH = h;
            this.imgX = (thumbWidth - w) / 2;
            bmp.x = this.imgX;
            this.imgY = (thumbHeight - h) / 2;
            bmp.y = this.imgY;
            this.addChild(bmp);
            this.mouseChildren = false;
            //  var cont:Container = new Container()
            //  cont.addChild(vo.sale?ImagesLibrary.instance.getPrice2():ImagesLibrary.instance.getPrice1());
            //  var txt:createjs.Text = new createjs.Text(vo.price, "30px Arial",'#FFFFFF');
            // txt.x = 10;
            // txt.y = 20;
            // cont.addChild(txt);
            // this.addChild(cont);
            this.cache(0, 0, thumbWidth, thumbHeight);
        }
        return ImageContainer;
    })(Container);
    gallery.ImageContainer = ImageContainer;
    var ImagesRow2 = (function () {
        function ImagesRow2(prop, lib, opt, i) {
            var _this = this;
            this.prop = prop;
            this.lib = lib;
            this.opt = opt;
            this.i = i;
            this.images = [];
            this.speed = 0;
            //view.setBounds(0,0,options.rowWidth,options.rowHeight);
            this.thumbWidth = opt.thumbWidth;
            this.thumbHeight = opt.thumbHeight;
            this.thumbDistance = opt.thumbDistance;
            var canv = document.createElement('canvas');
            canv.width = opt.rowWidth;
            canv.height = opt.rowHeight;
            this.canvas = canv;
            this.$view = $(prop.id).append(canv);
            this.stage = new createjs.Stage(canv);
            this.thumbDist = opt.thumbDistance;
            var shape = new createjs.Shape();
            shape.graphics.beginFill("#ffffff").drawRect(0, 0, canv.width, canv.height);
            shape.cache(0, 0, canv.width, canv.height);
            shape.alpha = 0.01;
            this.stage.addChild(shape);
            var cont = new Container();
            // cont.name = 'row_'+id;
            this.cont = cont;
            this.first = 0;
            this.cache = [];
            this.mouse = new uplight.MouseController(this.stage);
            this.mouse.onMoveX = function (dist) { return _this.move(dist); };
            this.mouse.onMoveYMore = function (dx, dy, evt) {
                if (evt.target instanceof ImageContainer)
                    _this.dispatchSelected(evt);
            };
            this.mouse.onPressHold = function (evt) {
                if (evt.target instanceof ImageContainer)
                    _this.dispatchSelected(evt);
                // console.log('onhold',evt.target  instanceof ImageContainer);
            };
            this.addImages(opt);
            this.stage.addChild(this.cont);
            this.stage.update();
            var prev = 0;
            createjs.Touch.enable(this.stage);
            createjs.Ticker.framerate = 60;
            this.showFrameCount();
            var pressStart;
            var self = this;
            var count = 0;
            var stamp = Date.now();
            /*  createjs.Ticker.addEventListener("tick",()=>{
                  if(this.isMove){
                      var speed = Math.abs(this.speed);
                     if(speed>5 && speed<20) this.friction = 0.995;
                    else  this.friction = 0.95;
                      this.speed *= this.friction;
                      if(speed<1) this.isMove = false;
                     // console.log(this.speed);
                      self.move(this.speed);
                  }
              });
      */
        }
        ImagesRow2.prototype.dispatchSelected = function (evt) {
            var cont = evt.target;
            var x = this.canvas.offsetLeft + cont.x + cont.imgX;
            var y = this.canvas.offsetTop + cont.y + cont.imgY;
            var w = cont.imgW;
            var h = cont.imgH;
            var i = evt.target.i;
            ImagesRow2.onImageSelected(i, x, y, w, h);
        };
        ImagesRow2.prototype.getNexImage = function () {
            var img = this.lib.getNext();
            if (!this.cache[img.i])
                this.cache[img.i] = new ImageContainer(img, this.thumbWidth, this.thumbHeight);
            return this.cache[img.i];
        };
        ImagesRow2.prototype.getPrevImage = function () {
            return null;
        };
        ImagesRow2.prototype.showFrameCount = function () {
            var _this = this;
            this.frameText = new createjs.Text("60", "20px Arial", "#000000");
            this.stage.addChild(this.frameText);
            this.frameCount = 0;
            this.timestamp = Date.now();
            createjs.Ticker.addEventListener("tick", function (num) {
                _this.stage.update();
                _this.frameCount++;
                if (_this.frameCount > 100) {
                    var d = (Date.now() - _this.timestamp);
                    _this.timestamp = Date.now();
                    var frames = 100 / (d / 1000);
                    // console.log(frames);
                    _this.frameText.text = String(frames);
                    _this.frameCount = 0;
                }
            });
        };
        ImagesRow2.prototype.addImages = function (options) {
            var num = options.cols; //  Math.floor(options.canvasWidth/options.thumbSize);
            var imgs = [];
            for (var i = 0, n = num; i < n; i++) {
                var img = this.getNexImage();
                // var bmp:createjs.Bitmap = new createjs.Bitmap(img.image);
                imgs.push(this.cont.addChild(img));
            }
            this.images = imgs;
            this.arangeImages();
        };
        ImagesRow2.prototype.createBackground = function (color) {
            var sh = new createjs.Shape();
            sh.graphics.beginFill(color).drawRect(0, 0, this.opt.rowWidth, this.opt.rowHeight);
            this.cont.addChildAt(sh, 0);
        };
        ImagesRow2.prototype.setPosition = function (x, y) {
            this.cont.x = x;
            this.cont.y = y;
        };
        ImagesRow2.prototype.arangeImages = function () {
            var first = this.first;
            var ar = this.images;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.x = i * this.thumbDist + first;
            }
        };
        ImagesRow2.prototype.move = function (dist) {
            // if(this.speed>10 && dist<-10) return;
            // else if(this.speed<-10 && dist>10) return;
            // if(this.speed !=0 && Math.abs(dist/this.speed)>10) {
            //  console.log('jump');
            // return
            // }
            this.speed = dist;
            this.first += dist;
            this.stage.update();
            if (this.first < -this.thumbDist) {
                // console.log(this.first);
                var img = this.images.shift();
                this.cont.removeChild(img);
                img = this.getNexImage();
                img.x = -this.thumbDist * 1.2;
                this.images.push(img);
                this.cont.addChild(img);
                this.first = this.first + this.thumbDist;
            }
            else if (this.first > 0) {
                var img = this.images.pop();
                this.cont.removeChild(img);
                img = this.getNexImage();
                img.x = this.first - this.thumbDist;
                this.images.unshift(img);
                this.cont.addChild(img);
                //  console.log(this.first);
                this.first = this.first - this.thumbDist;
            }
            this.arangeImages();
            // this.moveImages(dist);
            /// this.stage.update();
        };
        return ImagesRow2;
    })();
    gallery.ImagesRow2 = ImagesRow2;
})(gallery || (gallery = {}));
//# sourceMappingURL=ImagesRow2.js.map