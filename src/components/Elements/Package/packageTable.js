import React from 'react';
import Table from '../../Widgets/Tables/tables.js'
import API from '../../../utils/API.js'
class PackageTable extends React.Component {

    headings = [
        {
            text: 'S.N',
            colspan: '1',
            type: 'sn',
        },
        {
          text:"ID",
          colspan:'1',
          type:'id',
        },
        {
            text: 'Package ID',
            colspan: '2',
            type: 'packageID',
        },
        {
            text: 'Arrived Data',
            colspan: '2',
            type: 'arrivedDate',
        },
        {
            text: 'No Of Copies',
            colspan: '2',
            type: 'numberOfCopies',
        },
        {
            text: 'Start Code',
            colspan: '2',
            type: 'startingCode',
        },
        {
            text: 'End Code',
            colspan: '2',
            type: 'endingCode',
        },
        {
            text:'Exam',
            colspan:'2',
            type: 'exam'
        }
       
    ]
   
    state= {
        tableData:[],
        isLoaded:false,
        filtered:[],
        noResult:false,
        searchBy:'sn'
    }
    // print=(json)=>
    // { let dataToDisplay = []
    //   json.map((item,index)=>{
    //     dataToDisplay.push(item)

    //   })
    //   console.log(dataToDisplay)
    //   return json;
    // }
    async componentDidMount () {
        // fetch ("http://127.0.0.1:8000/packages/")
        // .then (res=>res.json())
        // .then (json=>{
        //   // let dataToDisplay =this.print(json)          
          

        //   this.setState({
        //     isLoaded:true,
        //     tableData:json,
        //   })
        // });
        try
        {

          let tableData = await API.get("/packages",{
            params:{
              id:1
            }
          });
          console.log(tableData.data)
          this.setState ({
            isLoaded:true,
            tableData:tableData.data
          })
        }
        catch(e){
          console.log(`Failed:${e}`);
        }
      
      }

      statehandler=(states)=>{
        this.setState(states)
        console.log(this.state)
      }

render () {
    var {isLoaded, item} = this.state;
    if(!isLoaded){
      return(
        <div>
          <h1>Loading......</h1>
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
export default PackageTable;