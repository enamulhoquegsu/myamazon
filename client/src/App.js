
import './App.css';
import Header from './components/Header';
import { Footer } from './components/Footer';

import {
 BrowserRouter,
 Switch,
 Route,

} from "react-router-dom";
import MainScreen from './screens/MainScreen';
import ProductDesScreen from './screens/ProductDesScreen';
import CartScreen from './screens/CartScreen';
import { SignInScreen } from './screens/SignInScreen';
import { MyNavbar } from './components/MyNavbar';
import { ShippingScreen } from './screens/ShippingScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { PaymentMethodScreen } from './screens/PaymentMethodScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { IndividualOrderScreen } from './screens/IndividualOrderScreen';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar />
        <Switch>
          <Route path='/' component={MainScreen} exact></Route>
        </Switch>

        <Switch>
          <Route path='/products/:id' component={ProductDesScreen} exact></Route>
        </Switch>

        <Switch>
          <Route path='/cart/:id?' component={CartScreen} exact></Route>
        </Switch>

        <Switch>
          <Route path='/signin' component={SignInScreen} exact></Route>
        </Switch>

        <Switch>
          <Route path='/shipping' component={ShippingScreen} exact></Route>
        </Switch>

        <Switch>
          <Route path='/registration' component={RegistrationScreen} exact></Route>
        </Switch>
        <Switch>
          <Route path='/payment' component={PaymentMethodScreen} exact></Route>
        </Switch>
        <Switch>
          <Route path='/placeorder' component={PlaceOrderScreen} exact></Route>
        </Switch>
        <Switch>
          <Route path='/orders/:id' component={IndividualOrderScreen} exact ></Route>
        </Switch>




        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
