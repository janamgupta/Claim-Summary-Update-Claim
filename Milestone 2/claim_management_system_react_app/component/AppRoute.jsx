/* eslint-disable react/prop-types */
import React from 'react';
import { Link, browserHistory} from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { faHome,faList, faAddressCard, faInfoCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class AppRouter extends React.Component {

    home() {
        browserHistory.push("login");
    }
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="md" bg="primary" className="routeNav">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Item>
                            <Link to="home" className="nav-link"><FontAwesomeIcon icon={faHome}/> Home</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="claim" className="nav-link"><FontAwesomeIcon icon={faList}/> View Claim</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="contact" className="nav-link"><FontAwesomeIcon icon={faAddressCard}/> Contact Us</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="about" className="nav-link"><FontAwesomeIcon icon={faInfoCircle}/> About</Link>
                        </Nav.Item>
                        <Nav.Item className="ml-auto user mr-5">
                        <FontAwesomeIcon icon={faUserCircle} size="lg"/>  {this.props.username}
                        </Nav.Item>
                        <Nav.Item>        
                                <button className="btn btn-outline-light" onClick={()=> this.home()}>signout   <FontAwesomeIcon icon={faSignOutAlt}/></button>
                        </Nav.Item>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default AppRouter;