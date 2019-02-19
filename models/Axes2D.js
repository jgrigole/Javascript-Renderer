class Axes2D extends Model{
    constructor(xMin = -1, xMax = 1, yMin = -1, yMax = 1, z = 0.0, xMarks = 5, yMarks = 5) {

	  super();

        // x-axis
        this.addVertex(new Vertex(xMin, 0, z));
        this.addVertex(new Vertex(xMax, 0, z));
        this.addLineSegment(0, 1);

        // y-axis
        this.addVertex(new Vertex(0, yMin, z));
        this.addVertex(new Vertex(0, yMax, z));
        this.addLineSegment(2, 3);

        var index = 4;

        // Put evenly spaced tick marks on the x-axis.
        var xDelta = (xMax - xMin)/xMarks;
        var yDelta = (yMax - yMin)/50;
        for (var x = xMin; x <= xMax; x += xDelta)
        {
            this.addVertex(new Vertex(x,  yDelta/2, z));
            this.addVertex(new Vertex(x, -yDelta/2, z));
            this.addLineSegment(index+0, index+1);
            index += 2;
        }

        // Put evenly spaced tick marks on the y-axis.
        yDelta = (yMax - yMin)/yMarks;
        xDelta = (xMax - xMin)/50;
        for (var y = yMin; y <= yMax; y += yDelta)
        {
            this.addVertex(new Vertex( xDelta/2, y, z));
            this.addVertex(new Vertex(-xDelta/2, y, z));
            this.addLineSegment(index+0, index+1);
            index += 2;
        }

    }
}