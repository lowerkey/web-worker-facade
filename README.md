# posiphyss

A JavaScript implementation of the 2007 Veldhuizen paper [Dynamic Multilevel Graph Visualization](http://arxiv.org/abs/0712.1549)

## Goals/Interface
The goal of this project is to create a force directed 3D graph layout by fulfilling the following graph interface:

### newVertex() 
Returns the id of a newly created vertex.

### newEdge(v1id, v2id) 
Takes as arguments the ids of two vertices. 
Returns the id of a newly created edge.

### removeVertex(vid)
Removes the specified vertex from the graph.

### removeEdge(eid)
Removes the specified edge from the graph.

### getPositions() 
Returns the positions of all vertices, as a JSON array of 3D positions.

```
getPositions()
// [{"x": 0, "y": 0, "z": 0}, {"x": 3, "y": 42, "z": 26}, ...]
```

## Design
Posiphyss will use web workers to hide the main simulation from the user, providing the interface defined above. The simulation web worker is wrapped by a layout-bridge with mostly mimics the graph interface. 

More details will follow as the project progresses.

## Roadmap
0. The first step will be to wrap the web worker in a layout-bridge.
1. After that, the project will implement section 4 of the linked paper, Dynamic Coarsening. 