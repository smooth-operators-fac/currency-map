'use strict'
var currencyOBJ = {
	reqType:'',
	url:'',
	response:null,
	init: function(){
		this.reqType = '';
		this.url = '';
	},
	set: function(reqType, url){
		this.reqType = reqType;
		this.url = url;
	},
	call: function(){
		var xhr = new XMLHttpRequest()

		xhr.onload = function(){
			this.response = JSON.parse(xhr.response)
			console.log('here: ',this.response)
		}.bind(currencyOBJ)

		xhr.open(this.reqType,this.url,true);
		xhr.send()
	},
	selectBase:

}
