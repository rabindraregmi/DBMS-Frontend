import React from 'react';
import Breadcrumb from '../../Widgets/Breadcrumb/breadcrumb.js'
import Table from '../../Widgets/Tables/tables.js'


class SubjectsHome extends React.Component {

    headings = [
        {
            text:'S.N',
            
        },
        {
            text: 'Subject Code',
            colspan: '1',
            type: 'sn',
        },
        {
          text:"Subject Name",
          colspan:'1',
          type:'id',
        },
        
       
    ]

    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        noResult:false,
        searchBy:''
    }




    render (){
        return (
            <div>
                <Breadcrumb/>
                <Table headings = {this.headings}
                        tableData = {this.state.tableData}
                />
            </div>
        )
    }

}
export default SubjectsHome;