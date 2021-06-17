import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCartAction, removeItemFromCart } from '../actions/cartActions'
import '../css/CartScreen.css'


const CartScreen = (props) => {
    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1

    const cart = useSelector(state=>state.cart)
    const { cartItems } = cart
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(productId){
            dispatch(addToCartAction(productId, qty))
        }
    
    }, [dispatch, productId, qty])

    const handleRemoveButton = (id)=>{
        dispatch(removeItemFromCart(id))
    }

    const handleShippingButton = () => {
        props.history.push('/signin?redirect=shipping');
    };
    

    return (
        <div className="shopping-cart">
            <div className="heading"> Shopping Cart</div>
            <div className="shopping-info">
                <div className="cart-left">
                { cartItems?.length === 0 &&  <h1>Cart is empty </h1> } 
                {cartItems?.map((item, index)=>( 
                    <div key={index} className="single-item">
                        <div><img className="sm-image" src={item.image} /> </div> 
                        <div className="cart-left-name">{item.name}</div> 
                        <div className="cart-left-qty">
                            <select value={item.qty} onChange={(e)=>{ dispatch(addToCartAction(item.product_id,Number(e.target.value))) }}>
                                { [...Array(item.countInStock).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                )}
                                
                            </select>
                        </div> 
                        <div className="cart-left-price">${item.price}</div> 
                        <div 
                            className="cart-left-rem-button"
                            onClick={()=>{handleRemoveButton(item.product_id)}}>
                            <button>Remove item</button>
                        </div>  
                    </div>
                    )) 
                }
                </div>
               
                <div className="cart-right">
                    <h4> Total Item : {''} {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)} </h4>
                    <h5>Total Price: {' $'} {cartItems.reduce((a, c)=> Number(a) + Number(c.qty) * Number(c.price),0 )}
                    </h5> 
                    <button onClick={handleShippingButton}>Shipping</button>
                </div>

            </div>
        </div>
    )
}

export default CartScreen
