class search{
  static manhattan = false;
  static euclidian = false;
  static allowDiagonals = false;

  constructor(map, startNode, endNode){
    this.map = map;
    this.startNode = startNode;
    this.endNode = endNode;

  }

  findPath(){
    let openList = new PriorityQueue();
    let closedList = new PriorityQueue();

    let thePathList= [];
    openList.enqueue(this.startNode);

    let endFound = false;

    while(!endFound){
      let currentNode = openList.front();
        openList.dequeue();
        closedList.enqueue(currentNode);


        if(currentNode.isEndNode()){    
          while(!currentNode.getParent().isStartNode()){
            currentNode.getParent().colour = "yellow";
            currentNode = currentNode.getParent();
          }
          endFound = true;
          break;
        }

        let currentChildren = this.map.getChildrenOf(currentNode);

        //check for diagonal children, if allowed
        if(search.allowDiagonals){
          let diagChildren = this.map.getDiagonalChildrenOf(currentNode);
          for(let i = 0; i < diagChildren.length; i++){
            currentChildren.push(diagChildren[i]);
          }
        }

        for(let child = 0; child < currentChildren.length; child++){
          if(closedList.contains(currentChildren[child])){
            continue;
            break;
          }



          if(currentChildren[child].isBarrierNode()){
            currentChildren[child].setGCost(10000);
            currentChildren[child]. setHCost(10000);
            currentChildren[child].setFCost(20000);
            continue;
          }




          this.calculateHCost(currentChildren[child]);
          this.calculateGCost(currentChildren[child]);
          this.calculateFCost(currentChildren[child]);


          if(closedList.contains(currentChildren[child])){
            continue;
          }else{
            let possibleG = currentNode.getGCost() + dist(currentNode.getXPos(), currentNode.getYPos(),
            currentChildren[child].getXPos(), currentChildren[child].getYPos());
            let possibleGBetter = false;

            if(!openList.contains(currentChildren[child])){
              openList.enqueue(currentChildren[child]);
              possibleGBetter = true;
              this.calculateHCost(currentChildren[child]);
              if(!currentChildren[child].isEndNode()){
                currentChildren[child].colour = "cyan";
              }

            } else if(possibleG < currentChildren[child].getGCost()){
              possibleGBetter = true;
            }

            if(possibleGBetter == true){
              currentChildren[child].setParent(currentNode);
              this.calculateHCost(currentChildren[child]);
              this.calculateGCost(currentChildren[child]);
              this.calculateFCost(currentChildren[child]);
            }
          }

        }
    }
  }//findPath()

  //calculates h(x) for every node in the graph and assigns it to the node
  //manhattan heuristic.
  calculateHCost(node){

    if(search.manhattan == true){
      let h = Math.abs(node.getXPos() - Node.endNodeX) + Math.abs(node.getYPos() - Node.endNodeY);
      node.setHCost(h);
    }

    if(search.euclidian == true){
      let dx = Math.abs(node.getXPos() - Node.endNodeX);
      let dy = Math.abs(node.getYPos() - Node.endNodeY);

      let h =  Math.sqrt(dx * dx + dy * dy);
      node.setHCost(h);
    }
  }

  //calculates g(x) for every node
  calculateGCost(node){
    let g1 = Math.pow(Math.abs(Node.startNodeX - node.getXPos()),2);
    let g2 = Math.pow(Math.abs(Node.startNodeY - node.getYPos()),2);  ;
    let gFinal = Math.sqrt((g1+g2));
    node.setGCost(gFinal);
  }

  //calculates f(x) for node
  calculateFCost(node){
    node.setFCost(node.getGCost() + node.getHCost());
  }

}
