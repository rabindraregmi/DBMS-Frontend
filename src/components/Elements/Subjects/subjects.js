import React from 'react';
import Breadcrumb from '../../Widgets/Breadcrumb/breadcrumb.js'
import Table from '../../Widgets/Tables/tables.js'


class SubjectsHome extends React.Component {

    headings = [
        {
            text:'S.N',
            colspan:'1',
            type:'sn'
            
        },
        {
            text: 'Subject Name',
            colspan: '1',
            type: 'subjectName',
        },
        {
          text:"Subject Code",
          colspan:'1',
          type:'courseCode',
        },
        {
            text:"Year",
            colspan:2,
            type:'year',
        },
        {
            text:"Part", 
            colspan:2, 
            type:'part'
        },
        {
            text:'Program',
            colspan:2,
            type:'program'
        }
        
       
    ]
    actions = []
    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        noResult:false,
        searchBy:'sn'
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