class search{

  constructor(map, startNode, endNode){
    this.map = map;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  findPath(){
    let openList = new PriorityQueue();
    openList.enqueue(this.startNode);
    let closedList = new PriorityQueue();

    this.calculateGCost(this.startNode);
    this.calculateHCost(this.startNode);
    this.calculateFCost(this.startNode);

    while(!openList.isEmpty()){
      let currentNode = openList.items[0];
      if(currentNode.isEndNode()){
        return construct_path(currentNode);
      }
      closedList.enqueue(openList.dequeue());
      let neighbours = this.map.getChildrenOf(currentNode);
      for(let i = 0; i < neighbours.lenght();i++){
        currentNeighbour = neighbours[i];
        if(!closedList.contains(currentNeighbour)){
          this.calculateGCost(currentNeighbour);
          this.calculateHCost(currentNeighbour);
          this.calculateFCost(currentNeighbour);

          if(!openList.contains(currentNeighbour)){
            openList.enqueue(currentNeighbour);
          }else{
            let openNeighbour = currentNeighbour;
          }
        }
      }
    }
  }

  construct_path(node){
    let path = this.openList.items;
    while(node.getParent() != null){
      node = node.getParent();
    }
  }


  //calculates h(x) for every node in the graph and assigns it to the node
  //manhattan heuristic.
  calculateHCost(node){
    let h = Math.abs(node.getXPos() - Node.endNodeX) + Math.abs(node.getYPos() - Node.endNodeY);
    node.setHCost(h);
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
