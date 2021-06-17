import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCartAction } from '../actions/cartActions'
import '../css/ProductDescription.css'
const ProductDescription = ({product,props}) => {

    const [qty, setQty]=useState(1)


    const buttonClick = (id)=>{
        props.history.push('/cart/'+ id + "?qty=" + qty)
     
    }


    


    return (
        <div className="product-description">
            <div className="image">
                <img  className="image-large" src={product.image} />
            </div>
            <div className="product-info">
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <p>quantity:{' '} {product.countInStock}</p>
            </div>
            <div className="add-to-cart">
                <div className="price">
                    <p>Price : ${product.price}</p>
                </div>
                <div className="status">
                    <p> Status: {product.countInStock > 0 
                        ? <>Available</>
                        : <>Unavailable</> }
                    </p>
                </div>

                {product.countInStock > 0 &&
                <>
                    <div className="qauntity">
                        <p>quantity:{' '} 
                        <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                            {[...Array(product.countInStock).keys()].map(x=>(
                                <option key={x+1} value={x+1}>{x+1}</option>
                            ))}
                            
                            
                        </select>
                        </p> 
                    </div>
                    <button 
                        className="btn-add-to-cart"
                        onClick={()=> buttonClick(product._id)}
                        >ADD TO Cart</button>
                </>

                }
            </div>
          
        </div>
    )
}

export default ProductDescription
