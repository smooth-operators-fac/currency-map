#! /usr/local/bin/node

/* Executable script to retrieve large number of data points
 * and write them to file. Script will prompt for number and
 * interval of dates before running API requests */

const fs = require('fs');
const http = require('http');
const readline = require('readline');

/* defines custom date object with useful methods */ 
const MyDate = function (){
	this.date = new Date()
	this.subtractDays = function(days){
		this.date.setTime(this.date.getTime() - days*3600*24*1000)
		return this
	},
	this.format = function(){
		var addZ =  (n)=>{return n<10? '0'+n:''+n;}
		return this.date.getFullYear() + '-'+ addZ(this.date.getMonth()+1)+ '-' + addZ(this.date.getDate())	
	}
}

/* generates an array of @number dates @interval days apart,
 * counting back from @start */ 
const makeDates = function(start, interval, number){
	let dates = []
	const now = new MyDate()
	const then = now.subtractDays(start)
	for (let i = 1; i <= number; i++){
		let date = then.subtractDays(interval*i).format()
		dates.push(date)
	}
	return dates
}

/* generates array of http option objects from array of dates */
const makeOptions = function (dates){
	const base = '/api';
	const id = 'app_id=bdf1519ec8b749ff8d01851d7da1391f';
	return dates.map((date) => {
		const query = '/historical/'+ date + '.json';
		return {
			protocol: 'http:',
			hostname: 'openexchangerates.org',
			path: base + query + '?' + id
		}
	})
}

/* generates array of promises for http requests from array of
 *  http options */
const makePromises = function(options){
	return options.map((option) => {
		return new Promise(function (resolve, reject){
			const req = http.get(option, (res) =>{
				res.setEncoding('utf8')
				let out = {
					path: res.req.path,
					data: ''
				}
				res.on('data', (chunk) => {
					out.data += chunk;
				})
				res.on('end', () =>{
					if([200, 302].indexOf(res.statusCode) > -1){
						resolve(out)
					} else {
						reject(out)
					}
				})
			});
		})
	})
}

/* returns a chain of promises as a single promise */
const chainPromises = function(promises){
	const chain = promises.map((p) => {
		return p.then(
			(out) => {
				console.log(`SUCCESS with ${out.path}`)
				return out.data
			},
			(out) => {
				console.log(`FAILURE with ${out.path}`)
				return `failed with path ${out.path}`
			})
	})
	return Promise.all(chain)
}
	/* returns promise to write the array of responses to file */
const writeResults = function(responses, type){
	if (type==='successes') {
		const filePath = __dirname + '/usd-historical.json'
	} else {
		const filePath = __dirname + '/usd-historical-failures.json'
	}
	const data = responses.join('\n')
	console.log('should write')

	return new Promise(function(resolve, reject){
		fs.writeFile(filePath, data, function(err) {
			if (err) {
				console.log(`writing ${type} failed with ${err}`);
			} else {
				console.log(`successfully saved ${type} to file`);
			}
			resolve()
		})
	})
}

const getData = function (start, interval, number){
	const dates = makeDates(start, interval, number)
	const options = makeOptions(dates)
	const promises = makePromises(options) 
	const chain = chainPromises(promises)
	chain.then((responses) => {
		successes = []
		failures = []
		responses.forEach((r) => {
			if (r.slice(0,6)==='failed'){
				failures.push(r)
			} else {
				successes.push(r)
			}
		})
		writeResults(failures, 'failures')
			.then(() => writeResults(successes, 'successes'))
			.then(() => {console.log('\n'); return process.exit(0)}
			)
	})
}

const getParams = function(){

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	const prompts = [
		'Start this many days ago',
		'Every this many days',
		'This number of times'
	]
	const params = []
	const next = () => {
		rl.setPrompt(prompts[params.length]+ ' > ')
		rl.prompt()
	}
	rl.on('line', (l) => {
		params.push(l)
		if(params.length < prompts.length){
			next()
		} else {
			return rl.close()
		}
	}).on('close', () => {
		console.log(
`.......................
Sending API requests...
.......................`
		)
		getData(...params)
	})
	next()
}

getParams()

