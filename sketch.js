function setup() {
  createCanvas(2200,1200);
  let c = color(168,167,117);
  background(c);
  Node.placeNodes();
  textSize(50);
  fill("black");
  text("A*  Path Finding \nVisualization", 50, 1000);
  textSize(30);


  fill("white");
  rect(1600, 210,500,500);
  textSize(30);
  fill("black");
  text("Minimum Spanning Tree: ",1670,200);

  //Diagonal choices;
  textSize(30);
  fill("black");
  text("Diagonal Choice: ", 1500,975);

  allowDiagButton = createButton("Allow Diagonals");
  allowDiagButton.position(1500,990);
  allowDiagButton.size(240,50);
  allowDiagButton.style('font-size', "25px");


  restrictDiagButton = createButton("Restrict Diagonals");
  restrictDiagButton.position(1500, 1070);
  restrictDiagButton.size(240,50);
  restrictDiagButton.style('font-size', "25px");

  //Heuristic Choice:
  textSize(30);
  fill("black");
  text("Heurisitc Function: ", 1160,975);

  //Heuristic Buttons:
  manhattanButton = createButton("Manhattan Heuristic");
  manhattanButton.position(1160,990);
  manhattanButton.size(240,50);
  manhattanButton.style('font-size', "25px");
  manhattanButton.mousePressed(manhattanFunction);

  euclideanButton = createButton("Euclidian Heuristic");
  euclideanButton.position(1160, 1070);
  euclideanButton.size(240,50);
  euclideanButton.style('font-size', "25px");
  euclideanButton.mousePressed(euclideanFunction);

  //start button
  startButton = createButton("Start Search");
  startButton.position(700,980);
  startButton.size(300,50);
  startButton.style('font-size', "25px");
  startButton.mousePressed(startSearch);

  //clear walls button
  clearWallsButton = createButton("Clear Walls")
  clearWallsButton.position(700,1080);
  clearWallsButton.size(300,50);
  clearWallsButton.style('font-size', "25px");
  clearWallsButton.mousePressed(clearWalls);
}

function manhattanFunction(){
  let col = color(255,255,102);
  manhattanButton.style('background-color',col);

  let col1 = color(200);
  euclideanButton.style('background-color', col1);
  search.manhattan = true;
  search.euclidian = false;
}

function euclideanFunction(){
  let col = color(255,255,102);
  euclideanButton.style('background-color',col);

  let col1 = color(200);
  manhattanButton.style('background-color', col1);
  search.euclidian = true;
  search.manhattan= false;
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
