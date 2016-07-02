/*Loaded data will be passed as argument to callback of exported getPPP
 *function. The callback will be executed asynchronously on load */

const parse = require('csv-parse');
const fs = require('fs');

const PPPFilePath = '/../server/data/world-bank/8647fc1c-6b72-4613-9a75-00acc726e6c1_Data.csv'
let PPPObj = null
let handlePPP = null

const ccFilePath = '/../server/data/country-currencies.json'
let ccObj = null
let handleCc = null

/*returns object with properties as country codes and values as most 
 *recent PPP stat */
const clean = function(data){
	const out = data.reduce(function(out, country){
		let datum = '..'
		let year = 15
		while(datum === '..' && year >= 0){
			datum = country['YR20'+ year]
			year--	
		}
		out[country['Country Code']] = parseFloat(datum)
		return out
	},{})
	return out
}

/* parses csv file */
const parser = parse({
	delimiter: ',',
	columns: true,
}, function(err, data){
	if (err) throw err;
	if (data[0]['Series Code'] === 'PA.NUS.PPPC.RF'){
		PPPObj = clean(data);
		if (handlePPP){
			handlePPP(PPPObj)
		}
	}
});

/* load PPP data */
fs.createReadStream(__dirname + PPPFilePath).pipe(parser);

/* load country-currency data */
fs.readFile(__dirname + ccFilePath, function(err, data){
	if (err) throw err;
	ccObj = JSON.parse(data)
	if (handleCc){
		handleCc(ccObj)
	}
})

module.exports = {
	getPPP: function(callback){
		if (PPPObj){
			callback(PPPObj)
		} else {
			handlePPP = callback
		}
	},
	getCountryCurrencies: function(callback){
		if(ccObj){
			callback(ccObj)
		} else {
			handleCc = callback
		}
	}
}
