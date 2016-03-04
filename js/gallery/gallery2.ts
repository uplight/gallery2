/**
 * Created by VladHome on 2/13/2016.
 */
    ///<reference path="../typing/jquery.d.ts"/>
    ///<reference path="ImagesPreloader.ts"/>
    ///<reference path="ImagesRow2.ts"/>
    ///<reference path="../typing/hammerjs.d.ts"/>
    ///<reference path="ImageDrag.ts"/>


    

module gallery2{
    export class Main{
        preloader:uplight.ImagesPreloader;
        private rows:gallery.ImagesRow2;
        private imageDrag :ImageDrag;
        constructor($view:JQuery,private opt:any){
            this.loadData();
            this.imageCover = $('#DragCover').hide();
            this.imageCover.click(()=>{
                this.imageDrag.hide();
                this.imageCover.hide();
            })


        }
        imageCover:JQuery
        initRows():void{
            var ar = this.opt.gals;
            console.log(ar);
            var out:gallery.ImagesRow2[] = [];
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                out.push(new gallery.ImagesRow2(ar[i],this.preloader,this.opt,i));
            }
            gallery.ImagesRow2.onImageSelected  = (i,x,y,w,h)=>{
                console.log(i,x,y,w,h);
                this.imageCover.show();
                this.imageDrag.loadImage(i,x,y,w,h);


            }
        }
        loadData():void{
            $.get(this.opt.getimages).done((res)=>{
                this.preloader = new uplight.ImagesPreloader(res,this.opt);
                this.imageDrag = new ImageDrag(this.preloader);
                this.imageDrag.onHitPoint=(img)=>{
                    this.imageDrag.hide();
                    this.imageCover.hide();
                }
                uplight.ImagesPreloader.onImageLoaded = (i)=>{
                    if(i===50)this.initRows();
                }

            })
        }
    }
}