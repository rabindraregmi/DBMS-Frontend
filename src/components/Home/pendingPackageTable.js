import React from 'react'
import Table from '../Widgets/Tables/tables.js'
import Example from '../Widgets/Charts/charts.js'
class PendingPackageTable extends React.Component {
    
        headings = [
        {
            text: 'S.N',
            colspan: '1',
            type: 'sn',
        },
        {
            text: 'Package ID',
            colspan: '2',
            type: 'packageID',
        },
        {
            text: 'Assigned Date',
            colspan: '2',
            type: 'assignedDate',
        },
        {
            text: 'Assigned To',
            colspan: '2',
            type: 'assignedTo',
        },
        {
            text: 'Contact',
            colspan: '2',
            type: 'contact',
        },
        {
            text: 'To be Submitted',
            colspan: '2',
            type: 'toBeSubmitted',
        },
       


    ]
    state = {
    tableData: [{
    "packageID": "355-53-0879",
    "assignedDate": "2019/05/19",
    "assignedTo": "Ced",
    "contact": "492-683-7747",
    "To Be Submitted": "2019/02/10",
    "Action": null
  }, {
    
    "packageID": "731-41-4835",
    "assignedDate": "2018/11/16",
    "assignedTo": "Pet",
    "contact": "408-470-0079",
    "toBeSubmitted": "2018/08/12",
    "Action": null
  }, {
    
    "packageID": "397-59-0621",
    "assignedDate": "2019/04/22",
    "assignedTo": "Konstance",
    "contact": "821-839-3941",
    "toBeSubmitted": "2019/06/13",
    "action": null
  }, {
  
    "packageID": "146-32-8733",
    "assignedDate": "2018/12/31",
    "assignedTo": "Garrott",
    "contact": "688-866-6190",
    "toBeSubmitted": "2018/07/19",
    "action": null
  }, {
   
    "packageID": "845-85-4386",
    "assignedDate": "2018/12/14",
    "assignedTo": "Kissie",
    "contact": "787-343-1199",
    "toBeSubmitted": "2019/07/03",
    "Action": null
  }, {
    
    "packageID": "672-55-0523",
    "assignedDate": "2018/12/18",
    "assignedTo": "Kayne",
    "contact": "333-411-4316",
    "toBeSubmitted": "2019/04/04",
    "Action": null
  }, {
    
    "packageID": "645-46-6208",
    "assignedDate": "2019/05/28",
    "assignedTo": "Tedd",
    "contact": "403-269-6772",
    "toBeSubmitted": "2018/10/18",
    "Action": null
  }, {
    
    "packageID": "590-56-4187",
    "assignedDate": "2018/07/27",
    "assignedTo": "Cindelyn",
    "contact": "837-639-6374",
    "toBeSubmitted": "2019/05/27",
    "Action": null
  }, {
    
    "packageID": "668-29-7429",
    "assignedDate": "2018/08/11",
    "assignedTo": "Alberta",
    "contact": "360-807-9465",
    "toBeSubmitted": "2019/04/13",
    "Action": null
  }, {
    
    "packageID": "200-16-6121",
    "assignedDate": "2019/01/25",
    "assignedTo": "Krispin",
    "contact": "561-260-8052",
    "toBeSubmitted": "2019/05/24",
    "Action": null
  }],
  filtered:[],
  noResult:false,
  searchBy:'sn',
  items:[],
  isLoaded:false,
}

componentDidMount =()=> {
  fetch ("http://127.0.0.1:8000/packages/")
  .then (res=>res.json())
  .then (json=>{
    this.setState({
      isLoaded:true,
      items:json,
    })
  });

}
statehandler=(states)=>{
  this.setState(states)
  console.log(this.state)
}
render () {
    var {isLoaded} = this.state;
    if(!isLoaded){
      return(
        <div>
          <h1>Loading......Start the damn Django Server you IDIOT</h1>
        </div>
      )
    }
    else{

    
    return (
        <div>
        <Table
            headings = {this.headings}
            tableData = {this.state.noResult?this.state.filtered:this.state.tableData}
            state = {this.state}
            setState = {(states)=>this.statehandler(states)}
        />
        </div> 
        
        
    )
          }
}
}
export default PendingPackageTable;