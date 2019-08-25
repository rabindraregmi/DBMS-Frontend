import React,{Component,Fragment} from 'react';
import Table from '../../Widgets/Tables/tables.js'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import utils from '../../../utils/utils.js'
class ProgramTable extends Component {
    headings = 
    [
        {
            label:"Level",
            sort:"asc",
            field: "academicDegree",
            grouping: true
        },

        {
            label: "Department Name",
            sort:"asc",
            field:"departmentName",
            grouping:true,
        },
        {
            label: 'Program Name',
            sort: 'asc',
            field:'programName',
        },

       
        
        
    ]
    
    actions = [
        {
            text: "Edit",
            icon: faEdit,
            link: "/edit-program/"
        },
        {
            text: "Delete",
            icon: faTrash,
            link: "/delete-program/"
        }
        ];
    
    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        isFiltered:false,
        categories:{}
    }
    componentDidMount =()=> {
        if(this.props.hasOwnProperty("postedData"))
        {
            // let {tableData} = this.state;
            // let postedData = this.props.postedData
            // for (let index in postedData)
            // {
            //     console.log(index)
            //     let temptableData = {}
            //     temptableData["programName"] = postedData[index].programName;
            //     temptableData["departmentName"] = postedData[index].departmentID;
            //     temptableData["level"] = postedData[index].level;
            //     tableData.push(temptableData)
            // }
            // this.setState({
            //     tableData
            // })
            this.setState({
                tableData:this.props.postedData
            })
            
            
        }
        else
        {
        fetch ('http://localhost:4000/API/query/getProgramList')
        .then (res=>res.json())
        .then (json=>{

        let categories = utils.createCategories(json,this.headings) 
          this.setState({
            isLoaded:true,
            tableData:json,
            categories:categories
          })  
        })
    }
    }

    statehandler=(states)=>{
        this.setState(states)
        console.log(this.state)
      }
    render(){
        return(
            <Fragment>
                 <Table
                    headings = {this.headings}
                    tableData = {this.state.isFiltered?this.state.filtered:this.state.tableData}
                    state = {this.state}
                    setState = {(states)=>this.statehandler(states)}
                    actions = {this.actions}
                    categories = {this.state.categories}
                />
            </Fragment>
        )
    }
}

export default ProgramTable;