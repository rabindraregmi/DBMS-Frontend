import React from 'react';
import Breadcrumb from '../../Widgets/Breadcrumb/breadcrumb.js'
import Table from '../../Widgets/Tables/tables.js'


class DepartmentHome extends React.Component {

    headings = 
    [
        {
            label: 'Department Name',
            sort: 'asc',
            field:'departmentName',
        },
        
        
    ]
    actions= []
    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        isFiltered:false,
        searchBy:'departmentName'
    }
    componentDidMount =()=> {
        fetch ('http://localhost:4000/API/query/getDepartmentList')
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



    render (){
        return (
            <div>
                <Breadcrumb/>
                <Table
            headings = {this.headings}
            tableData = {this.state.isFiltered?this.state.filtered:this.state.tableData}
            state = {this.state}
            setState = {(states)=>this.statehandler(states)}
            actions = {this.actions}
        />
            </div>
        )
    }

}
export default DepartmentHome;