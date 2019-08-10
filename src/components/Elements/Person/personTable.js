import React from "react";
import Table from "../../Widgets/Tables/tables.js";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { MDBDataTable } from "mdbreact";

class PersonTable extends React.Component {
  headings = [
    // name,contact,courseCode,programme,year_part,subject,campus,teachingExperience,experienceinthisSubj,academicQualification,jobType,email
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: "100"
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
      field: "courseCode"
    },
    {
      label: "Programme",
      sort: "asc",
      field: "programme"
    },
    {
      label: "Year/Part",
      sort: "asc",
      field: "year_part"
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
    noResult: false,
    searchBy: "name",
    items: [],
    isLoaded: true
  };

  componentWillMount = () => {
    fetch("http://localhost:4000/API/query/getPerson")
      .then(res => res.json())
      .then(json => {
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
export default PersonTable;
