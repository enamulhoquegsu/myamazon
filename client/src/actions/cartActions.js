import axios from "axios"
import { ADD_ITEM_TO_CART, ADD_TO_CART_ERROR, REMOVE_ITEM_FROM_CART, PAYMENT_METHOD } from "../constants/cartConstants"

export const addToCartAction = (id, qty)=> async(dispatch,getState)=> {
    try {
        const {data}=await axios.get('/api/products/' + id)
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload : {
                name : data.name,
                product_id : data._id,
                category : data.category,
                image : data.image,
                price : data.price,
                countInStock : data.countInStock,
                brand : data.brand,
                description : data.description,
                qty 
            }
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_ERROR, payload : error.message
        })
       
    }
    
}

export const removeItemFromCart = (id)=> (dispatch, getState)=>{
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload : id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const cartPaymentMethod = (paymentMethod)=>(dispatch)=>{
    dispatch({
        type: PAYMENT_METHOD,
        payload : paymentMethod
    })
}
