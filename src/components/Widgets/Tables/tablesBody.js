import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import {Link } from 'react-router-dom';
const TableBody = (props)=> {
    const handleClick=(event)=>{
        console.log(event.target.id)

    }
    
    let id; 
    const renderElement = (elements) =>{
        
        return Object.entries(elements).map((element,index)=>{
            //console.log(element)
            if (element[0]==='id'){
                id = element[1];
                return (
                <td key = {index} hidden>
                    {element[1]}
                </td>
                )
            }
            return (
                <td id = {id} key = {index} onClick = {(event)=>handleClick(event)}>
                    {element[1]}
                </td>
            )
        })

    }
    const renderActions = ()=>{
        return props.actions.map((action,index)=>{
            return (
                <div id ={`${action.text}-${id}`} className = "action-element">
                    <Link to = {`${action.link}${id}`}>
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
    
        return template;
    }
        
    

    return (
            <tbody>
                
                {tableBody()}
            </tbody>
        )
}
export default TableBody;