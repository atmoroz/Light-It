import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Registration from "./components/Registration/Registration";
import Authorization from "./components/Authorization/Authorization";
import Login from "./components/Login/Login";

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Route component={Login} />
                <Route exact path="/" component={Main} />
                <Route path="/product/:id" component={ProductDetails} />
                <Route path="/registration/" component={Registration} />
                <Route path="/authorization/" component={Authorization} />
            </Router>
        </div>
    );
}

export default App;
