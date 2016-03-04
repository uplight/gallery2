/**
 * Created by VladHome on 2/25/2016.
 */
    ///<reference path="../typing/jquery.d.ts"/>
    ///<reference path="../typing/underscore.d.ts"/>
    ///<reference path="../touch/ListDelete.ts"/>
    
module lists{
    export class VOData{
        id:number;
        name:string;
        constructor(obj:any){ for(var str in obj) this[str]= obj[str];}
    }
    export class Point{
       constructor(public x:number,public y:number){

       }
    }

    export class ProductItem{
        $view:JQuery;
        id:number
        static queuRemove:Function;
        handler:touch.ListDelete;
        appendTo($container:JQuery):void{
            this.$view.appendTo($container);
           this.handler.addTouch();
        }

        constructor(private vo:VOData,private template:any){
            this.id = vo.id;
            var out= template(vo);
            this.$view=$('<tr>').html(out);
            this.$view.data('id',vo.id);
            this.handler = new touch.ListDelete(this.$view);
            this.handler.queuRemove = ()=>{
                ProductItem.queuRemove(this.vo);
            }
            this.handler.wasTap =(evt)=>{
                if($(evt.target).hasClass('first')) this.handler.moveTodelete()   ;
            };
        }
        remove(){
            this.handler.destroy();
            this.$view.remove();
        }
    }


    export class ProdictList{
        onData:Function;
        data:ProductItem[];
        constructor(private $view:JQuery,service:JQueryPromise<VOData>){
            var templ = _.template('<td class="first"><%=id%></td><td><%=name%></td><td><%=pos%></td>');
            service.done((data:VOData[])=>{
                var ar = data;
                var out:ProductItem[] =[];
                for(var i=0,n=ar.length;i<n;i++){ out.push(new ProductItem(ar[i],templ));  }
                this.data = out;
                if(this.onData)this.onData(out);
                this.render();
            })
        }

        removeItem(item:VOData):void{
            var ar = this.data
            for(var i=0,n=ar.length;i<n;i++){
               if(ar[i].id==item.id){
                   ar[i].remove() ;
                   ar.splice(i,1);
                   break;
               }
            }
        }

        render():void{
            this.$view.html('');
           // console.log(this.data);
            ProductItem.queuRemove = (item)=>{
                this.removeItem(item);
                //console.log(this.data.length);
            }
            var ar = this.data;
            for(var i=0,n=ar.length;i<n;i++){
               ar[i].appendTo(this.$view);
            }

        }

    }
}

var p = $.get('getproduct/100');
var list = new lists.ProdictList($('#ProductList'),p);