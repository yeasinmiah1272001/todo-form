export interface Todo{
    _id:string;
    todo:string;
    name:string,
    number:string
}



export interface State{
    todo:{
      todoList:Todo[]
    }
  }