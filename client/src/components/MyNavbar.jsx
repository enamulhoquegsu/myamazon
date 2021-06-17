import { Link } from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSignoutAction } from '../actions/userActions'

export const MyNavbar = () => {

    const cart = useSelector(state=> state.cart)
    const {cartItems} = cart
    const userSignin = useSelector(state=>state.userSignin)
    const {userInfo} = userSignin
    const dispatch = useDispatch()

    const signoutHandler = ()=>{
        dispatch(userSignoutAction())
    
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Amazon</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                {userInfo ? 
                    <li className="nav-item active">
                        <a className="nav-link" href="#">{userInfo.name}<span className="sr-only">(current)</span></a>
                    </li>
                   : null
                }
                

                { cartItems.length > 0 ?
                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart/">Cart {' ' } { cartItems.length } </Link> 
                    </li>
                    
                    : null
                }

                
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                {!userInfo ? 
                <li className="nav-item">
                    <Link className="nav-link" 
                        to="/signin" tabIndex="-1" 
                        aria-disabled="true">Signin / Registration
                    </Link>
                </li>
                : 
                <li className="nav-item">
                    <a className="nav-link" 
                        href="/" tabIndex="-1" 
                        aria-disabled="true"
                        onClick={signoutHandler}>Signout
                    </a>
                </li>

                }
                </ul>
                
            </div>
        </nav>
    )
}
