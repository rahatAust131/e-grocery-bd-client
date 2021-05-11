import React, { createContext, useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// importing components
import Home from './components/Home/Home';
import ManageProduct from "./components/ProductManagement/ManageProduct/ManageProduct";
import EditProduct from "./components/ProductManagement/EditProduct/EditProduct";
import Header from "./components/Header/Header";
import Orders from "./components/Orders/Orders";
import Admin from "./components/Admin/Admin";
import Deals from "./components/Deals/Deals";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Checkout from "./components/Checkout/Checkout";
import AddProduct from "./components/ProductManagement/AddProduct/AddProduct";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <div className="side-space">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/orders">
              <Orders />
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>
            <Route path="/deals">
              <Deals />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/addProduct">
              <AddProduct />
            </PrivateRoute>
            <PrivateRoute path="/manageProduct">
              <ManageProduct />
            </PrivateRoute>
            <PrivateRoute path="/editProduct">
              <EditProduct />
            </PrivateRoute>
            <PrivateRoute path="/product/:id">
              <Checkout />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
