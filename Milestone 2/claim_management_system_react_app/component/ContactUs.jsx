/* eslint-disable react/prop-types */
import React from 'react';
import AppRouter from './AppRoute.jsx';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className='error-msg'>{props.message}</div>
        )
    }
    return null;
}
const validNameRegex = RegExp(/^[a-zA-Z ]{2,30}$/i);
const emptyRegex = RegExp(/^(?!\s*$).+/i);
// eslint-disable-next-line no-useless-escape
const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',nameValid: false,
            email:'',emailValid: false,
            message:'',messageValid: false,
            userName: '',
            formValid : false,
            errors : {
                name:'', email:'', message:''
            }
        };
    }
    componentDidMount() {
        let userName = localStorage.getItem('username');
        this.setState({ userName });
    }
    validateForm() {
        const { nameValid, emailValid, messageValid} = this.state;
        this.setState({
            formValid: nameValid && emailValid && messageValid
        })
    }
    handleChange(target){
        event.preventDefault();
        const{value, name} = target;
        let errors = this.state.errors;
        if(name === 'name'){
            if(!emptyRegex.test(value)){
                errors.name = "name is required"
            }else{
                errors.name =
                    validNameRegex.test(value)
                        ? ''
                        : "name should not contain numbers or special character"
            }
            let nameValid = false;
            if (errors.name === '') {
                nameValid = true;
            }
            this.setState({ nameValid });
        }
        if(name === 'email'){
            if(!emptyRegex.test(value)){
                errors.email = "email is required"
            }else{
                errors.email =
                    emailRegex.test(value)
                        ? ''
                        : "please enter valid email"
            }
            let emailValid = false;
            if (errors.email === '') {
                emailValid = true;
            }
            this.setState({ emailValid });
        }
        if(name === 'message'){
            if(!emptyRegex.test(value)){
                errors.message = "message is required"
            }else{
                errors.message =
                    validNameRegex.test(value)
                        ? ''
                        : "please enter name should not contain numbers or special character email"
            }
            let messageValid = false;
            if (errors.message === '') {
                messageValid = true;
            }
            this.setState({ messageValid }); 
        }
        this.setState({ errors, [name]: value }, () => {
            this.validateForm();
        })
    }
    render() {
        return (
            <div>
                <AppRouter username={this.state.userName}></AppRouter>
                <Container className="mt-5 mb-5">
                    <Card className="boxes mx-auto">
                        <Card.Header className="text-center"><FontAwesomeIcon icon={faIdCard} size="lg"/> Contact Us</Card.Header>
                        <Card.Body>
                        <form id="contact-form" noValidate>
                            <div className="form-group">
                                <label>Name*</label>
                                <input type="text" name="name" className="form-control" onChange={(e) => this.handleChange(e.target)} autoComplete= "off"/>
                                < ValidationMessage valid={this.state.nameValid} message={this.state.errors.name} />
                            </div>
                            <div className="form-group">
                                <label>Email address*</label>
                                <input type="text" name="email" className="form-control" onChange={(e) => this.handleChange(e.target)} autoComplete= "off"/>
                                < ValidationMessage valid={this.state.emailValid} message={this.state.errors.email} />
                            </div>
                            <div className="form-group">
                                <label>Message*</label>
                                <textarea name="message" className="form-control"  rows="5" onChange={(e) => this.handleChange(e.target)}></textarea>
                                < ValidationMessage valid={this.state.messageValid} message={this.state.errors.message} autoComplete= "off"/>
                            </div>
                            <div className="text-center">
                            <button type="submit" className="btn btn-outline-primary text-center" disabled={!this.state.formValid} onChange={(e) => this.handleChange(e.target)}> Submit <FontAwesomeIcon icon={faPaperPlane}/></button>
                            </div>
                        </form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
export default ContactUs;
