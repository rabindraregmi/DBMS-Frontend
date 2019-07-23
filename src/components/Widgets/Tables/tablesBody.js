import React from 'react';
import { objectTypeSpreadProperty } from '@babel/types';

const TableBody = (props)=> {


    
    const renderElement = (elements) =>{
        
        return Object.entries(elements).map((element,index)=>{
            //console.log(elements,index)
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
    const tableBody =() => {
       let tableData = props.tableData;
       let template=null;
        return tableData.map((elements,index)=>{
            return (
                
                <tr key= {index}>
                    <td>{index+1}</td>
                    {renderElement (elements)}
                    
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