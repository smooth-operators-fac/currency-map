var selectBox = {
	pt: null,
	svg: null,
	box: null,
	start: null,
	mousemoveCallback: null,
	init: function(){
		this.svg = document.querySelector('svg');
		this.pt = this.svg.createSVGPoint();
		this.box = document.getElementsByClassName('selectbox')[0];
		this.svg.addEventListener('mousedown', (e) => this.createBox(e));
		this.svg.addEventListener('mouseup', (e) => this.removeBox(e));
	},
	getPoint: function(e){
		this.pt.x = e.clientX;
		this.pt.y = e.clientY;
		return this.pt.matrixTransform(this.svg.getScreenCTM().inverse());
	},
	createBox: function (e){
		this.box.setAttribute('width', 0);
		this.box.setAttribute('height', 0);
		this.start = {
			x: this.getPoint.bind(selectBox)(e).x,
			y: this.getPoint.bind(selectBox)(e).y
		}
		this.box.setAttribute('x', this.start.x);
		this.box.setAttribute('y', this.start.y);
		this.svg.addEventListener('mousemove', (e) => {
			this.mousemoveCallback = arguments.callee;
			return this.enlargeBox(e);
		})
	},
	enlargeBox:	function(e, callee){
			var newPt = this.getPoint.bind(selectBox)(e)
			var y = newPt.y
			var x = newPt.x
			if (x-this.start.x < 0) {
				var width = (x-this.start.x)*-1;
				x = x
			} else {
				var width = x-this.start.x;
				x = x-width
			}
			if (y-this.start.y < 0) {
				var height = (y-this.start.y)*-1;
				y = y
			} else {
				var height = y-this.start.y
				y = y-height
			}
			this.box.setAttribute('x', x);
			this.box.setAttribute('y', y);
			this.box.setAttribute('width', width);
			this.box.setAttribute('height', height);
	},
	removeBox: function (e){
		this.box.setAttribute('width', 0);
		this.box.setAttribute('height', 0);
		this.svg.removeEventListener('mousemove', this.enlargeBox);
	}
}

/* Function is passed the scores object. It calculates the max, min and the
range of scores then normalises them to range across the length of
colours array. An object pairing currency and the colours is returned */
function getColours(scores){

	//get max, min and range
	var min = Infinity, max = -Infinity;
	Object.keys(scores).forEach(function(currency) {
		if(scores[currency] < min) min = scores[currency];
		if(scores[currency] > max) max = scores[currency];
	});
	var range = max - min;
	//build colours object
	var colourObj = {};
	var test = {}
	Object.keys(scores).forEach((currency) => {
		var normalised = Math.floor(((scores[currency] - min)/range)*(colours.length-1));
		//normalised is an integer from 0 to the length of colours array corresponding to the score
		colourObj[currency] = colours[normalised];
		test[currency] = normalised
	});
	return colourObj;
}

/* onClick event handler. Retrieves scores for the clicked country's currency,
retrieves colour object from getColours, and updates the fill attribute of
all the other countries */
function changeColour(e){
	var countryNode = e.target;
	var unclicking = countryNode.getAttribute('fill') === 'white'
	if (!unclicking) {
		var baseCountry = countryNode.getAttribute('countryid');
		var currency = countryCurrencies[baseCountry];
		var scores = currencyOBJ.getScores(currency);
		var colourObj = getColours(scores);
	}
	[].slice.call(document.getElementsByClassName('country'))
	.forEach(function(node){
		if (!unclicking) {
			var country = node.getAttribute('countryid');
			var currency = countryCurrencies[country];
			node.setAttribute('fill', colourObj[currency]);
			//if there is no data on a country's currency, fill defaults to black
		} else {
			node.setAttribute('fill', '#818181')
		}
	});
	if (!unclicking) {
		countryNode.setAttribute('fill', 'white');
	}
}

/* Attaches a click event listener to every country */
function addEventListeners(){
	var nodeList = document.getElementsByClassName('country');
	[].forEach.call(nodeList,function(node){
		node.addEventListener('click',changeColour,false)
	});
};


//attach the event listeners
selectBox.init();
addEventListeners();



/*--------------- static data -------------*/

var currencyData = '{"BD": "BDT", "BE": "EUR", "BF": "XOF", "BG": "BGN", "BA": "BAM", "BB": "BBD", "WF": "XPF", "BL": "EUR", "BM": "BMD", "BN": "BND", "BO": "BOB", "BH": "BHD", "BI": "BIF", "BJ": "XOF", "BT": "BTN", "JM": "JMD", "BV": "NOK", "BW": "BWP", "WS": "WST", "BQ": "USD", "BR": "BRL", "BS": "BSD", "JE": "GBP", "BY": "BYR", "BZ": "BZD", "RU": "RUB", "RW": "RWF", "RS": "RSD", "TL": "USD", "RE": "EUR", "TM": "TMT", "TJ": "TJS", "RO": "RON", "TK": "NZD", "GW": "XOF", "GU": "USD", "GT": "GTQ", "GS": "GBP", "GR": "EUR", "GQ": "XAF", "GP": "EUR", "JP": "JPY", "GY": "GYD", "GG": "GBP", "GF": "EUR", "GE": "GEL", "GD": "XCD", "GB": "GBP", "GA": "XAF", "SV": "USD", "GN": "GNF", "GM": "GMD", "GL": "DKK", "GI": "GIP", "GH": "GHS", "OM": "OMR", "TN": "TND", "JO": "JOD", "HR": "HRK", "HT": "HTG", "HU": "HUF", "HK": "HKD", "HN": "HNL", "HM": "AUD", "VE": "VEF", "PR": "USD", "PS": "ILS", "PW": "USD", "PT": "EUR", "SJ": "NOK", "PY": "PYG", "IQ": "IQD", "PA": "PAB", "PF": "XPF", "PG": "PGK", "PE": "PEN", "PK": "PKR", "PH": "PHP", "PN": "NZD", "PL": "PLN", "PM": "EUR", "ZM": "ZMK", "EH": "MAD", "EE": "EUR", "EG": "EGP", "ZA": "ZAR", "EC": "USD", "IT": "EUR", "VN": "VND", "SB": "SBD", "ET": "ETB", "SO": "SOS", "ZW": "ZWL", "SA": "SAR", "ES": "EUR", "ER": "ERN", "ME": "EUR", "MD": "MDL", "MG": "MGA", "MF": "EUR", "MA": "MAD", "MC": "EUR", "UZ": "UZS", "MM": "MMK", "ML": "XOF", "MO": "MOP", "MN": "MNT", "MH": "USD", "MK": "MKD", "MU": "MUR", "MT": "EUR", "MW": "MWK", "MV": "MVR", "MQ": "EUR", "MP": "USD", "MS": "XCD", "MR": "MRO", "IM": "GBP", "UG": "UGX", "TZ": "TZS", "MY": "MYR", "MX": "MXN", "IL": "ILS", "FR": "EUR", "IO": "USD", "SH": "SHP", "FI": "EUR", "FJ": "FJD", "FK": "FKP", "FM": "USD", "FO": "DKK", "NI": "NIO", "NL": "EUR", "NO": "NOK", "NA": "NAD", "VU": "VUV", "NC": "XPF", "NE": "XOF", "NF": "AUD", "NG": "NGN", "NZ": "NZD", "NP": "NPR", "NR": "AUD", "NU": "NZD", "CK": "NZD", "XK": "EUR", "CI": "XOF", "CH": "CHF", "CO": "COP", "CN": "CNY", "CM": "XAF", "CL": "CLP", "CC": "AUD", "CA": "CAD", "CG": "XAF", "CF": "XAF", "CD": "CDF", "CZ": "CZK", "CY": "EUR", "CX": "AUD", "CR": "CRC", "CW": "ANG", "CV": "CVE", "CU": "CUP", "SZ": "SZL", "SY": "SYP", "SX": "ANG", "KG": "KGS", "KE": "KES", "SS": "SSP", "SR": "SRD", "KI": "AUD", "KH": "KHR", "KN": "XCD", "KM": "KMF", "ST": "STD", "SK": "EUR", "KR": "KRW", "SI": "EUR", "KP": "KPW", "KW": "KWD", "SN": "XOF", "SM": "EUR", "SL": "SLL", "SC": "SCR", "KZ": "KZT", "KY": "KYD", "SG": "SGD", "SE": "SEK", "SD": "SDG", "DO": "DOP", "DM": "XCD", "DJ": "DJF", "DK": "DKK", "VG": "USD", "DE": "EUR", "YE": "YER", "DZ": "DZD", "US": "USD", "UY": "UYU", "YT": "EUR", "UM": "USD", "LB": "LBP", "LC": "XCD", "LA": "LAK", "TV": "AUD", "TW": "TWD", "TT": "TTD", "TR": "TRY", "LK": "LKR", "LI": "CHF", "LV": "EUR", "TO": "TOP", "LT": "LTL", "LU": "EUR", "LR": "LRD", "LS": "LSL", "TH": "THB", "TF": "EUR", "TG": "XOF", "TD": "XAF", "TC": "USD", "LY": "LYD", "VA": "EUR", "VC": "XCD", "AE": "AED", "AD": "EUR", "AG": "XCD", "AF": "AFN", "AI": "XCD", "VI": "USD", "IS": "ISK", "IR": "IRR", "AM": "AMD", "AL": "ALL", "AO": "AOA", "AQ": "", "AS": "USD", "AR": "ARS", "AU": "AUD", "AT": "EUR", "AW": "AWG", "IN": "INR", "AX": "EUR", "AZ": "AZN", "IE": "EUR", "ID": "IDR", "UA": "UAH", "QA": "QAR", "MZ": "MZN"}';
var countryCurrencies = JSON.parse(currencyData);

/* in progress. not called. ! */
function makeColours(){
	var res = []
	var n = 169
	var base = 16711680
	for(var i = base; i> 0; i-= 10 ){
		//console.log(i.toString(16))
		res.push('#'+i.toString(16).slice(0,6))
	}
	return res
}

var colours = ['#FF0000','#FF1000','#FF2000','#FF3000','#FF4000','#FF5000','#FF6000','#FF7000','#FF8000','#FF9000','#FFA000','#FFB000','#FFC000','#FFD000','#FFE000','#FFF000','#FFFF00','#F0FF00','#E0FF00','#D0FF00','#C0FF00','#B0FF00','#A0FF00','#90FF00','#80FF00','#70FF00','#60FF00','#50FF00','#40FF00','#30FF00','#20FF00','#10FF00']
