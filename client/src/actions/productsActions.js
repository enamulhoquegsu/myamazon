
import axios from "axios"
import { ALL_PRODUCTS_REQUEST, PRODUCTS_FAIL, PRODUCTS_SUCCESS, PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } 
    from "../constants/productConstants"

export const  productListActions = ()=> async(dispatch)=>{
    dispatch({ type: ALL_PRODUCTS_REQUEST})
    try {
        const {data} = await axios.get('/api/products/')
        dispatch({ type: PRODUCTS_SUCCESS, payload : data })
    } catch (error) {
        console.log(error.message)
        dispatch({type: PRODUCTS_FAIL, payload : error.message})
    }
} 

export const productDescriptionAction = (productId)=> async(dispatch)=>{ 
    dispatch({
        type: PRODUCT_REQUEST,
        loading : true
    })
    try {
        const {data} = await axios.get('/api/products/' + productId)
        dispatch({
            type : PRODUCT_SUCCESS, 
            loading : false,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : PRODUCT_FAIL,
            loading : false,
            payload : error.message
        })
    }
    
}

