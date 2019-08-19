import React, { Component } from "react";
import Table from "../../Widgets/Tables/tables.js";
import {
  faTrash,
  faEdit,
  faInfo,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export class ExamListingTable extends Component {
  state = {
    tableData: [],
    filtered: [],
    noResult: false,
    isLoaded: false, 
    categories:{}
  };
  headings = [
    {
      label: "Date",
      sort: "asc",
      field: "date"
    },
    {
      label: "Exam Type",
      sort: "asc",
      field: "examType",
      grouping: true
    },
    {
      label: "Course Code",
      sort: "asc",
      field: "courseCode"
    },
    {
      label: "Year",
      sort: "asc",
      field: "year",
      grouping: true
    },
    {
      label: "Part",
      sort: "asc",
      field: "part",
      grouping: true
    },
    {
      label: "Program Name",
      sort: "asc",
      field: "programName",
      grouping: true
    }
  ];

  actions = [
    {
      text: "Edit",
      icon: faEdit,
      link: "/edit-exam/"
    },
    {
      text: "Delete",
      icon: faTrash,
      link: "/"
    },
    {
      text: "View Details",
      icon: faInfoCircle,
      link: "/exam-details/"
    }
  ];


  componentWillReceiveProps(props){

      this.setState({
          tableData: props.tableData
      })
          let tableData = props.tableData;
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

  }
  statehandler = (states) =>{
    this.setState(states)
  }

  render() {
    return (
      <Table
        headings={this.headings}
        tableData={
          this.state.noResult ? this.state.filtered : this.state.tableData
        }
        state={this.state}
        setState={states => this.statehandler(states)}
        actions={this.actions}
        categories = {this.state.categories}
      />
    );
  }
}

export default ExamListingTable;
