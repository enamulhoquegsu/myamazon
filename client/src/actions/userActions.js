import axios from "axios"
import { USER_LOGOUT, USER_REGISTRATION_FAIL, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS, USER_SHIPPING_DATA, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants"

export const userSigninAction = (email, password)=> async(dispatch)=> {
    dispatch({
        type: USER_SIGNIN_REQUEST, 
        payload: { email, password }
    })
    try {
        const { data } = await axios.post('/api/users/signin', {
            email : email,
            password : password
        })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload : data
        })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type : USER_SIGNIN_FAIL,
            payload : error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
  
}

export const userSignoutAction = ()=> (dispatch)=>{
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems") 
    dispatch({
        type : USER_LOGOUT
    })
}


export const userRegistrationAction = (name, email, password)=> async(dispatch)=>{
    dispatch({
        type: USER_REGISTRATION_REQUEST,
        payload : { name, email, password}
    })
    try {
        const { data }= await axios.post('/api/users/registration', {
        name : name,
        email : email,
        password : password
    })

        dispatch({
            type : USER_REGISTRATION_SUCCESS,
            payload : data
        })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload : data
        })
        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type : USER_REGISTRATION_FAIL,
            payload : error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }

}
export const userShippingAddress = (data)=> (dispatch) =>{
    dispatch({
        type: USER_SHIPPING_DATA,
        payload : data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

