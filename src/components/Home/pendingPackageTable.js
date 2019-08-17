import React from "react";
import Table from "../Widgets/Tables/tables.js";
import {faReceipt } from "@fortawesome/free-solid-svg-icons";

//import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
 
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
      field:'status',
      colspan: "2",
      grouping: true,
      type: "Overdue"
    }
  ];
  actions = [
    {
      text: "Receive",
      icon: faReceipt,
      link: '/receivePackage/',
    },
  ];

  state = {
    tableData: [],
    filtered: [],
    noResult: false,
    searchBy: "packageCode",
    items: [],
    isLoaded: true,
    categories:{}
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
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
} 
  getPendingPackageFromAPI= ()=>{
    fetch("http://localhost:4000/API/query/getPendingPackages")
    .then(res => res.json())
    .then(json => {
      //Calculate if package is overdue

      json.forEach(element => {
        console.log(element);
        const myDate = this.parseDate(element["tobeSubmitted"]);
        const diff = this.findDateDifference(myDate);
        element['package'] = diff<0?"Overdue":"Pending"
        element["Overdue"] = { isOverdue: diff < 0, days: Math.abs(diff) };
      });
      console.log("Element after Overdue", json)
      let categories = {}
      categories ['package'] = ["Overdue"]



    
      this.setState({
        isLoaded: true,
        tableData: json,
        categories:categories
      });
    });
  }


  componentDidMount = () => {
   this.getPendingPackageFromAPI()



  };


  statehandler = states => {
    this.setState(states);
  };
  render() {
    var { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <h1>Loading......Start the damn  Server you IDIOT</h1>
        </div>
      );
    } else {
      return (
        <div className = "pendingPackageTable">
          <Table
            headings={this.headings}
            sortingOnlyList={this.sortingOnlyList}
            tableData={
              this.state.noResult ? this.state.filtered : this.state.tableData
            }
            state={this.state}
            setState={states => this.statehandler(states)}
            actions={this.actions}
            categories = {this.state.categories}
          />
        </div>
      );
    }
  }
}
export default PendingPackageTable;
