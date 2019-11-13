class Node{

  //array to hold all nodes in canvas
  static nodeArr = [];

  //x and y coordinates of start node and end node in the map
  static startNodeX;
  static startNodeY;
  static endNodeX;
  static endNodeY;

  //constructor for a given node
  constructor(xPos,yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.startNode = false;
    this.endNode = false;
    this.barrierNode = false;
    this.colour = 230;
  }

  //function to calculate mid-point of a given node
  midPoint(x,y){
    xMid = (x + (x+50)) / 2;
    yMid = (y + (y+50)) / 2;
    midCoords = [xMid, yMid];
    return midCoords;
  }


  //function to control what happens when a square in the canvas is clicked
  // left click: barrierNode - black
  //right click: normal node - white
  // 's' and left click: start node - green
  // 'e' and left click: end node - red
   clicked(x,y){
      if(mouseIsPressed && mouseButton === LEFT){
        let d = dist(x,y, (this.xPos + (this.xPos +50))/2, (this.yPos+(this.yPos +50))/2);
         if(d < 25){
          console.log("square at:" + this.xPos + "," +
           this.yPos + " clicked");
           this.colour = 'black';
           this.barrierNode = true;
           this.startNode = false;
           this.endNode = false;
         }
     }

     if(mouseIsPressed && mouseButton === RIGHT ){
       let d = dist(x,y, (this.xPos + (this.xPos +50))/2, (this.yPos+(this.yPos +50))/2);
        if(d < 25){
         console.log("square at:" + this.xPos + "," +
          this.yPos + " clicked");
          this.colour = 230;
          this.barrierNode = false;
          this.startNode = false;
          this.endNode = false;
        }
      }
      if(mouseIsPressed && mouseButton === LEFT && keyIsDown(83)){
        let d = dist(x,y, (this.xPos + (this.xPos +50))/2, (this.yPos+(this.yPos +50))/2);
         if(d < 25){
          console.log("square at:" + this.xPos + "," +
           this.yPos + " clicked");
           this.colour = 'green';
           this.startNode = true;
           this.barrierNode = false;
           this.endNode = false;
         }
       }

       if(mouseIsPressed && mouseButton === LEFT && keyIsDown(69)){
         let d = dist(x,y, (this.xPos + (this.xPos +50))/2, (this.yPos+(this.yPos +50))/2);
          if(d < 25){
           console.log("square at:" + this.xPos + "," +
            this.yPos + " clicked");
            this.colour = 'red';
            this.startNode = false;
            this.barrierNode = false;
            this.endNode = true;
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
            //n.show();
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
