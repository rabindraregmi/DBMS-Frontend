import React from "react";
import Table from "../../Widgets/Tables/tables.js";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

class PersonTable extends React.Component {
  headings = [
    // name,contact,courseCode,programme,year_part,subject,campus,teachingExperience,experienceinthisSubj,academicQualification,jobType,email
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: "100",
    },
    {
      label: "Contact",
      field: "contact",
      sort: "asc",
      width: 100
    },
    {
      label: "Course Code",
      sort: "asc",
      field: "courseCode",
      grouping:true
    },
    {
      label: "Programme",
      sort: "asc",
      field: "programme",
      grouping:true
    },
    {
      label: "Year/Part",
      sort: "asc",
      field: "year_part",
      grouping:true
    },
    {
      label: "Subject",
      sort: "asc",
      field: "subject"
    },
    {
      label: "Campus",
      sort: "asc",
      field: "campus"
    },
    {
      label: "Teaching Experience",
      sort: "asc",
      field: "teachingExperience"
    },
    {
      label: "Experince in this Subject",
      sort: "asc",
      field: "experienceinthisSub"
    },
    {
      label: "Academic Qualification",
      sort: "asc",
      field: "academicQualification"
    },
    {
      label: "Job Type",
      sort: "asc",
      field: "jobType"
    },
    {
      label: "Email",
      sort: "asc",
      field: "email"
    }
  ];
  actions = [
    {
      text: "Edit",
      icon: faEdit,
      link: "/edit-person/"
    },
    {
      text: "Delete",
      icon: faTrash,
      link: "/deletePerson/"
    },
    {
      text: "Assign",
      icon: faUser,
      link: "/assign-package/"
    }
  ];

  state = {
    tableData: [],
    filtered: [],
    isFiltered: false,
    categories: {},
    items: [],
    isLoaded: true
  };

  componentWillMount = () => {
    fetch("http://localhost:4000/API/query/getPerson")
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
  };

  statehandler = states => {
    this.setState(states);
  };

  render() {
    return (
      <div className="container-fluid">
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
export default PersonTable;
