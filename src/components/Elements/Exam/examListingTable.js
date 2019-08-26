import React, { Component } from "react";
import Table from "../../Widgets/Tables/tables.js";
import {
  faTrash,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import utils from '../../../utils/utils.js';

export class ExamListingTable extends Component {
  state = {
    tableData: [],
    filtered: [],
    isFiltered: false,
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
    },

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
  ];
UNSAFE_componentWillReceiveProps=(props)=>{
    if (props.hasOwnProperty("postedData")) {
      props.postedData.forEach(element => {
        delete element.academicDegree
        delete element.programID
      });
      this.setState({
        isLoaded: true,
        tableData:this.props.postedData
      });
    }
    else
    {
          let tableData =props.tableData;
          tableData.forEach(element => {
            delete element.examTitle
          });
          let categories = utils.createCategories(tableData,this.headings)
          this.setState({
            tableData:tableData,
            categories: categories
          });
        }

}

  componentDidMount=()=>{
    if (this.props.hasOwnProperty("postedData")) {
      this.props.postedData.forEach(element => {
        delete element.academicDegree
        delete element.programID
      });
      this.setState({
        isLoaded: true,
        tableData:this.props.postedData
      });
    }
}
  statehandler = (states) =>{
    this.setState(states)
  }

  render() {
    return (
      <Table
        headings={this.headings}
        tableData={
          this.state.isFiltered ? this.state.filtered : this.state.tableData
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
