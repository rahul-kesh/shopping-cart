import { createSlice } from "@reduxjs/toolkit"
const initialState={
    cartItems:[]
}
export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            console.log(action);
            const item=action.payload
            const existingItem=state.cartItems.find((i)=>i.id===item.id)
            if(existingItem){
                existingItem.quantity+=1;
            }
            else{
                state.cartItems.push({
                    ...item,quantity:1
                });
                console.log(state.cartItems[0]);
            }
        },
        increaseQuantity:(state,action)=>{
            const item=state.cartItems.find((i)=>i.id===action.payload)
            if(item && item.quantity>=1){
                item.quantity+=1
            }
            
        },
        decreaseQuantity:(state,action)=>{
            const item=state.cartItems.find((i)=>i.id===action.payload)
            if(item && item.quantity>1){
                item.quantity-=1
            }
            
        },
        deleteItem:(state,action)=>{
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        }
         



    }
})
export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteItem
} =cartSlice.actions

export default cartSlice.reducer