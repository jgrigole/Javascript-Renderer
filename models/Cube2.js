class Cube2 extends Model{
	constructor(xGrid, yGrid, zGrid) {

		super();
		 // Create the cube's geometry.

            var index = 8;
      	
            if (xGrid < 0) xGrid = 0;
            if (yGrid < 0) yGrid = 0;
            if (zGrid < 0) zGrid = 0;

            var xStep = 2.0 / (1 + xGrid);
            console.log("xStep: " + xStep);
            var yStep = 2.0 / (1 + yGrid);
            var zStep = 2.0 / (1 + zGrid);

            var x = -1.0;
            for (var i = 0; i < xGrid; i++)
            {
               x += xStep;
               // Start at the top, front edge, go down the front face, and around the cube.
               this.addVertex(new Vertex(x,  1,  1));
               this.addVertex(new Vertex(x, -1,  1));
               this.addVertex(new Vertex(x, -1, -1));
               this.addVertex(new Vertex(x,  1, -1));
               this.addLineSegment(index+0, index+1);
               this.addLineSegment(index+1, index+2);
               this.addLineSegment(index+2, index+3);
               this.addLineSegment(index+3, index+0);
               index += 4;
            }

            // Grid lines perpendicular to the y-axis.
            var y = -1.0;
            for (var i = 0; i < yGrid; i++)
            {
               y += yStep;
               // Start at the front, right edge, go left across the front face, and around the cube.
               this.addVertex(new Vertex( 1, y,  1));
               this.addVertex(new Vertex(-1, y,  1));
               this.addVertex(new Vertex(-1, y, -1));
               this.addVertex(new Vertex( 1, y, -1));
               this.addLineSegment(index+0, index+1);
               this.addLineSegment(index+1, index+2);
               this.addLineSegment(index+2, index+3);
               this.addLineSegment(index+3, index+0);
               index += 4;
            }

            // Grid lines perpendicular to the z-axis.
            var z = -1.0;
            for (var i = 0; i < zGrid; i++)
            {
               z += zStep;
               // Start at the top, right edge, go left across the top face, and around the cube.
               this.addVertex(new Vertex( 1,  1, z));
               this.addVertex(new Vertex(-1,  1, z));
               this.addVertex(new Vertex(-1, -1, z));
               this.addVertex(new Vertex( 1, -1, z));
               this.addLineSegment(index+0, index+1);
               this.addLineSegment(index+1, index+2);
               this.addLineSegment(index+2, index+3);
               this.addLineSegment(index+3, index+0);
               index += 4;
            }
      }
}