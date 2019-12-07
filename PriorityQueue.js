/**
Class to represent a min priority queue.
*/
class PriorityQueue{

  constructor(){
    this.items = [];
  }

  //Returns true if the list contains the node
  contains(node){
    let contains = false;
    for(let i = 0; i < this.items.length; i++){
      if(this.items[i].getXPos() == node.getXPos() &&
         this.items[i].getYPos() == node.getYPos()){
           contains = true;
         }
    }

    return contains;
  }

  ///adds a node into the list in its correct position
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

  //removes the first node in the list. (Minimum element)
  dequeue(){
    if(this.isEmpty()){
      return "underflow";
    }
    return this.items.shift();
  }

  //returns but does not delete the minimum node
  front(){
    if(this.isEmpty()){
      return "No Elements in Queue";
    }
    return this.items[0];
  }

  //Returns the last element in the heap but does not delete it fron the list.
  rear(){
    if(this.isEmpty()){
      return "No Elements in Queue";
    }
    return this.items[this.items.length - 1];
  }

  //returns true if the list is empty. False otherwise
  isEmpty(){
    return this.items.length == 0;
  }

  //Visual representation of the min priority queue.
  printQueue(){
    var str = "";
   for (var i = 0; i < this.items.length; i++)
       str += this.items[i].element + " ";
   return str;
  }
}
