class Search{

  constructor(map, startNode, endNode){
    this.map = map;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  findPath(){
    openList = new PriorityQueue();
    openList.enqueue(this.startNode);
    closedList = new PriorityQueue();

    this.calculateGCost(this.startNode);
    this.calculateHCost(this.startNode);
    this.calculateFCost(this.startNode);

    while(!openList.isEmpty()){
      let currentNode = openList.items[0];
      if(currentNode.isEndNode()){
        return construct_path();
      }
    }


  }

  construct_path(){
    

  }


  //calculates h(x) for every node in the graph and assigns it to the node
  //manhattan heuristic.
  calculateHCost(node){
    h = Math.abs(node.getXPos() - Node.EndNodeX) + Math.abs(node.getYPos() - Node.EndNodeY);
    node.setHCost(h);
  }

  //calculates g(x) for every node
  calculateGCost(node){
    g1 = Math.pow(Math.abs(Node.startNodeX - node.getXPos()),2);
    g2 = Math.pow(Math.abs(Node.startNodeY - node.getYPos()),2);  ;
    gFinal = Math.sqrt((g1+g2));
    node.setGCost(gFinal);
  }

  //calculates f(x) for node
  calculateFCost(node){
    node.setFCost(node.getGCost() + node.getHCost());
  }





}
