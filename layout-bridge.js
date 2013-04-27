/*
	layout-bridge.js
	Joshua Moore
	2013-04-27
*/

var LayoutBridge = function(){

	this._waiting = {};
	this._initialized = false;
	this._nextId = 0;

};

LayoutBridge.prototype.init = function(){
	if(!this._initialized){
		this._waiting = {};
	
		this._worker = new Worker('/layout-worker.min.js');
		var oThis = this;
		this._worker.onmessage = function(e){oThis._recvMsg(e);};
		var ticket = _.uniqueId();
		
		var waitingCallback = function(){
			this._initiated = true;
		};
		waitingCallback.bind(this);
		this._waiting[ticket] = waitingCallback;
		
		this._worker.postMessage({cmd: 'init', ticket: ticket});
		this._initialized = true;
		
		this._waiting[-1] = function(payload){
			console.log(payload);
		};
	}
};

LayoutBridge.prototype.addVertex = function(callback){
	if(!this._initialized) throw "Initialize LayoutBridge first";

	var ticket = this._netxtId++;
	this._waiting[ticket] = callback;
	this._worker.postMessage({cmd: 'addVertex', ticket: ticket});
};
	
LayoutBridge.prototype.removeVertex = function(id, callback){
	if(!this._initialized) throw "Initialize LayoutBridge first";

	var ticket = this._netxtId++;
	this._waiting[ticket] = callback;
	this._worker.postMessage({cmd: 'removeVertex', id: id, ticket: ticket});
};
	
LayoutBridge.prototype.addEdge = function(sourceId, targetId, callback){
	if(!this._initialized) throw "Initialize LayoutBridge first";
	
	var ticket = this._netxtId++;
	this._waiting[ticket] = callback;
	this._worker.postMessage({cmd: 'addEdge', sourceId: sourceId, targetId: targetId, ticket: ticket});
};

LayoutBridge.prototype.getPositions = function(callback){
	if(!this._initialized) throw "Initialize LayoutBridge first";
	
	var ticket = this._netxtId++;
	this._waiting[ticket] = callback;
	this._worker.postMessage({cmd: 'getPositions', ticket: ticket});
};

LayoutBridge.prototype._recvMsg = function(e){
	if(this._waiting.hasOwnProperty(e.data.ticket)){
		this._waiting[e.data.ticket](e.data.payload);
		delete this._waiting[e.data.ticket];
	}
};
