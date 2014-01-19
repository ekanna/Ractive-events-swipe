Ractive-events-swipe
====================

Swipe events for Ractivejs

##### Template
```
<script type="text/ractive" id="touchT">
	<div id="swipe" on-swipeLeft="left" on-swipeRight="right" on-swipeUp="up" on-swipeDown="down">
		<h1>{{direction}}</h1>
	</div>
</script>
```

##### JS
```js
var ractive = new Ractive({
	el: '#container',
	template: '#touchT',
	data : {
		name: 'koti',
		direction: 'Please swipe screen with single finger'
	}
});

ractive.on({
	left: function(e){
		ractive.set('direction', 'You have swiped Left')
	},
	right: function(e){
		ractive.set('direction', 'You have swiped Right')
	},
	down: function(e){
		ractive.set('direction', 'You have swiped Down')
	},
	up: function(e){
		ractive.set('direction', 'You have swiped Up')
	}
});	
```

##### style
```
<style type="text/css">
	#swipe {
		width: 1800px;
		height: 1000px;
		position: fixed;
	}
</style>
```
