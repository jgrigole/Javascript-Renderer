class Scene {
	constructor(camera = new Camera()) {
		this.camera = camera;
		this.positionList = [];
	}

	setCamera(camera) {
		this.camera = camera;
	}

	addPosition() {
		for(var i = 0; i < arguments.length; i++) {
	    	this.positionList.push(arguments[i]);
	  	}
	}

	getPosition(index) {
		return this.positionList[index];
	}

	getPositionList() {
		return this.PositionList;
	}
}

class Model {
	constructor(arg) {
		this.vertexList = [];
		this.lineSegmentList = [];
		this.colorList = [];
		if(arg instanceof Model) {
			//make a copy of model
			this.visible = arg.visible;
			for(var i = 0; i < arg.vertexList.length; i++) {
				this.vertexList.push(new Vertex(arg.vertexList[i]));
			}
			for(var j = 0; j < arg.lineSegmentList.length; j++) {
				this.lineSegmentList.push(new LineSegment(arg.lineSegmentList[j]));
			}
			for(var k = 0; k < arg.colorList.length; k++) {
				this.colorList.push(arg.colorList[k]);
			}
		} 
		else {
				this.visible = true;
		}
	}

	addVertex() {
		for(var i = 0; i < arguments.length; i++) {
			this.vertexList.push(arguments[i]);
	  	}
	}

	addColor() {
		for(var i = 0; i < arguments.length; i++) {
			this.colorList.push(arguments[i]);
		}
	}

	addLineSegment(i0, i1, c0, c1) {
		this.lineSegmentList.push(new LineSegment(i0, i1, c0, c1));
	}

	setColor(c) {
		if(this.colorList.length == 0) {
			this.colorList.push(c);
		}
		else {
			for(var i = 0; i < this.colorList.length; i++) {
				this.colorList[i] = c;
			}
		}
	}

	setRandomColor() {
		var letters = '0123456789ABCDEF';
  		var color = '#';
  		for (var i = 0; i < 6; i++) {
    		color += letters[Math.floor(Math.random() * 16)];
  		}
  		this.setColor(color);
	}

	setRandomColors() {
		if(this.colorList.length == 0) {
			setRandomVertexColors();
		}
		else {
			for(var i = 0; i < this.colorList.length; i++) {
				var letters = '0123456789ABCDEF';
	  			var color = '#';
	  			for (var h = 0; h < 6; h++) {
	    			color += letters[Math.floor(Math.random() * 16)];
	  			}
	  			this.colorList[i] = color;
  			}
		}
	}

	setRandomVertexColors() {
		this.colorList = [];
		for(var i = 0; i < this.vertexList.length; i++) {
			var letters = '0123456789ABCDEF';
	  		var color = '#';
	  		for (var h = 0; h < 6; h++) {
	    		color += letters[Math.floor(Math.random() * 16)];
	  		}
	  		this.colorList.push(color);
		}
		for(var j = 0; j < this.lineSegmentList.length; j++) {
			this.lineSegmentList[j].cindex[0] = this.lineSegmentList[j].index[0];
			this.lineSegmentList[j].cindex[1] = this.lineSegmentList[j].index[1];
		}

	}

	setRandomLineSegmentColors() {
		this.colorList = [];
		for(var i = 0; i < this.lineSegmentList.length; i++) {
			var letters = '0123456789ABCDEF';
	  		var color = '#';
	  		for (var h = 0; h < 6; h++) {
	    		color += letters[Math.floor(Math.random() * 16)];
	  		}
	  		this.colorList.push(color);

		}
		var j = 0;
		for(var k = 0; k < this.lineSegmentList.length; k++) {
			this.lineSegmentList[k].cindex[0] = j;
			this.lineSegmentList[k].cindex[1] = j++;
		}
	}

	setRainbowLineSegmentColors() {
		this.colorList = [];
		for(var i = 0; i < 2 * this.lineSegmentList.length; i++) {
			var letters = '0123456789ABCDEF';
	  		var color = '#';
	  		for (var h = 0; h < 6; h++) {
	    		color += letters[Math.floor(Math.random() * 16)];
	  		}
	  		this.colorList.push(color);

		}
		var j = 0;
		for(var k = 0; k < this.lineSegmentList.length; k++) {
			this.lineSegmentList[k].cindex[0] = j++;
			this.lineSegmentList[k].cindex[1] = j++;
		}
	}

}

class LineSegment {
	//constructor(i0, i1, c0 ="#00ff00", c1 ="tomato") {
	constructor(i0, i1, c0 =0, c1 =0) {
		if(i0 instanceof LineSegment) {
			this.index = [i0.index[0], i0.index[1]];
      		this.cindex = [i0.cindex[0], i0.cindex[1]];
		}
		else {
        	this.index = [i0, i1];
        	this.cindex = [c0, c1];
		}
	}

	setColor1(c0) {
		this.cindex[0] = c0;
	}

	setColor2(c1) {
		this.cindex[1] = c1;
	}

	getColor1() {
		return this.cindex[0];
	}

	getColor2() {
		return this.cindex[1];
	}

}

class Vertex {
	constructor(arg1=0, arg2=0, arg3=0, arg4=1.0) {
		if(arg1 instanceof Vertex) {
			this.x = arg1.x;
			this.y = arg1.y;
			this.z = arg1.z;
			this.w = arg1.w;
		}
		else {
			this.x = arg1;
			this.y = arg2;
			this.z = arg3;
			this.w = arg4;
		}
	}

	set(x, y, z, w=1.0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	times(mtrx) {
		var col1 = mtrx.v1;
		var col2 = mtrx.v2;
		var col3 = mtrx.v3;
		var col4 = mtrx.v4;

		var x2 = (col1.x * this.x) + (col2.x * this.y) + (col3.x * this.z) + (col4.x * this.w);

		var y2 = (col1.y * this.x) + (col2.y * this.y) + (col3.y * this.z) + (col4.y * this.w);

		var z2 = (col1.z * this.x) + (col2.z * this.y) + (col3.z * this.z) + (col4.z * this.w);

		var w2 = (col1.w * this.x) + (col2.w * this.y) + (col3.w * this.z) + (col4.w * this.w);

		this.x = x2;
		this.y = y2;
		this.z = z2;
		this.w = w2;
	}
}

class Camera {
	constructor() {
		this.projPerspective();
	}

	//projPerspective(left, right, bottom, top, near)
	//projPerspective(fovy, aspect, near)
	projPerspective(arg1 = -1.0, arg2 = 1.0, arg3 = -1.0, arg4 = 1.0, arg5 = 1.0) {
		if(arguments.length == 5 || arguments.length == 0) {
			var left   = arg1;
			var right  = arg2;
			var bottom = arg3;
			var top    = arg4;
			var near   = arg5;

			this.left = left;
			this.right = right;
			this.bottom = bottom;
			this.top = top;
			this.n = -near;

			this.normalizeMatrix = PerspectiveNormalizeMatrix.build(left, right, bottom, top, near);
		}
		else if(arguments.length == 3) {
			var fovy = arg1;
			var aspect = arg2;
			var near = arg3;

			var top   = near * Math.tan((Math.PI/180.0)*fovy/2.0);
			var bottom  = -top;
			var right = top * aspect;
			var left    = -right;

			this.top = top;
			this.bottom = bottom;
			this.right = right;
			this.left = left;
			this.n = -near;

			this.normalizeMatrix = PerspectiveNormalizeMatrix.build(left, right, bottom, top, near);
		}



		this.perspective = true;
	}

	//projOrtho(left, right, bottom, top)
	//projOrtho(fovy, aspect, near)
	projOrtho(arg1 = -1.0, arg2 = 1.0, arg3 = -1.0, arg4 = 1.0) {
		if(arguments.length == 5) {
			var left =arg1;
			var right = arg2;
			var bottom = arg3;
			var top = arg4;

			this.left = left;
			this.right = right;
			this.bottom = bottom;
			this.top = top;
			this.n = 0;

			this.normalizeMatrix = OrthographicNormalizeMatrix.build(left, right, bottom, top);

		}
		else if(arguments.length == 3) {
			var fovy = arg1;
			var aspect = arg2;
			var near = arg3;

			var top = near * Math.tan((Math.PI/180.0)*fovy/2.0);
			var bottom = -top;
			var right = top * aspect;
			var left = -right;

			this.left = left;
			this.right = right;
			this.bottom = bottom;
			this.top = top;
			this.n = 0;

			this.normalizeMatrix = OrthographicNormalizeMatrix.build(left, right, bottom, top);
		}

		this.perspective = false;
	}
}

class Vector {
	constructor(x=0.0, y=0.0, z=0.0, w=0.0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

	}
	times(s=0.0) {
		return new Vector(s*this.x, s*this.y, s*this.z, s*this.w);
	}
	plus(v) {
		return new Vector(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
	}
	minus(v) {
		return new Vector(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
	}
	crossProduct(v) {
		return new Vector((this.y*v.z)-(this.z*v.y), (this.z*v.x)-(this.x*v.z), (this.x*v.y)-(this.y*v.x));
	}
	dotProduct(v) {
		return this.x*v.x + this.y*v.y + this.z*v.z;
	}
	normalize() {
		var norm = Math.sqrt( (this.x*this.x) + (this.y*this.y) + (this.z*this.z) );
		return new Vector(this.x/norm, this.y/norm, this.z/norm);
	}

}

class Matrix_j {
	constructor(matrix) {
		if(arguments.length == 0) {

			this.v1 = null;
			this.v2 = null;
			this.v3 = null;
			this.v4 = null;
		}
		else {
			var m = Matrix_j.build( new Vector(matrix.v1),
								    new Vector(matrix.v2),
								    new Vector(matrix.v3),
								    new Vector(matrix.v4));
			this.v1 = m.v1;
			this.v2 = m.v2;
			this.v3 = m.v3;
			this.v4 = m.v4;
		}
	}

	static build(v1, v2, v3, v4) {
		var m = new Matrix_j();
		m.v1 = v1;
		m.v2 = v2;
		m.v3 = v3;
		m.v4 = v4;
		return m;
	}

	static identity() {
		return Matrix_j.scale(1.0, 1.0, 1.0);
	}

	static translate(x, y, z) {
		return Matrix_j.build( new Vector(1.0, 0.0, 0.0, 0.0),
					  new Vector(0.0, 1.0, 0.0, 0.0),
					  new Vector(0.0, 0.0, 1.0, 0.0),
					  new Vector(  x,   y,   z, 1.0) );
	}

	static scale(x, y, z) {
		return Matrix_j.build( new Vector(  x, 0.0, 0.0, 0.0),
					  new Vector(0.0,   y, 0.0, 0.0),
					  new Vector(0.0, 0.0,   z, 0.0),
					  new Vector(0.0, 0.0, 0.0, 1.0) );
	}

	static scale_s(s) {
		return Matrix_j.scale(s, s, s);
	}

	static rotateX(theta) {
		return Matrix_j.rotate(theta, 1, 0, 0);
	}

	static rotateY(theta) {
		return Matrix_j.rotate(theta, 0, 1, 0);
	}

	static rotateZ(theta) {
		return Matrix_j.rotate(theta, 0, 0, 1);
	}

	static rotate(theta, x, y, z) {
		var norm = Math.sqrt((x*x) + (y*y) + (z*z));
		var ux = x/norm;
		var uy = y/norm;
		var uz = z/norm;

		var c = Math.cos( (Math.PI/180.0) * theta );
		var s = Math.sin( (Math.PI/180.0) * theta );

		return Matrix_j.build(
		    new Vector(ux*ux*(1-c)+c,      uy*ux*(1-c)+(uz*s), uz*ux*(1-c)-(uy*s), 0.0),
		    new Vector(ux*uy*(1-c)-(uz*s), uy*uy*(1-c)+c,      uz*uy*(1-c)+(ux*s), 0.0),
		    new Vector(ux*uz*(1-c)+(uy*s), uy*uz*(1-c)-(ux*s), uz*uz*(1-c)+c,      0.0),
		    new Vector(0.0,                0.0,                0.0,                1.0));
	}

	times_s(s) {
		return Matrix_j.build(this.v1.times(s), this.v2.times(s), this.v3.times(s), this.v4.times(s));
	}

	times_m(m) {
		return Matrix_j.build(this.times_v(m.v1), this.times_v(m.v2), this.times_v(m.v3), this.times_v(m.v4))
	}

	times_v(v) {
		return this.v1.times(v.x).plus(this.v2.times(v.y).plus(this.v3.times(v.z).plus(this.v4.times(v.w))));
	}

	times_vertex(v) {
		var sum = v1.times(v.x).plus(v2.times(v.y).plus(v3.times(v.z).plus(v4.times(v.w))));
		var temp = new Vertex(sum.x, sum.y, sum.z, sum.w);
		return temp;
	}
}

class Position {
	constructor(arg1) {
		if(arguments.length == 0) {
			this.model = null;
			this.modelMatrix = Matrix_j.identity();
		}
		else if(arg1 instanceof Model) {

			this.model = arg1;
			this.modelMatrix = Matrix_j.identity();

		}
		else if (arg1 instanceof Position) {
			if(null != arg1.model) {
			    this.model = new Model(arg1.model);
			}
			else {
				this.model = null;
			}
			this.modelMatrix = new Matrix_j(arg1.modelMatrix);
		}
	}

	matrix2Identity() {
		this.modelMatrix = Matrix_j.identity();
		return this;
	}

	matrixMult(m) {
		this.modelMatrix = this.modelMatrix.times_m(m);
		return this;
	}

	rotateX(theta) {
		this.matrixMult(Matrix_j.rotateX(theta));
		return this;
	}

	rotateY(theta) {
		this.matrixMult(Matrix_j.rotateY(theta));
		return this;
	}

	rotateZ(theta) {
		this.matrixMult(Matrix_j.rotateZ(theta));
		return this;
	}

	rotate(theta, x, y, z) {
		this.matrixMult( Matrix_j.rotate(theta, x, y, z));
		return this;
	}

	scale(x, y, z) {
		this.matrixMult( Matrix_j.scale(x, y, z) );
		return this;
	}

	scale_s(s) {
		this.matrixMult( Matrix_j.scale_s(s));
		return this;
	}

	translate(x, y, z) {
		this.matrixMult( Matrix_j.translate(x, y, z) );
		return this;
	}

}

class PerspectiveNormalizeMatrix {
	static build(l, r, b, t, near) {
		var m1 = Matrix_j.build(
               new Vector(    1.0,            0.0,        0.0, 0.0),
               new Vector(    0.0,            1.0,        0.0, 0.0),
               new Vector((r+l)/(2*near), (t+b)/(2*near), 1.0, 0.0),
               new Vector(    0.0,            0.0,        0.0, 1.0));

      	var m2 = Matrix_j.build(
               new Vector(2*near/(r-l),      0.0,     0.0, 0.0),
               new Vector(     0.0,     2*near/(t-b), 0.0, 0.0),
               new Vector(     0.0,          0.0,     1.0, 0.0),
               new Vector(     0.0,          0.0,     0.0, 1.0));

      	return m2.times_m(m1);
	}
}

class OrthographicNormalizeMatrix {
	static build(l, r, b, t) {
		var m1 = Matrix_j.build(
					new Vector(  1.0,      0.0,    0.0, 0.0),
					new Vector(  0.0,      1.0,    0.0, 0.0),
					new Vector(  0.0,      0.0,    1.0, 0.0),
					new Vector(-(r+1)/2, -(t+b)/2, 0.0, 1.0));

		var m2 = Matrix_j.build(
					new Vector(2/(r-1),     0.0,    0.0, 0.0),
					new Vector(   0.0,   2/(t-b),   0.0, 0.0),
					new Vector(   0.0,      0.0,    1.0, 0.0),
					new Vector(   0.0,      0.0,    0.0, 1.0));

		return m2.times_m(m1);
	}
}