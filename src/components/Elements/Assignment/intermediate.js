import React, { Component } from "react";
import PersonTable from "../Person/personTable.js";
import PersonForm from "../Person/person.js";
import {MDBCard, MDBCardHeader, MDBCardBody} from 'mdbreact';
import BreadCrumbs from '../../Widgets/Breadcrumb/breadcrumb.js'
import {Link} from 'react-router-dom';
import "./assignment.css";

const breadCrumbItem = [
  {
    text:"Person Table",
    link:"/intermediate"
  },
  ]


class Intermediate extends Component {
  state = {
    tableData: []
  };

  render() {
   
      return (
        <React.Fragment>
          <BreadCrumbs breadcrumbItems = {breadCrumbItem}/>
        <MDBCard>
          <MDBCardHeader>
          <span>Choose Person to Assign</span>
          <Link to="/add-new-person">
            Not Registered Yet?
          </Link>
          </MDBCardHeader>
          <MDBCardBody>
          <PersonTable />

          </MDBCardBody>
          </MDBCard>
        </React.Fragment>
      );
  }
}

export default Intermediate;
