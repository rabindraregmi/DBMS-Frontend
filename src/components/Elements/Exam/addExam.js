import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";
//import { Redirect } from "react-router-dom";
import ExamTable from "./examTable.js";
import { async } from "q";
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
            options: []
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

  loadProgramOptions = async () => {
    let { programData } = this.state;
    let { level } = this.state.formData;

    let levelValue = level.value;
    let filteredProgramData = programData.filter(item => {
      return item["academicDegree"] === levelValue;
    });
    let yearChoices = ["I", "II", "III", "IV"];
    let yearOptions = [];
    if (levelValue === "Bachelors") {
      for (let yearChoice of yearChoices) {
        let temp = {};
        temp["val"] = yearChoice;
        temp["text"] = yearChoice;
        yearOptions.push(temp);
      }
    } else {
      for (let yearChoice of yearChoices.slice(0, 2)) {
        //Masters Level has only 2 years
        let temp = {};
        temp["val"] = yearChoice;
        temp["text"] = yearChoice;
        yearOptions.push(temp);
      }
    }

    let options1 = [];
    for (let program of filteredProgramData) {
      console.log(program);
      let temp = {};
      temp["val"] = program.programName;
      temp["text"] = program.programName;
      options1.push(temp);
    }
    await this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        year: {
          ...this.state.formData.year,
          config: {
            ...this.state.formData.year.config,
            options: yearOptions
          }
        },
        programID: {
          ...this.state.formData.programID,
          config: {
            ...this.state.formData.programID.config,
            options: options1
          }
        }
      }
    });
  };

  loadSubjectOptions = async () => {
    let { subjectData, formData } = this.state;
    let { programID } = this.state.formData;

    let programValue = programID.value;
    let yearValue = formData.year.value;
    let partValue = formData.part.value;

    //Acoording to Value in Program Year and Part value, filter Subjects
    let filteredSubjectData = subjectData.filter(item => {
      return (
        item["programName"] === programValue &&
        item["year"] === yearValue &&
        item["part"] === partValue
      );
    });

    //Only those filtered Subjects are added to subject options for Subject Select field
    let subjectOptions = [];
    for (let subject of filteredSubjectData) {
      console.log(subject);
      let temp = {};
      temp["val"] = subject.id;
      temp["text"] = `${subject.subjectName}  (${subject.courseCode})`;
      subjectOptions.push(temp);
    }
    await this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        subjectID: {
          ...this.state.formData.subjectID,
          config: {
            ...this.state.formData.subjectID.config,
            options: subjectOptions
          }
        }
      }
    });
  };

  componentDidMount = () => {
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

    //Edit route
    const examID = this.props.match.params.examID;
    if (examID !== undefined) {
      fetch("http://localhost:4000/API/query/getExams/" + examID)
        .then(res => res.json())
        .then(json => {
          let { formData } = this.state;
          console.log(json[0]);

          formData.level.value = "Bachelors";
          formData.programID.value = json[0].programName;
          formData.year.value = json[0].year;
          formData.subjectID.value = json[0].subjectID;
          formData.date.value = json[0].date;
          formData.examType.value = json[0].examType;
          formData.part.value = json[0].part;

          this.setState(
            {
              formData: formData
            },
            async () => {
              await this.loadProgramOptions();
              await this.loadSubjectOptions();
              console.log(this.state.formData);
              console.log("Value set");
            }
          );
        });
    }
  };

  updateForm = (newState, id) => {
    this.setState({ formData: newState });

    //If Change in Level Options Occur, Load Programs List and year list for that Level
    if (id === "level") {
      this.loadProgramOptions();
    }
    //If change in these fields occur, load subject list according to those changed values
    else if (id === "programID" || id === "year" || id === "part") {
      this.loadSubjectOptions();
    }
  };

  submitForm = event => {
    let dataToSubmit = {};
    let formData = this.state.formData;
    console.log(formData);
    dataToSubmit["subjectID"] = formData["subjectID"].value.toString();
    dataToSubmit["examType"] = formData["examType"].value;
    dataToSubmit["date"] = formData["date"].value;
    console.log(dataToSubmit);

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
    let url = "http://localhost:4000/API/query/addExam";
    let methodType = "POST";

    //URL for update route
    const examID = this.props.match.params.examID;
    if (examID !== undefined) {
      url = `http://localhost:4000/API/query/editExam/${examID}`;
      methodType = "PUT";
    }
    fetch(url, {
      method: methodType,
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
            if (examID != undefined) {
              this.props.history.goBack();
              return;
            }
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
      <div>
        {this.errorCheck()}
        <FormFields
          formData={this.state.formData}
          change={(newState, id) => this.updateForm(newState, id)}
          submitForm={event => this.submitForm(event)}
        />
      </div>
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
