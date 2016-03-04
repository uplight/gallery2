/**
 * Created by VladHome on 2/25/2016.
 */
///<reference path="../typing/jquery.d.ts"/>
///<reference path="../typing/underscore.d.ts"/>
///<reference path="../touch/ListDelete.ts"/>
var lists;
(function (lists) {
    var VOData = (function () {
        function VOData(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOData;
    })();
    lists.VOData = VOData;
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    })();
    lists.Point = Point;
    var ProductItem = (function () {
        function ProductItem(vo, template) {
            var _this = this;
            this.vo = vo;
            this.template = template;
            this.id = vo.id;
            var out = template(vo);
            this.$view = $('<tr>').html(out);
            this.$view.data('id', vo.id);
            this.handler = new touch.ListDelete(this.$view);
            this.handler.queuRemove = function () {
                ProductItem.queuRemove(_this.vo);
            };
            this.handler.wasTap = function (evt) {
                if ($(evt.target).hasClass('first'))
                    _this.handler.moveTodelete();
            };
        }
        ProductItem.prototype.appendTo = function ($container) {
            this.$view.appendTo($container);
            this.handler.addTouch();
        };
        ProductItem.prototype.remove = function () {
            this.handler.destroy();
            this.$view.remove();
        };
        return ProductItem;
    })();
    lists.ProductItem = ProductItem;
    var ProdictList = (function () {
        function ProdictList($view, service) {
            var _this = this;
            this.$view = $view;
            var templ = _.template('<td class="first"><%=id%></td><td><%=name%></td><td><%=pos%></td>');
            service.done(function (data) {
                var ar = data;
                var out = [];
                for (var i = 0, n = ar.length; i < n; i++) {
                    out.push(new ProductItem(ar[i], templ));
                }
                _this.data = out;
                if (_this.onData)
                    _this.onData(out);
                _this.render();
            });
        }
        ProdictList.prototype.removeItem = function (item) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == item.id) {
                    ar[i].remove();
                    ar.splice(i, 1);
                    break;
                }
            }
        };
        ProdictList.prototype.render = function () {
            var _this = this;
            this.$view.html('');
            // console.log(this.data);
            ProductItem.queuRemove = function (item) {
                _this.removeItem(item);
                //console.log(this.data.length);
            };
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                ar[i].appendTo(this.$view);
            }
        };
        return ProdictList;
    })();
    lists.ProdictList = ProdictList;
})(lists || (lists = {}));
var p = $.get('getproduct/100');
var list = new lists.ProdictList($('#ProductList'), p);
//# sourceMappingURL=List.js.map