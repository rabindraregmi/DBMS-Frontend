import React, { Component } from "react";
import Table from "../../Widgets/Tables/tables.js";
import {
  faTrash,
  faEdit,
  faInfo,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

export class ExamListingTable extends Component {
  state = {
    tableData: [],
    filtered: [],
    noResult: false,
    isLoaded: false
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
      />
    );
  }
}

export default ExamListingTable;
