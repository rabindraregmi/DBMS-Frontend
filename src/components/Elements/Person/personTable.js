import React from 'react';
import Table from '../../Widgets/Tables/tables.js'
import {faEdit , faTrash, faUser} from '@fortawesome/free-solid-svg-icons'

class PersonTable extends React.Component {
    headings = [
        {
            text: 'S.N',
            colspan: '1',
            type: 'sn',
        },
        {
            text: 'Name',
            colspan: '2',
            type: 'name',
        },
        {
            text: 'Contact',
            colspan: '2',
            type: 'contact',
        },
        {
            text: 'Address',
            colspan: '2',
            type: 'address',
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
                {
                    text: 'Assign',
                    icon:faUser,
                    link: '/assign-package/'
                }
                ]
    
    state= {
        tableData:[],
                filtered:[],
                noResult:false,
                searchBy:'name',
                items:[],
                isLoaded:true,

    }

    componentWillMount = ()=>{
        fetch ("API/query/getPerson")
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
    
    render (){
        return(
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
export default PersonTable;