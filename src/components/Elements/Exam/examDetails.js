import React, { Component } from "react";

import PendingPackageTable from "../../Home/pendingPackageTable.js";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBContainer } from "mdbreact";
import PackageTable from "../Package/packageTable.js";

export class ExamDetails extends Component {
  state = {
    pending: [],
    unassigned: []
  };
  componentDidMount() {
    const examID = this.props.match.params.examID;
    fetch("http://localhost:4000/API/query/getPendingExamPackages/" + examID)
      .then(res => res.json())
      .then(json => {
        this.setState({
          pending: json
        });
      });

    fetch(
      "http://localhost:4000/API/query/getNotAssignedExamPackages/" + examID
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          unassigned: json
        });
      });
  }
  render() {
    return (
      <div>
        <MDBContainer>
          <MDBCard>
            <MDBCardHeader>
              <b>Exam Details</b>
            </MDBCardHeader>
            <MDBCardBody />
          </MDBCard>
          <MDBCard>
            <MDBCardHeader>
              <b>Pending Package Status</b>
            </MDBCardHeader>
            <MDBCardBody>
              <PendingPackageTable initialData={this.state.pending} />
            </MDBCardBody>
          </MDBCard>
          <MDBCard>
            <MDBCardHeader>
              <b>Unassigned Package Status</b>
            </MDBCardHeader>
            <MDBCardBody>
              <PackageTable initialData={this.state.unassigned} />
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    );
  }
}

export default ExamDetails;
