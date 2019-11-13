class Map{

  constructor(nodeArr, mapWidth, mapHeight){
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.mapArray = new Array(this.mapWidth);
    //create a 2dimensional array to represent the map.
    for(let i = 0; i < this.mapArray.length; i++){
      this.mapArray[i] = new Array(this.mapHeight);
    }

    let nodeArrCounter = 0;
    for(let i = 0; i < this.mapArray.length; i++){
      for(let j = 0; j < this.mapArray[i].length; j++){
        this.mapArray[i][j] = nodeArr[nodeArrCounter];
        nodeArrCounter++;
      }
    }

  }

  static distanceOfNodes(node1, node2){
    d = dist(node1.getXPos(), node1.getYPos(), node2.getXPos(), node1.getYPos());
    return d;
  }

}
