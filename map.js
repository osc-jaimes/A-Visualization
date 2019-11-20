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

  isNodeBarrier(x,y){
    return this.mapArray[x/50][y/50].isBarrierNode();
  }

  isNodeEndNode(x,y){
    return this.mapArray[x/50][y/50].isEndNode();
  }

  getStartNode(){
    return this.mapArray[Node.startNodeX/50][Node.startNodeY/50];
  }

  getEndNode(){
    return this.mapArray[Node.endNodeX/50][Node.endNodeY/50];
  }

  getChildrenOf(node){
    if(node.getXPos() == 0 && node.getYPos() == 0){
      this.mapArray[0][1].setParent(node);
      this.mapArray[1][0].setParent(node);

      return [this.mapArray[0][1], this.mapArray[1][0]];
    }

    if(node.getXPos() == 0 && node.getYPos() == 850 ){
      this.mapArray[0][16].setParent(node);
      this.mapArray[1][17].setParent(node);

      return [this.mapArray[0][16], this.mapArray[1][17]];
    }

    if(node.getXPos() == 1450 && node.getYPos() == 0){
      this.mapArray[28][0].setParent(node);
      this.mapArray[29][1].setParent(node);
      return [this.mapArray[28][0], this.mapArray[29][1]];
    }

    if(node.getXPos() == 1450 && node.getYPos() == 850){
      return [this.mapArray[29][16], this.mapArray[28][17]];
    }

    //xpos is 0 and y is anything else
    if(node.getXPos() == 0){
      return [
              this.mapArray[node.getXPos()/50][(node.getYPos() - 50)/50],
              this.mapArray[node.getXPos()/50][(node.getYPos() +50)/50],
              this.mapArray[(node.getXPos() + 50)/50][node.getYPos()/50]
             ];
    }
    //xPos is 1450 and y is anything else
    if(node.getXPos() == 1450){
      return [
              this.mapArray[node.getXPos()/50][(node.getYPos() - 50)/50],
              this.mapArray[node.getxPos()/50][(node.getYPos() + 50)/50],
              this.mapArray[(node.getXPos() - 50) / 50][node.getYPos()/50]
             ];
    }
    //ypos 850 and x is anything else
    if(node.getYPos() == 850){
      return [
              this.mapArray[(node.getXPos() - 50)/50][node.getYPos()/50],
              this.mapArray[(node.getXPos() + 50)/50][node.getYPos()/50],
              this.mapArray[node.getXPos()/50][(node.getYPos()-50)/50]
             ];
    }
    //ypos is 0 and x is anything else
    if(node.getYPos() == 0){
      return [
              this.mapArray[(node.getXPos() - 50)/50][node.getYPos()/50],
              this.mapArray[(node.getXPos() + 50)/50][node.getYPos()/50],
              this.mapArray[node.getXPos()/50][(node.getYPos()+50)/50]
             ];
    }




    return [
           this.mapArray[node.getXPos()/50][(node.getYPos() + 50)/50],
           this.mapArray[node.getXPos()/50][(node.getYPos() - 50)/50],

           this.mapArray[(node.getXPos() + 50)/50][node.getYPos()/50],
           this.mapArray[(node.getXPos() - 50)/50][node.getYPos()/50]
           ];
  }


}
