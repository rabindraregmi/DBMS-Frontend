import React from 'react';

const TableHeader = (props)=> {
    const tableheader =() => {
        return props.headings.map((header,i) => {
            if (header.text=== "ID"){
                return (
                    <th className='column-{i}' hidden></th>
                )
            }
            let className = "column-"+i;
            return (
                    <th id={className}>
                        {header.text}
                    </th>
            )
        })
    }
    return (
        <thead>
            <tr>
                {tableheader()}
                    <th id = "lastColumn">Action</th>
            </tr>
        </thead>
        
    )
}
export default TableHeader;