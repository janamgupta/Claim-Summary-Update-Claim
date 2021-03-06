/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import AppRouter from './AppRoute.jsx';
import { Row, Form, Col, Card, Container} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Logger } from 'react-logger-lib';
import { faWindowClose, faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className='error-msg'>{props.message}</div>
        )
    }
    return null;
}
const validClaimNumRegex = RegExp(/^[0-9a-zA-Z]{3}-[0-9a-zA-Z]{3}-[0-9a-zA-Z]{3}$/i);
const validClaimProgramRegex = RegExp(/^[a-zA-Z]{0,20}$/i);
const emptyRegx = RegExp(/^(?!\s*$).+/i);
class UpdateClaim extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            employeeId: '',
            employeeName: '',
            claimNumber: '', claimNumberValid: false,
            claimProgram: '', claimProgramValid: false,
            claimType: '',
            claimStartDate: '', claimStartDateValid: false,
            claimEndDate: '', claimEndDateValid: false,
            formValid: false,
            errors: {
                claimNumber: '', claimProgram: '', claimStartDate: '', claimEndDate: ''
            }
        };
    }

    componentDidMount() {
        let userName = localStorage.getItem('username');
        this.setState({ userName });
        axios.get(`http://localhost:3000/api/getClaim?id=` + this.props.params.id)
            .then(res => {
                const employeeId = res.data.Emp_id;
                const employeeName = res.data.Employee_Name;
                const claimNumber = res.data.Claim_Number;
                const claimProgram = res.data.Claim_Program;
                const claimStartDate = res.data.Claim_Start_Date;
                const claimEndDate = res.data.Claim_End_Date;
                const claimType = res.data.Claim_Type;
                this.setState({
                    employeeId, employeeName, claimNumber,
                    claimProgram, claimStartDate, claimEndDate, claimType
                });
            })
    }
    handleSubmit() {
        event.preventDefault();
        Logger.of('App.UpdateClaim.handleSubmit').info('inside handle submit');
        axios.put(`http://localhost:3000/api/updateClaim?id=` + this.state.employeeId, {
            Claim_Number: this.state.claimNumber,
            Claim_Type: this.state.claimType,
            Employee_Name: this.state.employeeName,
            Claim_Program: this.state.claimProgram,
            Claim_Start_Date: this.state.claimStartDate,
            Claim_End_Date: this.state.claimEndDate
        })
            .then(res => {
                Logger.of('App.UpdateClaim.handleSubmit').info('claim data', res.data);
                browserHistory.push('claim');
            })
    }
    validateForm() {
        const { claimNumberValid, claimProgramValid } = this.state;
        this.setState({
            formValid: claimNumberValid && claimProgramValid
        })
    }
    handleCancel() {
        browserHistory.push('claim');
    }
    handleChange(target) {
        event.preventDefault();
        const { name, value } = target;
        let errors = this.state.errors;
        if (name === 'claimNumber') {
            if (!emptyRegx.test(value)) {
                errors.claimNumber = 'claim number is required';
            } else {
                errors.claimNumber =
                    validClaimNumRegex.test(value)
                        ? ''
                        : 'claim Number is invalid';
            }
            let claimNumberValid = false;
            if (errors.claimNumber === '') {
                claimNumberValid = true;
            }
            this.setState({ claimNumberValid });
        }
        if (name === 'claimProgram') {
            if (!emptyRegx.test(value)) {
                errors.claimProgram = 'claim program is required';
            } else {
                errors.claimProgram =
                    validClaimProgramRegex.test(value)
                        ? ''
                        : 'claim program is invalid';
            }
            let claimProgramValid = false;
            if (errors.claimProgram === '') {
                claimProgramValid = true;
            }
            this.setState({ claimProgramValid });
        }
        if (name === 'claimStartDate'){
            if (!emptyRegx.test(value)) {
                errors.claimStartDate = 'claim start date is required';
            }
            let claimStartDateValid = false;
            if (errors.claimStartDate === '') {
                claimStartDateValid = true;
            }
            this.setState({ claimStartDateValid });
        }
        if(name === 'claimEndDate'){
            if (!emptyRegx.test(value)) {
                errors.claimEndDate = 'claim end date is required';
            }
            let claimEndDateValid = false;
            if (errors.claimEndDate === '') {
                claimEndDateValid = true;
            }
            this.setState({ claimEndDateValid });
        }
        this.setState({ errors, [name]: value }, () => {
            this.validateForm();
        })
    }

    render() {
        return (
            <div>
                <AppRouter username={this.state.userName}></AppRouter>
                <Container>
                    <Card className="boxes mx-auto">
                        <Card.Header className="text-center"><FontAwesomeIcon icon={faUserEdit}/> Update Claim</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col lg={12}>
                                    <Form onSubmit={(e) => this.handleSubmit(e.target)}>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Employee ID *</Form.Label>
                                                <input disabled name="employeeId" className="form-control" defaultValue={this.state.employeeId}/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Employee Name *</Form.Label>
                                                <input disabled name="employeeName" className="form-control" defaultValue={this.state.employeeName} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim Number *</Form.Label>
                                                <input name="claimNumber" className="form-control" onChange={(e) => this.handleChange(e.target)} defaultValue={this.state.claimNumber} autoComplete= "off"/>
                                                < ValidationMessage valid={this.state.claimNumberValid} message={this.state.errors.claimNumber} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim Type *</Form.Label>
                                                <Form.Control as="select" name="claimType" onChange={(e) => this.handleChange(e.target)} value={this.state.claimType}>
                                                    <option>Submitted</option>
                                                    <option>Recieved</option>
                                                    <option>Pending</option>
                                                    <option>More Info Required</option>
                                                    <option>Rejected</option>
                                                    <option>Denied</option>
                                                    <option>Paid</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim Programs *</Form.Label>
                                                <input name="claimProgram" className="form-control" onChange={(e) => this.handleChange(e.target)} defaultValue={this.state.claimProgram} autoComplete= "off"/>
                                                < ValidationMessage valid={this.state.claimProgramValid} message={this.state.errors.claimProgram} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim Start Date *</Form.Label>
                                                <input type="date" className="form-control" name="claimStartDate" onChange={(e) => this.handleChange(e.target)} defaultValue={this.state.claimStartDate} />
                                                < ValidationMessage valid={this.state.claimStartDateValid} message={this.state.errors.claimStartDate} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim End Date *</Form.Label>
                                                <input type="date" className="form-control" name="claimEndDate" onChange={(e) => this.handleChange(e.target)} defaultValue={this.state.claimEndDate} />
                                                < ValidationMessage valid={this.state.claimEndDateValid} message={this.state.errors.claimEndDate} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <div className="mt-4 text-center">
                                                    <button type="submit" className="btn btn-outline-primary mr-4 next" disabled={!this.state.formValid} onClick={() => this.handleSubmit()}>Next  <FontAwesomeIcon icon={faArrowAltCircleRight}/></button>
                                                    <button className="btn btn-outline-danger cancel" onClick={() => this.handleCancel()}>Cancel  <FontAwesomeIcon icon={faWindowClose}/></button>
                                                </div>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </div >
        );
    }
}
export default UpdateClaim;