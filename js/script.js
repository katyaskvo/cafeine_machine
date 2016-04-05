var reels = [
				['coffee-maker', 'teapot', 'espresso-machine', 'coffee-maker', 'teapot', 'espresso-machine'],
				['coffee-filter', 'tea-strainer', 'espresso-tamper', 'coffee-filter', 'tea-strainer', 'espresso-tamper'],
				['coffee-grounds', 'loose-tea', 'coffee-beans', 'coffee-grounds', 'loose-tea', 'coffee-beans']
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
var angle = 60;



function init(){
	$('.reel').each(function(i, reelContent){
		for (j = 0; j < reels[0].length; j++) {
			reelContent.innerHTML += '<div class="pannel"><img src="img/' + reels[i][j] + '.svg" /></div>';
		}
		$(this).css({
			"-moz-transform":"rotateX(0deg)",
	        "-webkit-transform":"rotateX(0deg)",
	        "transition":"0s ease all"
        });
	});

	$('button').click(play);
	
}

function play(){
	
	
	for (var i = 0; i < reels.length; i++) {
		reelRotations[i] = - (Math.floor(Math.random() * 30) + 20) * angle;	 // random number from 10 to 40 multiplied by 120 degree
		positions[i] = (reelRotations[i] / angle) % 3  // calculates reel index position
	}
	$("#drink > img").removeClass("show");
	turnOnLights();	
	animate();
	setTimeout(clearRotationDegree, 5000);
	setTimeout(check, 5000);
}

function animate(){
	var cssRotationValue = "";
	$('.reel').each(function(i, reel){
		cssRotationValue = "rotateX(" + reelRotations[i] + "deg)";
		
		$(reel).css({
			"-moz-transform":cssRotationValue,
	        "-webkit-transform":cssRotationValue,
	        "transition":"5s ease all"
        });
	});
	$('#play').attr("disabled", "disabled");
	setTimeout('enableButton()', 5000);
}

function clearRotationDegree(){
	
	$('.reel').each(function(i, reel){
        initialCssRotationValue = positions[i] * angle;
        console.log("init rot value: " + initialCssRotationValue);
        initialCssRotationValue = "rotateX(" + initialCssRotationValue + "deg)";

        $(reel).css({
			"-moz-transform":initialCssRotationValue,
	        "-webkit-transform":initialCssRotationValue,
	        "transition":"0s ease all"
        });
	});
}

function turnOnLights(){
	$("#status-bar .option").addClass("hide");
	$("#status-bar .in-progress").removeClass("hide");

}

function check(){
	$("#status-bar .option").addClass("hide");
	console.log("positions array: " + positions);
	if (positions[0] === positions[1] && positions[1] === positions[2]) {
		if (positions[0] === 0) {
			$("#status-bar .coffee").removeClass("hide");
			$("#coffee").addClass("show");
		} else if (positions[0] === -1){
			$("#status-bar .tea").removeClass("hide");
			$("#tea").addClass("show");
		} else {
			$("#status-bar .espresso").removeClass("hide");
			$("#espresso").addClass("show");
		}
	} else {
		$("#status-bar .lose").removeClass("hide");
	}
	
}

function enableButton(){
   $('#play').removeAttr('disabled');
}

init();