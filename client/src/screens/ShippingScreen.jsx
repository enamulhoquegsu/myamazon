
import React, { useEffect, useState } from 'react' 

import {useDispatch, useSelector } from 'react-redux'
import { userShippingAddress } from '../actions/userActions'
import { CheckoutSteps } from '../components/CheckoutSteps'
import '../css/shippingscreen.css'

export const ShippingScreen = (props) => {


    const userSignin = useSelector(state => state.userSignin)
    const{ userInfo } = userSignin

    useEffect(() => {
        if(!userInfo){
            props.history.push('/signin')
        }
        
    }, [props.history, userInfo])

    const userShippingData = useSelector(state=>state.userShippingData)

    const {shippingAddress} =userShippingData

    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress]=useState(shippingAddress.address)
    const [city, setCity]=useState(shippingAddress.city)
    const [zipcode, setZipcode]=useState(shippingAddress.zipcode)
    const [country, setCountry]=useState(shippingAddress.country)
    const dispatch = useDispatch()
    const handleShippingButton = (e)=>{
        e.preventDefault(false)  
        dispatch(userShippingAddress(
        { name: name, address: address, 
          city : city, zipcode: zipcode, country : country 
        }))
        props.history.push('/payment')


    }

  

    return (
        <div className="container">
            <CheckoutSteps
                step1 = {"step1"}  step2 = {"step2"} />
            <div className="mt-3" style={{textAlign:"center"}}>Shipping Address</div>
            
            
            <form className="registration" onSubmit={(e)=>handleShippingButton(e)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        required
                        value={name}
                        onChange={(e)=>{ setName(e.target.value) }}
                    
                    />
                    <small id="nameHelp" 
                        className="form-text text-muted">
                        
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="address" 
                        aria-describedby="addressHelp"
                        required
                        placeholder="ex: 1444 north hollywood, apt #7"  
                        value={address}
                        onChange={(e)=>{ setAddress(e.target.value) }}
                    />
                    <small id="addresslHelp" 
                        className="form-text text-muted">
                        
                        <>We'll never share your address with anyone else.</>
                        
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="city"
                        required
                        placeholder="ex: Los Angeles" 
                        value={city}
                        onChange={(e)=>{ setCity(e.target.value) }}
                        
                    />
                    <small id="cityHelp" 
                        className="form-text text-muted">
                        
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="zipcode" 
                        placeholder="ex: 91344"
                        required
                        value={zipcode}
                        onChange={(e)=>{ setZipcode(e.target.value) }}
                        
                    />
                    <small id="zipcodeHelp" 
                        className="form-text text-muted">
                        
                    </small>

                </div>

                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="country"
                        placeholder="ex: USA" 
                        required
                        value={country}
                        onChange={(e)=>{ setCountry(e.target.value) }}    
                    />
                    <small id="countryHelp" 
                        className="form-text text-muted">
                        
                    </small>    
                </div>

                <button type="submit" className="btn btn-primary">Continue</button>
            </form>
        </div>
    )
}
