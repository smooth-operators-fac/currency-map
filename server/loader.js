const parse = require('csv-parse');
const fs = require('fs');

const PPPFilePath = '/../server/data/world-bank/8647fc1c-6b72-4613-9a75-00acc726e6c1_Data.csv'

let PPPObj = null
let requested = null

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

const parser = parse({
	delimiter: ',',
	columns: true,
}, function(err, data){
	if (err) throw err;
	if (data[0]['Series Code'] === 'PA.NUS.PPPC.RF'){
		PPPObj = clean(data);
		if (requested){
			requested(PPPObj)
		}
	}
});

fs.createReadStream(__dirname + PPPFilePath).pipe(parser);

module.exports = {
	getPPP: function(callback){
		if (PPPObj){
			callback(PPPObj)
		} else {
			requested = callback
		}
	}
}
