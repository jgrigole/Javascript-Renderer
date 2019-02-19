class Cube extends Model{
	constructor() {

		super();
		 // Create the cube's geometry.
      	var v0 = new Vertex(-1, -1, -1); // four vertices around the bottom face
      	var v1 = new Vertex( 1, -1, -1);
      	var v2 = new Vertex( 1, -1,  1);
      	var v3 = new Vertex(-1, -1,  1);
      	var v4 = new Vertex(-1,  1, -1); // four vertices around the top face
      	var v5 = new Vertex( 1,  1, -1);
      	var v6 = new Vertex( 1,  1,  1);
      	var v7 = new Vertex(-1,  1,  1);

      	// Add the cube's vertices to the model.
      	this.addVertex(v0, v1, v2, v3);
      	this.addVertex(v4, v5, v6, v7);

      	// Create 12 line segments.
      	// bottom face
      	this.addLineSegment(0, 1);
      	this.addLineSegment(1, 2);
      	this.addLineSegment(2, 3);
      	this.addLineSegment(3, 0);
      	// top face
      	this.addLineSegment(4, 5);
      	this.addLineSegment(5, 6);
      	this.addLineSegment(6, 7);
      	this.addLineSegment(7, 4);
      	// back face
      	this.addLineSegment(0, 4);
      	this.addLineSegment(1, 5);
      	// front face
      	this.addLineSegment(3, 7);
      	this.addLineSegment(2, 6);

	}
}