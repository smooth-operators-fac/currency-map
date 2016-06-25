'use strict'

var apiCaller = {
	dates: null,
	callList: null,
	todayResponse: null,
	response: [],
	average: null,
	scores: null,
	runCalls(){
		generateDates()
		populateCallList()
		Promise.all([callApi(this.callList[0]),callApi(this.callList[1]),
			    callApi(this.callList[2]),callApi(this.callList[3]),
			    callApi(this.callList[4])] )
			    .then((responseArray)=>{
				    for(var i = 0; i<responseArray.length; i++){
					    if(i==0){this.todayResponse = JSON.parse(responseArray[i]).rates}
					    else{this.response.push(JSON.parse(responseArray[i]).rates)} 	
				    }
				    this.runCalculations()
			    })

	},
	runCalculations(){
		console.log('im here!')	
		computeAverage(this.response)
		computeScores(this.response)
		console.log(this.average)
		console.log(this.scores)
	},
	getScores(base){
		if(this.scores == null){console.log('data not ready yet'); return false}
		else{return (base === 'USD')? this.scores: rebase(base)}
	}
}

function generateDates(){
	var now = new Date()
	apiCaller.dates = [0,365,700,1000,1300].map(el=> now.subtractDays(el).format())
}

function populateCallList(){
	apiCaller.callList = apiCaller.dates.map((el)=> urls(el))
}

function urls (date){
	var base = 'https://openexchangerates.org/api/';
	var id = 'app_id=bdf1519ec8b749ff8d01851d7da1391f';
	var historical = 'historical/'+ date + '.json';
	return (base + historical +'?' + id)
}
function callApi(url){
	return new Promise(function (resolve, reject){
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function (){(this.status === 200|| this.status === 304)? resolve(request.responseText): reject(request.responseText)}
		request.send()
	})
}

function computeAverage(){
	apiCaller.average  = Object.keys(apiCaller.response[0]).reduce((acc,current)=>{
		acc[current] = (apiCaller.response[0][current]+  apiCaller.response[1][current] +  apiCaller.response[2][current] +  apiCaller.response[3][current])/apiCaller.response.length
		return acc
	},{})
}
function computeScores(){
	apiCaller.scores = Object.keys(apiCaller.average).reduce((acc,current)=>{
		acc[current] =  (apiCaller.todayResponse[current] - apiCaller.average[current])/apiCaller.average[current]
		return acc
	},{})
}
function rebase(base){
	var tmpObj
	tmpObj  = Object.keys(apiCaller.average).reduce((acc,current)=>{
		acc[current] = apiCaller.average[current]/apiCaller.average[base]
		return acc
	},{})
        computeScores(tmpObj)
	return apiCaller.scores
}
Date.prototype.subtractDays = function(days){
	var date = new Date()
	date.setTime(date.getTime() - days*3600*24*1000)
	return date
}
Date.prototype.format = function(){
	var addZ =  (n)=>{return n<10? '0'+n:''+n;}
	return this.getFullYear() + '-'+ addZ(this.getMonth()+1)+ '-' + addZ(this.getDate())
}

apiCaller.runCalls()
