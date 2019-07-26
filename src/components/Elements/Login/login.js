import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { withRouter } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const path = "/home";
    this.props.history.push(path);
  };
  render() {
    return (
      <div className="container">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">Login</p>
                <div className="grey-text">
                  <MDBInput
                    id="username"
                    label="Username"
                    icon="user"
                    group
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    id="password"
                    onChange={this.handleChange}
                    label="Password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <MDBBtn color="primary" onClick={this.handleSubmit}>
                  Login
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default withRouter(Login);
