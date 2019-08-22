import React from 'react'
import { MDBCard, MDBCardBody, MDBCardHeader,MDBTable,MDBTableHead,MDBTableBody} from "mdbreact";


class  PackageHistory extends React.Component{
    
    state = {
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
    render(){
    return(
        <div>
            <MDBCard>
                <MDBCardHeader>Search For Packages</MDBCardHeader>
                <MDBCardBody>
                    <input type = "text" id = "packageCode_input"className = "form-element" placeholder= "Enter Package Code"></input>
                    <button className = "btn btn-sm btn-secondary" onClick= {(event)=>this.handleSearchClick(event)}>Search</button>
                    <br/><br/><br/>
                    <div>
                         {this.state.tableData.length===0?null:
                        <table className = "packageHistoryTable" style= {{width:'50%'}}>       
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


                            </tbody>
                        </table>            
                    
                            }
                    </div>
                </MDBCardBody>                    

            </MDBCard>
        </div>
    )
    }
}
export default PackageHistory;