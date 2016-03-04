/**
 * Created by VladHome on 2/26/2016.
 */
///<reference path="../typing/jquery.d.ts"/>
///<reference path="../typing/underscore.d.ts"/>
var touch;
(function (touch) {
    var ListDelete = (function () {
        function ListDelete($view) {
            this.$view = $view;
            this.posX = 0;
            this.posY = 0;
            this.maxX = 0;
            this.id = Number($view.data('id'));
            this.element = $view.get(0);
        }
        ListDelete.prototype.start = function () {
            if (this.isActive)
                return;
            this.isActive = true;
            this.onAnimationFrame(0);
        };
        // stop(){
        // this.isActive = false;
        //}
        ListDelete.prototype.onOut = function () {
            var _this = this;
            this.reset();
            // this.$view.addClass('deleting')
            this.$view.hide('slow', function () { _this.queuRemove(); });
        };
        ListDelete.prototype.destroy = function () {
            this.removeTouch();
            this.$view.remove();
        };
        ListDelete.prototype.reset = function () {
            this.isActive = false;
            this.isAutomove = false;
            this.speed = 0;
            this.tstartX = 0;
            this.startX = 0;
        };
        ListDelete.prototype.returnBack = function () {
            this.reset();
            var view = this.$view;
            view.addClass('returnBack');
            this.posX = 0;
            this.setstyle();
            setTimeout(function () { view.removeClass('returnBack'); }, 700);
        };
        ListDelete.prototype.moveTodelete = function () {
            this.speed = -30;
            this.isActive = true;
            this.isAutomove = true;
            this.onAnimationFrame(0);
        };
        ListDelete.prototype.onTouchStart = function (evt) {
            var _this = this;
            if (this.isBlocked)
                return;
            this.isBlocked = true;
            clearTimeout(this.blocking);
            this.blocking = setTimeout(function () { _this.isBlocked = false; }, 700);
            this.$view.removeClass('returnBack');
            this.maxX = this.$view.width() / 2;
            this.reset();
            var tt = evt.originalEvent.touches;
            var t = tt[0];
            evt.preventDefault();
            this.tstartX = t.pageX;
            this.startX = this.posX;
            // console.log(evt);
            this.stamp = evt.timeStamp;
            // console.log('start  '+this.id+'  length '+tt.length+ '    identifier  '+tt[0].identifier);
            //  console.log('start  '+this.id+'  x '+t.pageX+ '    identifier  '+t.identifier);
            this.idetifier = t.identifier;
            this.start();
        };
        ListDelete.prototype.onTouchMove = function (evt) {
            if (evt.timeStamp - this.stamp < 70)
                return;
            var t = evt.originalEvent.touches[0];
            if (t.identifier != this.idetifier)
                return;
            var cur = t.pageX;
            this.speed = cur - this.prev;
            this.prev = cur;
            var d = t.pageX - this.tstartX;
            this.posX = this.startX + d;
            if (this.posX < -this.maxX)
                this.onOut();
            this.isMove = true;
            //console.log('move   '+this.id+ '  length '+t.length+' identifier '+t[0].identifier);
        };
        ListDelete.prototype.setstyle = function () {
            // this.element.style['webkitTransform']= 'translate('+this.posX+'px,'+this.posY+'px) rotate(0) scale(1) translateZ(0)';
            this.element.style['webkitTransform'] = 'translate3d(' + this.posX + 'px,' + this.posY + 'px,0)';
        };
        ListDelete.prototype.onTouchEnd = function (evt) {
            // console.log(evt);
            if (this.speed == 0) {
                if (this.wasTap)
                    this.wasTap(evt);
                return;
            }
            if (Math.abs(this.speed) > 17) {
                console.log(' touch end with autonome ' + this.speed);
                this.isAutomove = true;
            }
            else
                this.returnBack();
        };
        ListDelete.prototype.automove = function () {
            if (this.speed > 0) {
                this.returnBack();
                return;
            }
            if (Math.abs(this.speed) > 30)
                this.speed *= 0.9;
            this.posX += this.speed;
            if (this.posX < -this.maxX)
                this.onOut();
        };
        ListDelete.prototype.onTouchCancel = function (evt) {
            this.reset();
            console.log('touchcancel');
        };
        ListDelete.prototype.onAnimationFrame = function (s) {
            var _this = this;
            if (this.isAutomove)
                this.automove();
            this.setstyle();
            if (this.isActive)
                requestAnimationFrame(function (st) { return _this.onAnimationFrame(st); });
        };
        ListDelete.prototype.addTouch = function () {
            var _this = this;
            this.$view.on('touchstart', function (evt) { return _this.onTouchStart(evt); });
            this.$view.on('touchmove', function (evt) { return _this.onTouchMove(evt); });
            this.$view.on('touchend', function (evt) { return _this.onTouchEnd(evt); });
            this.$view.on('touchcancel', function (evt) { return _this.onTouchCancel(evt); });
        };
        ListDelete.prototype.setMax = function (num) {
            this.maxX = num;
        };
        ListDelete.prototype.removeTouch = function () {
            this.$view.off('touchstart');
            this.$view.off('touchmove');
            this.$view.off('touchend');
            this.$view.off('touchcancel');
        };
        return ListDelete;
    })();
    touch.ListDelete = ListDelete;
})(touch || (touch = {}));
//# sourceMappingURL=ListDelete.js.map