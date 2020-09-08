/* eslint-disable react/prop-types */
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Card, ListGroup, ListGroupItem, CardColumns, Button } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';
import AppRouter from './AppRoute.jsx';
import { Logger } from 'react-logger-lib';
import { store } from '../reducers/store.js';
import { claimList } from '../reducers';
import { connect } from 'react-redux';
import { faEdit, faIdBadge, faUser, faAddressCard, faCheckSquare, faCalendarCheck, faCalendarTimes } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from '@fortawesome/free-solid-svg-icons';

class ViewClaim extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            claims: [],
            userName: ''
        }
    }

    componentDidMount() {
        // let userName = localStorage.getItem('username');
        // this.setState({ userName });
        axios.get(`http://localhost:3000/api/viewClaims`)
            .then(res => {
                const claims = res.data;
                this.props.claimList(claims);
            });
            store.subscribe(() => {
                this.setState(
                    { claims: store.getState() }
                )
            });
    }

    updatePage(claim) {
        window.event.preventDefault();
        Logger.of('App.ViewClaim.updatePage').info('claim data', claim);
        browserHistory.push("updateClaim/" + claim.Emp_id);
    }
    render() {
        return (

            <div>
                <AppRouter username={this.state.userName}></AppRouter>
                <Container>
                    <h3 className="text-center mt-3"><FontAwesomeIcon icon={faList}/>  Claim Summary</h3>
                    <CardColumns>
                        {this.state.claims.map((claim, index) =>

                            <Card key={index} className="text-center boxes">
                                <Card.Header>Claim Summary</Card.Header>
                                <Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem><span><FontAwesomeIcon icon={faIdBadge}/> Employee ID : </span><span>{claim.Emp_id}</span></ListGroupItem>
                                    <ListGroupItem><span><FontAwesomeIcon icon={faUser}/> Employee Name : </span>{claim.Employee_Name}</ListGroupItem>
                                    <ListGroupItem><span><FontAwesomeIcon icon={faAddressCard}/> Claim Number : </span>{claim.Claim_Number}</ListGroupItem>
                                    <ListGroupItem><span><FontAwesomeIcon icon={faCheckSquare}/> Claim Program : </span>{claim.Claim_Program}</ListGroupItem>
                                    <ListGroupItem><span><FontAwesomeIcon icon={faEdit}/> Claim Type : </span>{claim.Claim_Type}</ListGroupItem>
                                    <ListGroupItem><span><FontAwesomeIcon icon={faCalendarCheck}/> Claim Start Date : </span>{claim.Claim_Start_Date}</ListGroupItem>
                                    <ListGroupItem><span><FontAwesomeIcon icon={faCalendarTimes}/> Claim End Date : </span>{claim.Claim_End_Date}</ListGroupItem>
                                </ListGroup>
                                <Button variant="outline-primary" onClick={()=> this.updatePage(claim)}>Update <FontAwesomeIcon icon={faEdit}/></Button>
                                </Card.Body>
                            </Card>
                        )
                        }
                    </CardColumns>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        claimList: state.claims
    }
}

const mapDispatchToProps = dispatch => {
    return {
        claimList: claims => dispatch(claimList(claims))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps)(ViewClaim)
