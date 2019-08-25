import React from "react";
import Table from "../../Widgets/Tables/tables.js";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import utils from '../../../utils/utils.js';
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
      text: "Exam",
      sort: "asc",
      field: "examName",
     
    },
    {
      label: "Year",
      sort: "asc",
      field: "year",
      grouping:true
    },
    {
      label: "Part",
      sort: "asc",
      field: "part",
      grouping:true
    },
    {
      label: "Subject Name",
      sort: "asc",
      field: "subjectName",
      grouping:true
    },
    {
      label: "Status",
      sort: "asc",
      field: "status",
      grouping:true
    },

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
  quickLinks = [
    {
      text:"Add New Package",
      link:"/add-new-package"
    },
    {
      text:"Add New Exam",
      link:"/add-new-Exam"
    },

  ]

  state = {
    tableData: [],
    isLoaded: false,
    filtered: [],
    isFiltered: false,
    categories: {}
  };
  deleteUnnecessaryTableData = props => {
    let receivedProps = props;
    if (receivedProps.hasOwnProperty("postedData")) {
      receivedProps.postedData.forEach(element => {
        delete element.level;
        delete element.part;
        delete element.year;
        delete element.programID;
      });
      this.setState({
        isLoaded: true,
        tableData: receivedProps.postedData
      });
    }
  };

  UNSAFE_componentWillReceiveProps = props => {
    this.deleteUnnecessaryTableData(props);
    
    if (props.initialData) {
      console.log(this.headings);
      this.headings = this.headings.filter(el => {
        return el.label !== "Status";
      });
      let json = props.initialData;
      let categories = utils.createCategories(json,this.headings);
      this.setState({
        isLoaded: true,
        tableData: json,
        categories: categories
      });
    }
  };

  componentDidMount() {
    console.log(this.props.initialData);
    if (this.props.initialData) {
      this.deleteUnnecessaryTableData(this.props);
    } else {
      fetch("http://localhost:4000/API/query/getAllPackages")
        .then(res => res.json())
        .then(json => {
          let categories =utils.createCategories(json,this.headings);
          this.setState({
            isLoaded: true,
            tableData: json,
            categories: categories
          });
        });
    }
  }

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
export default PackageTable;
