import './App.css';
import Header from './Pages/Header';
import Home from './Pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import Payment from './Pages/Payment';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useStateValue } from './Pages/StateProvider';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Pages/Orders';

function App() {
  const promise = loadStripe("pk_test_51KH5cQC12ATKsSFI3AlaMziIROGMQ157foc76xhCZ9LuD6f1dkfSABwdyt9VsBfNXRNyGlX7TsFrIiwlnTwhxyXa00RtEdGSIk");
  const [{basket}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS CALLED >>>>>', authUser);
      if (authUser) {
        //shows user is or was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //shows user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    });
  }, [])
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
        <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
