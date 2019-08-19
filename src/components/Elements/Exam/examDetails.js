import React, { Component, createElement } from "react";

import PendingPackageTable from "../../Home/pendingPackageTable.js";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdbreact";
import PackageTable from "../Package/packageTable.js";

import ExamListingTable from "./examListingTable.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons'

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
    const examType = this.groupDetails.exams[0].examType;
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
    
    switch(event.target.id){
      case "examDetail":
        document.getElementById("examDetailBody").hidden = !document.getElementById("examDetailBody").hidden;

        break;
      case "pendingPackageStatus":
          
          document.getElementById("pendingPackageStatusBody").hidden = !document.getElementById("pendingPackageStatusBody").hidden
                
        
        break;
      case "unassignedPackageStatus":
          
            document.getElementById("unassignedPackageStatusBody").hidden= !document.getElementById("unassignedPackageStatusBody").hidden
        break;
    }
  }





  render() {
    return (
      <div>
          <MDBCard>
            <MDBCardHeader className= "expandableSection" id= "examDetail" onClick= {(event)=>this.expandClickHandler(event)} >
              <b>Exam Details</b>
              <FontAwesomeIcon className = "chevronIcon" icon = {faChevronDown}/>
            </MDBCardHeader>
            <MDBCardBody id = "examDetailBody">
              {this.groupDetails.exams ? <ExamListingTable tableData={this.groupDetails.exams}/>: null}
            </MDBCardBody>
            
          </MDBCard>
          <MDBCard>
            <MDBCardHeader className= "expandableSection"  id= "pendingPackageStatus" onClick= {(event)=>this.expandClickHandler(event)}>
              <b>Pending Package Status </b>
              <FontAwesomeIcon className = "chevronIcon" icon = {faChevronDown}/>
            </MDBCardHeader>
            
            <MDBCardBody id= "pendingPackageStatusBody">
              <PendingPackageTable initialData={this.state.pending} />
            </MDBCardBody>
            
          </MDBCard>
          <MDBCard>
            <MDBCardHeader className= "expandableSection"  id= "unassignedPackageStatus" onClick= {(event)=>this.expandClickHandler(event)}>
              <b>Unassigned Package Status</b>
              <FontAwesomeIcon className = "chevronIcon" icon = {faChevronDown}/>
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
