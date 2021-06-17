import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
    const cart = useSelector(state=> state.cart)
    const userSignin = useSelector(state=>state.userSignin)
    const {cartItems} = cart
    const {userInfo} = userSignin



    return (
        <div className="header">
           <Link to={'/'}>
                <p>Amazon</p>
           </Link> 


            {userInfo ? <Link to="#">{userInfo.name}</Link> : <Link to="/signin">Signin</Link> }

           {cartItems.length > 0 ?
            <p>Cart{' ' } { cartItems.length }</p>
            : null
           }
        </div>
    )
}

export default Header






{/* <div className="header">
           <Link to={'/'}>
                <p>Amazon</p>
           </Link> 


            {userInfo ? <Link to="#">{userInfo.name}</Link> : <Link to="/signin">Signin</Link> }

           {cartItems.length > 0 ?
            <p>Cart{' ' } { cartItems.length }</p>
            : null
           }
</div> */}


