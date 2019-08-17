import React from "react";
import {
  faTrash,
  faEdit,
  faInfo,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../Widgets/Tables/tables.js";
import ExamGroupedTable from "./examGroupedTable.js";
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
    },
    {
      text: "View Details",
      icon: faInfoCircle,
      link: "/exam-details/"
    }
  ];

  state = {
    tableData: [],
    filtered: [],
    searchBy: "",
    noResult: false,
    isLoaded: false,
    groupedData: [],
    detailedGroupedData: []
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
            element.examTitle = examYear + " " + part;
          });
          const groups = this.groupBy(json, "examTitle");
          let groupsArr = [];
          let detailsArr = [];
          console.log(groups.length);
          Object.entries(groups).forEach(([key, value], index) => {
            groupsArr.push({ id: index, title: key });
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
        });
    }
  };

  statehandler = states => {
    this.setState(states);
  };
  render() {
    //let { isLoaded } = this.state;
    return (
      //   <div className="container-fluid">
      //     <Table
      //       headings={this.headings}
      //       tableData={
      //         this.state.noResult ? this.state.filtered : this.state.tableData
      //       }
      //       state={this.state}
      //       setState={states => this.statehandler(states)}
      //       actions={this.actions}
      //     />
      //   </div>
      <div>
        <ExamGroupedTable
          tableData={this.state.groupedData}
          detailData={this.state.detailedGroupedData}
        />
      </div>
    );
  }
}
export default ExamTable;
