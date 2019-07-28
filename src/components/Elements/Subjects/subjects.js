import React from 'react';
import Breadcrumb from '../../Widgets/Breadcrumb/breadcrumb.js'
import Table from '../../Widgets/Tables/tables.js'


class SubjectsHome extends React.Component {

    headings = [
        {
            label: 'Subject Name',
            sort: 'asc',
            field: 'subjectName',
        },
        {
          label:"Course Code",
          sort:'asc',
          field:'courseCode',
        },
        {
            label:"Year",
            sort:'asc',
            type:'year',
        },
        {
            label:"Part", 
            sort:'asc', 
            field:'part'
        },
        {
            label:'Program',
            sort:'asc',
            field:'program'
        }
        
       
    ]
    actions = []
    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        noResult:false,
        searchBy:'subjectName'
    }
    componentDidMount =()=> {
        fetch ('http://localhost:4000/API/query/getSubjectList')
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
export default SubjectsHome;