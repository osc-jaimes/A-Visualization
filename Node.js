class Node{
  constructor(xPos,yPos){
    this.xPos = xPos;
    this.yPos = yPos;
  }

  getXPos(){
    return this.xPos;
  }

  getYPos(){
    return this.yPos;
  }


  static DistanceFrom(node1, node2){
    let xDistance = node2.xPos - node1.xPos;
    let yDistance = node2.yPos - node1.yPos;

    let distanceXY = {xDistance,yDistance};

    return distanceXY;
  }

  static create2DArray(rows) {
    var arr = [rows];

    for (var i=0;i<rows;i++) {
       arr[i] = [18];
    }

    return arr;
  }

  /**

  */
  static placeNodesOnBoard(){
    let nodeArr = Node.create2DArray(30);
    let counterForRow = 0;
    let counterForCol = 0;
    for(let i = 0; i < width; i += 50){
      for(let j = 0; j < height; j+= 50){

        if(i % 50 == 0 && j % 50 == 0){
          square(i,j,50);
          fill(230);
          nodeArr[counterForRow][counterForCol] = new Node(i,j);
          counterForCol++;
        }
    }
    counterForRow++;
    }
  }

}
