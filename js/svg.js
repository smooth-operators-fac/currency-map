function getScores(currency){
		//matthia's function
		return placeholderObj
}

function getColours(scores){
	var min = Infinity, max = -Infinity;
	Object.keys(scores).forEach(function(key) {
		if(scores[key] < min) min = scores[key];
		if(scores[key] > max) max = scores[key];
	}
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
	var currency = currencyData[baseCountry];
	var scores = getScores(currency);
	var colourObj = getColours(scores);
	var nodeList = document.getElementsByClassName('country-data')[0].childNodes;
	[].forEach.call(nodeList,function(node, i){
		var country = node.getAttribute('countryid');
		node.setAttribute('fill', colourObj[country]);
	});
}

function getCountries(){
	return [].slice.call(document.getElementsByClassName('country-data')[0].childNodes)
		.filter(function(node){
			return node.nodeType === 1;
		})
		.map(function(node){
				return node.getAttribute('countryid')
		})
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
    "AFN": 69.059999,
    "ALL": 121.9261,
    "AMD": 476.372501,
    "ANG": 1.788725,
    "AOA": 165.879832,
    "ARS": 13.94208,
    "AUD": 1.33372,
    "AWG": 1.793333,
    "AZN": 1.530325,
    "BAM": 1.731736,
    "BBD": 2,
    "BDT": 78.76475,
    "BGN": 1.732075,
    "BHD": 0.377096,
    "BIF": 1672.7775,
    "BMD": 1,
    "BND": 1.344038,
    "BOB": 6.910084,
    "BRL": 3.410702,
    "BSD": 1,
    "BTC": 0.00149679088,
    "BTN": 67.513501,
    "BWP": 10.834763,
    "BYR": 19757.225,
    "BZD": 2.013851,
    "CAD": 1.277646,
    "CDF": 957.79325,
    "CHF": 0.958957,
    "CLF": 0.024602,
    "CLP": 679.153403,
    "CNY": 6.578251,
    "COP": 2986.72665,
    "CRC": 543.0061,
    "CUC": 1,
    "CUP": 24.728383,
    "CVE": 97.839785,
    "CZK": 23.96432,
    "DJF": 177.830375,
    "DKK": 6.58487,
    "DOP": 46.07316,
    "DZD": 109.869681,
    "EEK": 13.847,
    "EGP": 8.877328,
    "ERN": 14.9985,
    "ETB": 21.81094,
    "EUR": 0.885542,
    "FJD": 2.067833,
    "FKP": 0.681226,
    "GBP": 0.681226,
    "GEL": 2.2118,
    "GGP": 0.681226,
    "GHS": 3.929819,
    "GIP": 0.681226,
    "GMD": 42.86046,
    "GNF": 7350.71505,
    "GTQ": 7.645044,
    "GYD": 206.449336,
    "HKD": 7.758027,
    "HNL": 22.77497,
    "HRK": 6.655661,
    "HTG": 62.87455,
    "HUF": 278.4629,
    "IDR": 13274.633333,
    "ILS": 3.847318,
    "IMP": 0.681226,
    "INR": 67.50525,
    "IQD": 1175.132475,
    "IRR": 30342.5,
    "ISK": 122.487099,
    "JEP": 0.681226,
    "JMD": 125.8126,
    "JOD": 0.708562,
    "JPY": 104.505001,
    "KES": 101.20683,
    "KGS": 67.599999,
    "KHR": 4098.115,
    "KMF": 433.109866,
    "KPW": 899.91,
    "KRW": 1154.195015,
    "KWD": 0.301012,
    "KYD": 0.824635,
    "KZT": 338.546992,
    "LAK": 8136.475098,
    "LBP": 1509.741667,
    "LKR": 146.845801,
    "LRD": 90.50905,
    "LSL": 14.7236,
    "LTL": 3.028209,
    "LVL": 0.621496,
    "LYD": 1.369966,
    "MAD": 9.682173,
    "MDL": 19.78068,
    "MGA": 3290.81,
    "MKD": 54.52595,
    "MMK": 1191.925,
    "MNT": 1944.5,
    "MOP": 8.00314,
    "MRO": 357.234998,
    "MTL": 0.683738,
    "MUR": 35.3526,
    "MVR": 15.223333,
    "MWK": 708.979094,
    "MXN": 18.64027,
    "MYR": 4.032193,
    "MZN": 62.435,
    "NAD": 14.7236,
    "NGN": 204.473051,
    "NIO": 28.60263,
    "NOK": 8.285441,
    "NPR": 108.15,
    "NZD": 1.39685,
    "OMR": 0.384974,
    "PAB": 1,
    "PEN": 3.29419,
    "PGK": 3.1418,
    "PHP": 46.49887,
    "PKR": 104.86166,
    "PLN": 3.883984,
    "PYG": 5656.591667,
    "QAR": 3.640407,
    "RON": 4.012664,
    "RSD": 109.497221,
    "RUB": 64.0451,
    "RWF": 790.820754,
    "SAR": 3.75015,
    "SBD": 7.805062,
    "SCR": 13.03602,
    "SDG": 6.095879,
    "SEK": 8.255697,
    "SGD": 1.34081,
    "SHP": 0.681226,
    "SLL": 3945.5,
    "SOS": 578.596128,
    "SRD": 7.0125,
    "STD": 21724.275,
    "SVC": 8.760851,
    "SYP": 218.915665,
    "SZL": 14.7224,
    "THB": 35.21478,
    "TJS": 7.8685,
    "TMT": 3.5014,
    "TND": 2.157072,
    "TOP": 2.233822,
    "TRY": 2.903328,
    "TTD": 6.655589,
    "TWD": 32.18144,
    "TZS": 2198.601683,
    "UAH": 24.96199,
    "UGX": 3365.076667,
    "USD": 1,
    "UYU": 30.72173,
    "UZS": 2945.354981,
    "VEF": 9.971795,
    "VND": 22319.633333,
    "VUV": 109.048332,
    "WST": 2.518621,
    "XAF": 582.380015,
    "XAG": 0.0578835,
    "XAU": 0.00079,
    "XCD": 2.70302,
    "XDR": 0.705567,
    "XOF": 583.073915,
    "XPD": 0.001805,
    "XPF": 105.74375,
    "XPT": 0.001019,
    "YER": 249.506,
    "ZAR": 14.69793,
    "ZMK": 5252.024745,
    "ZMW": 11.004038,
    "ZWL": 322.322775
}

var currencyData = '{"BD": "BDT", "BE": "EUR", "BF": "XOF", "BG": "BGN", "BA": "BAM", "BB": "BBD", "WF": "XPF", "BL": "EUR", "BM": "BMD", "BN": "BND", "BO": "BOB", "BH": "BHD", "BI": "BIF", "BJ": "XOF", "BT": "BTN", "JM": "JMD", "BV": "NOK", "BW": "BWP", "WS": "WST", "BQ": "USD", "BR": "BRL", "BS": "BSD", "JE": "GBP", "BY": "BYR", "BZ": "BZD", "RU": "RUB", "RW": "RWF", "RS": "RSD", "TL": "USD", "RE": "EUR", "TM": "TMT", "TJ": "TJS", "RO": "RON", "TK": "NZD", "GW": "XOF", "GU": "USD", "GT": "GTQ", "GS": "GBP", "GR": "EUR", "GQ": "XAF", "GP": "EUR", "JP": "JPY", "GY": "GYD", "GG": "GBP", "GF": "EUR", "GE": "GEL", "GD": "XCD", "GB": "GBP", "GA": "XAF", "SV": "USD", "GN": "GNF", "GM": "GMD", "GL": "DKK", "GI": "GIP", "GH": "GHS", "OM": "OMR", "TN": "TND", "JO": "JOD", "HR": "HRK", "HT": "HTG", "HU": "HUF", "HK": "HKD", "HN": "HNL", "HM": "AUD", "VE": "VEF", "PR": "USD", "PS": "ILS", "PW": "USD", "PT": "EUR", "SJ": "NOK", "PY": "PYG", "IQ": "IQD", "PA": "PAB", "PF": "XPF", "PG": "PGK", "PE": "PEN", "PK": "PKR", "PH": "PHP", "PN": "NZD", "PL": "PLN", "PM": "EUR", "ZM": "ZMK", "EH": "MAD", "EE": "EUR", "EG": "EGP", "ZA": "ZAR", "EC": "USD", "IT": "EUR", "VN": "VND", "SB": "SBD", "ET": "ETB", "SO": "SOS", "ZW": "ZWL", "SA": "SAR", "ES": "EUR", "ER": "ERN", "ME": "EUR", "MD": "MDL", "MG": "MGA", "MF": "EUR", "MA": "MAD", "MC": "EUR", "UZ": "UZS", "MM": "MMK", "ML": "XOF", "MO": "MOP", "MN": "MNT", "MH": "USD", "MK": "MKD", "MU": "MUR", "MT": "EUR", "MW": "MWK", "MV": "MVR", "MQ": "EUR", "MP": "USD", "MS": "XCD", "MR": "MRO", "IM": "GBP", "UG": "UGX", "TZ": "TZS", "MY": "MYR", "MX": "MXN", "IL": "ILS", "FR": "EUR", "IO": "USD", "SH": "SHP", "FI": "EUR", "FJ": "FJD", "FK": "FKP", "FM": "USD", "FO": "DKK", "NI": "NIO", "NL": "EUR", "NO": "NOK", "NA": "NAD", "VU": "VUV", "NC": "XPF", "NE": "XOF", "NF": "AUD", "NG": "NGN", "NZ": "NZD", "NP": "NPR", "NR": "AUD", "NU": "NZD", "CK": "NZD", "XK": "EUR", "CI": "XOF", "CH": "CHF", "CO": "COP", "CN": "CNY", "CM": "XAF", "CL": "CLP", "CC": "AUD", "CA": "CAD", "CG": "XAF", "CF": "XAF", "CD": "CDF", "CZ": "CZK", "CY": "EUR", "CX": "AUD", "CR": "CRC", "CW": "ANG", "CV": "CVE", "CU": "CUP", "SZ": "SZL", "SY": "SYP", "SX": "ANG", "KG": "KGS", "KE": "KES", "SS": "SSP", "SR": "SRD", "KI": "AUD", "KH": "KHR", "KN": "XCD", "KM": "KMF", "ST": "STD", "SK": "EUR", "KR": "KRW", "SI": "EUR", "KP": "KPW", "KW": "KWD", "SN": "XOF", "SM": "EUR", "SL": "SLL", "SC": "SCR", "KZ": "KZT", "KY": "KYD", "SG": "SGD", "SE": "SEK", "SD": "SDG", "DO": "DOP", "DM": "XCD", "DJ": "DJF", "DK": "DKK", "VG": "USD", "DE": "EUR", "YE": "YER", "DZ": "DZD", "US": "USD", "UY": "UYU", "YT": "EUR", "UM": "USD", "LB": "LBP", "LC": "XCD", "LA": "LAK", "TV": "AUD", "TW": "TWD", "TT": "TTD", "TR": "TRY", "LK": "LKR", "LI": "CHF", "LV": "EUR", "TO": "TOP", "LT": "LTL", "LU": "EUR", "LR": "LRD", "LS": "LSL", "TH": "THB", "TF": "EUR", "TG": "XOF", "TD": "XAF", "TC": "USD", "LY": "LYD", "VA": "EUR", "VC": "XCD", "AE": "AED", "AD": "EUR", "AG": "XCD", "AF": "AFN", "AI": "XCD", "VI": "USD", "IS": "ISK", "IR": "IRR", "AM": "AMD", "AL": "ALL", "AO": "AOA", "AQ": "", "AS": "USD", "AR": "ARS", "AU": "AUD", "AT": "EUR", "AW": "AWG", "IN": "INR", "AX": "EUR", "AZ": "AZN", "IE": "EUR", "ID": "IDR", "UA": "UAH", "QA": "QAR", "MZ": "MZN"}';
var currencyObj = JSON.parse(currencyData);
var colours = ['#FF0000','#FF1000','#FF2000','#FF3000','#FF4000','#FF5000','#FF6000','#FF7000','#FF8000','#FF9000','#FFA000','#FFB000','#FFC000','#FFD000','#FFE000','#FFF000','#FFFF00','#F0FF00','#E0FF00','#D0FF00','#C0FF00','#B0FF00','#A0FF00','#90FF00','#80FF00','#70FF00','#60FF00','#50FF00','#40FF00','#30FF00','#20FF00','#10FF00']
