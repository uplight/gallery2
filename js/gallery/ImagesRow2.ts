/**
 * Created by VladHome on 1/28/2016.
 */
    ///<reference path="../typing/jquery.d.ts"/>
/// <reference path="../typing/tweenjs.d.ts" />
/// <reference path="../typing/easeljs.d.ts" />
    ///<reference path="ImagesPreloader.ts"/>
    ///<reference path="MouseController.ts"/>


module gallery{
    import Bitmap = createjs.Bitmap;
    import SpriteContainer = createjs.SpriteContainer;
    //import Data = google.maps.Data;

    import Stage = createjs.Stage;
    import DisplayObject = createjs.DisplayObject;
    import MouseEvent = createjs.MouseEvent;
    import Container = createjs.Container;
    import Shape = createjs.Shape;
    import ImageM = uplight.ImageM;


    export class ImageContainer extends Container{
        imgX:number;
        imgY:number;
        imgW:number;
        imgH:number;
        i:number;
        constructor(public imgM:ImageM,thumbWidth,thumbHeight){
            super();
            this.i = imgM.i;
            var img =  imgM.image;
            var w = img.naturalWidth;
            var h = img.naturalHeight;
            var sW:number = thumbWidth / w;
            var sH:number = thumbHeight / h;
            var  scale:number =  (sW<sH)?sW:sH;
           // var cont:Container = new Container();
            var graphics = new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, thumbWidth, thumbHeight);
            var shape = new createjs.Shape(graphics);
            this.addChild(shape);
            var bmp:createjs.Bitmap = new createjs.Bitmap(img);
            bmp.name='bmp';
            bmp.scaleX = scale;
            bmp.scaleY = scale;
            w = w * scale;
            h = h * scale;
            this.imgW = w;
            this.imgH = h;
            this.imgX = (thumbWidth - w) / 2;
            bmp.x =  this.imgX;
            this.imgY  = (thumbHeight- h) / 2;
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

            this.cache(0, 0, thumbWidth,thumbHeight);
        }
    }
export class ImagesRow2{
    images:DisplayObject[]=[];
    cont:Container;
    private speed:number=0;
    pointerid:number;
    private thumbDist:number;
    stage:Stage;
    canvas:HTMLCanvasElement;
    $view:JQuery
    private cache:DisplayObject[];
    private thumbWidth:number;
    private thumbHeight:number;
    private thumbDistance:number;
    private mouse:uplight.MouseController;
   static  onImageSelected:Function;

    constructor(private prop:any,private  lib:uplight.ImagesPreloader,private opt:any, private i:number){
        //view.setBounds(0,0,options.rowWidth,options.rowHeight);
        this.thumbWidth = opt.thumbWidth;
        this.thumbHeight = opt.thumbHeight;
        this.thumbDistance =  opt.thumbDistance;
        var canv = document.createElement('canvas');
        canv.width = opt.rowWidth;
        canv.height = opt.rowHeight;
        this.canvas = canv;
        this.$view = $(prop.id).append(canv);
        this.stage = new createjs.Stage(canv);

        this.thumbDist=opt.thumbDistance;
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#ffffff").drawRect(0, 0, canv.width,canv.height);
        shape.cache(0, 0, canv.width,canv.height);
        shape.alpha=0.01;
       this.stage.addChild(shape);

        var cont:Container = new Container();

       // cont.name = 'row_'+id;

        this.cont = cont;
        this.first=0;
        this.cache=[];

        this.mouse=new uplight.MouseController(this.stage);
        this.mouse.onMoveX = (dist)=>this.move(dist);
        this.mouse.onMoveYMore =(dx,dy,evt:createjs.MouseEvent)=>{
            if(evt.target  instanceof ImageContainer) this.dispatchSelected(evt);
        }

        this.mouse.onPressHold=(evt:createjs.MouseEvent)=>{
            if(evt.target  instanceof ImageContainer) this.dispatchSelected(evt)

           // console.log('onhold',evt.target  instanceof ImageContainer);
        }


        this.addImages(opt);
        this.stage.addChild(this.cont);
        this.stage.update();
        var prev:number=0;
        createjs.Touch.enable(this.stage);
        createjs.Ticker.framerate = 60;
        this.showFrameCount();
        var pressStart:number;
        var self = this;
        var count=0;
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

    private dispatchSelected(evt){
        var cont:ImageContainer =  evt.target;
        var x= this.canvas.offsetLeft + cont.x+cont.imgX;
        var y = this.canvas.offsetTop + cont.y+cont.imgY;
        var w:number = cont.imgW;
        var h:number = cont.imgH;
        var i = evt.target.i;
        ImagesRow2.onImageSelected(i,x,y,w,h);
    }
    private frameCount:number
    private timestamp:number;
    private frameText:createjs.Text;

    private getNexImage():DisplayObject{
        var img:ImageM = this.lib.getNext();
        if(!this.cache[img.i])  this.cache[img.i] =  new ImageContainer(img,this.thumbWidth,this.thumbHeight)
        return this.cache[img.i]
    }
    private getPrevImage():Bitmap{

return null;
    }
    private showFrameCount(){
        this.frameText =  new createjs.Text("60", "20px Arial", "#000000");
        this.stage.addChild(this.frameText);
        this.frameCount=0;
        this.timestamp = Date.now();
        createjs.Ticker.addEventListener("tick",(num:number)=>{
            this.stage.update();
           this.frameCount++;
             if(this.frameCount>100){
            var d= (Date.now()-this.timestamp);
              this.timestamp=Date.now();
                 var frames =  100/(d/1000);
            // console.log(frames);
                 this.frameText.text = String(frames);
              this.frameCount=0;
           }
        });
    }
    static onImageClick:Function;
    private addImages(options):void{
      var num = options.cols;//  Math.floor(options.canvasWidth/options.thumbSize);
        var imgs:DisplayObject[]=[];
        for (var i = 0, n = num; i < n; i++) {
        var img:DisplayObject = this.getNexImage();
           // var bmp:createjs.Bitmap = new createjs.Bitmap(img.image);
           imgs.push(this.cont.addChild(img));
        }

        this.images = imgs;
        this.arangeImages();
    }

    createBackground(color):void{
        var sh = new createjs.Shape();
        sh.graphics.beginFill(color).drawRect(0, 0, this.opt.rowWidth, this.opt.rowHeight);
       this.cont.addChildAt(sh,0);
    }
    setPosition(x:number,y:number):void{
        this.cont.x=x;
        this.cont.y=y;
    }

    private friction:number;
    private isMove:boolean;
    private interval:number;

    private arangeImages(){
        var first = this.first;
        var ar = this.images;
        for (var i = 0, n = ar.length; i < n; i++) {
            var item = ar[i];
            item.x=i*this.thumbDist+first;
        }
    }



    private first:number;

    move(dist):void{
        // if(this.speed>10 && dist<-10) return;
        // else if(this.speed<-10 && dist>10) return;
       // if(this.speed !=0 && Math.abs(dist/this.speed)>10) {
          //  console.log('jump');
           // return
       // }

        this.speed = dist;
       this.first+=dist;

        this.stage.update();
        if(this.first<-this.thumbDist) {
           // console.log(this.first);
            var img:DisplayObject = this.images.shift();
            this.cont.removeChild(img);
            img = this.getNexImage();
            img.x = -this.thumbDist*1.2;
            this.images.push(img);
            this.cont.addChild(img)
            this.first = this.first + this.thumbDist;
           // this.arangeImages();

        } else if(this.first>0){
            var img:DisplayObject = this.images.pop();
            this.cont.removeChild(img);
            img = this.getNexImage();
           img.x = this.first - this.thumbDist;

            this.images.unshift(img);
            this.cont.addChild(img);
          //  console.log(this.first);
            this.first = this.first - this.thumbDist;
         //   console.log(this.first);
          //  this.arangeImages();
        }
        this.arangeImages();
       // this.moveImages(dist);
        /// this.stage.update();

    }


   /* private moveImages(dist){
        var ar = this.images;
        for (var i = 0, n = ar.length; i < n; i++) {
            var item = ar[i];
            item.x=item.x+dist;
            if(item.x>this.opt.W || item.x<-this.opt.imageWidth){
                this.cont.removeChild(item);
                ar[i] = this.addChild(item.x>0);
            }
           // this.arangeImages2();
        }
    }*/
}


}