#! /usr/local/bin/node

/* Executable script to retrieve large number of data points
 * and write them to file. Script will prompt for number and
 * interval of dates before running API requests */

const fs = require('fs');
const http = require('http');
const readline = require('readline');

/* defines custom date object with useful methods */ 
const MyDate = function (start){
	this.date = start || new Date()
	this.subtractDays = function(days){
		this.date.setUTCTime(this.date.getUTCTime() - days*3600*24*1000)
		return this
	},
	this.format = function(){
		var addZ =  (n)=>{return n<10? '0'+n:''+n;}
		return this.date.getUTCFullYear() + '-'+ addZ(this.date.getUTCMonth()+1)+ '-' + addZ(this.date.getUTCDate())	
	}
}

const getPastDates = function(){
	const filePath = __dirname + '/usd-historical.txt'
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf-8', function(err, data){
			if (err) throw err;
			const out = {}
			data.split('\n').forEach((line)=>{
				if (line) out[Object.keys(JSON.parse(line))[0]] = null
			})
			resolve(out)
		})
	})
}

/* generates an array of @number dates @interval days apart,
 * counting back from @start */ 
const makeDates = function(number, pastDates){
	const start = 0
	const interval = 1
	const now = new MyDate()
			console.log(now.subtractDays(start), 'out')
	let date = now.subtractDays(start).format()
	while(number){
		if (!pastDates.hasOwnProperty(date)){
			dates.push(date)
		}
		date = now.subtractDays(interval).format()
		number--
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
			setTimeout(()=>{
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
				})
			},200)
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
			})
	})
	return Promise.all(chain)
}

/* removes some unneeded data and returns as JSON */
const formatResponses = function(responses){
	const lines = responses.map((response)=>{
		const parsed = JSON.parse(response)
		const date = new MyDate(new Date(parsed.timestamp*1000))
		const temp = {}
		temp[date.format()] = parsed.rates
		return JSON.stringify(temp)
	})
	lines.push('')
	return lines.join('\n')
}

	/* returns promise to write the array of responses to file */
const writeResults = function(responses){
	if (!responses.length) return Promise.reject()
	const filePath = '/usd-historical.txt'
	const data = formatResponses(responses)
	return new Promise(function(resolve, reject){
		fs.appendFile(filePath, data, function(err) {
			if (err) {
				console.log(`FAILURE saving to file: ${err}`);
			} else {
				console.log(`SUCCESS saving to file`);
			}
			resolve()
		})
	})
}

const getData = function (number){
	getPastDates().then((pastDates) => {
		const dates = makeDates(number, pastDates)
		return Promise.resolve(dates)
	}).then((dates)=>{
		const options = makeOptions(dates)
		const promises = makePromises(options) 
		return chainPromises(promises)
	}).then((responses) => {
		console.log('Writing to file........')
		writeResults(responses).then(() => {
			return process.exit(0)
		})

	})
}

const getParams = function(){

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	const prompts = [
		'Number of calls'
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
		console.log('Sending API requests...')
		getData(...params)
	})
	next()
}

getParams()

