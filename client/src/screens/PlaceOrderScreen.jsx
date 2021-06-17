import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import { CheckoutSteps } from '../components/CheckoutSteps'
import Loading from '../components/Loading'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import '../css/CheckoutSteps.css'

export const PlaceOrderScreen = (props) => {
    //shippingAddress
    const userShippingData = useSelector(state=>state.userShippingData)
    const {shippingAddress} = userShippingData
    const cart = useSelector(state => state.cart)
    const {cartItems}= cart
    const {paymentMethod}=cart
    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress]=useState(shippingAddress.address)
    const [city, setCity]=useState(shippingAddress.city)
    const [zipcode, setZipcode]=useState(shippingAddress.zipcode)
    const [country, setCountry]=useState(shippingAddress.country)
    const dispatch = useDispatch()
    const toPrice = (num)=> Number(num.toFixed(2))
    let shippingPrice = 50, taxPrice = 0, totalPrice = 0, itemsPrice = 0

    const orderCreate = useSelector(state=> state.orderCreate)
    const { loading, success, order, error }= orderCreate
    const placeOrder = () => { 
        dispatch(createOrder({ 
            orderItems: cart.cartItems, 
            ...userShippingData,
            paymentMethod : paymentMethod,
            itemsPrice : itemsPrice,
            shippingPrice : shippingPrice,
            taxPrice : taxPrice ,
            totalPrice : totalPrice

        }));
    };

    useEffect(() => {
        if(success){
            props.history.push('/orders/'+ order._id)
            dispatch({type:ORDER_CREATE_RESET})
        }
    }, [success, props.history, order])



    return (
        <div className="container place-order-screen">
           <CheckoutSteps
            step1 = {"step1"}
            step2 = {"step2"}
            step3 = {"step3"}
            step4 = {"step4"}
           />
           <div className="all-data mt-3 mb-3">
                <div className="order-info">
                    <div className="shipping-data">
                        {shippingAddress ? (
                            <div>
                               <h3>Shipping: </h3> 
                               <label>Name :</label> { name } <br/>
                               <label>Address :</label>{address} { ' , '} 
                               {city} {' , '} {zipcode} {' , '} {country}
                            </div>

                        )
                        : null
                        }
                    </div>
                    <div className="payment-data">
                        <h3>Payment Method : </h3>
                        {paymentMethod && (paymentMethod)}
                    </div>
                    <div className="order-data"> 
                    <h3>Order Items:</h3>
                    {
                        cartItems?.map(item=>(
                            <div key={item.product_id} className="each-item">
                               <div className="image"> <img className="image-sm" src={item.image} /></div>
                               <div className="name"> {item.name}</div>
                               <div className="price"> {item.qty} X {item.price} = $ {toPrice(item.qty*item.price)} </div>
                            </div>
                        ))
 
                    }
                    </div>
                </div>
                <div className="payment-details">
                <h3 style={{textAlign:"center"}}>Order Summery:</h3>  
                <div>Price: {'$'} { itemsPrice = toPrice(cartItems?.reduce((a, c)=> Number(a) + Number(c.qty) * Number(c.price),0 ))} </div> 
                <div>Shipping: $50 </div> 
                <div>Tax: {'$'} { taxPrice=toPrice(itemsPrice * 0.15)  } </div> 
                <div>Order Total: { '$' } {totalPrice = toPrice(itemsPrice * 1.15) + shippingPrice } </div> 
                <button onClick={placeOrder}>Place Order</button>
                {loading && <Loading />}
                
                </div>

                
            </div>
        </div>
    )
}
