/*
	layout-worker.js
	Joshua Moore
	2013-04-27
*/

onmessage = function(e){
	var cmd = e.data.cmd;

	if(cmd === 'init'){
		log('initied');
	}

	/*
		Graph Manipulation
	 */
	var id, success;
	if(cmd === 'addVertex'){
		log('vertex added')
		respond(e.data.ticket, 0);
	}

	if(cmd === 'removeVertex'){
		log('vertex removed');
		success = true;
		respond(e.data.ticket, success);
	}

	if(cmd === 'addEdge'){
		log('edge added');
		respond(e.data.ticket, 0);
	}
	
	if(cmd === 'removeEdge'){
		log('edge removed');
		sucess = true;
		respond(e.data.ticket, success);
	}
		
	/*
		Rendering calls
	 */
	if(cmd === 'getPositions'){
		log('positions calculated');
		var positions = {};
		respond(e.data.ticket, positions);
	}
};

function log(data){
	respond(-1, data);
}

function respond(ticket, data){
	if(ticket){
		self.postMessage({ticket: ticket, payload: data});
	}
}