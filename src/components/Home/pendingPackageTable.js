import React from "react";
import Table from "../Widgets/Tables/tables.js";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
class PendingPackageTable extends React.Component {
  sortingOnlyList = ["Status"];
  headings = [
    {
      label: "Package Code",
      text: "Package ID",
      colspan: "2",
      field: "packageCode"
    },
    {
      label: "Assigned Date",
      text: "Assigned Date",
      colspan: "2",
      field: "assignedDate"
    },
    {
      label: "Assigned To",
      text: "Assigned To",
      colspan: "2",
      field: "assignedTo"
    },
    {
      label: "Contact",
      text: "Contact",
      colspan: "2",
      field: "contact"
    },
    {
      label: "Deadline",
      text: "To be Submitted",
      colspan: "2",
      field: "tobeSubmitted"
    },
    {
      label: "Status",
      text: "Status",
      colspan: "2",
      type: "Overdue"
    }
  ];
  actions = [
    {
      text: "Edit",
      icon: faEdit,
      link: "/add-new-package"
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
    noResult: false,
    searchBy: "packageCode",
    items: [],
    isLoaded: true
  };

  parseDate(str) {
    const mdy = str.split("-");
    return new Date(mdy[0], mdy[1] - 1, parseInt(mdy[2]) + 1);
  }

  findDateDifference(myDate) {
    const now = new Date();
    console.log(now, myDate);
    return Math.round((myDate - now) / (1000 * 60 * 60 * 24));
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/API/query/getPendingPackages")
      .then(res => res.json())
      .then(json => {
        //Calculate if package is overdue
        json.forEach(element => {
          console.log(element);
          const myDate = this.parseDate(element["tobeSubmitted"]);
          const diff = this.findDateDifference(myDate);
          element["Overdue"] = { isOverdue: diff < 0, days: Math.abs(diff) };
        });
        this.setState({
          isLoaded: true,
          tableData: json
        });
      });
  };
  statehandler = states => {
    this.setState(states);
  };
  render() {
    var { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <h1>Loading......Start the damn Django Server you IDIOT</h1>
        </div>
      );
    } else {
      return (
        <div>
          <Table
            headings={this.headings}
            sortingOnlyList={this.sortingOnlyList}
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
}
export default PendingPackageTable;
