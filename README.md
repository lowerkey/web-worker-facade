# posiphyss

A JavaScript implementation of the 2007 Veldhuizen paper [Dynamic Multilevel Graph Visualization](http://arxiv.org/abs/0712.1549)

## Goals/Interface
This project will serve as a replacement for the direct sum physics simulation in flying-faces.
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
Posiphyss will use web workers to hide the main simulation from the user, providing the interface defined above. The simulation web worker is wrapped by a layout-facade with mostly mimics the graph interface. 

### layout-facade and layout-worker
The layout-facade will wrap creation of and requests to the layout-worker. Internally, it assigns a ticket which is returned from the layout-worker so the layout-facade can execute the appropriate callback. 

More details will follow as the project progresses.

## Roadmap
0. The first step will be to wrap the web worker in a layout-facade.
1. Check out promises, and decide whether to rework layout-facade to return them.
2. After that, the project will implement section 4 of the linked paper, Dynamic Coarsening. 

## Usage
It's still too early for that, but eventually, you'll have to include the layout-facade, which will create a web worker from `layout-worker.min.js`.
But since it is too early for usage, let's skip to Testing

### Testing
To run the tests, 
0. clone this repository, 
1. open your favorite console in the main directory, and 
2. run `python -m http.server`. 
3. Next up, open firefox (chrome doesn't work yet) and visit /test/facade.html
4. Open up a console and watch the magic.

## Todos:
0. add tests for layout facade DONE
1. find and fix Chrome Issue
2. Check out ArrayBuffers
3. find or implement Graph
4. implement coarsening from paper
5. gut direct sum approach from flying faces for testing purposes



