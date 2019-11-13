function setup() {
  createCanvas(1700,1200);
  background(150);
  Node.placeNodes();
  console.log(Node.nodeArr);
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
