import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {
state = {
  modal: true,
  tableData:[]
}
handleSearchClick = (event) =>{
    event.preventDefault();
    let packageCode = document.getElementById("packageCode_input").value
    if(packageCode!==''){
        fetch(`http://127.0.0.1:4000/API/query/getOnepackage/${packageCode}`)
        .then(res=>res.json())
        .then(json=>{
            this.setState({tableData:json})
        })
    }
    else{
        console.log("Empty")
    }
}

componentDidMount = ()=>{
    if(this.props.match.params.packageCode)
    {
        fetch(`http://127.0.0.1:4000/API/query/getOnepackage/${this.props.match.params.packageCode}`)
        .then(res=>res.json())
        .then(json=>{
            this.setState({tableData:json})
        })
    }

}
toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  return (
    <MDBContainer>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader>Package Information</MDBModalHeader>
        <MDBModalBody>
        <input type = "text" id = "packageCode_input"className = "form-element" placeholder= "Enter Package Code"></input>
                    <button className = "btn btn-sm btn-secondary" onClick= {(event)=>this.handleSearchClick(event)}>Search</button>
                    <br/><br/><br/>
                    <div>
                         {this.state.tableData.length===0?null:
                        <table className = "packageHistoryTable" style= {{width:'100%'}}>       
                            <thead hidden>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Package Code</td>
                                    <td>{this.state.tableData[0].packageCode}</td>
                                </tr>
                                <tr>
                                    <td>Year</td>
                                    <td>{this.state.tableData[0].year}</td>
                                </tr>
                                <tr>
                                    <td>Part</td>
                                    <td>{this.state.tableData[0].part}</td>
                                </tr>
                                <tr>
                                    <td>Assigned To</td>
                                    <td>{this.state.tableData[0].assignedTo}</td>
                                </tr>
                                <tr>
                                    <td>Assignment Date</td>
                                    <td>{this.state.tableData[0].dateOfAssignment}</td>
                                </tr>
                                <tr>
                                    <td>Submission Date</td>
                                    <td>{this.state.tableData[0].dateOfSubmission}</td>
                                </tr>
                                <tr>
                                    <td>Subject Name</td>
                                    <td>{this.state.tableData[0].subjectName}</td>
                                </tr>


                            </tbody>
                        </table>            
                    
                            }
                    </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.props.history.goBack}>Close</MDBBtn>
          <MDBBtn color="primary" onClick= {this.props.history.goBack}>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalPage;