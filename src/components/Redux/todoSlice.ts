import { createSlice } from '@reduxjs/toolkit'


const initialState ={
    todo:[]
}
export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo:(state, action)=>{
        // @ts-ignore
        state.todo.push(action.payload)
    },

    deleteTodo:(state, action) =>{

      state.todo = state.todo.filter((item) => item.id !== action.payload)

    },

    remove:(state)=>{
      state.todo = []
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, remove } = counterSlice.actions

export default counterSlice.reducer