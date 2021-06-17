import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cartPaymentMethod } from '../actions/cartActions'
import { CheckoutSteps } from '../components/CheckoutSteps' 
import '../css/CheckoutSteps.css'
import '../css/PlaceOrderScreen.css'

export const PaymentMethodScreen = (props) => {

    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod]=useState("Paypal")
    
    const submitHandler = (e)=>{
        e.preventDefault(false)
        console.log(paymentMethod)
        dispatch(cartPaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }
    return (
        <div className="container">
            <CheckoutSteps 
                step1={"step1"}
                step2={"step2"}
                step3={"step3"}
            />
            <div className="mt-3 mb-3">
                <h4 style={{textAlign: "center"}}>Payment Method</h4>
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <div>
                            <input
                            type="radio"
                            id="paypal"
                            value="PayPal"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input
                            type="radio"
                            id="stripe"
                            value="Stripe"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                            <label htmlFor="stripe">Stripe</label>
                        </div>
                    </div>
                    <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                    </div>
                </form>
                    
            </div>
        </div>   
    )
}
