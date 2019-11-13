class Node{

  //array to hold all nodes in canvas
  static nodeArr = [];

  //x and y coordinates of start node and end node in the map
  static startNodeX;
  static startNodeY;
  static endNodeX;
  static endNodeY;

  //variables to represent existence of start and end nodes
  static startNodeExists = false;
  static endNodeExists = false;

  //constructor for a given node
  constructor(xPos,yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.startNode = false;
    this.endNode = false;
    this.barrierNode = false;
    this.colour = 230;
  }

  getXPos(){
    return this.xPos;
  }

  getYPos(){
    return this.yPos;
  }

  //function to calculate mid-point of a given node
  midPoint(x,y){
    xMid = (x + (x+50)) / 2;
    yMid = (y + (y+50)) / 2;
    midCoords = [xMid, yMid];
    return midCoords;
  }

  static getSartNodePos(){
    return [Node.startNodeX, Node.startNodeY];
  }


  // function to control what happens when a square in the canvas is clicked
  // left click: barrierNode - black
  // right click: normal node - white
  // 's' and left click: start node - green
  // 'e' and left click: end node - red
   clicked(x,y){
      if(mouseIsPressed && mouseButton === LEFT){
        let d = dist(x,y, (this.xPos + (this.xPos +50))/2, (this.yPos+(this.yPos +50))/2);
         if(d < 25){
          console.log("square at:" + this.xPos + "," +
           this.yPos + " clicked");
           this.colour = (128,128,128);
           this.barrierNode = true;
           this.startNode = false;
           this.endNode = false;
         }
     }

     //clear node
     if(mouseIsPressed && mouseButton === RIGHT ){
       if(this.xPos == Node.startNodeX){
         Node.startNodeExists = false;
         Node.startNodeX = null;
         Node.startNodeY = null;
         this.startNode = false;
       }
       if(this.xPos == Node.endNodeX){
         Node.endNodeExists = false;
         Node.endNodeX = null;
         Node.endNodeY = null;
         this.endNode = false;
       }

       let d = dist(x,y, (this.xPos + (this.xPos +50))/2, (this.yPos+(this.yPos +50))/2);
        if(d < 25){
         console.log("square at:" + this.xPos + "," +
          this.yPos + " clicked");
          this.colour = (230);
          this.barrierNode = false;
          this.startNode = false;
          this.endNode = false;
        }
      }

      if(mouseIsPressed && mouseButton === LEFT && keyIsDown(83)){
        if(Node.startNodeExists == true){
          console.log("uh oh start node exists already")
          return null;
        }
        let d = dist(x,y, (this.xPos + (this.xPos +50))/2, (this.yPos+(this.yPos +50))/2);
         if(d < 25){
          console.log("square at:" + this.xPos + "," +
           this.yPos + " clicked");
           this.colour = 'green';
           this.startNode = true;
           this.barrierNode = false;
           this.endNode = false;
           Node.startNodeExists = true;
           Node.startNodeX = this.xPos;
           Node.startNodeY = this.yPos;
         }
       }

       if(mouseIsPressed && mouseButton === LEFT && keyIsDown(69)){
         if(Node.endNodeExists){
           return;
         }
         let d = dist(x,y, (this.xPos + (this.xPos +50))/2, (this.yPos+(this.yPos +50))/2);
          if(d < 25){
           console.log("square at:" + this.xPos + "," +
            this.yPos + " clicked");
            this.colour = 'red';
            this.startNode = false;
            this.barrierNode = false;
            this.endNode = true;
            Node.endNodeExists = true;
            Node.endNodeX = this.xPos;
            Node.endNodeY = this.yPos;
          }
        }
     }

//function that places nodes on the canvas
  static placeNodes(){
    var counter = 0;
    for(let i = 0; i < 1500; i++){
      for(let j = 0; j < 900; j++){
          if(i % 50 == 0 && j % 50 == 0){
            let n = new Node(i,j);
            Node.nodeArr.push(n);
            counter++;
        }
      }
    }
  }
  //shows the nodes as squares on the canvas
  show(){
    fill(this.colour);
    square(this.xPos, this.yPos, 50);
  }
}
