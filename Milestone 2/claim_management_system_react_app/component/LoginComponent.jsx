/* eslint-disable react/prop-types */
import React from 'react';
import { browserHistory } from 'react-router';
import { Card, Form, Button, Container, Col } from 'react-bootstrap';
import Axios from 'axios';
import { Logger } from 'react-logger-lib';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className='error-msg'>{props.message}</div>
        )
    }
    return null;
}
const emptyRegx = RegExp(/^(?!\s*$).+/i);
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '', userNameValid: false,
            password: '', passwordValid: false,
            formValid: false,
            validUser: true,
            errors: {
                userName: '', password: '', validUser: ''
            }
        };
    }
    validateForm() {
        const { userNameValid, passwordValid } = this.state;
        this.setState({
            formValid: passwordValid && userNameValid
        })
    }
    userValidation(){
        event.preventDefault();
        Logger.of('App.Login.userValidation').warn('Authenticating User');
        Axios.get('http://localhost:3000/api/getUsers')
        .then( res => {
                let errors = this.state.errors;
                let userFound = false;
                const user = res.data;
                let loggedUserName;
                user.map((user)=>{
                    if((user.username === this.state.userName) && 
                    (user.password === this.state.password)){
                        loggedUserName = user.username;
                        userFound = true;
                    }
                });
                if(userFound){
                    localStorage.setItem('username', loggedUserName);
                    browserHistory.push("home");
                }else{
                    this.setState({validUser : false});
                    errors.validUser = 'Invalid Credentials!!!';
                }
        })
        
    }

    handleChange(target) {
        event.preventDefault();
        const { name, value } = target;
        let errors = this.state.errors;
        if(name === 'userName'){
            if (!emptyRegx.test(value)) {
                errors.userName = 'user name is required';
            }else{
                errors.userName = '';
            }
            let userNameValid = false;
            if (errors.userName === '') {
                userNameValid = true;
            }
            this.setState({ userNameValid });
        }else{
            if(name === 'password'){
                if (!emptyRegx.test(value)) {
                    errors.password = 'password is required';
                }else{
                    errors.password = '';
                }
                let passwordValid = false;
                if (errors.password === '') {
                    passwordValid = true;
                }
                this.setState({ passwordValid });
            }
        }
        this.setState({ errors, [name]: value }, () => {
            Logger.of('App.Login.handleChange.errors').info('errors',errors);
            this.validateForm();
        })
    }
    render() {
        let myStyle = {
            maxWidth: "20rem",
            marginBottom: "3%",
        }
        return (
            <Container>
                <Card variant="border-dark" className="logincard mx-auto" style={myStyle}>
                    <Card.Body className="text-dark">
                        <Form className="loginform">
                            <p className="h4 mb-4 text-center"> <FontAwesomeIcon icon={faUserCircle}/>  Sign in</p>
                            <Form.Row>
                                <Form.Group as={Col} md={12}>
                                    <input type="text" name="userName" className="form-control" placeholder="Username" onChange={(e) => this.handleChange(e.target)} autoComplete= "off"/>
                                    < ValidationMessage valid={this.state.userNameValid} message={this.state.errors.userName} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md={12}> 
                                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={(e) => this.handleChange(e.target)} />
                                    < ValidationMessage valid={this.state.passwordValid} message={this.state.errors.password} />
                                </Form.Group>
                            </Form.Row>
                            <div className="text-center">
                            <Button variant="outline-primary" className="my-4 signin" type="submit" disabled={!this.state.formValid} onClick={(e)=> this.userValidation(e.target)}> SignIn  <FontAwesomeIcon icon={faSignInAlt}/></Button>
                            </div>
                        </Form>
                        <h5 className="text-center">
                        < ValidationMessage valid={this.state.validUser} message={this.state.errors.validUser} />
                        </h5>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Login;