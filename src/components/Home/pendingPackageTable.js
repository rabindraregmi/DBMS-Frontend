import React from "react";
import Table from "../Widgets/Tables/tables.js";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import utils from '../../utils/utils.js';
let adbs = require("ad-bs-converter");

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
      label: "Year",
      text: "Year",
      colspan: "2",
      field: "year",
      grouping:true,
    },
    {
      label: "Part",
      text: "Part",
      colspan: "2",
      field: "part",
      grouping:true,
    },
    {
      label: "Program Name",
      colspan: "2",
      field: "programName",
      grouping:true,
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
      field: "status",
      colspan: "2",
      type: "Overdue"
    }
  ];
  actions = [
    {
      text: "Receive",
      icon: faReceipt,
      link: "/receivePackage/"
    }
  ];

  state = {
    tableData: [],
    filtered: [],
    isFiltered: false,
    searchBy: "packageCode",
    items: [],
    isLoaded: true,
    categories: {}
  };

  parseDate(str) {
    //Convert to english
    const englishDate = adbs.bs2ad(str);
    return new Date(
      englishDate.year,
      englishDate.month - 1,
      englishDate.day + 1
    );
  }

  findDateDifference(myDate) {
    const now = new Date();
    //console.log(now, myDate);
    return Math.round((myDate - now) / (1000 * 60 * 60 * 24));
  }
  formatDate(date) {
    let d = new Date(date);
    //Convert back to nepali
    const nepaliDate = adbs.ad2bs(d);
    const year = nepaliDate.en.year;
    const month = ("0" + nepaliDate.en.month).slice(-2);
    const day = ("0" + nepaliDate.en.day).slice(-2);
    return [year, month, day].join("/");
  }
  getPendingPackageFromAPI = () => {
    fetch("http://localhost:4000/API/query/getPendingPackages")
      .then(res => res.json())
      .then(json => {
        //Calculate if package is overdue
        json.forEach(element => {
          //console.log(element);
          const myDate = this.parseDate(element["tobeSubmitted"]);
          const diff = this.findDateDifference(myDate);
          element["Overdue"] = { isOverdue: diff < 0, days: Math.abs(diff) };
          element["package"] = diff < 0 ? "Overdue" : "Pending";
        });
        console.log("Element after Overdue", json);
        let categories = {};
        categories = utils.createCategories(json,this.headings)
        categories["package"] = ["Overdue"];

        this.setState({
          isLoaded: true,
          tableData: json,
          categories: categories
        });
      });
  };

  componentWillReceiveProps(props) {
    if (props.initialData) {
      console.log(this.headings);
      let json = props.initialData;
      json.forEach(element => {
        console.log(element);
        const myDate = this.parseDate(element["tobeSubmitted"]);
        const diff = this.findDateDifference(myDate);
        element["Overdue"] = { isOverdue: diff < 0, days: Math.abs(diff) };
        element["package"] = diff < 0 ? "Overdue" : "Pending";
      });
      let categories = {};
      categories = utils.createCategories(json,this.headings)
      categories["package"] = ["Overdue"];
      this.setState({
        isLoaded: true,
        tableData: json,
        categories: categories
      });
    }
  }

  componentDidMount = () => {
    if (!this.props.initialData) {
      this.getPendingPackageFromAPI();
    }
  };

  statehandler = states => {
    this.setState(states);
  };
  render() {
  
      return (
        <div className="pendingPackageTable">
          <Table
            headings={this.headings}
            sortingOnlyList={this.sortingOnlyList}
            tableData={
              this.state.isFiltered ? this.state.filtered : this.state.tableData
            }
            state={this.state}
            setState={states => this.statehandler(states)}
            actions={this.actions}
            categories={this.state.categories}
          />
        </div>
      );
    }
  
}
export default PendingPackageTable;
