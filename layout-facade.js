/*
	layout-bridge.js
	Joshua Moore
	2013-04-27
*/

var LayoutFacade = function(){

	this._waiting = {};
	this._initialized = false;
	this._nextId = 0;

};

LayoutFacade.prototype.init = function(){
	if(!this._initialized){
		this._waiting = {};
	
		this._worker = new Worker('/layout-worker.js');
		var oThis = this;
		this._worker.onmessage = function(e){oThis._recvMsg(e);};
		var ticket = this._nextId++;
		
		var waitingCallback = function(){
			this._initiated = true;
		};
		waitingCallback.bind(this);
		this._waiting[ticket] = waitingCallback;
		
		this._worker.postMessage({cmd: 'init', ticket: ticket});
		this._initialized = true;
		
		this._waiting[-1] = function(payload){
			console.log('layout-facade:', payload);
		};
	}
};

LayoutFacade.prototype.addVertex = function(callback){
	if(!this._initialized) throw "Initialize LayoutFacade first";

	var ticket = this._nextId++;
	this._waiting[ticket] = callback;
	this._worker.postMessage({cmd: 'addVertex', ticket: ticket});
};
	
LayoutFacade.prototype.removeVertex = function(id, callback){
	if(!this._initialized) throw "Initialize LayoutFacade first";

	var ticket = this._nextId++;
	this._waiting[ticket] = callback;
	this._worker.postMessage({cmd: 'removeVertex', id: id, ticket: ticket});
};
	
LayoutFacade.prototype.addEdge = function(sourceId, targetId, callback){
	if(!this._initialized) throw "Initialize LayoutFacade first";
	
	var ticket = this._nextId++;
	this._waiting[ticket] = callback;
	this._worker.postMessage({cmd: 'addEdge', sourceId: sourceId, targetId: targetId, ticket: ticket});
};

LayoutFacade.prototype.getPositions = function(callback){
	if(!this._initialized) throw "Initialize LayoutFacade first";
	
	var ticket = this._nextId++;
	this._waiting[ticket] = callback;
	this._worker.postMessage({cmd: 'getPositions', ticket: ticket});
};

LayoutFacade.prototype._recvMsg = function(e){
	if(this._waiting.hasOwnProperty(e.data.ticket)){
		this._waiting[e.data.ticket](e.data.payload);
		if(e.data.ticket !== -1){
			delete this._waiting[e.data.ticket];
		}
	}
};
