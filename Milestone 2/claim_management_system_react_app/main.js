import React from 'react';
import ReactDOM from 'react-dom';
import Login from './component/LoginComponent.jsx';
import Main from './component/MainComponent.jsx';
import ViewClaim from './component/ViewClaim.jsx';
import UpdateClaim from './component/UpdateClaim.jsx';
import App from './component/App.jsx';
import About from './component/About.jsx';
import ContactUs from './component/ContactUs.jsx';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router';

ReactDOM.render((
    <Router history = {browserHistory}>
    <Route path = "/" component = {App}>
           <IndexRoute component = {Login} />
           <Route path = "home" component = {Main} />
           <Route path = "claim" component = {ViewClaim} />
           <Route path = "updateClaim/:id" component = {(props)=><UpdateClaim{...props}/>} />
           <Route path = "login" component = {Login} />
           <Route path = "about" component = {About}/>
           <Route path = "contact" component = {ContactUs}/>
    </Route>
   </Router>
   ), document.getElementById('router'));
