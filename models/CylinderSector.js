class CylinderSector extends Model{
	constructor(r, h1, h2, theta1, theta2, n, k) {

		super();
		if (n < 2) n = 2;
            if (k < 4) k = 4;

            // Create the cylinder's geometry.

            var deltaH = (h2 - h1) / (n - 1);
            var deltaTheta = (theta2 - theta1)/ (k - 1);

            // An array of vertices to be used to create line segments.
            var v = new Array[n][k];

            // Create all the vertices.
            for (var j = 0; j < k; j++) // choose an angle of longitude
            {
               var c = Math.cos(theta1 + j*deltaTheta);
               var s = Math.sin(theta1 + j*deltaTheta);
               for (var i = 0; i < n; i++) // choose a circle of latitude
               {
                  v[i][j] = new Vertex( r * c,
                                        h1 + i * deltaH,
                                        r * s );
               }
            }
            var topCenter = new Vertex(0, h2, 0);
            var bottomCenter = new Vertex(0, h1, 0);

            // Add all of the vertices to this model.
            for (var i = 0; i < n; i++)
            {
               for (var j = 0; j < k; j++)
               {
                  this.addVertex( v[i][j] );
               }
            }
            this.addVertex(topCenter);
            this.addVertex(bottomCenter);
            var topCenterIndex = n * k;
            var bottomCenterIndex = n * k + 1;


            // Create the horizontal (partial) circles of latitude around the cylinder.
            for (var i = 0; i < n; i++)
            {
               for (var j = 0; j < k - 1; j++)
               {  //                v[i][j]      v[i][j+1]
                  this.addLineSegment( (i * k) + j, (i * k) + (j+1) );
               }
            }

            // Create the lines of longitude from the bottom to the top.
            for (var j = 0; j < k; j++)
            {  //                                   v[0][j]
               this.addLineSegment( bottomCenterIndex, (0 * k) + j );

               for (int i = 0; i < n - 1; i++)
               {  //                v[i][j]       v[i+1][j]
                  this.addLineSegment( (i * k) + j, ((i+1) * k) + j );
               }
               //                v[n-1][j]
               this.addLineSegment( ((n-1) * k) + j, topCenterIndex );
            }

	}
}