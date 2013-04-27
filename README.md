# posiphyss

A JavaScript implementation of the 2007 Veldhuizen paper [Dynamic Multilevel Graph Visualization](http://arxiv.org/abs/0712.1549)

## Goals/Interface
The goal of this project is to create a force directed 3D graph layout by fulfilling the following graph interface:

### newVertex(callback) 
`callback` will receive the created vertex's id as its first parameter.

### newEdge(v1id, v2id, callback) 
Takes as arguments the ids of two vertices. 
Provides `callback` with the id of a newly created edge as its first paramter. 

### removeVertex(vid, callback)
Removes the specified vertex from the graph, providing `true` to `callback` if the operation was successfull, and `false` otherwise.

### removeEdge(eid, callback)
Removes the specified edge from the graph.
Returns `true` if the operation was successful, and `false` otherwise. 

### getPositions(callback) 
Returns the positions of all vertices, as a JSON array of 3D positions, supplying the parsed JSON as `callback`'s first parameter.

```
getPositions(function(positions){ console.log(positions) });
// [{"x": 0, "y": 0, "z": 0}, {"x": 3, "y": 42, "z": 26}, ...]
```

## Design
Posiphyss will use web workers to hide the main simulation from the user, providing the interface defined above. The simulation web worker is wrapped by a layout-bridge with mostly mimics the graph interface. 

### layout-bridge and layout-worker
The layout-bridge will wrap creation of and requests to the layout-worker. Internally, it assigns a ticket which is returned from the layout-worker so the layout-bridge can execute the appropriate callback. 

More details will follow as the project progresses.

## Roadmap
0. The first step will be to wrap the web worker in a layout-bridge.
1. Check out promises, and decide whether to rework layout-bridge to return them.
2. After that, the project will implement section 4 of the linked paper, Dynamic Coarsening. 

## Usage
It's still too early for that, but eventually, you'll have to include the layout-bridge, which will create a web worker from `layout-worker.min.js`.

