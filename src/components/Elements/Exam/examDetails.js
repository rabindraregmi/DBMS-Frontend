import React, { Component } from "react";

import PendingPackageTable from "../../Home/pendingPackageTable.js";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdbreact";
import PackageTable from "../Package/packageTable.js";
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

  expandClickHandler = (event)=>{
    switch(event.target.id){
      case "examDetail":
          this.setState((prevState) => ({
            examDetailExpand: !prevState.examDetailExpand 
           }));
        break;
      case "pendingPackageStatus":
        this.setState((prevState)=>({
          pendingPackageExpand:!prevState.pendingPackageExpand
        }),()=>{
          
          document.getElementById("pendingPackageStatusBody").hidden= this.state.pendingPackageExpand
        });
        
        break;
      case "unassignedPackageStatus":
          this.setState((prevState) => ({
            unassignedPackageExpand: !prevState.unassignedPackageExpand 
           }), ()=>{
            document.getElementById("unassignedPackageStatusBody").hidden= this.state.unassignedPackageExpand
           });
        break;
    }
  }





  render() {
    return (
      <div>
          <MDBCard>
            <MDBCardHeader className= "expandableSection" id= "examDetail" onClick= {(event)=>this.expandClickHandler(event)} >
              <b>Exam Details</b>
            </MDBCardHeader>
            <MDBCardBody>
              {this.groupDetails.exams ? this.groupDetails.toString() : null}
            </MDBCardBody>
            
          </MDBCard>
          <MDBCard>
            <MDBCardHeader className= "expandableSection"  id= "pendingPackageStatus" onClick= {(event)=>this.expandClickHandler(event)}>
              <b>Pending Package Status </b>
            </MDBCardHeader>
            
            <MDBCardBody id= "pendingPackageStatusBody">
              <PendingPackageTable initialData={this.state.pending} />
            </MDBCardBody>
            
          </MDBCard>
          <MDBCard>
            <MDBCardHeader className= "expandableSection"  id= "unassignedPackageStatus" onClick= {(event)=>this.expandClickHandler(event)}>
              <b>Unassigned Package Status</b>
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
