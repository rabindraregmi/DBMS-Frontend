import React from 'react';
import Breadcrumb from '../../Widgets/Breadcrumb/breadcrumb.js'
import Table from '../../Widgets/Tables/tables.js'
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';

class DepartmentHome extends React.Component {

    headings = 
    [
        {
            label: 'Department Name',
            sort: 'asc',
            field:'departmentName',
        },
        
        
    ]
    quickLinks = [
        {
            text: "Add New Department",
            link: "/add-new-department"
        }
    ]
    actions = [
        {
            text: "Edit",
            icon: faEdit,
            link: "/edit-department/"
        },
        {
            text: "Delete",
            icon: faTrash,
            link: "/delete-department/"
        }
        ];
    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        isFiltered:false,
        searchBy:'departmentName'
    }
    componentDidMount =()=> {
        console.log(process.env.REACT_APP_BASE_URL)
        
        fetch (process.env.REACT_APP_BASE_URL+'API/query/getDepartmentList')
        .then (res=>res.json())
        .then(json=>{
            this.setState({
                tableData:json,
                isLoaded:true
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
            quickLinks = {this.quickLinks}
        />
            </div>
        )
    }

}
export default DepartmentHome;