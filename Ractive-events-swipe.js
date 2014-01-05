(function (global, factory) {

    'use strict';

    // Common JS (i.e. browserify) environment
    if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
        factory(require('Ractive'));
    }

    // AMD?
    else if (typeof define === 'function' && define.amd) {
        define(['Ractive'], factory);
    }

    // browser global
    else if (global.Ractive) {
        factory(global.Ractive);
    } else {
        throw new Error('Could not find Ractive! It must be loaded before the Ractive-events-swap plugin');
    }

}(typeof window !== 'undefined' ? window : this, function (Ractive) {

    'use strict';
    var swipe = function (node, fire) {
        var touchstart = function (event) {

            event.preventDefault();
            if (event.touches.length !== 1) {
                return;
            }

            var touch = event.touches[0];

            var sx = touch.pageX;
            var sy = touch.pageY;
            var ex, ey;
            var currentTarget = this;
            var finger = touch.identifier;

            var move = function (event) {
                event.preventDefault();
                if (event.touches.length !== 1 || event.touches[0].identifier !== finger) {
                    cancel();
                }
                var touch = event.touches[0];
                ex = touch.pageX;
                ey = touch.pageY;
            };

            var end = function (event) {
                event.preventDefault();
                console.log('end')
                var dx = ex - sx;
                var dy = ey - sy;
                var ax = Math.abs(dx);
                var ay = Math.abs(dy);
                if (Math.max(ax, ay) > 20) {
                    var swipeDirection = ax > ay ? (dx < 0 ? 'swipeleft' : 'swiperight') : (dy < 0 ? 'swipeup' : 'swipedown')
                    fire({
                        node: currentTarget,
                        original: event,
                        direction: swipeDirection,
                    });
                }
                cancel();
            }

            var cancel = function () {
                node.removeEventListener('touchend', end, false);
                window.removeEventListener('touchmove', move, false);
                window.removeEventListener('touchcancel', cancel, false);
            };

            node.addEventListener('touchend', end, false);
            window.addEventListener('touchmove', move, false);
            window.addEventListener('touchcancel', cancel, false);
        };
        node.addEventListener('touchstart', touchstart, false);
        return {
            teardown: function () {
                node.removeEventListener('touchstart', touchstart, false);
            }
        };
    }
    Ractive.events.swipe = swipe;
}));
