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
      text:"Exam",
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

  state = {
    tableData: [],
    isLoaded: false,
    filtered: [],
    isFiltered: false,
    searchBy: "sn",
    categories: {}
  };

  deleteUnnecessaryTableData = (props)=>{
    let receivedProps = props;
      if (receivedProps.hasOwnProperty("postedData")) {
        receivedProps.postedData.forEach(element => {
          delete element.level
          delete element.part
          delete element.year
          delete element.programID
        });
        this.setState({
          isLoaded: true,
          tableData: receivedProps.postedData
        });
  }
}
  UNSAFE_componentWillReceiveProps = (props)=>{
    this.deleteUnnecessaryTableData(props);
    
    if (props.initialData) {
      console.log(this.headings);
      this.headings = this.headings.filter(el => {
        return el.label !== "Status";
      });
      let json = props.initialData;
      let tableData = json;
      let categories = {};
      let groupBy = this.headings.filter(header => header.grouping);
      for (let header of groupBy) {
        let groupByKeyWord = header.field;
        categories[groupByKeyWord] = [];
        for (let item of tableData) {
          //console.log("efse", item)
          if (!categories[groupByKeyWord].includes(item[groupByKeyWord])) {
            categories[groupByKeyWord].push(item[groupByKeyWord]);
          }
        }
      }
      this.setState({
        isLoaded: true,
        tableData: json,
        categories:categories
      });
    }
  }
  componentDidMount=()=>{
    if (this.props.initialData) {
      this.deleteUnnecessaryTableData(this.props);
      } else {
        fetch("http://localhost:4000/API/query/getAllPackages")
          .then(res => res.json())
          .then(json => {
            let tableData = json;
            let categories = {};
            let groupBy = this.headings.filter(header => header.grouping);
            for (let header of groupBy) {
              let groupByKeyWord = header.field;
              categories[groupByKeyWord] = [];
              for (let item of tableData) {
                //console.log("efse", item)
                if (!categories[groupByKeyWord].includes(item[groupByKeyWord])) {
                  categories[groupByKeyWord].push(item[groupByKeyWord]);
                }
              }
            } 
            this.setState({
              isLoaded: true,
              tableData: json,
              categories:categories
            });
          });
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
            this.state.isFiltered ? this.state.filtered : this.state.tableData
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
export default PackageTable;
