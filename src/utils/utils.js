import React, { Component } from 'react';

class Util extends Component {

    createCategories = (tableData,headings)=>{
        //console.log(tableData,headings)
        let categories = {};
        let groupBy = headings.filter(header => header.grouping);
        for (let header of groupBy) {
            let groupByKeyWord = header.field;
            categories[groupByKeyWord] = [];
        for (let item of tableData) {
            //console.log("efse", item)
          if (!categories[groupByKeyWord].includes(item[groupByKeyWord])) {
            categories[groupByKeyWord].push(item[groupByKeyWord]);
          }
        }
    }
    return categories;
    }
    render(){
        return(<h1></h1>)
    }
}
export default new Util();