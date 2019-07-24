import React from 'react';
import Table from '../../Widgets/Tables/tables.js'
import {faEdit , faTrash} from '@fortawesome/free-solid-svg-icons'

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
                ]
    
    state= {
        tableData:[
                    {"name":"Kimberlyn Fowles","contact":"533-365-0393","address":"Serbia"},
                    {"name":"Robin Muttock","contact":"540-278-9047","address":"Madagascar"},
                    {"name":"Boonie Dammarell","contact":"216-176-4775","address":"Portugal"},
                    {"name":"Gusella Berr","contact":"430-894-4886","address":"Indonesia"},
                    {"name":"Allx Kienzle","contact":"704-802-8248","address":"Philippines"},
                    {"name":"Corey Novelli","contact":"477-991-0546","address":"Indonesia"},
                    {"name":"Brita Blount","contact":"824-453-9053","address":"Czech Republic"},
                    {"name":"Merv Mitten","contact":"663-874-8573","address":"Ukraine"},
                    {"name":"Leese Repper","contact":"682-757-8022","address":"Anguilla"},
                    {"name":"Huntlee Mazin","contact":"986-706-0539","address":"Sweden"}
                ],
                filtered:[],
                noResult:false,
                searchBy:'name',
                items:[],
                isLoaded:true,

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