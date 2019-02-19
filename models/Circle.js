class Circle extends Model{
	constructor(r = 1, n = 12) {

		super();
		
		if (n < 3) n = 3;

        // Create the circle's geometry.

        // An array of vertices to be used to create the geometry.
        var v = new Array(n);

        // Create all the vertices.
        for (var i = 0; i < n; i++)
        {
          var c = Math.cos(i*(2.0*Math.PI)/n);
          var s = Math.sin(i*(2.0*Math.PI)/n);
          v[i] = new Vertex(r * c, r * s, 0);
          this.addVertex(v[i]);
        }


        // Create the line segments around the circle.
        for (var i = 0; i < n - 1; i++)
        {
          this.addLineSegment(i, i+1);
        }
        this.addLineSegment(n-1, 0);
   }

}
