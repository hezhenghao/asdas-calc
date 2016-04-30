var currentQNum = 0;
var bp = 0, pps = 0, dms = 0, pg = 0, crp_or_esr = "crp", measurement = "";

$("#next-q-button").click(function(){
	currentQNum++;
	changeQuestion();
});

$("#prev-q-button").click(function(){
	currentQNum--;
	changeQuestion();
});

$("#to-result-button").click(function() {
	onAsdasFormSubmit();
});

function changeQuestion() {
	$(".asdas-question").hide();
	$(".asdas-question").eq(currentQNum).show();
	if (currentQNum <= 0) {
		$("#prev-q-button").hide();
	} else {
		$("#prev-q-button").show();
	}
	if (currentQNum >= $(".asdas-question").length - 1) {
		$("#control-panel-0").hide();
		$("#control-panel-1").show();
		$("#display-1-content").text(measurement);
	} else {
		$("#control-panel-0").show();
		$("#control-panel-1").hide();
		switch(currentQNum) {
			case 0:
				$("#display-0-content").text(bp);
				break;
			case 1:
				$("#display-0-content").text(pps);
				break;
			case 2:
				$("#display-0-content").text(dms);
				break;
			case 3:
				$("#display-0-content").text(pg);
				break;
			default:
				alert("currentQNum = " + currentQNum);
		}
	}
}

$("#control-panel-0 .key").click(function(){
	var keyVal = $(this).text();
	$("#display-0-content").text(keyVal);
	switch(currentQNum) {
		case 0:
			bp = keyVal;
			break;
		case 1:
			pps = keyVal;
			break;
		case 2:
			dms = keyVal;
			break;
		case 3:
			pg = keyVal;
			break;
		default:
			alert("currentQNum = " + currentQNum);
	}
});

$("#control-panel-1 .key").click(function(){
	var keyVal = $(this).text();
	var oldContent = $("#display-1-content").text();
	var newContent = oldContent + keyVal;
	measurement = newContent;
	$("#display-1-content").text(measurement);
});

$("#clear-button").click(function() {
	measurement = measurement.substr(0, measurement.length-1);
	$("#display-1-content").text(measurement);
});

function calcASDASCRP() {
	var result =
        0.12 * bp +
        0.06 * dms +
        0.11 * pg +
        0.07 * pps +
        0.58 * Math.log(1 + 1.0 * measurement); // multiply by 1.0 to prevent string concatenation
	return result;
}

function calcASDASESR() {
	var result =
        0.08 * bp +
        0.07 * dms +
        0.11 * pg +
        0.09 * pps +
        0.29 * Math.sqrt(measurement);
	return result;
}

function calcASDAS() {
	var result;
	var calc_mode = $('#crp-or-esr').val();
	if (calc_mode == 'crp') {
		result = calcASDASCRP();
	} else if (calc_mode == 'crp-dl') {
		measurement = measurement * 10;
		result = calcASDASCRP();
	} else if (calc_mode == 'esr') {
		result = calcASDASESR();
	} else {
		result = "ERROR";
	}
	return result
}

function onAsdasFormSubmit() {
	$('#asdas-form').hide();
	$('#asdas-result-panel').show();
	$('#answer-bp').text(bp);
	$('#answer-pps').text(pps);
	$('#answer-dms').text(dms);
	$('#answer-pg').text(pg);
	$('#answer-measurement').text(measurement);
	var ASDAS = calcASDAS();
	$('#asdas-result').text(ASDAS.toFixed(1));
	var backdrop_color;
	if (ASDAS < 1.3) {
		backdrop_color = '#ffff33';
	} else if (ASDAS < 2.1) {
		backdrop_color = '#ffaa33';
	} else if (ASDAS < 3.5) {
		backdrop_color = '#ff5533';
	} else {
		backdrop_color = '#ff0033';
	}
	$('#result-backdrop').css("background-color", backdrop_color);
}

function onAsdasResultPanelSubmit() {
	currentQNum = 0;
	changeQuestion();
	$('#asdas-form').show(); 
	$('#asdas-result-panel').hide();
}
