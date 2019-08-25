import React, { Component } from "react";
import PersonTable from "../Person/personTable.js";
import PersonForm from "../Person/person.js";
import {MDBCard, MDBCardHeader, MDBCardBody} from 'mdbreact';
import BreadCrumbs from '../../Widgets/Breadcrumb/breadcrumb.js'

import "./assignment.css";

const breadCrumbItem = [
  {
    text:"Person Table",
    link:"/intermediate"
  },
  ]


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
        <React.Fragment>
          <BreadCrumbs breadcrumbItems = {breadCrumbItem}/>
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
        </React.Fragment>
      );
    } else {
      return (
        <div>
           <BreadCrumbs breadcrumbItems = {[{text:"Person Table", link:"/intermediate"},{text:"Add New Person", link:"#"}]}/>
          <button className ="btn btn-md  btn-secondary"onClick={this.onChangeHandler}>Go Back</button>
          <PersonForm onSubmission={this.onChangeHandler} />
        </div>
      );
    }
  }
}

export default Intermediate;
