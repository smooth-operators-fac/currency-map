'use strict'
var currencyOBJ = {
	callList: [],
	todayResponse: [],
	response: [],
	interval:null,
	average:{},
	scores:{},
	init: function(){
		this.interval = setInterval(this.watch.bind(currencyOBJ),10)
		var now = new Date()
		var dates = [5,11,18,25,32].map(el=>{
			return now.subDays(el).format()	
		})
		this.callList = dates.map((el)=>{
			return new Call(this.urls(el))	
		})
		var xhrArray = [0,1,2,3,4].map((el) => 'xhr' + el)

		this.callList.forEach((el,i)=>{
			xhrArray[i] = new XMLHttpRequest()	
			xhrArray[i].onload = ()=>{
				var clean  = new Object(JSON.parse(xhrArray[i].response).rates)
				if (i>0) this.response.push(clean)
				else this.todayResponse.push(clean)
			}
			xhrArray[i].open('GET',this.callList[i].url,true)	
			xhrArray[i].send()	
		})
	},
	urls: function(date){
		var base = 'https://openexchangerates.org/api/';
		var id = 'app_id=bdf1519ec8b749ff8d01851d7da1391f';
		var historical = 'historical/'+ date + '.json';
		return (base + historical +'?' + id)
	},
	reset: function(){
		this.reqType = '';
		this.url = '';
		this.dates = [];		
	},
	watch: function(){
		if(this.response.length === 4 && this.todayResponse.length === 1){
			this.computeAverage()
			this.computeScores()
			console.log(this.scores)
			console.log(this.getScores('USD'))
			console.log(this.getScores('AFN'))
			clearInterval(this.interval)
		}	
	},
	computeAverage: function(){
		this.average  = Object.keys(this.response[0]).reduce((acc,current)=>{
			acc[current] = (this.response[0][current]+  this.response[1][current] +  this.response[2][current] +  this.response[3][current])/this.response.length
			return acc
		},{})
	console.log(this.average)

	},
	computeScores: function(){
		this.scores = Object.keys(this.average).reduce((acc,current)=>{
			acc[current] =  this.todayResponse[0][current] - this.average[current]
			return acc
		},{}) 			
	},
	rebase: function(base){
		var baseVal = this.scores[base];
		console.log(baseVal)
		return Object.keys(this.scores).reduce((acc,current)=>{
			acc[current] = this.scores[current]/baseVal	
			return acc	
		},{})		
	},
	getScores: function(base){
		if(base === 'USD')return this.scores;	
		else return this.rebase(base)
	
	}
}

function Call(url){
	this.url = url;
}


Date.prototype.subDays = function(days){
	var date = new Date(this.valueOf())
	date.setTime(date.getTime() - days*3600*24*1000)
	return date
}
Date.prototype.format = function(){
	var addZ =  (n)=>{return n<10? '0'+n:''+n;}
	return this.getFullYear() + '-'+ addZ(this.getMonth()+1)+ '-' + addZ(this.getDate())
}
