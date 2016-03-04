/**
 * Created by VladHome on 2/14/2016.
 */
    /// <reference path="../typing/easeljs.d.ts" />

module uplight{
    export class MouseController{
        private pointerid;
        private autoX:boolean;
        private pressStartX:number;
        speedX:number;
        private prevX:number;

        private prvY:number;
        private startY:number;
        private pressInterval:number;
        onMoveX:Function;
        onMoveYMore:Function;
        onPressHold:Function;
        isRipping:boolean;

        private friction:number;

        constructor(private stage:any) {

            this.stage.addEventListener('mousedown', (evt:createjs.MouseEvent)=> {
                this.autoX = false;
                this.isRipping=true;
                this.pointerid = evt.pointerID;
                this.prevX = evt.stageX;
                this.pressStartX = evt.stageX;
                this.startY = evt.stageY;
                if (Math.abs(this.speedX) > 5)this.pressStartX = 0;
                this.speedX = 0;
                clearInterval(this.pressInterval);
                this.pressInterval = setTimeout(()=>{
                    if(this.onPressHold)this.onPressHold(evt);
                },2000)
            });

            this.stage.addEventListener('pressup', (evt:createjs.MouseEvent)=> {
                clearInterval(this.pressInterval);
                if (this.pressStartX !== 0 && Math.abs(this.pressStartX - evt.stageX) < 6) {
                    //if(ImagesRow.onImageClick)ImagesRow.onImageClick(evt.target)
                }
                this.pointerid = -1;
                var self = this;
                if (Math.abs(this.speedX) > 5) {
                    this.autoX = true;
                }
            });

            this.stage.addEventListener('pressmove', (evt:createjs.MouseEvent)=> {
                //  console.log(evt);
                clearInterval(this.pressInterval);
                if (evt.pointerID !== this.pointerid) return;
                var nowX:number = evt.stageX;
                var dX:number = nowX - this.prevX;
                this.prevX = nowX;
                this.speedX = dX;
                if(this.onMoveX)this.onMoveX(dX);
                if(this.isRipping){
                    var dx = evt.stageX - this.pressStartX;
                    var dy = evt.stageY - this.startY;
                    if(Math.abs(dy)>5 || Math.abs(dy)>5 ){
                        this.isRipping = false;
                        if(Math.abs(dy)>Math.abs(dx))this.onMoveYMore(dx,dy,evt);
                    }

                }
            });

            createjs.Ticker.addEventListener("tick",()=>{
                if(this.autoX){
                    var speed = Math.abs(this.speedX);
                    if(speed>5 && speed<20) this.friction = 0.995;
                    else  this.friction = 0.95;
                    this.speedX *= this.friction;
                    if(speed<1) this.autoX = false;
                    // console.log(this.speed);
                    if(this.onMoveX)this.onMoveX(this.speedX);
                }
            });



        }


    }
}