import React, { Component } from "react";

import PendingPackageTable from "../../Home/pendingPackageTable.js";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBContainer } from "mdbreact";
import PackageTable from "../Package/packageTable.js";

import ExamListingTable from "./examListingTable.js";

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
    console.log()
    const part = this.groupDetails.exams[0].part;
    const yyDate = this.groupDetails.exams[0].date.split("-")[0];
    const examType = this.groupDetails.exams[0].examType;
    fetch(
      "http://localhost:4000/API/query/getPendingExamPackages/" +
        yyDate +
        "/" +
        part +
        "/" +
        examType
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
        part +
        "/" +
        examType
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
              {this.groupDetails.exams ? <ExamListingTable tableData={this.groupDetails.exams}/>: null}
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
