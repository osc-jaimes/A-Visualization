class PriorityQueue{

  constructor(){
    this.items = [];
  }

  contains(node){
    let contains = false;
    for(let i = 0; i < this.items.length; i++){
      if(this.items[i].getXPoS() == node.getXPos() &&
         this.items[i].getYPos() == node.getYPos()){
           contains = true;
         }
    }

    return contains;
  }

  enqueue(node, fCost){
    var contain = false;

    for(var i = 0; i < this.items.length; i++){
      if(this.items[i].getFCost() > node.getFCost()){
        this.items.splice(i, 0, node);
        contain = true;
        break;
      }
    }

    if(!contain){
      this.items.push(node);
    }
  }

  dequeue(){
    if(this.isEmpty()){
      return "underflow";
    }
    return this.items.shift();
  }

  front(){
    if(this.isEmpty()){
      return "No Elements in Queue";
    }
    return this.items[0];
  }

  rear(){
    if(this.isEmpty()){
      return "No Elements in Queue";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(){
    return this.items.length == 0;
  }

  printQueue(){
    var str = "";
   for (var i = 0; i < this.items.length; i++)
       str += this.items[i].element + " ";
   return str;
  }
}
