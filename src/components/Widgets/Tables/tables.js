import React from 'react'
import TableHeader from './tableHeader.js';
import TableBody from './tablesBody.js';
import './tables.css'
const PendingPackageTable = (props) => {
    
    const  changeSelectHandler= (event) => {
        let searchByKeyword = props.headings[event.target.value].type;
        let states = {
            searchBy:searchByKeyword
          }
        props.setState(states)
    }
    const   changeHandler = (event) => {
          
          let keyword = event.target.value;
          let searchByKeyword = props.state.searchBy;
          let filteredData = props.state.tableData.filter((item)=>{
            
          return item[String(searchByKeyword)].indexOf(keyword) >-1
          })
          props.setState({
              filtered:filteredData
          })
          if(keyword!=='' & props.state.filtered.length===0) {
              props.setState ({
                  noResult:true
              })
          }
      }
      
    const selections =()=>{
        return props.headings.map((header,i)=>{
         return(
          <option key ={i} value= {i}>{header.text}</option>
         )
        })}
  
  
  
  
    const SearchBar = ()=>{
        return(

            <div className = "form-group xxx">

        <label class="col-sm-2 col-form-label">Filter By:</label>
        <select className = "form-control selectbar" 
          onChange= {
              (event)=>changeSelectHandler(event)
            }
            >
          {selections()}
        </select>
        <input 
        type = 'text'
        className = "form-control searchbar"
        placeholder = "Search..."
        onChange= {
            (event)=>changeHandler(event)
        }
        />
        </div>
    )
    }
    console.log(props.actions)
    
    return (
        <div>
            {SearchBar()}
        <div className = "table">
             <table class="table table2 table table-advance">
                  <TableHeader headings = {props.headings}/>
                  <TableBody tableData = {props.tableData} actions = {props.actions}/>
                              
            </table>
        
        </div>
    </div>
    )
}
export default PendingPackageTable;