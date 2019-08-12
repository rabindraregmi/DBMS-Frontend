import React from "react";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Table from "../../Widgets/Tables/tables.js";
class ExamTable extends React.Component {
  headings = [
    {
      label: "Date",
      sort: "asc",
      field: "date"
    },
    {
      label: "Exam Type",
      sort: "asc",
      field: "examType"
    },
    {
      label: "Course Code",
      sort: "asc",
      field: "courseCode"
    },
    {
      label: "Year",
      sort: "asc",
      field: "year"
    },
    {
      label: "Part",
      sort: "asc",
      field: "part"
    },
    {
      label: "Program Name",
      sort: "asc",
      field: "programName"
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
    }
  ];

  state = {
    tableData: [],
    filtered: [],
    searchBy: "",
    noResult: false,
    isLoaded: false
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
          this.setState({
            isLoaded: true,
            tableData: json
          });
        });
    }
  };

  statehandler = states => {
    this.setState(states);
  };
  render() {
    //let { isLoaded } = this.state;
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
        />
      </div>
    );
  }
}
export default ExamTable;
