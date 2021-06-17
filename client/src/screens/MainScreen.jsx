import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import { productListActions } from '../actions/productsActions'

const MainScreen = () => {
    const productList = useSelector(state=>state.productList)
    const { loading, products} = productList

    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(productListActions())
    }, [dispatch])
    
    return (
        <div className="main-body">
        { loading && <h1>.....</h1> }
        {products?.map((product)=> { return(
          <Card 
            product = {product}
            key ={product._id}
          />
        ) } )}
    
      </div>
    )
}

export default MainScreen

