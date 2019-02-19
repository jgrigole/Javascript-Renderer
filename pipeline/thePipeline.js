// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

var render = function(scene, cn) {
	if (typeof scene === "undefined") {
	    alert("something is undefined");
	}

	// Render every Model in the Scene.
	for(var i = 0; i < scene.positionList.length; i++) {
		var position = scene.positionList[i];

		if( position.model.visible ) {
			// 0. Make a deep copy of the model.
			var model2 = new Model(position.model);

			// 1. Apply the Position's model-to-view coordinate transformation.
			model2view(model2.vertexList, position.modelMatrix);

			// 2. Apply the normalizing view-to-camera coordinate transformation.
			view2camera(model2.vertexList, scene.camera);

			// 3. Apply the projection transformation.
			project(model2.vertexList, scene.camera);

			//4. viewport
			viewport(model2.vertexList, cn);

			// 5. Rasterize each visible line segment into pixels.
            for(var j = 0; j < model2.lineSegmentList.length; j++) {
				var ls = model2.lineSegmentList[j];
				rasterize(model2, ls, cn);
			}
		}
	}
};

var model2view = function(vertexList, modelMatrix) {
	for(var i = 0; i < vertexList.length; i++) {
		vertexList[i].times(modelMatrix);
/*		console.log("model2view step")
		console.log("vertexList[" + i + "].x: " + vertexList[i].x);
		console.log("vertexList[" + i + "].y: " + vertexList[i].y);
		console.log("vertexList[" + i + "].z: " + vertexList[i].z);
		console.log("vertexList[" + i + "].w: " + vertexList[i].w);
		*/
	}
};

var view2camera = function(vertexList, camera) {
	var normalizeMatrix = camera.normalizeMatrix;
/*	console.log("nomalize matrix")
	console.log(parseFloat(normalizeMatrix.v1.x).toFixed(3) + " " + parseFloat(normalizeMatrix.v2.x).toFixed(3) + " " + parseFloat(normalizeMatrix.v3.x).toFixed(3) + " " + parseFloat(normalizeMatrix.v4.x).toFixed(3) + " | ");
	console.log(parseFloat(normalizeMatrix.v1.y).toFixed(3) + " " + parseFloat(normalizeMatrix.v2.y).toFixed(3) + " " + parseFloat(normalizeMatrix.v3.y).toFixed(3) + " " + parseFloat(normalizeMatrix.v4.y).toFixed(3) + " | ");
	console.log(parseFloat(normalizeMatrix.v1.z).toFixed(3) + " " + parseFloat(normalizeMatrix.v2.z).toFixed(3) + " " + parseFloat(normalizeMatrix.v3.z).toFixed(3) + " " + parseFloat(normalizeMatrix.v4.z).toFixed(3) + " | ");
	console.log(parseFloat(normalizeMatrix.v1.w).toFixed(3) + " " + parseFloat(normalizeMatrix.v2.w).toFixed(3) + " " + parseFloat(normalizeMatrix.v3.w).toFixed(3) + " " + parseFloat(normalizeMatrix.v4.w).toFixed(3) + " | ");
*/
	for(var i = 0; i < vertexList.length; i++) {
		vertexList[i].times(normalizeMatrix);
/*		console.log("view2camera step")
		console.log("vertexList[" + i + "].x: " + vertexList[i].x);
		console.log("vertexList[" + i + "].y: " + vertexList[i].y);
		console.log("vertexList[" + i + "].z: " + vertexList[i].z);
		console.log("vertexList[" + i + "].w: " + vertexList[i].w);
		*/
	}
};

var project = function(vertexList, camera) {
	for(var i = 0; i < vertexList.length; i++) {
		var v = vertexList[i];
		if(camera.perspective) {

			// Calculate the perspective projection.
			v.x = v.x / -v.z;  // xp = xc / -zc
			v.y = v.y / -v.z;  // yp = yc / -zc
			v.z = -1;          // zp = -1

/*			console.log("project stage");
			console.log("v.x: " + v.x);
			console.log("v.y: " + v.y);
			console.log("v.z: " + v.z);
			*/
		} else {
			// Calculate the parallel projection.
			// xp = xc
			// yp = yc
            v.z = 0; // zp = 0
		}
	}
};

var viewport = function(vertexList, cn) {
	var w = cn.width;
	var h = cn.height;



	for(var i = 0; i < vertexList.length; i++) {
	//for (Vertex v : vertexList)
		var v = vertexList[i];
		v.x = 0.5 + w/2.001 * (v.x + 1); // x_vp = 0.5 + w/2 * (x_p+1)
		v.y = 0.5 + h/2.001 * (v.y + 1); // y_vp = 0.5 + h/2 * (y_p+1)
    }
};

//only move and then lineto
var rasterize = function(model, ls, cn) {

	var ctx = cn.getContext("2d");

	//not sure how to implement colors
	//var c = 0x0000ff;
	ctx.strokeStyle= "#ff00c0";

	// Make local copies of several values.
    var w = cn.width;
    var h = cn.height;

    var v0 = model.vertexList[ ls.index[0] ];
    var v1 = model.vertexList[ ls.index[1] ];

    var c0 = model.colorList[ ls.cindex[0] ];
    var c1 = model.colorList[ ls.cindex[1] ];

    var x0 = 0.5 + w/2.001 * (v0.x + 1);
    var y0 = 0.5 + h/2.001 * (v0.y + 1);
    var x1 = 0.5 + w/2.001 * (v1.x + 1);
    var y1 = 0.5 + h/2.001 * (v1.y + 1);

    // Round the line segment's two endpoints to the nearest
    // logical pixel. This makes the algorithm a lot simpler,
    // but it can cause a slight, but noticable, shift of the
    // line segment.
    x0 = Math.round(v0.x);
    y0 = Math.round(v0.y);
    x1 = Math.round(v1.x);
    y1 = Math.round(v1.y);

    var grd = ctx.createLinearGradient(x0, y0, x1, y1);
    grd.addColorStop(0, c0);
	grd.addColorStop(1, c1);
	ctx.strokeStyle = grd;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();

};
