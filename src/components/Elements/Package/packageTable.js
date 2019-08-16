import React from "react";
import Table from "../../Widgets/Tables/tables.js";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
class PackageTable extends React.Component {
  sortingOnlyList = ["Status"];
  headings = [
    {
      label: "Package Code",
      sort: "asc",
      field: "packageCode"
    },
    {
      label: "No Of Copies",
      sort: "asc",
      field: "numberOfCopies"
    },
    {
      label: "Start Code",
      sort: "asc",
      field: "codeStart"
    },
    {
      label: "End Code",
      sort: "asc",
      field: "codeEnd"
    },
    {
      label: "Exam",
      sort: "asc",
      field: "examID"
    },
    {
      label: "Status",
      sort: "asc",
      field: "status"
    }
  ];
  actions = [
    {
      text: "Edit",
      icon: faEdit,
      link: "/edit-package/"
    },
    {
      text: "Delete",
      icon: faTrash,
      link: "/"
    }
  ];

  state = {
    tableData: [],
    isLoaded: false,
    filtered: [],
    noResult: false,
    searchBy: "sn"
  };

  componentWillReceiveProps(props) {
    if (props.initialData) {
      console.log(this.headings);
      this.headings = this.headings.filter(el => {
        return el.label !== "Exam" && el.label !== "Status";
      });
      let json = props.initialData;
      this.setState({
        isLoaded: true,
        tableData: json
      });
    }
  }
  componentDidMount = () => {
    if (!this.props.initialData) {
      let receivedProps = this.props;
      if (receivedProps.hasOwnProperty("postedData")) {
        this.setState({
          isLoaded: true,
          tableData: this.props.postedData
        });
      } else {
        fetch("http://localhost:4000/API/query/getAllPackages")
          .then(res => res.json())
          .then(json => {
            this.setState({
              isLoaded: true,
              tableData: json
            });
          });
      }
    }
  };

  statehandler = states => {
    this.setState(states);
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <Table
          headings={this.headings}
          tableData={
            this.state.noResult ? this.state.filtered : this.state.tableData
          }
          state={this.state}
          setState={states => this.statehandler(states)}
          actions={this.actions}
          sortingOnlyList={this.sortingOnlyList}
        />
      </div>
    );
  }
}
export default PackageTable;
