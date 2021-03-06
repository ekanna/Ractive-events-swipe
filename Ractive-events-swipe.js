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
	var makeSwipeDefinition = function (direction){
		return function (node, fire) {
			var chinna = function (event) {
				var sx, sy, ex, ey, currentTarget;
				event.preventDefault();
				if (event.touches.length !== 1) { // no.of.fingers != 1
					 cancel();
					 return;
				}

				var touch = event.touches[0];

				sx = touch.pageX;
				sy = touch.pageY;
				currentTarget = this;

				function move(event) {
					 event.preventDefault();
					 if (event.touches.length !== 1) { 
							console.log('mutiple fingers')
						  cancel();
					 }
					 var touch = event.touches[0];
					 ex = touch.pageX;
					 ey = touch.pageY;
				};

				function end(event) {
					 event.preventDefault();
					 var dx = ex - sx;
					 var dy = ey - sy;
					 var ax = Math.abs(dx);
					 var ay = Math.abs(dy);
					 if (Math.max(ax, ay) > 20) {
						  var swipeDirection = ax > ay ? (dx < 0 ? 'swipeleft' : 'swiperight') : (dy < 0 ? 'swipeup' : 'swipedown')
							if (swipeDirection == direction) {
							  fire({
									node: currentTarget,
									original: event,
									direction: swipeDirection,
							  });
						  }
					 }
					 cancel();
				}

				function cancel() {
					 node.removeEventListener('touchend', end, false);
					 window.removeEventListener('touchend', end, false);
					 node.removeEventListener('touchmove', move, false);
					 window.removeEventListener('touchmove', move, false);
					 node.removeEventListener('touchcancel', cancel, false);
					 window.removeEventListener('touchcancel', cancel, false);
				};
				node.addEventListener('touchmove', move, false);
				window.addEventListener('touchmove', move, false);
				node.addEventListener('touchend', end, false);
				window.addEventListener('touchend', end, false);
				node.addEventListener('touchcancel', cancel, false);
				window.addEventListener('touchcancel', cancel, false);
			}
			node.addEventListener('touchstart', chinna, false);
			window.addEventListener('touchstart', chinna, false);
			return {
				teardown: function () {
					node.removeEventListener('touchstart', chinna, false);
					window.removeEventListener('touchstart', chinna, false);
				}
			};
		}
	}
	var events = Ractive.events;
	events.swipeleft = makeSwipeDefinition('swipeleft');
	events.swiperight = makeSwipeDefinition('swiperight');
	events.swipeup = makeSwipeDefinition('swipeup');
	events.swipedown = makeSwipeDefinition('swipedown');
}));
