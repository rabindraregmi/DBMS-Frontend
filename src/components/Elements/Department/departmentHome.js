import React from 'react';
import Breadcrumb from '../../Widgets/Breadcrumb/breadcrumb.js'
import {MDBContainer} from 'mdbreact'
import Table from '../../Widgets/Tables/tables.js'


class DepartmentHome extends React.Component {

    headings = [
        {
            text: 'Department Name',
            colspan: '1',
            type: 'sn',
        },
        {
          text:"Department Code",
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
export default DepartmentHome;