import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from './reducers/cartReducer';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducer';
import { productDescriptionReducer, productListReducer } from './reducers/productsReducer';
import { userRegistrationReducer, userShippingAddressReducer, userSinginReducer } from './reducers/userReducers';


const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart : {
    cartItems : localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) : [],
    paymentMethod : 'Paypal'
  },


  userShippingData : {
    shippingAddress : localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
  }
};

const reducer = combineReducers({
  productList : productListReducer,
  productDescription : productDescriptionReducer,
  cart : cartReducer,
  userSignin : userSinginReducer,
  userRegistation : userRegistrationReducer,
  userShippingData : userShippingAddressReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,

})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);


export default store;