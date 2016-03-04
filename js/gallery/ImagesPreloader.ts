/**
 * Created by VladHome on 1/29/2016.
 */
    ///<reference path="../typing/jquery.d.ts"/>

module uplight {

interface VOImage{
    id:number;
    cats:string;
    thumb:string;
    large:string;

}
    export class ImageM{
        name:string;
        id:number;
        thumb:string;
        large:string;
        image:HTMLImageElement;
        price:string;
        sale:boolean;
        cats:number[];
        i:number;
        w:number;
        h:number;


        constructor(obj,i:number){
            this.i=i;
            for(var str in obj)this[str] = obj[str];
            this.cats=obj.cats.split(',').map(Number);
            var image = new Image();
            image.src = this.thumb;
            image.onload = (evt)=>{
                this.w =  image.naturalWidth;
                this.h = image.naturalHeight;
                ImagesPreloader.onImageLoaded(i);
            }
            this.image = image;
        }

    }


    export class ImagesPreloader {
        static onImageLoaded:Function = function(i){};
        static images:ImageM[];

        private current:number;
        constructor(ar:ImageM[], private options:any) {
            var out:ImageM[] = [];
            for (var i = 0, n = ar.length; i < n; i++)   out.push(new ImageM(ar[i], i));//  this.addImages(i,this.renderSet(ar[i],i.toString()));
            ImagesPreloader.images = out;
            this.current = 0
        }

        getNext():ImageM{
            this.current++;
            if(this.current>=ImagesPreloader.images.length) this.current=0;
           var img:ImageM =  ImagesPreloader.images[this.current];
            return img;
        }
        getImageByI(i:number):ImageM{
            return ImagesPreloader.images[i];
        }
    }

}