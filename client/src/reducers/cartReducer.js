import { ADD_ITEM_TO_CART, CART_EMPTY, PAYMENT_METHOD, REMOVE_ITEM_FROM_CART } from "../constants/cartConstants"

const cartReducer = (state = { cartItems : [] } , action) => {

    switch (action.type) {
        case ADD_ITEM_TO_CART:
            const item = action.payload
            const itemExist = state.cartItems.find(x=> x.product_id === item.product_id)
            if(itemExist){
                return {
                    ...state,
                    cartItems : state.cartItems.map(x=> x.product_id === itemExist.product_id ? item : x )
                }
            }else{
                return {
                    ...state,
                    cartItems : [ ...state.cartItems, item ]
                }
            }
        case REMOVE_ITEM_FROM_CART :
            return {
                ...state,
                cartItems : state.cartItems.filter(x=> x.product_id !== action.payload )
            }  
        case PAYMENT_METHOD : 
            return {
                ...state,
                paymentMethod : action.payload
            }   
        case CART_EMPTY :
            return {
                ...state,
                cartItems : []
            }       

        default:
            return state
    }
}

export default cartReducer
