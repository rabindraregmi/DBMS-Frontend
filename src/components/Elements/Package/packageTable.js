import React from 'react';
import Table from '../../Widgets/Tables/tables.js'

import API from '../../../utils/API.js'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
class PackageTable extends React.Component {

    headings = [
        {
            text: 'S.N',
            colspan: '1',
            type: 'sn',
        },
        {
          text:"Package Code",
          colspan:'1',
          type:'packageCode',
        },
        {
            text: 'No Of Copies',
            colspan: '2',
            type: 'numberOfCopies',
        },
        {
            text: 'Start Code',
            colspan: '2',
            type: 'codeStart',
        },
        {
            text: 'End Code',
            colspan: '2',
            type: 'codeEnd',
        },
        {
            text:'Exam',
            colspan:'2',
            type: 'examID'
        },
        {
          text:'Status',
          colspan:'2',
          type:'status'
        }
       
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
   
    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        noResult:false,
        searchBy:'sn'
    }
    componentWillMount = () =>{
      fetch ("http://localhost:4000/API/query/getPackages")
      .then (res=>res.json())
      .then (json=>{          

        this.setState({
          isLoaded:true,
          tableData:json,
        })
      });
  }
        // try
        // {

        //   let tableData = await API.get("/packages",{
        //     params:{
        //       id:1
        //     }
        //   });
        //   console.log(tableData.data)
        //   this.setState ({
        //     isLoaded:true,
        //     tableData:tableData.data
        //   })
        // }
        // catch(e){
        //   console.log(`Failed:${e}`);
        // }
      
      

      statehandler=(states)=>{
        this.setState(states)
        console.log(this.state)
      }

render () {
    var {isLoaded} = this.state;
    if(!isLoaded){
      return(
        <div>
          <h1>Loading......</h1>
        </div>
      )
    }
    else{

    
    return (
        <div>
        <Table
            headings = {this.headings}
            tableData = {this.state.noResult?this.state.filtered:this.state.tableData}
            state = {this.state}
            setState = {(states)=>this.statehandler(states)}
            actions = {this.actions}
        />
        </div> 
        
        
    )
          }
}

}
export default PackageTable;