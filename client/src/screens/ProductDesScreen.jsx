import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDescriptionAction } from '../actions/productsActions'

import ProductDescription from '../components/ProductDescription'
const ProductDesScreen = (props) => {
    const id = props.match.params.id ? props.match.params.id : 1
    const productDescription = useSelector(state=> state.productDescription)

    const { loading, product} = productDescription

    const  dispatch = useDispatch()
    useEffect(() => {
        dispatch(productDescriptionAction(id))
    }, [dispatch,id])

    loading && <div>.....</div>

    if(product?.description){
        return (
            <div className="main-body">     
                <ProductDescription 
                    product = {product}
                    props = {props}
                />
            </div>
        )
    }else {
        return (
            <div className="main-body">
                
                <h1>NO PRODUCT FOUND</h1>

            </div>
        )
    }    
}

export default ProductDesScreen
