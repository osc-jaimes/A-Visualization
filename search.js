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
        thePathList.push(currentNode);

        if(currentNode.isEndNode()){
          console.log("found");
          console.log(closedList.items);
          console.log(closedList.items.length);

          this.calculateHCost(this.startNode);
          this.calculateGCost(this.endNode);
          let distance = (this.startNode.getHCost() + this.endNode.getGCost())/50;
          console.log(distance);
          console.log(closedList.items.length);
          for(let i = 1; i < closedList.items.length; i++){
            if(!closedList.items[i].isEndNode()){
              closedList.items[i].colour = "yellow";
              closedList.items[i].show();
            }
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
          }

          if(currentChildren[child].isBarrierNode()){
            currentChildren[child].setGCost(10000);
            currentChildren[child]. setHCost(10000);
            currentChildren[child].setFCost(20000);
            continue;
          }

          this.calculateGCost(currentChildren[child]);
          this.calculateHCost(currentChildren[child]);
          this.calculateFCost(currentChildren[child]);

          if(openList.contains(currentChildren[child])){
            if(currentChildren[child].getGCost() > currentNode.getGCost()){
              continue;
            }
          }

          openList.enqueue(currentChildren[child]);
          if(!currentChildren[child].isEndNode()){
            currentChildren[child].colour = "cyan";
            currentChildren[child].show();
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
