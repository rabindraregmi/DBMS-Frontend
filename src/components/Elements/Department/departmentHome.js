import React from 'react';
import Breadcrumb from '../../Widgets/Breadcrumb/breadcrumb.js'
import {MDBContainer} from 'mdbreact'
import Table from '../../Widgets/Tables/tables.js'


class DepartmentHome extends React.Component {

    headings = 
    [
        {
            text:'S.N',
            colspan:'1',
            type:'sn'

        },
        {
            text: 'Department Name',
            colspan: '1',
            type: 'departmentName',
        },
        
        
    ]
    actions= []
    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        noResult:false,
        searchBy:''
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
            tableData = {this.state.noResult?this.state.filtered:this.state.tableData}
            state = {this.state}
            setState = {(states)=>this.statehandler(states)}
            actions = {this.actions}
        />
            </div>
        )
    }

}
export default DepartmentHome;