import { ALL_PRODUCTS_REQUEST, PRODUCTS_FAIL, PRODUCTS_SUCCESS, PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS }
    from "../constants/productConstants";

export const productListReducer = (state = {loading : true,  products : [] }, action)=>{
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST: 
            return { loading : true }
        case PRODUCTS_SUCCESS :
            return {
                loading : false,
                products : action.payload,
                
            }    
        case PRODUCTS_FAIL : 
            return {
                loading : false,
                products : action.payload
            }
        default:
            return state;
    }

}

export const productDescriptionReducer = (
        state = { loading : true, product : {} }, action
    )=>{
    
    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                loading : true
            }
        case PRODUCT_SUCCESS:
            return {
                loading : false,
                product : action.payload,
               
            }
        case PRODUCT_FAIL :
            return {
                loading : false,
                product : action.payload
                
            }    
        default:
            return state
    }

}