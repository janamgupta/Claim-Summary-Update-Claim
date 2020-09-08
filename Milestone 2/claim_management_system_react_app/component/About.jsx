import React from 'react';
import AppRouter from './AppRoute.jsx';
import {Container, Row, Col} from 'react-bootstrap';
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }
  componentDidMount() {
    let userName = localStorage.getItem('username');
    this.setState({userName});
  }
  render() {
    return (
      <div>
        <AppRouter username = {this.state.userName}></AppRouter>
        <Container className="mt-5 mb-5">
          <Row>
            <Col lg={12} className="text-center">
              <h1 className="mt-5">About</h1>
              <p className="lead">
                  We are Claim Summary and Update Claim. 
                  We help client to see all the active claims and update those claim info if required.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default About;