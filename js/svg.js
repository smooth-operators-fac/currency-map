function getScores(currency){
		//matthia's function
		return placeholderObj
}

function getColours(scores){
	var min = Infinity, max = -Infinity;
	Object.keys(scores).forEach(function(key) {
		if(scores[key] < min) min = scores[key];
		if(scores[key] > max) max = scores[key];
	});
	var range = max - min;
	var colourObj = {};
	Object.keys(scores).forEach(function(el){
			var normalised = Math.floor(((scores[el] - min)/range)*colours.length);
			colourObj[el] = colours[normalised];
	});
	return colourObj;
}

function changeColour(e){
	var countryNode = e.target;
	var baseCountry = countryNode.getAttribute('countryid');
	var currency = currencyObj[baseCountry];
	var scores = getScores(currency);
	var colourObj = getColours(scores);
	[].slice.call(document.getElementsByClassName('country-data')[0].childNodes)
	.filter(function(node){
		return node.nodeType === 1;
	})
	.forEach(function(node){
		var country = node.getAttribute('countryid');
		var currency = currencyObj[country];
		node.setAttribute('fill', colourObj[currency]);
	});
}

function getCountries(){
	return [].slice.call(document.getElementsByClassName('country-data')[0].childNodes)
		.filter(function(node){
			return node.nodeType === 1;
		})
		.map(function(node){
				return node.getAttribute('countryid')
		});
}

function addEventListeners(){
	 	var nodeList = document.getElementsByClassName('country-data')[0].childNodes;
	 	[].forEach.call(nodeList,function(node){
			node.addEventListener('click',changeColour,false)
		});
};

addEventListeners();



var placeholderObj = {
    "AED": 3.672934,
    "AFN": 9.059999,
    "ALL": 2.9261,
    "AMD": 7.372501,
    "ANG": 1.788725,
    "AOA": 16.879832,
    "ARS": 13.94208,
    "AUD": 1.33372,
    "AWG": 1.793333,
    "AZN": 1.530325,
    "BAM": 1.731736,
    "BBD": 2,
    "BDT": 7.76475,
    "BGN": 1.732075,
    "BHD": 0.377096,
    "BIF": 6.7775,
    "BMD": 1,
    "BND": 1.344038,
    "BOB": 6.910084,
    "BRL": 3.410702,
    "BSD": 1,
    "BTC": 0.00149679088,
    "BTN": 7.513501,
    "BWP": 0.834763,
    "BYR": 7.225,
    "BZD": 2.013851,
    "CAD": 1.277646,
    "CDF": 9.79325,
    "CHF": 0.958957,
    "CLF": 0.024602,
    "CLP": 6.153403,
    "CNY": 6.578251,
    "COP": 2.72665,
    "CRC": 5.0061,
    "CUC": 1,
    "CUP": 2.728383,
    "CVE": 9.839785,
    "CZK": 2.96432,
    "DJF": 1.830375,
    "DKK": 6.58487,
    "DOP": 4.07316,
    "DZD": 1.869681,
    "EEK": 1.847,
    "EGP": 8.877328,
    "ERN": 4.9985,
    "ETB": 1.81094,
    "EUR": 0.885542,
    "FJD": 2.067833,
    "FKP": 0.681226,
    "GBP": 0.681226,
    "GEL": 2.2118,
    "GGP": 0.681226,
    "GHS": 3.929819,
    "GIP": 0.681226,
    "GMD": 2.86046,
    "GNF": 5.71505,
    "GTQ": 7.645044,
    "GYD": 6.449336,
    "HKD": 7.758027,
    "HNL": 2.77497,
    "HRK": 6.655661,
    "HTG": 2.87455,
    "HUF": 8.4629,
    "IDR": 4.633333,
    "ILS": 3.847318,
    "IMP": 0.681226,
    "INR": 7.50525,
    "IQD": 5.132475,
    "IRR": 2.5,
    "ISK": 2.487099,
    "JEP": 0.681226,
    "JMD": 5.8126,
    "JOD": 0.708562,
    "JPY": 4.505001,
    "KES": 1.20683,
    "KGS": 7.599999,
    "KHR": 8.115,
    "KMF": 3.109866,
    "KPW": 9.91,
    "KRW": 4.195015,
    "KWD": 0.301012,
    "KYD": 0.824635,
    "KZT": 8.546992,
    "LAK": 6.475098,
    "LBP": 9.741667,
    "LKR": 6.845801,
    "LRD": 0.50905,
    "LSL": 4.7236,
    "LTL": 3.028209,
    "LVL": 0.621496,
    "LYD": 1.369966,
    "MAD": 9.682173,
    "MDL": 9.78068,
    "MGA": 0.81,
    "MKD": 4.52595,
    "MMK": 1.925,
    "MNT": 4.5,
    "MOP": 8.00314,
    "MRO": 7.234998,
    "MTL": 0.683738,
    "MUR": 5.3526,
    "MVR": 5.223333,
    "MWK": 8.979094,
    "MXN": 8.64027,
    "MYR": 4.032193,
    "MZN": 2.435,
    "NAD": 4.7236,
    "NGN": 4.473051,
    "NIO": 8.60263,
    "NOK": 8.285441,
    "NPR": 8.15,
    "NZD": 1.39685,
    "OMR": 0.384974,
    "PAB": 1,
    "PEN": 3.29419,
    "PGK": 3.1418,
    "PHP": 6.49887,
    "PKR": 4.86166,
    "PLN": 3.883984,
    "PYG": 6.591667,
    "QAR": 3.640407,
    "RON": 4.012664,
    "RSD": 9.497221,
    "RUB": 4.0451,
    "RWF": 0.820754,
    "SAR": 3.75015,
    "SBD": 7.805062,
    "SCR": 3.03602,
    "SDG": 6.095879,
    "SEK": 8.255697,
    "SGD": 1.34081,
    "SHP": 0.681226,
    "SLL": 5.5,
    "SOS": 8.596128,
    "SRD": 7.0125,
    "STD": 4.275,
    "SVC": 8.760851,
    "SYP": 8.915665,
    "SZL": 4.7224,
    "THB": 5.21478,
    "TJS": 7.8685,
    "TMT": 3.5014,
    "TND": 2.157072,
    "TOP": 2.233822,
    "TRY": 2.903328,
    "TTD": 6.655589,
    "TWD": 2.18144,
    "TZS": 8.601683,
    "UAH": 4.96199,
    "UGX": 5.076667,
    "USD": 1,
    "UYU": 0.72173,
    "UZS": 5.354981,
    "VEF": 9.971795,
    "VND": 9.633333,
    "VUV": 9.048332,
    "WST": 2.518621,
    "XAF": 2.380015,
    "XAG": 0.0578835,
    "XAU": 0.00079,
    "XCD": 2.70302,
    "XDR": 0.705567,
    "XOF": 3.073915,
    "XPD": 0.001805,
    "XPF": 5.74375,
    "XPT": 0.001019,
    "YER": 9.506,
    "ZAR": 4.69793,
    "ZMK": 2.024745,
    "ZMW": 1.004038,
    "ZWL": 2.322775
}

var currencyData = '{"BD": "BDT", "BE": "EUR", "BF": "XOF", "BG": "BGN", "BA": "BAM", "BB": "BBD", "WF": "XPF", "BL": "EUR", "BM": "BMD", "BN": "BND", "BO": "BOB", "BH": "BHD", "BI": "BIF", "BJ": "XOF", "BT": "BTN", "JM": "JMD", "BV": "NOK", "BW": "BWP", "WS": "WST", "BQ": "USD", "BR": "BRL", "BS": "BSD", "JE": "GBP", "BY": "BYR", "BZ": "BZD", "RU": "RUB", "RW": "RWF", "RS": "RSD", "TL": "USD", "RE": "EUR", "TM": "TMT", "TJ": "TJS", "RO": "RON", "TK": "NZD", "GW": "XOF", "GU": "USD", "GT": "GTQ", "GS": "GBP", "GR": "EUR", "GQ": "XAF", "GP": "EUR", "JP": "JPY", "GY": "GYD", "GG": "GBP", "GF": "EUR", "GE": "GEL", "GD": "XCD", "GB": "GBP", "GA": "XAF", "SV": "USD", "GN": "GNF", "GM": "GMD", "GL": "DKK", "GI": "GIP", "GH": "GHS", "OM": "OMR", "TN": "TND", "JO": "JOD", "HR": "HRK", "HT": "HTG", "HU": "HUF", "HK": "HKD", "HN": "HNL", "HM": "AUD", "VE": "VEF", "PR": "USD", "PS": "ILS", "PW": "USD", "PT": "EUR", "SJ": "NOK", "PY": "PYG", "IQ": "IQD", "PA": "PAB", "PF": "XPF", "PG": "PGK", "PE": "PEN", "PK": "PKR", "PH": "PHP", "PN": "NZD", "PL": "PLN", "PM": "EUR", "ZM": "ZMK", "EH": "MAD", "EE": "EUR", "EG": "EGP", "ZA": "ZAR", "EC": "USD", "IT": "EUR", "VN": "VND", "SB": "SBD", "ET": "ETB", "SO": "SOS", "ZW": "ZWL", "SA": "SAR", "ES": "EUR", "ER": "ERN", "ME": "EUR", "MD": "MDL", "MG": "MGA", "MF": "EUR", "MA": "MAD", "MC": "EUR", "UZ": "UZS", "MM": "MMK", "ML": "XOF", "MO": "MOP", "MN": "MNT", "MH": "USD", "MK": "MKD", "MU": "MUR", "MT": "EUR", "MW": "MWK", "MV": "MVR", "MQ": "EUR", "MP": "USD", "MS": "XCD", "MR": "MRO", "IM": "GBP", "UG": "UGX", "TZ": "TZS", "MY": "MYR", "MX": "MXN", "IL": "ILS", "FR": "EUR", "IO": "USD", "SH": "SHP", "FI": "EUR", "FJ": "FJD", "FK": "FKP", "FM": "USD", "FO": "DKK", "NI": "NIO", "NL": "EUR", "NO": "NOK", "NA": "NAD", "VU": "VUV", "NC": "XPF", "NE": "XOF", "NF": "AUD", "NG": "NGN", "NZ": "NZD", "NP": "NPR", "NR": "AUD", "NU": "NZD", "CK": "NZD", "XK": "EUR", "CI": "XOF", "CH": "CHF", "CO": "COP", "CN": "CNY", "CM": "XAF", "CL": "CLP", "CC": "AUD", "CA": "CAD", "CG": "XAF", "CF": "XAF", "CD": "CDF", "CZ": "CZK", "CY": "EUR", "CX": "AUD", "CR": "CRC", "CW": "ANG", "CV": "CVE", "CU": "CUP", "SZ": "SZL", "SY": "SYP", "SX": "ANG", "KG": "KGS", "KE": "KES", "SS": "SSP", "SR": "SRD", "KI": "AUD", "KH": "KHR", "KN": "XCD", "KM": "KMF", "ST": "STD", "SK": "EUR", "KR": "KRW", "SI": "EUR", "KP": "KPW", "KW": "KWD", "SN": "XOF", "SM": "EUR", "SL": "SLL", "SC": "SCR", "KZ": "KZT", "KY": "KYD", "SG": "SGD", "SE": "SEK", "SD": "SDG", "DO": "DOP", "DM": "XCD", "DJ": "DJF", "DK": "DKK", "VG": "USD", "DE": "EUR", "YE": "YER", "DZ": "DZD", "US": "USD", "UY": "UYU", "YT": "EUR", "UM": "USD", "LB": "LBP", "LC": "XCD", "LA": "LAK", "TV": "AUD", "TW": "TWD", "TT": "TTD", "TR": "TRY", "LK": "LKR", "LI": "CHF", "LV": "EUR", "TO": "TOP", "LT": "LTL", "LU": "EUR", "LR": "LRD", "LS": "LSL", "TH": "THB", "TF": "EUR", "TG": "XOF", "TD": "XAF", "TC": "USD", "LY": "LYD", "VA": "EUR", "VC": "XCD", "AE": "AED", "AD": "EUR", "AG": "XCD", "AF": "AFN", "AI": "XCD", "VI": "USD", "IS": "ISK", "IR": "IRR", "AM": "AMD", "AL": "ALL", "AO": "AOA", "AQ": "", "AS": "USD", "AR": "ARS", "AU": "AUD", "AT": "EUR", "AW": "AWG", "IN": "INR", "AX": "EUR", "AZ": "AZN", "IE": "EUR", "ID": "IDR", "UA": "UAH", "QA": "QAR", "MZ": "MZN"}';
var currencyObj = JSON.parse(currencyData);
var colours = ['#FF0000','#FF1000','#FF2000','#FF3000','#FF4000','#FF5000','#FF6000','#FF7000','#FF8000','#FF9000','#FFA000','#FFB000','#FFC000','#FFD000','#FFE000','#FFF000','#FFFF00','#F0FF00','#E0FF00','#D0FF00','#C0FF00','#B0FF00','#A0FF00','#90FF00','#80FF00','#70FF00','#60FF00','#50FF00','#40FF00','#30FF00','#20FF00','#10FF00']
