import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userSigninAction } from '../actions/userActions'
import '../css/SigninScreen.css'
export const SignInScreen = (props) => {

    const [email, setEmail ]=useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError]=useState('')
    const [passwordError, setPasswordError]=useState('')
    const dispatch = useDispatch()

    const userSignin = useSelector(state=>state.userSignin)
    const {userInfo, error} = userSignin

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'

    const validateData = ()=>{
        let validation = true
        if(!email){
            setEmailError("Field can not be empty")
            validation = false
        }

        if(!password){
            setPasswordError("Field can not be empty")
            validation = false
        }else if(password.length< 4){
            setPasswordError("Password must be more than 4 characters long")
            validation = false
        }

        return validation
    }

    const handleSignInButton = (e)=>{
        e.preventDefault()
        if(validateData()){
            dispatch(userSigninAction(email, password))
            setEmail('')
            setPassword('')
            
        }else{
            console.log("data is not validated");
        }
        
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo, props.history, redirect])

    return (
        <div className="sign-in">
            <div className="sign-heading">
                <h1>Sign In, Please...</h1>
            </div>
            { error 
                ? <div class="alert alert-danger" role="alert">
                    {error}
                </div>
                : null
            }
            
            <div className="sign-email">
                <label className="label-email">Email address</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>{ setEmail(e.target.value); setEmailError('')}}
                    required/>
                {emailError ? <p style={{color:"red"}} >{emailError}</p> : null}    

            </div>
            <div className="sign-password">
                <label className="label-password">Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e)=>{ setPassword(e.target.value); setPasswordError('') }}
                    required />
                {passwordError ? <p style={{color:"red"}} >{passwordError}</p> : null}     
            </div>
            <div className="sign-button">
                <button  type="button" onClick={handleSignInButton}>Sign In</button>
            </div>
            <div className="registration-link">
                New Customer ? {' '} <Link to={`/registration`}>Create Account </Link> 
            </div>
        </div>
    )
}
