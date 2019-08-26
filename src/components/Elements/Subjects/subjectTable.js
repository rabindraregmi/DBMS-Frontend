import React,{Component,Fragment} from 'react';
import Table from '../../Widgets/Tables/tables.js'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import utils from '../../../utils/utils.js'
class SubjectTable extends Component {
    headings = 
    [
        
        {
            label: "Program",
            sort:"asc",
            field:"programName",
            grouping:true,
        },
        {
            label: "Year",
            sort:"asc",
            field:"year",
            grouping:true,
        },
        {
            label: "Part",
            sort:"asc",
            field:"part",
            grouping:true,
        },
        {
            label: "Course Code",
            sort:"asc",
            field:"courseCode",
        },
        {
            label: 'Subject Name',
            sort: 'asc',
            field:'subjectName',
        },
        
       
        

        
    ]
    
    actions = [
        {
            text: "Edit",
            icon: faEdit,
            link: "/edit-subject/"
        },
        {
            text: "Delete",
            icon: faTrash,
            link: "/delete-subject/"
        }
        ];
        quickLinks = [
            {
                text: "Add New Subject",
                link: "/add-new-subject"
            }
        ]
    
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
            this.props.postedData.forEach(element => {
                delete element.level
            });
            this.setState({
                tableData:this.props.postedData
            })
        }
        else
        {

            fetch (`${process.env.REACT_APP_BASE_URL}API/query/getSubjectList`)
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
                    quickLinks = {this.quickLinks}
                />
            </Fragment>
        )
    }
}

export default SubjectTable;