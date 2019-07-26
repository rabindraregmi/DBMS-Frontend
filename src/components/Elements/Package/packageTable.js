import React from 'react';
import Table from '../../Widgets/Tables/tables.js'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
class PackageTable extends React.Component {

    headings = [
        {
          label:"Package Code",
          sort:'asc',
          field:'packageCode',
        },
        {
            label: 'No Of Copies',
            sort:'asc',
            field: 'numberOfCopies',
        },
        {
            label: 'Start Code',
            sort:'asc',
            field: 'codeStart',
        },
        {
            label: 'End Code',
            sort:'asc',
            field: 'codeEnd',
        },
        {
            label:'Exam',
            sort:'asc',
            field: 'examID'
        },
        {
          label:'Status',
          sort:'asc',
          field:'status'
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
      fetch ("http://localhost:4000/API/query/getPackageList")
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