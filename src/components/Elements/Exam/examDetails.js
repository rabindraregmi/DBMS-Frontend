import React, { Component } from "react";

import PendingPackageTable from "../../Home/pendingPackageTable.js";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdbreact";
import PackageTable from "../Package/packageTable.js";

import ExamListingTable from "./examListingTable.js";

import './exams.css';
export class ExamDetails extends Component {
  state = {
    pending: [],
    unassigned: [],
    examDetailExpand:false,
    pendingPackageExpand:true,
    unassignedPackageExpand: true
  };
  
  groupDetails = {};

  componentDidMount() {
    console.log("This is props", this.props)
    const groupID = this.props.match.params.examID;
    this.groupDetails = this.props.location.state[parseInt(groupID)];
    // console.log(this.groupDetails);
    // console.log()
    const part = this.groupDetails.exams[0].part;
    const yyDate = this.groupDetails.exams[0].date.split("-")[0];
    //const examType = this.groupDetails.exams[0].examType;
    fetch(
      "http://localhost:4000/API/query/getPendingExamPackages/" +
        yyDate +
        "/" +
        part 
        //+
        // "/" +
        // examType
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
        //+
        // "/" +
        // examType
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          unassigned: json
        });
      });
  }

  expandClickHandler = (event)=>{
    try{

      document.getElementById(`${event.target.id}Body`).hidden = !document.getElementById(`${event.target.id}Body`).hidden;
      
      
      document.getElementById(`${event.target.id}Icon`).innerHTML = document.getElementById(`${event.target.id}Body`)
      .hidden?'<i class = "chevronIcon fas fa-chevron-up"></i>':'<i class = "chevronIcon fas fa-chevron-down"></i>';
    }
    catch
    {
      console.error(event.target)
    }
  }





  render() {
    return (
      <div>
          <MDBCard>
            

            <div className="card-header expandableSection" id= "examDetail" onClick= {(event)=>this.expandClickHandler(event)}>
              <b>Exam Details</b>
              <span id="examDetailIcon"><i class = "chevronIcon fas fa-chevron-down"/></span>
              {/* <FontAwesomeIcon className = "chevronIcon" icon = {faChevronUp}/> */}
            </div>
            
            <MDBCardBody id = "examDetailBody">
              {this.groupDetails.exams ? <ExamListingTable tableData={this.groupDetails.exams}/>: null}
            </MDBCardBody>
            
          </MDBCard>
          <MDBCard>
            <MDBCardHeader className= "expandableSection"  id= "pendingPackageStatus" onClick= {(event)=>this.expandClickHandler(event)}>
              <b>Pending Package Status </b>
              <span id="pendingPackageStatusIcon"><i class = "chevronIcon fas fa-chevron-down"/></span>
              {/* <FontAwesomeIcon className = "chevronIcon" icon = {faChevronUp}/> */}
            </MDBCardHeader>
            
            <MDBCardBody id= "pendingPackageStatusBody">
              <PendingPackageTable initialData={this.state.pending} />
            </MDBCardBody>
            
          </MDBCard>
          <MDBCard>
            <MDBCardHeader className= "expandableSection"  id= "unassignedPackageStatus" onClick= {(event)=>this.expandClickHandler(event)}>
              <b>Unassigned Package Status</b>
              <span id="unassignedPackageStatusIcon"><i class = "chevronIcon fas fa-chevron-down"/></span>
              {/* <FontAwesomeIcon className = "chevronIcon" icon = {faChevronUp}/> */}
            </MDBCardHeader>
            <MDBCardBody id= "unassignedPackageStatusBody">
              <PackageTable initialData={this.state.unassigned} />
            </MDBCardBody>
           
          </MDBCard>
      </div>
    );
  }
}

export default ExamDetails;
