function setup() {
  createCanvas(1900,1200);
  background(50, 55, 100);
  Node.placeNodes();
  textSize(50);
  fill(255);
  text("A*  Path Finding \nVisualization", 50, 1000);
  textSize(30);

  //start button
  startButton = createButton("Start Search");
  startButton.position(700,950);
  startButton.size(300,50);
  startButton.style('font-size', "25px");
  startButton.mousePressed(startSearch);

  //clear walls button
  clearWallsButton = createButton("Clear Walls")
  clearWallsButton.position(700,1050);
  clearWallsButton.size(300,50);
  clearWallsButton.style('font-size', "25px");
  clearWallsButton.mousePressed(clearWalls);
}

function clearWalls(){
  for(let i = 0; i < Node.nodeArr.length; i++){
      Node.nodeArr[i].clear();
    }
}

//start the visualization of the A* path finding algorithm.
function startSearch(){
  let m = new Map(Node.nodeArr, 30, 18);
  let start = m.getStartNode();
  let end = m.getEndNode();
  console.log(start);
  console.log(end);
  let s = new search(m, start, end);
  let f = s.findPath();
  //console.log(f)

  //console.log(s.map);
}

//draws the nodes on to the canvas
function drawNodes(){
  for(let i = 0; i < Node.nodeArr.length; i++){
    Node.nodeArr[i].show();
  }
}

//checks for mouse presses on nodes
function mousePressed(){
  for(let i = 0; i < Node.nodeArr.length; i++){
    Node.nodeArr[i].clicked(mouseX, mouseY);
  }
}

function draw() {
  drawNodes();
}
