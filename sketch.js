function setup() {
  createCanvas(1900,1200);
  background(50, 55, 100);
  Node.placeNodes();
  textSize(50);
  fill(255);
  text("A*  Path Finding \nVisualization", 50, 1000);
  textSize(30);

}

function mousePressed(){
  for(let i = 0; i < Node.nodeArr.length; i++){
    Node.nodeArr[i].clicked(mouseX, mouseY);
  }
}

function draw() {
  //console.log(mouseX, mouseY);
  for(let i = 0; i < Node.nodeArr.length; i++){
    Node.nodeArr[i].show();
  }

}
