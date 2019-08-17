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
            field:'year',
            grouping:true,
        },
        {
            label:"Part", 
            sort:'asc', 
            field:'part',
            grouping:true,
        },
        {
            label:'Program',
            sort:'asc',
            field:'programName',
            grouping:true
        }
        
       
    ]
    actions = []
    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        noResult:false,
        searchBy:'subjectName',
        
        filterBy:'year',
        filterSelection: '',
        categories:{}
    }
    componentWillMount =()=> {
        fetch ('http://localhost:4000/API/query/getSubjectList')
        .then (res=>res.json())
        .then (json=>{
          let tableData = json;
          let categories = {}
          let groupBy = this.headings.filter((header)=>header.grouping)
          for (let header of groupBy)
          {
            let groupByKeyWord = header.field;
            categories[groupByKeyWord] = []
            for (let item of tableData){
                //console.log("efse", item)
                if (!categories[groupByKeyWord].includes(item[groupByKeyWord]))
                {
                    categories[groupByKeyWord].push(item[groupByKeyWord])
                }
            }
          }
          
            this.setState({
            isLoaded:true,
            tableData:json,
            categories:categories
          })
          
        })
    }


    statehandler=(states)=>{
        console.log("This is another State",states)
        this.setState(states)
        
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
                    categories = {this.state.categories}
                
                />
            </div>
        )
    }

}
export default SubjectsHome;