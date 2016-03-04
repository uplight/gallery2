/**
 * Created by VladHome on 2/14/2016.
 */
/// <reference path="../typing/easeljs.d.ts" />
var uplight;
(function (uplight) {
    var MouseController = (function () {
        function MouseController(stage) {
            var _this = this;
            this.stage = stage;
            this.stage.addEventListener('mousedown', function (evt) {
                _this.autoX = false;
                _this.isRipping = true;
                _this.pointerid = evt.pointerID;
                _this.prevX = evt.stageX;
                _this.pressStartX = evt.stageX;
                _this.startY = evt.stageY;
                if (Math.abs(_this.speedX) > 5)
                    _this.pressStartX = 0;
                _this.speedX = 0;
                clearInterval(_this.pressInterval);
                _this.pressInterval = setTimeout(function () {
                    if (_this.onPressHold)
                        _this.onPressHold(evt);
                }, 2000);
            });
            this.stage.addEventListener('pressup', function (evt) {
                clearInterval(_this.pressInterval);
                if (_this.pressStartX !== 0 && Math.abs(_this.pressStartX - evt.stageX) < 6) {
                }
                _this.pointerid = -1;
                var self = _this;
                if (Math.abs(_this.speedX) > 5) {
                    _this.autoX = true;
                }
            });
            this.stage.addEventListener('pressmove', function (evt) {
                //  console.log(evt);
                clearInterval(_this.pressInterval);
                if (evt.pointerID !== _this.pointerid)
                    return;
                var nowX = evt.stageX;
                var dX = nowX - _this.prevX;
                _this.prevX = nowX;
                _this.speedX = dX;
                if (_this.onMoveX)
                    _this.onMoveX(dX);
                if (_this.isRipping) {
                    var dx = evt.stageX - _this.pressStartX;
                    var dy = evt.stageY - _this.startY;
                    if (Math.abs(dy) > 5 || Math.abs(dy) > 5) {
                        _this.isRipping = false;
                        if (Math.abs(dy) > Math.abs(dx))
                            _this.onMoveYMore(dx, dy, evt);
                    }
                }
            });
            createjs.Ticker.addEventListener("tick", function () {
                if (_this.autoX) {
                    var speed = Math.abs(_this.speedX);
                    if (speed > 5 && speed < 20)
                        _this.friction = 0.995;
                    else
                        _this.friction = 0.95;
                    _this.speedX *= _this.friction;
                    if (speed < 1)
                        _this.autoX = false;
                    // console.log(this.speed);
                    if (_this.onMoveX)
                        _this.onMoveX(_this.speedX);
                }
            });
        }
        return MouseController;
    })();
    uplight.MouseController = MouseController;
})(uplight || (uplight = {}));
//# sourceMappingURL=MouseController.js.map