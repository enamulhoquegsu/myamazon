import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder } from '../actions/orderActions';

export const IndividualOrderScreen = (props) => {
    const orderId = props.match.params.id
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

    const placeOrder = ()=>{

    }

    return (
        <div className="container place-order-screen">
           <div>order id : {orderId} </div>
           <div className="all-data mt-3 mb-3">
                <div className="order-info">
                    <div className="shipping-data">
                        {order?.shippingAddress ? (
                            <div>
                               <h3>Shipping: </h3> 
                               <label>Name :</label> { order.shippingAddress.name } <br/>
                               <label>Address :</label>{order.shippingAddress.address} { ' , '} 
                               {order.shippingAddress.city} {' , '} {order.shippingAddress.zipcode} {' , '} {order.shippingAddress.country}
                               

                               {order?.isDelivered ? (
                                    <div className="alert alert-success" 
                                        role="alert">Delivered already 
                                    </div>
                                    
                                ) : (
                                    <div className="alert alert-danger" 
                                        role="alert">Not delivered 
                                    </div>
                                )}
                                           
                            
                            </div>

                        )
                        : null
                        }
                    </div>
                    <div className="payment-data">
                        <h3>Payment Method : </h3>
                        {order?.paymentMethod && (order.paymentMethod)}
                        {order?.isPaid ? (
                            <div className="alert alert-success" role="alert">Paid at {order.paidAt} </div>
                        
                        ) : (
                            <div className="alert alert-danger" role="alert"> Not Paid Yet </div>
                        )}

                    </div>
                    <div className="order-data"> 
                    <h3>Order Items:</h3>
                    {
                        order?.orderItems?.map(item=>(
                            <div key={item.product_id} className="each-item">
                               <div className="image"> <img className="image-sm" src={item.image} /></div>
                               <div className="name"> {item.name}</div>
                               <div className="price"> {item.qty} x ${item.price} = ${item.qty * item.price} </div>
                            </div>
                        ))
 
                    }
                    </div>
                </div>
                <div className="payment-details">
                <h3 style={{textAlign:"center"}}>Order Summery:</h3>  
                <div>Price: {'$'} { order?.itemsPrice } </div> 
                <div>Shipping: ${order?.shippingPrice} </div> 
                <div>Tax: {'$'} {order?.taxPrice}</div> 
                <div>Order Total: { '$' } {order?.totalPrice} </div> 
                <button onClick={placeOrder}>Place Order</button>
                </div>
            </div>
        </div>
    )
}
