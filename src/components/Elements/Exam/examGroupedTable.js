import React, { Component } from "react";
import {
  faTrash,
  faEdit,
  faInfo,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../Widgets/Tables/tables.js";
import { element } from "prop-types";

export class ExamGroupedTable extends Component {
  headings = [
    {
      label: "Exam Title",
      sort: "asc",
      field: "value"
    },
    {
        label: "Exam Type",
        sort: "asc",
        field: "value"
      },
      {
        label: "Part",
        sort: "asc",
        field: "value"
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
    tableData: [],
    filtered: [],
    searchBy: "",
    noResult: false,
    isLoaded: false
  };

  componentWillReceiveProps(props) {
    console.log(props.tableData);
    console.log(props.detailData);
    this.setState({
      isLoaded: true,
      tableData: props.tableData
    });
    // this.forceUpdate();
  }

  render() {
    return (
      <div className="container-fluid">
        <Table
          headings={this.headings}
          tableData={
            this.state.noResult ? this.state.filtered : this.state.tableData
          }
          state={this.state}
          setState={states => this.statehandler(states)}
          actions={this.actions}
          detailParams ={this.props.detailData}
          categories = {this.props.categories}
        />
      </div>
    );
  }
}

export default ExamGroupedTable;
