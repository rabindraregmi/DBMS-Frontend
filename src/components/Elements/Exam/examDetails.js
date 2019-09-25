import React, { Component } from "react";

import PendingPackageTable from "../../Home/pendingPackageTable.js";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdbreact";
import PackageTable from "../Package/packageTable.js";

import ExamListingTable from "./examListingTable.js";

import "./exams.css";
export class ExamDetails extends Component {
  state = {
    pending: [],
    unassigned: [],
    examDetailExpand: false,
    pendingPackageExpand: true,
    unassignedPackageExpand: true
  };

  groupDetails = {};

  //Group by a particular key in an array
  groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  groupExams = () => {
    fetch(process.env.REACT_APP_BASE_URL + "API/query/getExams")
      .then(res => res.json())
      .then(json => {
        //Group by data and year to separate exams
        json.forEach(element => {
          const examYear = element.date.split("/")[0];
          const part = element.part === "I" ? "Odd" : "Even";
          const type = element.examType;
          element.examTitle = examYear + " - " + part + "(" + type + ")";
        });

        const groups = this.groupBy(json, "examTitle");
        let groupsArr = [];
        let detailsArr = [];
        console.log(groups.length);
        Object.entries(groups).forEach(([key, value], index) => {
          groupsArr.push({
            id: index,
            title: key,
            type: value[0].examType,
            semester: value[0].part
          });
          detailsArr.push({ id: index, title: key, exams: value });
        });
        const groupID = this.props.match.params.examID;
        this.groupDetails = detailsArr[parseInt(groupID)];
        // this.fetchPackages();
        console.log(this.groupDetails);
          this.fetchPackages();
          this.forceUpdate();
      });
  };


  componentDidMount() {
    const groupID = this.props.match.params.examID;
    this.groupDetails = this.props.location.state[parseInt(groupID)];
    // console.log(this.groupDetails);
    // console.log()
    this.groupExams();
    this.fetchPackages();
  }

  fetchPackages = () => {
    const part = this.groupDetails.exams[0].part;
    const yyDate = this.groupDetails.exams[0].date.split("/")[0];
    const examType = this.groupDetails.exams[0].examType;
    console.log(yyDate);
    fetch(
      `${process.env.REACT_APP_BASE_URL}API/query/getPendingExamPackages/` +
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
      `${process.env.REACT_APP_BASE_URL}API/query/getNotAssignedExamPackages/` +
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
  };

  expandClickHandler = event => {
    try {
      document.getElementById(
        `${event.target.id}Body`
      ).hidden = !document.getElementById(`${event.target.id}Body`).hidden;

      document.getElementById(
        `${event.target.id}Icon`
      ).innerHTML = document.getElementById(`${event.target.id}Body`).hidden
        ? '<i class = "chevronIcon fas fa-chevron-up"></i>'
        : '<i class = "chevronIcon fas fa-chevron-down"></i>';
    } catch {
      console.error(event.target);
    }
  };

  render() {
    console.log("Rendering");
    console.log(this.groupDetails);
    return (
      <div>
        <MDBCard>
          <div
            className="card-header expandableSection"
            id="examDetail"
            onClick={event => this.expandClickHandler(event)}
          >
            <b>Exam Details</b>
            <span id="examDetailIcon">
              <i class="chevronIcon fas fa-chevron-down" />
            </span>
            {/* <FontAwesomeIcon className = "chevronIcon" icon = {faChevronUp}/> */}
          </div>

          <MDBCardBody id="examDetailBody">
            {this.groupDetails.exams ? (
              <ExamListingTable tableData={this.groupDetails.exams} />
            ) : null}
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBCardHeader
            className="expandableSection"
            id="pendingPackageStatus"
            onClick={event => this.expandClickHandler(event)}
          >
            <b>Pending Package Status </b>
            <span id="pendingPackageStatusIcon">
              <i class="chevronIcon fas fa-chevron-down" />
            </span>
            {/* <FontAwesomeIcon className = "chevronIcon" icon = {faChevronUp}/> */}
          </MDBCardHeader>

          <MDBCardBody id="pendingPackageStatusBody">
            <PendingPackageTable initialData={this.state.pending} />
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBCardHeader
            className="expandableSection"
            id="unassignedPackageStatus"
            onClick={event => this.expandClickHandler(event)}
          >
            <b>All Package Status</b>
            <span id="unassignedPackageStatusIcon">
              <i class="chevronIcon fas fa-chevron-down" />
            </span>
            {/* <FontAwesomeIcon className = "chevronIcon" icon = {faChevronUp}/> */}
          </MDBCardHeader>
          <MDBCardBody id="unassignedPackageStatusBody">
            <PackageTable initialData={this.state.unassigned} />
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export default ExamDetails;
