import React from "react";
//import ExamGroupedTable from "./examGroupedTable.js";

import {
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../Widgets/Tables/tables.js";
import utils from '../../../utils/utils.js';



class ExamTable extends React.Component {
  
   quickLinks  = [
    {text:"Add New Exam",link:"/add-new-exam"}
  ]
  headings = [
    {
      label: "Exam Year",
      sort: "asc",
      field: "examYear",
      grouping:true
    },
    {
        label: "Exam Type",
        text: "Exam Type",
        sort: "asc",
        field: "type",
        grouping : true

      },
      {

        label: "Part",
        text: "Part",
        sort: "asc",
        field: "semester",
        grouping: true
      }
  ];

  actions = [
    {
      text: "Details",
      icon: faInfoCircle,
      link: "/exam-details/"
    }
  ];
  
  
  state = {
    tableData:[],
    filtered: [],
    searchBy: "",
    isFiltered: false,
    isLoaded: false,
    groupedData: [],
    detailedGroupedData: [],
    categories: {}
  };

  //Group by a particular key in an array
  groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  fetchExamFromAPI = ()=>{
    fetch(process.env.REACT_APP_BASE_URL+"API/query/getExams")
    .then(res => res.json())
    .then(json => {
      //Group by data and year to separate exams
      json.forEach(element => {
        let examYear = element.date.split("/")[0];
        const examMonth = element.date.split("/")[1];
        const part = element.part === "I" ? "Odd" : "Even";
        const type = element.examType;
        if(type==="Regular"&&(examMonth==='1'))
          examYear = examYear-1
        element.examTitle = examYear + " - " + part + "(" + type + ")";
        element.examYear= examYear
      });
      
      const groups = this.groupBy(json, "examTitle");
      let groupsArr = [];
      let detailsArr = [];
      // console.log(groups.length);
      Object.entries(groups).forEach(([key, value], index) => {
        groupsArr.push({
          id: index,
          examYear: value[0].examYear,
          type: value[0].examType,
          semester: value[0].part
        });
        detailsArr.push({ id: index, title: key, exams: value });
      });


      let categories = utils.createCategories(groupsArr,this.headings);
      this.setState({
        isLoaded: true,
        tableData: groupsArr,
        groupedData: groupsArr,
        detailedGroupedData: detailsArr,
        categories: categories
      });
    });
  }
  componentWillMount = () => {
    this.fetchExamFromAPI();
  };

  statehandler = states => {
    this.setState(states);
  };
  render() {
    //let { isLoaded } = this.state;
    return (
      //   <div className="container-fluid">
      //     <Table
      //       headings={this.headings}
      //       tableData={
      //         this.state.noResult ? this.state.filtered : this.state.tableData
      //       }
      //       state={this.state}
      //       setState={states => this.statehandler(states)}
      //       actions={this.actions}
      //     />
      //   </div>
      <div>
       <Table
          headings={this.headings}
          tableData={
            this.state.isFiltered ? this.state.filtered : this.state.groupedData
          }
          state={this.state}
          setState={states => this.statehandler(states)}
          actions={this.actions}
          detailParams ={this.state.detailedGroupedData}
          categories = {this.state.categories}
          quickLinks = {this.quickLinks}
        />
      </div>
    );
  }
}
export default ExamTable;
