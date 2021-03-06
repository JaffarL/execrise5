const events = require('events')
// function Base() {}
// Base.prototype.on = function(name,fn){
// 	const that = this;
// 	eve.on(name,function(value){
// 		fn.call(that,value);
// 		eve.removeAllListeners();   //  I just had a try and it worked..But I dont know why..
// 	})
// }
// Base.prototype.trigger = function(name,value){
// 	eve.emit(name,value);
// }

function Base() {}
Base.prototype.on = function(name,fn){
	this.eventList={}
	this.eventList[name] = fn;
}
Base.prototype.trigger = function(name,value){
	const that = this;
	this.eventList[name].call(that,value);
}

Base.extend = function (...param) {
	function temp(){}
	temp.prototype = Object.create(this.prototype);  //why cannot use Base.prototype?
	temp.prototype.constructor = temp;
	for(let i=0;i<param.length;i++){
		for(let j in param[i]){
			temp.prototype[j] = param[i][j]
			temp[j] = param[i][j]
		}
	}
	temp.extend = this.extend;					// question the same
	return temp;
}

module.exports = Base