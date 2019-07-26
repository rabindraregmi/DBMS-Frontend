import React from 'react'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import Table from '../../Widgets/Tables/tables.js'
class ExamTable extends React.Component{

    headings = [
        {
            text: 'S.N',
            colspan: '1',
            type: 'sn',
        },
        {
            text: 'Date',
            colspan: '2',
            type: 'date',
        },
        {
            text: 'Exam Type',
            colspan: '2',
            type: 'examType',
        },
        {
            text: 'Course Code',
            colspan: '2',
            type: 'courseCode',
        },
        {
            text: 'Year',
            colspan: '2',
            type: 'year',
        },
        {
            text: 'Part',
            colspan: '2',
            type: 'part',
        },
        {
            text: 'Program Name',
            colspan: '2',
            type: 'programName',
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

    state= {
        tableData:[],
        filtered:[],
        searchBy: '', 
        noResult: false,
        isLoaded:false,
    }

    componentWillMount = () =>{
        fetch ("http://localhost:4000/API/query/getExams")
        .then (res=>res.json())
        .then (json=>{          

          this.setState({
            isLoaded:true,
            tableData:json,
          })
        });
    }
    statehandler=(states)=>{
        this.setState(states)
      } 
    render(){
        let {isLoaded}  = this.state;
        return (
            <div className = "container-fluid">
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
export default ExamTable;