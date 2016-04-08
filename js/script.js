var reels = [
				['coffee-maker', 'teapot', 'espresso-machine', 'coffee-maker', 'teapot', 'espresso-machine'],
				['coffee-filter', 'tea-strainer', 'espresso-tamper', 'coffee-filter', 'tea-strainer', 'espresso-tamper'],
				['coffee-grounds', 'loose-tea', 'coffee-beans', 'coffee-grounds', 'loose-tea', 'coffee-beans']
			];
const SPINNING_TIME = 5000;
const LOSES_LIMIT = 5;
const ANGLE = 60;
const COFFEE = 0;
const TEA = -1;
const ESPRESSO = -2;

var reelRotations = [];
var cssRotationValue = "";

var positions = [COFFEE, COFFEE, COFFEE];

var losesCounter = 0;




function init(){
	$('.reel').each(function(i, reelContent){
		for (j = 0; j < reels[0].length; j++) {
			reelContent.innerHTML += '<div class="pannel"><img src="img/' + reels[i][j] + '.svg" /></div>';
		}
		$(this).css({
			"transform":"rotateX(0deg)",
			"-moz-transform":"rotateX(0deg)",
	        "-webkit-transform":"rotateX(0deg)",
	        "transition":"0s ease all",
	        "-webkit-transition":"0s ease all"
        });
	});
	
	enableButton();
	$('button').click(play);
}

function play(){
	clearResult();
	
	if (losesCounter >= LOSES_LIMIT) {
		generateWinningSpin();
	} else {
		generateRandomSpin();
	}	
	animate();
	setTimeout(statusMessage, SPINNING_TIME - 200);
	setTimeout(clearRotationDegree, SPINNING_TIME);
}

function generateRandomSpin(){
	for (var i = 0; i < reels.length; i++) {
		reelRotations[i] = - (Math.floor(Math.random() * 30) + 20) * ANGLE;	 // random number multiplied by 120 degrees
		positions[i] = (reelRotations[i] / ANGLE) % 3  // calculate reel index position
	}
}

function generateWinningSpin(){
	var randomDegree = - (Math.floor(Math.random() * 30) + 20) * ANGLE;
	reelRotations[0] = randomDegree;
// 	var originPositions = positions;
	positions[0] = (randomDegree / ANGLE) % 3;
		
	for (var i = 1; i < reels.length; i++) {
		reelRotations[i] = (randomDegree + (positions[0] - positions[i]) * ANGLE) - (positions[0] - positions[i]) * ANGLE;	 // random number multiplied by 120 degrees
		positions[i] = ((reelRotations[i]) / ANGLE) % 3; // calculate reel index position
		
	}
}

function clearResult(){
	$("#drink > img").removeClass("show");
	$("#status-bar .option").addClass("hide");
	$("#status-bar .in-progress span").removeClass("active");
}

function animate(){
	var cssRotationValue = "";
	$('.reel').each(function(i, reel){
		cssRotationValue = "rotateX(" + reelRotations[i] + "deg)";
		cssTransitionValue = SPINNING_TIME/1000 + "s ease all"
		$(reel).css({
			"transform":cssRotationValue,
			"-moz-transform":cssRotationValue,
	        "-webkit-transform":cssRotationValue,
	        "transition":cssTransitionValue,
	        "-webkit-transition-duration":cssTransitionValue
        });
	});
	$('#play').attr("disabled", "disabled");
	setTimeout('enableButton()', SPINNING_TIME);
}

function clearRotationDegree(){
	$('.reel').each(function(i, reel){
        initialRotationValue = positions[i] * ANGLE;
        initialCssRotationValue = "rotateX(" + initialRotationValue + "deg)";

        $(reel).css({
	        "transform":initialCssRotationValue,
			"-moz-transform":initialCssRotationValue,
	        "-webkit-transform":initialCssRotationValue,
	        "transition":"0s ease all",
	        "-webkit-transition":"0s ease all"
        });
	});
}

function statusMessage(){
	check();
	$("#status-bar .in-progress span").addClass("active");
}

function check(){
	$("#status-bar .option").addClass("hide");
	
	if (positions[0] === positions[1] && positions[1] === positions[2]) {
		if (positions[0] === COFFEE) {
			$("#status-bar .coffee").removeClass("hide");
			$("#coffee").addClass("show");
		} else if (positions[0] === TEA){
			$("#status-bar .tea").removeClass("hide");
			$("#tea").addClass("show");
		} else if (positions[0] === ESPRESSO){
			$("#status-bar .espresso").removeClass("hide");
			$("#espresso").addClass("show");
		} else {
			$("#status-bar .error").removeClass("hide");
		}
		
		losesCounter = 0;
	} else {
		$("#status-bar .lose").removeClass("hide");
		losesCounter += 1;
	}
}

function enableButton(){
   $('#play').removeAttr('disabled');
}

init();