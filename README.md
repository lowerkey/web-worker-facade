# posiphyss

A JavaScript implementation of the 2007 Veldhuizen paper [Dynamic Multilevel Graph Visualization](http://arxiv.org/abs/0712.1549)

## Goals/Interface
The goal of this project is to fulfill the following interface:

	* newVertex() returns the id of a newly created vertex
	* newEdge(v1, v2) takes as arguments ids of two vertices, returns the id of a newly created edge
	* removeVertex()
	* removeEdge()
	* getPositions() returns the positions of all vertices, as an array of {x, y, z}s
	
