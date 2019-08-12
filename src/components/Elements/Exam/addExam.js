import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";
import { Redirect } from "react-router-dom";
import ExamTable from "./examTable.js";
class AddNewExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        level: {
          element: "select",
          value: "",
          required: true,
          labelText: "Level",
          config: {
            name: "Level",
            options: [
              { val: "Bachelors", text: "Bachelors" },
              { val: "Masters", text: "Masters" }
            ]
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationText: ""
        },
        programID: {
          element: "select",
          value: "",
          required: true,
          labelText: "Program",
          config: {
            name: "program",
            options: []
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationText: ""
        },
        year: {
          element: "select",
          value: "I",
          required: true,
          labelText: "Year",
          config: {
            name: "year",
            options: [
              { val: "I", text: "I" },
              { val: "II", text: "II" },
              { val: "III", text: "III" },
              { val: "IV", text: "IV" }
            ]
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationText: ""
        },
        part: {
          element: "select",
          value: "I",
          required: true,
          labelText: "Part",
          config: {
            name: "part",
            options: [{ val: "I", text: "I" }, { val: "II", text: "II" }]
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationText: ""
        },

        subjectID: {
          element: "select",
          value: "",
          required: true,
          labelText: "Subject",
          config: {
            name: "Subject",
            options: []
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationText: ""
        },

        examType: {
          element: "select",
          value: "Regular",
          required: true,
          labelText: "Exam Type",
          config: {
            name: "examType",
            options: [
              { val: "Regular", text: "Regular" },
              { val: "Back", text: "Back" }
            ]
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationText: ""
        },
        date: {
          element: "input",
          value: "",
          required: true,
          labelText: "Date",
          config: {
            name: "date_input",
            type: "date",
            placeholder: "Enter the date of Exam"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationText: ""
        }
      },
      error: false,
      errorText: "",
      redirect: false,
      programData: [],
      subjectData: [],
      filteredProgramData: [],
      filteredSubjectData: [],
      posted: false,
      errorOnSubmission: false,
      errorText: "",
      postedData: []
    };
  }

  componentWillMount = () => {
    console.log("This is called");

    //Edit route
    const examID = this.props.match.params.examID;
    if (examID !== undefined) {
      fetch("http://localhost:4000/API/query/getExams/" + examID)
        .then(res => res.json())
        .then(json => {
          console.log(json[0]);
          this.state.formData.date.value = json[0].date;
          this.state.formData.examType.value = json[0].examType;
          this.state.formData.level.value = "Bachelors";
          this.state.formData.part.value = json[0].part;
          this.state.formData.programID.value = "1";
          this.state.formData.subjectID.value = "1";
          this.state.formData.year.value = json[0].year;
        });
    }
    fetch("http://localhost:4000/API/query/getProgramList")
      .then(res => res.json())
      .then(json => {
        this.setState({
          programData: json
        });
      });
    fetch("http://localhost:4000/API/query/getSubjectList")
      .then(res => res.json())
      .then(json => {
        this.setState({
          subjectData: json
        });
      });
  };

  updateForm = (newState, id) => {
    console.log(id);
    this.setState({ formData: newState });

    let { programData, subjectData } = this.state;
    let { subjectID, programID, level } = this.state.formData;
    let subjectOptions = subjectID.config.options;
    let programOptions = programID.config.options;

    if (id === "level") {
      let levelValue = level.value;
      let filteredProgramData = programData.filter(item => {
        return item["academicDegree"] === levelValue;
      });
      let options1 = [];
      for (let program of filteredProgramData) {
        console.log(program);
        let temp = {};
        temp["val"] = program.programName;
        temp["text"] = program.programName;
        options1.push(temp);
      }
      this.setState({
        ...this.state,
        formData: {
          ...this.state.formData,
          programID: {
            ...this.state.formData.programID,
            config: {
              ...this.state.formData.programID.config,
              options: options1
            }
          }
        }
      });
    } else if (id === "programID" || id === "year" || id === "part") {
      let programValue = programID.value;
      let yearValue = this.state.formData.year.value;
      let partValue = this.state.formData.part.value;
      let filteredSubjectData = subjectData.filter(item => {
        return (
          item["programName"] === programValue &&
          item["year"] === yearValue &&
          item["part"] === partValue
        );
      });
      let options1 = [];
      for (let subject of filteredSubjectData) {
        console.log(subject);
        let temp = {};
        temp["val"] = subject.id;
        temp["text"] = `${subject.subjectName}  (${subject.courseCode})`;
        options1.push(temp);
      }
      this.setState({
        ...this.state,
        formData: {
          ...this.state.formData,
          subjectID: {
            ...this.state.formData.subjectID,
            config: {
              ...this.state.formData.subjectID.config,
              options: options1
            }
          }
        }
      });
    }
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    let formData = this.state.formData;
    console.log(formData);
    dataToSubmit["subjectID"] = formData["subjectID"].value;
    dataToSubmit["examType"] = formData["examType"].value;
    dataToSubmit["date"] = formData["date"].value;

    const state = this.state;
    for (let key in this.state.formData) {
      if (key === "subjectID" || key === "examType" || key === "date") {
        if (
          dataToSubmit[key] === null ||
          dataToSubmit[key].match(/^ *$/) !== null ||
          dataToSubmit[key] == 0
        ) {
          console.log("Empty ");
          state.formData[key].validationText =
            state.formData[key].labelText + " cannot be empty";
          state.formData[key].valid = false;
          this.setState(state);
          return;
        } else {
          state.formData[key].validationText = "";
          state.formData[key].valid = true;
          this.setState(state);
        }
      }
    }

    console.log(dataToSubmit);
    fetch("http://localhost:4000/API/query/addExam", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSubmit)
    })
      .then(res => {
        res.json().then(body => {
          let { postedData } = this.state;
          if (res.status === 200) {
            console.log(body.exams[0]);
            let dataToDisplay = body.exams[0];
            postedData.push(dataToDisplay);
            this.setState({
              posted: true,
              errorOnSubmission: false,
              postedData: postedData
            });
          } else {
            this.setState({
              errorOnSubmission: true,
              errorText: "Error in submission",
              posted: true
            });
          }
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          errorText: err
        });
        console.log(err);
      });
  };
  errorCheck = () => {
    const { errorOnSubmission, errorText } = this.state;
    if (errorOnSubmission) {
      return <p>{errorText}</p>;
    }
  };

  loadForm = () => {
    return (
      <form
        className="main-form"
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        {this.errorCheck()}
        <FormFields
          formData={this.state.formData}
          change={(newState, id) => this.updateForm(newState, id)}
        />
        <button
          className="btn btn-primary"
          id="save"
          onClick={event => this.submitForm(event)}
          type="submit"
        >
          Save
        </button>
        <button
          className="btn btn-secondary"
          type="reset"
          id="snc"
          onClick={event => this.submitForm(event)}
        >
          Save and Continue
        </button>
      </form>
    );
  };

  mainContent = () => {
    let { postedData, posted } = this.state;

    if (posted) {
      return (
        <div className="p">
          <div className="left-floated-form">{this.loadForm()}</div>
          <div>
            <ExamTable postedData={postedData} />
          </div>
        </div>
      );
    } else {
      return <div>{this.loadForm()}</div>;
    }
  };

  render() {
    return <div className="container-fluid">{this.mainContent()}</div>;
  }
}

export default AddNewExam;
