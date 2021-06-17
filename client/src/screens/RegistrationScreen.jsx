import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { userRegistrationAction } from '../actions/userActions'
import '../css/RegistrationScreen.css'

export const RegistrationScreen = (props) => {
    const [name, setName ]=useState('')
    const [email, setEmail ]=useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain]=useState('')
    const [emailError, setEmailError]=useState('')
    const [passwordError, setPasswordError]=useState('')
    const [nameError, setNameError]=useState('')
    const [passwordAgainError, setPasswordAgainError]=useState('')
    const redirect = props.location.search 
    ? props.location.search.split("=")[1]
    :'/'
    

    const  dispatch = useDispatch()

    const userRegistation = useSelector(state=>state.userRegistation)

    const {userInfo, error, loading} = userRegistation

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
      
    }, [props.history, redirect, userInfo])


       const validateData = ()=>{
        let validation = true
        if(!name){
            setNameError("Field can not be empty")
            validation = false
        }

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
        if (!passwordAgain){
            setPasswordAgainError("Field can not be empty")
            validation = false
        }
        else if(password !== passwordAgain){
            setPasswordAgainError("Password did not match")
            validation = false
        }

        return validation
    }

    const handleRegistrationButton = (e)=>{
        e.preventDefault(false)
        if(validateData()){
            dispatch(userRegistrationAction(name, email, password))
            
        }else{
            console.log("something went wrong")
        }
    }

    return (
        <div className="container">
            <div className="mt-3" style={{textAlign:"center"}}>Please Create an account here</div>
            {error ? <div>{error}</div> : null }
            <form className="registration" onSubmit={handleRegistrationButton}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={name} 
                        onChange={(e)=>{setName(e.target.value); setNameError('') }} 
                    />
                    <small id="nameHelp" 
                        className="form-text text-muted">
                        {nameError ? nameError : null }  
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        value={email} 
                        onChange={(e)=>{setEmail(e.target.value); setEmailError('')}}
                        />
                    <small id="emailHelp" 
                        className="form-text text-muted">
                        {emailError ? emailError :
                        <>We'll never share your email with anyone else.</>
                        }
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value); setPasswordError('')}}
                    />
                    <small id="passwordHelp" 
                        className="form-text text-muted">
                        {passwordError ? passwordError : null
                        
                        }
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Password Again</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword2" 
                        value={passwordAgain}
                        onChange={(e)=>{setPasswordAgain(e.target.value); setPasswordAgainError('')}}
                    />
                    <small id="passwordAgainHelp" 
                        className="form-text text-muted">
                        {passwordAgainError ? passwordAgainError : null } 
                    </small>

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="form-group mt-3">
                    
                    Already have an account ? <Link to={`/signin?redirect=${redirect}`}>{''}Signin</Link>
                </div>
            </form>
        </div>
    )
}
