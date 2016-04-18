function calcASDASCRP() {
	var result = (0.12 * document.getElementById('bp').value) +
				 (0.06 * document.getElementById('dms').value) +
				 (0.11 * document.getElementById('pg').value) +
				 (0.07 * document.getElementById('pps').value) +
				 (0.58 * Math.log(1 + (document.getElementById('measurement').value * 1)));
	return result;
}

function calcASDASESR() {
	var result = (0.08 * document.getElementById('bp').value) +
				 (0.07 * document.getElementById('dms').value) +
				 (0.11 * document.getElementById('pg').value) +
				 (0.09 * document.getElementById('pps').value) +
				 (0.29 * Math.sqrt(document.getElementById('measurement').value));
	return result;
}

function calcASDAS() {
	var result;
	if (document.getElementById('crp-or-esr').value == 'crp') {
		result = calcASDASCRP();
	} else {
		result = calcASDASESR();
	}
	return result
}

function onAsdasFormSubmit() {
	document.getElementById('asdas-form').setAttribute('style', 'display:none');
	document.getElementById('asdas-result-panel').setAttribute('style', 'display:block');
	var ASDAS = calcASDAS();
	document.getElementById('asdas-result').innerHTML = ASDAS.toFixed(1);
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
	document.getElementById('result-backdrop').setAttribute('style', 'background-color: ' + backdrop_color);
}

function onAsdasResultPanelSubmit() {
	document.getElementById('asdas-form').setAttribute('style', 'display:block');
	document.getElementById('asdas-result-panel').setAttribute('style', 'display:none');
}
