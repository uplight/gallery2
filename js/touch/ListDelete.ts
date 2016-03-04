/**
 * Created by VladHome on 2/26/2016.
 */
    ///<reference path="../typing/jquery.d.ts"/>
    ///<reference path="../typing/underscore.d.ts"/>

module touch{
  export class ListDelete{
      queuRemove:Function;
      wasTap:Function;
      speed:number;
      angle:number;
      touchid:number;
      touches:TouchList;
      id:number;
      idetifier:number;
      element:HTMLElement;
      posX = 0;
      posY = 0;
      tstartX:number;
      startX:number;
      isActive:boolean;
      isAutomove:boolean;
      maxX:number=0;
      start():void{
          if(this.isActive) return;
          this.isActive = true;
          this.onAnimationFrame(0);
      }
     // stop(){
         // this.isActive = false;
      //}

      onOut():void{
          this.reset();
         // this.$view.addClass('deleting')
          this.$view.hide('slow',()=>{ this.queuRemove();});
      }

      destroy():void{
          this.removeTouch();
          this.$view.remove();
      }

      reset(){
          this.isActive = false;
          this.isAutomove = false;
          this.speed=0;
          this.tstartX=0;
          this.startX=0;
      }

      returnBack():void{
          this.reset();
          var view= this.$view;
          view.addClass('returnBack');
          this.posX=0;
          this.setstyle();
          setTimeout(function(){view.removeClass('returnBack');},700);
      }
      moveTodelete():void{
          this.speed=-30;
          this.isActive= true;
          this.isAutomove =true;
          this.onAnimationFrame(0);
      }
      stamp:number;
      isBlocked:boolean;
      blocking:number
      onTouchStart(evt:any):void{
          if(this.isBlocked) return;
          this.isBlocked = true;
          clearTimeout(this.blocking);
          this.blocking = setTimeout(()=>{this.isBlocked = false},700);
          this.$view.removeClass('returnBack');
          this.maxX = this.$view.width()/2;
          this.reset();
          var tt: TouchList = <TouchList> evt.originalEvent.touches;
          var t:Touch = tt[0];
          evt.preventDefault();
          this.tstartX = t.pageX;
          this.startX = this.posX;
         // console.log(evt);
          this.stamp = evt.timeStamp;

          // console.log('start  '+this.id+'  length '+tt.length+ '    identifier  '+tt[0].identifier);

          //  console.log('start  '+this.id+'  x '+t.pageX+ '    identifier  '+t.identifier);
          this.idetifier =t.identifier;
          this.start();
      }

      prev:number;
      isMove:boolean;
      onTouchMove(evt:any):void{
          if(evt.timeStamp-this.stamp<70) return;
          var t: Touch = <Touch> evt.originalEvent.touches[0];
          if(t.identifier != this.idetifier) return;
          var cur:number = t.pageX;
          this.speed  = cur - this.prev;
          this.prev = cur;
          var d = t.pageX - this.tstartX;
          this.posX = this.startX+d;
          if(this.posX<-this.maxX)this.onOut();
         this.isMove = true;
          //console.log('move   '+this.id+ '  length '+t.length+' identifier '+t[0].identifier);

      }

      setstyle():void{
          // this.element.style['webkitTransform']= 'translate('+this.posX+'px,'+this.posY+'px) rotate(0) scale(1) translateZ(0)';
          this.element.style['webkitTransform']= 'translate3d('+this.posX+'px,'+this.posY+'px,0)';
      }

      onTouchEnd(evt:any):void{
         // console.log(evt);
        if(this.speed==0){
            if(this.wasTap)this.wasTap(evt);
             return;
          }
          if(Math.abs(this.speed)>17){
              console.log(' touch end with autonome '+this.speed);
              this.isAutomove=true;
          }
          else  this.returnBack();
      }

      automove():void{
          if(this.speed>0){
              this.returnBack();
              return
          }
          if(Math.abs(this.speed)>30) this.speed*=0.9;
          this.posX+=this.speed;
          if(this.posX<-this.maxX)this.onOut();
      }
      onTouchCancel(evt:JQueryEventObject):void{
         this.reset();
          console.log('touchcancel');
      }

      onAnimationFrame(s){
          if(this.isAutomove)this.automove();
          this.setstyle();
          if(this.isActive)requestAnimationFrame((st)=>this.onAnimationFrame(st));
      }

      addTouch():void{
          this.$view.on('touchstart',(evt)=>this.onTouchStart(evt));
          this.$view.on('touchmove',(evt)=>this.onTouchMove(evt));
          this.$view.on('touchend',(evt)=>this.onTouchEnd(evt));
          this.$view.on('touchcancel',(evt)=>this.onTouchCancel(evt));
      }

      setMax(num:number):void{
          this.maxX=num;
      }
      removeTouch():void{
          this.$view.off('touchstart');
          this.$view.off('touchmove');
          this.$view.off('touchend');
          this.$view.off('touchcancel');
      }
      constructor(private $view:JQuery){
          this.id=Number($view.data('id'));
          this.element = $view.get(0);
      }
  }

}