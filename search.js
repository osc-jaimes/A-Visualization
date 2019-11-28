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
    openList.enqueue(this.startNode);
    let closedList = new PriorityQueue();

    this.calculateGCost(this.map.getStartNode());
    this.calculateHCost(this.startNode);
    this.calculateFCost(this.startNode);

    let currentNode = this.startNode;
    let endFound = false;
    while(endFound == false){

      if(currentNode.isEndNode()){
        console.log("found");
        //search.construct_path(this.endNode);

        for(let i = 0; i < openList.items.length; i++){
          if(!openList.items[i].isStartNode()
        && !openList.items[i].isEndNode()){
            openList.items[i].colour = ('yellow');
            openList.items[i].show();
          }
        }


        endFound = true;
        break;
      }


        let children;

        children = this.map.getChildrenOf(currentNode);
        let diagChildren = this.map.getDiagonalChildrenOf(currentNode);
        if(search.allowDiagonals == true){
          for(let i = 0; i <diagChildren.length; i++ ){
            children.push(diagChildren[i]);
          }
        }

      for(let child = 0; child < children.length; child++){

        if(children[child].isBarrierNode()){
          children[child].setGCost(10000);
          children[child].setGCost(10000);
          this.calculateFCost(children[child]);
          console.log("hit barrier while searching");
        } else{
          if(!children[child].isStartNode() && !children[child].isEndNode()){
            children[child].colour = "cyan";
          }
          this.calculateGCost(children[child]);
          this.calculateHCost(children[child]);
          this.calculateFCost(children[child]);
        }
      }
      let lowestFNode = children[0];
      for(let i = 0; i < children.length; i++){
          if(children[i].getFCost() < lowestFNode.getFCost()
             && !openList.contains(children[i])){
            lowestFNode = children[i];
          }
      }
      openList.enqueue(lowestFNode);
      currentNode = lowestFNode;
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
