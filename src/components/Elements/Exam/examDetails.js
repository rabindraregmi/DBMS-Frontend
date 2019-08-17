import React, { Component } from "react";

import PendingPackageTable from "../../Home/pendingPackageTable.js";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBContainer } from "mdbreact";
import PackageTable from "../Package/packageTable.js";

export class ExamDetails extends Component {
  state = {
    pending: [],
    unassigned: []
  };
  groupDetails = {};
  componentDidMount() {
    const groupID = this.props.match.params.examID;
    this.groupDetails = this.props.location.state[parseInt(groupID)];
    console.log(this.groupDetails);
    const part = this.groupDetails.exams[0].part;
    const yyDate = this.groupDetails.exams[0].date.split("-")[0];
    fetch(
      "http://localhost:4000/API/query/getPendingExamPackages/" +
        yyDate +
        "/" +
        part
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          pending: json
        });
      });

    fetch(
      "http://localhost:4000/API/query/getNotAssignedExamPackages/" +
        yyDate +
        "/" +
        part
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
            <MDBCardBody>
              {this.groupDetails.exams ? this.groupDetails.toString() : null}
            </MDBCardBody>
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
