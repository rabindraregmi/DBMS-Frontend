import React from "react";
//import ExamGroupedTable from "./examGroupedTable.js";

import {
  faTrash,
  faEdit,
  faInfo,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../Widgets/Tables/tables.js";


class ExamTable extends React.Component {
  

  headings = [
    {
      label: "Exam Title",
      sort: "asc",
      field: "title"
    },
    {
        label: "Exam Type",
        sort: "asc",
        field: "type",
        grouping : true

      },
      {
        label: "Part",
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
    noResult: false,
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

  componentWillMount = () => {
    let receivedProps = this.props;
    if (receivedProps.hasOwnProperty("postedData")) {
      this.setState({
        isLoaded: true,
        tableData: this.props.postedData
      });
    } else {
      fetch("http://localhost:4000/API/query/getExams")
        .then(res => res.json())
        .then(json => {
          //Group by data and year to separate exams
          json.forEach(element => {
            const examYear = element.date.split("-")[0];
            const part = element.part === "I" ? "Odd" : "Even";
            const type = element.examType;
            element.examTitle = examYear + " - " + part + "(" + type + ")";
          });
          const groups = this.groupBy(json, "examTitle");
          let groupsArr = [];
          let detailsArr = [];
          console.log(groups.length);
          Object.entries(groups).forEach(([key, value], index) => {
            groupsArr.push({
              id: index,
              title: key,
              type: value[0].examType,
              semester: value[0].part
            });
            detailsArr.push({ id: index, title: key, exams: value });
          });
          console.log(groupsArr);
          console.log(json);

          this.setState({
            isLoaded: true,
            tableData: json,
            groupedData: groupsArr,
            detailedGroupedData: detailsArr
          });

          let tableData = json;
          let categories = {};
          let groupBy = this.headings.filter(header => header.grouping);
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
          this.setState({
  
            categories: categories
          });
        });
    }
  };

  statehandler = states => {
    this.setState(states);
  };
  render() {
    return (
      <div>
       <Table
          headings={this.headings}
          tableData={
            this.state.noResult ? this.state.filtered : this.state.groupedData
          }
          state={this.state}
          setState={states => this.statehandler(states)}
          actions={this.actions}
          detailParams ={this.state.detailedGroupedData}
          categories = {this.state.categories}
        />
      </div>
    );
  }
}
export default ExamTable;
