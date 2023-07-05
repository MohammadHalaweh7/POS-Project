// Test test test 
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count: 5,
     max:10,
    min:0
  }

  
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment: (state) => {
        state.count += 1
      },
      decrement: (state) => {
        state.count -= 1
      },
      reset: (state)=>{
        state.count =0;
      }
    },
  })

  export default counterSlice.reducer;
  export const {increment,decrement,reset} = counterSlice.actions;
