/**
 * Created by VladHome on 2/14/2016.
 */
///<reference path="../typing/jquery.d.ts"/>
///<reference path="ImagesPreloader.ts"/>
///<reference path="ImagesRow2.ts"/>
///<reference path="../typing/hammerjs.d.ts"/>

module gallery2{
    import ImageM = uplight.ImageM;
    export class ImageDrag{
        // image:HTMLImageElement;
        view:HTMLDivElement;
        private startW:number;
        private startH:number;
        private START_X:number=0
        private START_Y:number=0;
        hitpointX:number;
        hitpointY:number;
        onHitPoint:Function;

        private startTransform:any;
        private transform:any= {
            translate: { x: this.START_X, y: this.START_Y },
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };

        constructor(private lib:uplight.ImagesPreloader) {

            this.view = <HTMLDivElement>document.getElementById('imageDrag');
            // this.image = new Image()
            // this.view.appendChild(this.image);
            var mc = new Hammer.Manager(this.view);
            mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
            mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
            mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
            var argsAr:any = [mc.get('pan'), mc.get('rotate')];
            mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith(argsAr);

            // mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
            // mc.add(new Hammer.Tap());
            mc.on("panstart panmove",(evt)=>this.onPan(evt));
            mc.on("panstart",(evt)=>this.onPanStart(evt));
            mc.on("rotate",(evt)=>this.onRotate(evt));
            mc.on("rotatestart",(evt)=>this.onRotateStart(evt));
            mc.on("pinchmove", (evt)=>this.onPinch(evt));
            mc.on("pinchstart", (evt)=>this.onPinchStart(evt));

            //  mc.on("swipe", (evt)=>this.onSwipe(evt));
            //  mc.on("tap", (evt)=>this.onTap(evt));
            //  mc.on("doubletap",(evt)=>this.onDoubleTap(evt));
            mc.on("hammer.input", (ev)=> {
                if(ev.isFinal) {
                    this.resetElement();
                }
            });


            //this.image.onload = ()=> {
            //  console.log('loaded');

            // }



        }
        private resetElement():void{
            this.START_X = this.transform.translate.x;
            this.START_Y = this.transform.translate.y;
            // this.initAngle = this.transform.angle

        }
        resetTransform():void{

        }
////////////////////////////////////////////////////////
        onPanStart(evt):void{
            // this.START_X = this.transform.translate.x;
            // this.START_Y = this.transform.translate.y;
        }

        onPan(evt){
            var x:number = this.START_X + evt.deltaX;
            var y:number = this.START_Y + evt.deltaY;
            this.transform.translate = { x:x,y:y};
            console.log(evt);
            x= evt.pointers[0].pageX;
            y = evt.pointers[0].pageY;
            if(x>500 && x<550 && y>1000 && y< 1050) this.onHitPoint(this.current)
            this.requestElementUpdate();
        }
////////////////////////////////////////////////
        private  initScale = 1;
        onPinchStart(evt):void{ this.initScale = this.transform.scale; }
        onPinch(ev) {
            this.transform.scale = this.initScale * ev.scale;
            this.requestElementUpdate();
        }
/////////////////////////////////////////////////////////
        private initAngle = 0;
        onRotateStart(evt){ this.initAngle =  evt.rotation - this.transform.angle; }
        onRotate(evt) {
            this.transform.angle = evt.rotation-this.initAngle;
            this.requestElementUpdate();
        }
/////////////////////////////////////////////////////
        private timer:number;
        onSwipe(ev) {
            console.log(ev.direction);
            //return;

            // var angle = 50;
            // this.transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
            /// this.transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
            // this.transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

            clearTimeout(this.timer);
            this.timer = setTimeout( () =>{

            },300);
            this.ticking=false;
            this.requestElementUpdate();
        }

        private ticking:boolean;
        updateElementTransform() {
            var v = [
                'translate3d(' + this.transform.translate.x + 'px, ' + this.transform.translate.y + 'px, 0)',
                'scale(' + this.transform.scale + ', ' + this.transform.scale + ')',
                'rotate3d('+ this.transform.rx +','+ this.transform.ry +','+ this.transform.rz +','+  this.transform.angle + 'deg)'
            ];

            var value:string = v.join(" ");
            this.view.style.webkitTransform = value;
            //this.view.style.mozTransform = value;
            this.view.style.transform = value;
            this.ticking = false;
        }

        hide():void{
            $(this.view).hide();
        }
        private startSacle:number;
        private current:ImageM;
        loadImage(i,x,y,w,h):void {
            $(this.view).show();
            this.transform.angle = 0;
            // this.transform.scale = 0.2;
            this.transform.rz = 1;
            this.startW = w;
            this.startH = h;
            var img:uplight.ImageM = this.lib.getImageByI(i);
            this.current = img;

            var W:number=1000;
            var H:number=1000;
            var scale:number;
            if(img.w > img.h){

                H=H*img.h/img.w;
                scale = h/H;

            }else {
                W = W*img.w/img.h;
                scale = w/W;
            }

            this.startSacle = scale;
            this.transform.scale = scale;

            $(this.view).css('background-image','url('+img.large+')');
            $(this.view).width(W);
            $(this.view).height(H);

            var midX = W/2;
            var midY = H/2;
            this.START_X = x-midX+(W*scale/2);
            this.START_Y = y-midY+(H*scale/2);
            this.transform.translate.x = this.START_X;
            this.transform.translate.y = this.START_Y;



            // this.image.src=img.large;

            // this.image.width = w;
            // this.image.height=h;
            // this.transform.translate = { x: x, y: y };
            this.requestElementUpdate();

        }

        requestElementUpdate() {
            if(!this.ticking) {
                requestAnimationFrame(()=>this.updateElementTransform());
                this.ticking = true;
            }
        }

    }
}