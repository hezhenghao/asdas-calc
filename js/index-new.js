var currentQNum = 0;
var bp = 0, pps = 0, dms = 0, pg = 0, calc_mode = "crp", measurement = "0";

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
	var oldContent = measurement;
	if(oldContent == "0" && keyVal != ".") {
		oldContent = "";
	}
	var newContent = oldContent + keyVal;
	measurement = newContent;
	$("#display-1-content").text(measurement);
});

$("#clear-button").click(function() {
	measurement = measurement.substr(0, measurement.length-1);
	if(measurement == "") {
		measurement = "0";
	}
	$("#display-1-content").text(measurement);
});

$("#crp-esr-buttons").click(function() {
	calc_mode = $('input[name="crp-or-esr"]:checked').val();
});

function calcASDASCRP(crp) {
	var result =
        0.12 * bp +
        0.06 * dms +
        0.11 * pg +
        0.07 * pps +
        0.58 * Math.log(1 + 1.0 * crp); // multiply by 1.0 to prevent string concatenation
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
	if (calc_mode == 'crp') {
		result = calcASDASCRP(measurement);
	} else if (calc_mode == 'crp-dl') {
		result = calcASDASCRP(measurement * 10);
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
	$('#answer-crp-or-esr').text($('label[for="crp-esr-' + calc_mode + '"]').text());
	$('#answer-measurement').text(measurement);
	var ASDAS = calcASDAS();
	$('#asdas-result').text(ASDAS.toFixed(1));
	var backdrop_color;
	if (ASDAS < 1.3) {
		backdrop_color = $('#asdas-activity-0').css("background-color");
	} else if (ASDAS < 2.1) {
		backdrop_color = $('#asdas-activity-1').css("background-color");
	} else if (ASDAS < 3.5) {
		backdrop_color = $('#asdas-activity-2').css("background-color");
	} else {
		backdrop_color = $('#asdas-activity-3').css("background-color");
	}
	$('#result-backdrop').css("background-color", backdrop_color);
}

function onAsdasResultPanelSubmit() {
	currentQNum = 0;
	changeQuestion();
	$('#asdas-form').show(); 
	$('#asdas-result-panel').hide();
}
