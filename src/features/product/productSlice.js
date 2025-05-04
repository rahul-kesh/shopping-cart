import { createSlice } from "@reduxjs/toolkit"

const initialState={
    productList:[]
}
export const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        setAllProducts:(state,action)=>{
            state.productList = [...action.payload];
      console.log(state.productList);
        }
    }
})

export const {setAllProducts}=productSlice.actions

export default productSlice.reducer
