var reels = [
				['coffee-maker',   'teapot',       'espresso-machine'],
				['coffee-maker',   'teapot',       'espresso-machine'],
				['coffee-maker',   'teapot',       'espresso-machine']
				/*

				['coffee-filter',  'tea-strainer', 'espresso-tamper'],
				['coffee-grounds', 'loose-tea',    'ground-espresso-beans']
*/
			];
var $reels;
var spinningTime = 2000;
var reelRotations = [];
var cssRotationValue = "";
var positions = [0, 0, 0];



function init(){
	$('.reel').each(function(i, reelContent){
		for (j = 0; j < 3; j++) {
			reelContent.innerHTML += '<img src="img/' + reels[i][j] + '.png" />';
		}
	});

	$('button').click(play);
}

function play(){
	
	for (var i = 0; i < 3; ++i) {
		reelRotations[i] = - (Math.floor(Math.random() * 30) + 20) * 120;	 // random number from 10 to 40 multiplied by 120 degree
		positions[i] = (reelRotations[i] / 120) % 3  // calculates reel index position
	}
		
	animate();
	setTimeout(clearRotationDegree, 5000);

}

function animate(){
	var cssRotationValue = "";
	$('.reel').each(function(i, reel){
		cssRotationValue = "rotateX(" + reelRotations[i] + "deg)";
		
        console.log("rot value: " + reelRotations[i]);
		$(reel).css({
			"-moz-transform":cssRotationValue,
	        "-webkit-transform":cssRotationValue,
	        "transition":"5s ease all"
        });
	});
}

function clearRotationDegree(){
	
	$('.reel').each(function(i, reel){
        initialCssRotationValue = positions[i] * 120;
        console.log("init rot value: " + initialCssRotationValue);
        initialCssRotationValue = "rotateX(" + initialCssRotationValue + "deg)";

        $(reel).css({
			"-moz-transform":initialCssRotationValue,
	        "-webkit-transform":initialCssRotationValue,
	        "transition":"0s ease all"
        });
	});
}

init();