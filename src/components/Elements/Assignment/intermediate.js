import React, { Component } from "react";
import PersonTable from "../Person/personTable.js";
import PersonForm from "../Person/person.js";
import {MDBCard, MDBCardHeader, MDBCardBody} from 'mdbreact';


import "./assignment.css";
class Intermediate extends Component {
  state = {
    isRegistered: true,
    isFormSubmitted: false,
    tableData: []
  };

  onChangeHandler = () => {
    this.setState((prevState)=>({
      isRegistered:!prevState.isRegistered
    }))
  };

  render() {
    let { isRegistered } = this.state;
    if (isRegistered) {
      return (
        <MDBCard>
          <MDBCardHeader>
          <span>Choose Person to Assign</span>
          <span
            className="notRegisteredButton"
            onClick={this.onChangeHandler}
          >
            Not Registered Yet?
          </span>
          </MDBCardHeader>
          <MDBCardBody>
          <PersonTable />

          </MDBCardBody>
         
          
        </MDBCard>
      );
    } else {
      return (
        <div>
          <button onClick={this.onChangeHandler}>Go Back</button>
          <PersonForm onSubmission={this.onChangeHandler} />
        </div>
      );
    }
  }
}

export default Intermediate;
