import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import {Link } from 'react-router-dom';
const TableBody = (props)=> {


    
    const renderElement = (elements) =>{
        
        return Object.entries(elements).map((element,index)=>{
            if (element[0]==='id'){
                return (
                <td key = {index} hidden>
                    {element[1]}
                </td>
                )
            }
            return (
                <td key = {index}>
                    {element[1]}
                </td>
            )
        })

    }
    const renderActions = ()=>{
        return props.actions.map((action,index)=>{
            return (
                <div className = "action-element">
                    <Link to = {action.link}>
                    <FontAwesomeIcon icon = {action.icon}/>
                    </Link>
               
                </div>
            )
        })
    }
    const tableBody =() => {
       let tableData = props.tableData;
       let template=null;
        return tableData.map((elements,index)=>{
            return (
                
                <tr key= {index}>
                    <td>{index+1}</td>
                    {renderElement (elements)}
                    <td className = 'action'>
                    {renderActions()}

                    </td>
                    
                </tr>
            )
       }) 
       
       // for (let elements of tableData){
        //     Object.values(elements).map((element,index)=>{
               
        //     })
        // }
        return template;
    }
        
    

    return (
            <tbody>
                
                {tableBody()}
            </tbody>
        )
}
export default TableBody;