import React from 'react';
import AppRouter from './AppRoute.jsx';
import {Container, Row, Col} from 'react-bootstrap';
class Main extends React.Component {
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
              <h1 className="mt-5">WELCOME</h1>
              <p className="lead">View and Update Claim Summary</p>
              <ul className="list-unstyled">
                <li>View Claim</li>
                <li>Update Claim</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Main;