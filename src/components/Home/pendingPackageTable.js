import React from 'react'
import Table from '../Widgets/Tables/tables.js'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
class PendingPackageTable extends React.Component {
    
        headings = [
        {
            text: 'S.N',
            colspan: '1',
            type: 'sn',
        },
        {
            text: 'Package ID',
            colspan: '2',
            type: 'packageID',
        },
        {
            text: 'Assigned Date',
            colspan: '2',
            type: 'assignedDate',
        },
        {
            text: 'Assigned To',
            colspan: '2',
            type: 'assignedTo',
        },
        {
            text: 'Contact',
            colspan: '2',
            type: 'contact',
        },
        {
            text: 'To be Submitted',
            colspan: '2',
            type: 'toBeSubmitted',
        },
    ]
    actions = [{
      text: 'Edit', 
      icon: faEdit, 
      link: '/',
      },
      {
      text: 'Delete', 
      icon: faTrash, 
      link: '/',
      },
      ]

    state = {
    tableData: [],
  filtered:[],
  noResult:false,
  searchBy:'packageCode',
  items:[],
  isLoaded:true,
}

componentDidMount =()=> {
    fetch ('http://localhost:4000/API/query/getPendingPackages')
    .then (res=>res.json())
    .then (json=>{
      this.setState({
        isLoaded:true,
        tableData:json,
      })
      
    })
}
statehandler=(states)=>{
  this.setState(states)
  console.log(this.state)
}
render () {
            var {isLoaded} = this.state;
            if(!isLoaded){
              return(
                <div>
                  <h1>Loading......Start the damn Django Server you IDIOT</h1>
                </div>
              )
            }
            else
            {
              return (
                    <div>
                    <Table
                        headings = {this.headings}
                        tableData = {this.state.noResult?this.state.filtered:this.state.tableData}
                        state = {this.state}
                        setState = {(states)=>this.statehandler(states)}
                        actions  = {this.actions}
                    />
                    </div> 
                )
              }
          }
}
export default PendingPackageTable;
