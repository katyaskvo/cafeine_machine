/*
var reel1 = ["coffee-maker", "espresso-machine", "teapot"];
var reel2 = ["coffee-filter", "espresso-tamper", "tea-strainer"];
var reel3 = ["coffee-beans", "ground-coffee", "tea-leaf"];

function go(){
	moveSlots($("#reel1 .wrapper"));
	moveSlots($("#reel2 .wrapper"));
	moveSlots($("#reel3 .wrapper"));
}

function moveSlots(reel){
		var time = 6500;
		time += Math.round(Math.random()*1000);
	reel.stop(true,true);

		var marginTop = parseInt(reel.css("margin-top"), 10)
		
		marginTop -= (7 * 100)
		
	reel.animate(
		{"margin-top":marginTop+"px"},
		{'duration' : time, 'easing' : "easeOutElastic"});

}
*/


var reels = [
				['coffee-maker',   'teapot',       'espresso-machine'],
				['coffee-filter',  'tea-strainer', 'espresso-tamper'],
				['coffee-grounds', 'loose-tea',    'ground-espresso-beans']
			];
console.log(reels);
var $reels;
console.log($reels);
var spinningTime = 2000;



function init(){
	$reels = $('.reel').each(function(i, reelEach){
		
		var reelItems = "";
		for (j = 0; j < 3; j++) {
			reelItem = '<div id="' + reels[i][j] + '" class="slot"><img src="img/' + reels[i][j] + '.png" /></div>';
			reelItems += reelItem;
		}
		reelEach.innerHTML = reelItems;
		console.log(reelEach);
		
	});

	$msg = $('.msg');

// 		$('button').click(action);
	}
/*
var caffeineMachine = (function(undefined){
	
	var timeMax = 3000, // animation time, ms
		height = 210,
		reelSpeeds = [],
		r = [],
		reels = [
			['coffee_maker',   'teapot',       'espresso_machine'],
			['coffee_filter',  'tea_strainer', 'espresso_tamper'],
			['coffee_grounds', 'loose_tea',    'ground_espresso_beans']
		],
		$reels, $msg,
		start;
		console.log(reels);

	function init(){
		console.log("or here?");
		$reels = $('.reel').each(function(i, el){
			el.innerHTML = '<div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>' + reels[i].join('</p><p>') + '</p></div>'
		});

		$msg = $('.msg');

		$('button').click(action);
	}

	function action(){
		if (start !== undefined) return;

		for (var i = 0; i < 3; ++i) {
			speeds[i] = Math.random() + .5;	
			r[i] = (Math.random() * 3 | 0) * height / 3;
		}

		$msg.html('Spinning...');
		animate();
	}

	function animate(now){
		console.log("gets here?");
		if (!start) start = now;
		var t = now - start || 0;

		for (var i = 0; i < 3; ++i)
			$reels[i].scrollTop = (speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + r[i]) % height | 0;

		if (t < tMax)
			requestAnimationFrame(animate);
		else {
			start = undefined;
			check();
		}
	}

	function check(){
		$msg.html(
			r[0] === r[1] && r[1] === r[2] ?
				'You won! Enjoy your ' + reels[1][ (r[0] / 70 + 1) % 3 | 0 ].split(' ')[0]
			:
				'Try again'
		);
	}

	return {init: init}

})();
*/

init();