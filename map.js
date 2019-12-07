//Class to represent the graph of nodes
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
      for(let j = 0; j < 18; j++){
        this.mapArray[i][j] = nodeArr[nodeArrCounter];
        nodeArrCounter++;
      }
    }

  }

  //returns the distance between node1 and node2
  static distanceOfNodes(node1, node2){
    d = dist(node1.getXPos(), node1.getYPos(), node2.getXPos(), node1.getYPos());
    return d;
  }

  //cheks if a node is a barrier node
  isNodeBarrier(x,y){
    return this.mapArray[x/50][y/50].isBarrierNode();
  }

  //checls if a node is the end node
  isNodeEndNode(x,y){
    return this.mapArray[x/50][y/50].isEndNode();
  }

  //returns the startnode of the map.
  getStartNode(){
    return this.mapArray[Node.startNodeX/50][Node.startNodeY/50];
  }

  //returns the end node of the map.
  getEndNode(){
    return this.mapArray[Node.endNodeX/50][Node.endNodeY/50];
  }

  //  Returns the best child of the node.
  getBestChild(node){
    let children = this.getChildrenOf(node);
    if(search.allowDiagonals){
      let diagChildren = this.getDiagonalChildrenOf(node);
      for(let i = 0; i < diagChildren.length; i++){
        children.push(diagChildren[i]);
      }
    }

    let bestChildrenList = new PriorityQueue();
    for(let i = 0; i < children.length; i++){
      bestChildrenList.enqueue(children[i], children[i].getFCost());
    }

    return bestChildrenList.front();
  }

  //gets vertical and horizontal children of the node.
  getChildrenOf(node){
    //top left
    if(node.getXPos() == 0 && node.getYPos() == 0){

      return [this.mapArray[0][1], this.mapArray[1][0]];
    }

    //bottom left
    if(node.getXPos() == 0 && node.getYPos() == 850 ){

      return [this.mapArray[0][16], this.mapArray[1][17]];
    }

    //top right
    if(node.getXPos() == 1450 && node.getYPos() == 0){
      return [this.mapArray[28][0], this.mapArray[29][1]];
    }

    //bottom right
    if(node.getXPos() == 1450 && node.getYPos() == 850){
      return [this.mapArray[29][16], this.mapArray[28][17]];
    }

    //along left
    if(node.getXPos() == 0){
      return [
              this.mapArray[node.getXPos()/50][(node.getYPos() - 50)/50],
              this.mapArray[node.getXPos()/50][(node.getYPos() +50)/50],
              this.mapArray[(node.getXPos() + 50)/50][node.getYPos()/50]
             ];
    }
    //along right
    if(node.getXPos() == 1450){
      return [
              this.mapArray[node.getXPos()/50][(node.getYPos() - 50)/50],
              this.mapArray[node.getXPos()/50][(node.getYPos() + 50)/50],
              this.mapArray[(node.getXPos() - 50) / 50][node.getYPos()/50]
             ];
    }
    //along bottom
    if(node.getYPos() == 850){
      return [
              this.mapArray[(node.getXPos() - 50)/50][node.getYPos()/50],
              this.mapArray[(node.getXPos() + 50)/50][node.getYPos()/50],
              this.mapArray[node.getXPos()/50][(node.getYPos()-50)/50]
             ];
    }
    //along top
    if(node.getYPos() == 0){
      return [
              this.mapArray[(node.getXPos() - 50)/50][node.getYPos()/50],
              this.mapArray[(node.getXPos() + 50)/50][node.getYPos()/50],
              this.mapArray[node.getXPos()/50][(node.getYPos()+50)/50]
             ];
    }


    //general
    return [
           this.mapArray[node.getXPos()/50][(node.getYPos() + 50)/50],
           this.mapArray[node.getXPos()/50][(node.getYPos() - 50)/50],

           this.mapArray[(node.getXPos() + 50)/50][node.getYPos()/50],
           this.mapArray[(node.getXPos() - 50)/50][node.getYPos()/50]
           ];
  }


  //Returns the diagonal children of the node in an array.
  getDiagonalChildrenOf(node){
    //top left
    if(node.getXPos() == 0 && node.getYPos() == 0){
      return [
        this.mapArray[(node.getXPos() + 50)/50][(node.getYPos() + 50)/50]
      ];
    }

    //top right
    if(node.getXPos() == 1450 && node.getYPos() == 0){
      return [
        this.mapArray[(node.getXPos() - 50)/50][(node.getYPos() + 50)/50]
      ];
    }

    //bottom left
    if(node.getXPos() == 0 && node.getYPos() == 850){
      return[
        this.mapArray[(node.getXPos() + 50)/50][(node.getYPos() - 50)/50]
      ];
    }

    //bottom right
    if(node.getXPos() == 1450 && node.getYPos() == 850){
      return[
        this.mapArray[(node.getXPos() - 50)/50][(node.getYPos() - 50)/50]
      ];
    }

    //along left
    if(node.getXPos() == 0 && node.getYPos() != 0 && node.getYPos() != 850){
      return [
        this.mapArray[(node.getXPos() + 50)/50][(node.getYPos() - 50)/50],
        this.mapArray[(node.getXPos() + 50)/50][(node.getYPos() + 50)/50]
      ];
    }

    //along right

    if(node.getXPos() == 1450 && node.getYPos() != 0 && node.getYPos() != 850){
      return[
        this.mapArray[(node.getXPos() - 50)/50][(node.getYPos()+50) / 50],
        this.mapArray[(node.getXPos() - 50)/50][(node.getYPos() - 50)/50]
      ];
    }

    //along top
    if(node.getYPos() == 0 && node.getXPos() !=0 && node.getXPos() != 1450){
      return[
        this.mapArray[(node.getXPos() + 50)/50][(node.getYPos() + 50)/50],
        this.mapArray[(node.getXPos() - 50)/50][(node.getYPos() + 50)/50]
      ];
    }

    //along bottom
    if(node.getYPos() == 850 && node.getXPos() != 0 && node.getYPos() != 1450){
      return [
        this.mapArray[(node.getXPos() - 50)/50][(node.getYPos() - 50)/50],
        this.mapArray[(node.getXPos() + 50)/50][(node.getYPos() - 50)/50]
      ];
    }

    //general
    return[
      this.mapArray[(node.getXPos() + 50)/50][(node.getYPos() + 50)/50],
      this.mapArray[(node.getXPos() + 50)/50][(node.getYPos() - 50)/50],
      this.mapArray[(node.getXPos() - 50)/50][(node.getYPos() + 50)/50],
      this.mapArray[(node.getXPos() - 50)/50][(node.getYPos() - 50)/50],

    ];

  }


}
