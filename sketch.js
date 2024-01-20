var h = 0.1;
var g = 0.0495;
var t = 0;
var m = [1,1,1];
var l = [1,1,1];
var tau = [0,0,0];
// var u = [1,1.5,1.75,0,0,0];
var u = [0,0,0,0,0,0];
var lenScalar = 100;
let buffer;
var prev;
function setup() {
  createCanvas(windowWidth,windowHeight);
  lenScalar = (min(width,height) - 50) / (2 * m.length);
  buffer = createGraphics(width, height);
  buffer.background(0);
  buffer.translate(width/2,height/2);
}

function draw() {
  strokeWeight(2);
  stroke(144, 202, 249);
  fill(144, 202, 249);
  background(0);
  translate(0,0);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);
  translate(width/2,height/2);
  var S = applyS();
  u = myadd(u,mymult(S,h));
  var pos = [createVector(0,0)];
  for(var i = 1; i <= 3; i++) {
    pos[i] = pos[i-1].copy();
    pos[i].add(createVector(l[i-1]*cos(u[i-1]),-l[i-1]*sin(u[i-1])));
  }
  
  for(i = 1; i <= 3; i++) {
    line(lenScalar*pos[i-1].x,lenScalar*pos[i-1].y,lenScalar*pos[i].x,lenScalar*pos[i].y);
  }
  
  for(i = 1; i <= 3; i++) {
    circle(lenScalar*pos[i].x,lenScalar*pos[i].y,10);
  }
  
  colorMode(RGB);
  buffer.stroke(144, 202, 249, 100);
  if (frameCount > 1) {
    buffer.line(lenScalar*prev.x, lenScalar*prev.y, lenScalar*pos[pos.length-1].x, lenScalar*pos[pos.length-1].y);
    }
  prev = pos[pos.length-1].copy();  
}

function myadd(arr1, arr2) {
  if(arr1.length != arr2.length) return;
  for(var i = 0; i < arr1.length; i++) {
    arr1[i] += arr2[i];
  }
  return arr1;
}

function mymult(arr,coef) {
  for(var i = 0; i < arr.length; i++) {
    arr[i] *= coef;
  }
  return arr;
}

function M(x,N,m){
	s = 0
	for (var i = x; i < N+1; i++) {
		s += m[i-1];
    }
	return s
}

function delta(p,n,m) {
	return M(n,m.length,m) / M(p,m.length,m);
}

function applyS() {
  return [u[3],u[4],u[5],(-cos(u[0])*cos(u[1]-u[2])**2*delta(2,3,m)*g + cos(u[0])*g - cos(u[0]-u[1])*cos(u[1])*delta(1,2,m)*g + cos(u[0]-u[1])*cos(u[1]-u[2])*cos(u[2])*delta(1,2,m)*delta(2,3,m)*g - cos(u[0]-u[1])*cos(u[1]-u[2])*delta(1,2,m)*delta(2,3,m)*l[0]*sin(u[0]-u[2])*u[3]**2 - cos(u[0]-u[1])*cos(u[1]-u[2])*delta(1,2,m)*delta(2,3,m)*l[1]*sin(u[1]-u[2])*u[4]**2 - cos(u[0]-u[1])*cos(u[1]-u[2])*delta(1,2,m)*delta(2,3,m)*tau[2]/(M(3,3,m)*l[2]) - cos(u[0]-u[1])*delta(1,2,m)*delta(2,3,m)*l[2]*sin(u[1]-u[2])*u[5]**2 + cos(u[0]-u[1])*delta(1,2,m)*l[0]*sin(u[0]-u[1])*u[3]**2 + cos(u[0]-u[1])*delta(1,2,m)*tau[1]/(M(2,3,m)*l[1]) + cos(u[0]-u[2])*cos(u[1])*cos(u[1]-u[2])*delta(1,3,m)*g + cos(u[0]-u[2])*cos(u[1]-u[2])*delta(1,3,m)*delta(2,3,m)*l[2]*sin(u[1]-u[2])*u[5]**2 - cos(u[0]-u[2])*cos(u[1]-u[2])*delta(1,3,m)*l[0]*sin(u[0]-u[1])*u[3]**2 - cos(u[0]-u[2])*cos(u[1]-u[2])*delta(1,3,m)*tau[1]/(M(2,3,m)*l[1]) - cos(u[0]-u[2])*cos(u[2])*delta(1,3,m)*g + cos(u[0]-u[2])*delta(1,3,m)*l[0]*sin(u[0]-u[2])*u[3]**2 + cos(u[0]-u[2])*delta(1,3,m)*l[1]*sin(u[1]-u[2])*u[4]**2 + cos(u[0]-u[2])*delta(1,3,m)*tau[2]/(M(3,3,m)*l[2]) - cos(u[1]-u[2])**2*delta(1,2,m)*delta(2,3,m)*l[1]*sin(u[0]-u[1])*u[4]**2 - cos(u[1]-u[2])**2*delta(1,3,m)*delta(2,3,m)*l[2]*sin(u[0]-u[2])*u[5]**2 + cos(u[1]-u[2])**2*delta(2,3,m)*tau[0]/(M(1,3,m)*l[0]) + delta(1,2,m)*l[1]*sin(u[0]-u[1])*u[4]**2 + delta(1,3,m)*l[2]*sin(u[0]-u[2])*u[5]**2 - tau[0]/(M(1,3,m)*l[0]))/(l[0]*(cos(u[0]-u[1])**2*delta(1,2,m) - cos(u[0]-u[1])*cos(u[0]-u[2])*cos(u[1]-u[2])*delta(1,2,m)*delta(2,3,m) - cos(u[0]-u[1])*cos(u[0]-u[2])*cos(u[1]-u[2])*delta(1,3,m) + cos(u[0]-u[2])**2*delta(1,3,m) + cos(u[1]-u[2])**2*delta(2,3,m) - 1)),(-((cos(u[0]-u[1])**2*delta(1,2,m) - 1)*(cos(u[0]-u[2])**2*delta(1,3,m) - 1) - (cos(u[0]-u[1])*cos(u[0]-u[2])*delta(1,2,m) - cos(u[1]-u[2]))*(cos(u[0]-u[1])*cos(u[0]-u[2])*delta(1,3,m) - cos(u[1]-u[2])*delta(2,3,m)))*(cos(u[0]-u[1])*(cos(u[0])*g + delta(1,2,m)*l[1]*sin(u[0]-u[1])*u[4]**2 + delta(1,3,m)*l[2]*sin(u[0]-u[2])*u[5]**2 - tau[0]/(M(1,3,m)*l[0])) - cos(u[1])*g - delta(2,3,m)*l[2]*sin(u[1]-u[2])*u[5]**2 + l[0]*sin(u[0]-u[1])*u[3]**2 + tau[1]/(M(2,3,m)*l[1])) + ((cos(u[0]-u[1])**2*delta(1,2,m) - 1)*(cos(u[0]-u[2])*(cos(u[0])*g + delta(1,2,m)*l[1]*sin(u[0]-u[1])*u[4]**2 + delta(1,3,m)*l[2]*sin(u[0]-u[2])*u[5]**2 - tau[0]/(M(1,3,m)*l[0])) - cos(u[2])*g + l[0]*sin(u[0]-u[2])*u[3]**2 + l[1]*sin(u[1]-u[2])*u[4]**2 + tau[2]/(M(3,3,m)*l[2])) - (cos(u[0]-u[1])*cos(u[0]-u[2])*delta(1,2,m) - cos(u[1]-u[2]))*(cos(u[0]-u[1])*(cos(u[0])*g + delta(1,2,m)*l[1]*sin(u[0]-u[1])*u[4]**2 + delta(1,3,m)*l[2]*sin(u[0]-u[2])*u[5]**2 - tau[0]/(M(1,3,m)*l[0])) - cos(u[1])*g - delta(2,3,m)*l[2]*sin(u[1]-u[2])*u[5]**2 + l[0]*sin(u[0]-u[1])*u[3]**2 + tau[1]/(M(2,3,m)*l[1])))*(cos(u[0]-u[1])*cos(u[0]-u[2])*delta(1,3,m) - cos(u[1]-u[2])*delta(2,3,m)))/(l[1]*(cos(u[0]-u[1])**2*delta(1,2,m) - 1)*((cos(u[0]-u[1])**2*delta(1,2,m) - 1)*(cos(u[0]-u[2])**2*delta(1,3,m) - 1) - (cos(u[0]-u[1])*cos(u[0]-u[2])*delta(1,2,m) - cos(u[1]-u[2]))*(cos(u[0]-u[1])*cos(u[0]-u[2])*delta(1,3,m) - cos(u[1]-u[2])*delta(2,3,m)))),(-(cos(u[0]-u[1])**2*delta(1,2,m) - 1)*(cos(u[0]-u[2])*(cos(u[0])*g + delta(1,2,m)*l[1]*sin(u[0]-u[1])*u[4]**2 + delta(1,3,m)*l[2]*sin(u[0]-u[2])*u[5]**2 - tau[0]/(M(1,3,m)*l[0])) - cos(u[2])*g + l[0]*sin(u[0]-u[2])*u[3]**2 + l[1]*sin(u[1]-u[2])*u[4]**2 + tau[2]/(M(3,3,m)*l[2])) + (cos(u[0]-u[1])*cos(u[0]-u[2])*delta(1,2,m) - cos(u[1]-u[2]))*(cos(u[0]-u[1])*(cos(u[0])*g + delta(1,2,m)*l[1]*sin(u[0]-u[1])*u[4]**2 + delta(1,3,m)*l[2]*sin(u[0]-u[2])*u[5]**2 - tau[0]/(M(1,3,m)*l[0])) - cos(u[1])*g - delta(2,3,m)*l[2]*sin(u[1]-u[2])*u[5]**2 + l[0]*sin(u[0]-u[1])*u[3]**2 + tau[1]/(M(2,3,m)*l[1])))/(l[2]*((cos(u[0]-u[1])**2*delta(1,2,m) - 1)*(cos(u[0]-u[2])**2*delta(1,3,m) - 1) - (cos(u[0]-u[1])*cos(u[0]-u[2])*delta(1,2,m) - cos(u[1]-u[2]))*(cos(u[0]-u[1])*cos(u[0]-u[2])*delta(1,3,m) - cos(u[1]-u[2])*delta(2,3,m))))];
}
