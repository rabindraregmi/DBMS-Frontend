import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";
import PackageTable from "./packageTable.js";
//import { Redirect } from "react-router-dom";
class AddNewPackage extends Component {
  state = {
    formData: {
      packageCode: {
        element: "input",
        value: "",
        required: true,
        labelText: "Package ID",
        config: {
          name: "packageID_input",
          type: "text",
          placeholder: "Enter new Package ID"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      noOfCopies: {
        element: "input",
        value: "",
        required: true,
        labelText: "No of Copies",
        config: {
          name: "noOfCopies_input",
          type: "number",
          placeholder: "Enter Number of Copies"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      codeStart: {
        element: "input",
        value: "",
        required: true,
        labelText: "Start Code",
        config: {
          name: "startCode_input",
          type: "text",
          placeholder: "Enter First Code of Code Range"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      codeEnd: {
        element: "input",
        value: "",
        required: true,
        labelText: "Last Code",
        config: {
          name: "lastCode_input",
          type: "text",
          placeholder: "Enter Last Code of Code Range"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      level: {
        element: "select",
        value: "",
        label: true,
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
        label: true,
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
        label: true,
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
        label: true,
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
        label: true,
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

      examID: {
        element: "select",
        value: "",
        required: true,
        labelText: "Exam",
        config: {
          name: "exam",
          options: []
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      }
    },
    posted: false,
    errorOnSubmission: false,
    errorText: "",
    postedData: [],
    examData: [],
    programData: [],
    subjectData: []
  };
  loadProgramOptions = () => {
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
      //console.log(program);
      let temp = {};
      temp["val"] = program.programName;
      temp["text"] = program.programName;
      options1.push(temp);
    }
    this.setState({
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

  loadSubjectOptions = () => {
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
      //console.log(subject);
      let temp = {};
      temp["val"] = subject.id;
      temp["text"] = `${subject.subjectName}  (${subject.courseCode})`;
      subjectOptions.push(temp);
    }
    this.setState({
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
  loadExamOptions = () => {
    let { examData} = this.state;
    let { subjectID } = this.state.formData;

    let subjectValue = subjectID.value;
    console.log("Subject Value", examData);
    let filteredExamData = examData.filter(item => {
      return item["subjectID"] === parseInt(subjectValue);
    });

    let examOptions = [];

    for (let exam of filteredExamData) {
      let temp = {};
      temp["val"] = exam.id;
      temp["text"] = `${exam.programName}(${exam.year}/${exam.part})-${
        exam.courseCode
      } ${exam.date}`;
      examOptions.push(temp);
    }
    console.log(filteredExamData);
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        examID: {
          ...this.state.formData.examID,
          config: {
            ...this.state.formData.examID.config,
            options: examOptions
          }
        }
      }
    });
  };

  componentDidMount = () => {
    let { examID } = this.state.formData;
    //let examOptions = examID.config.options;
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
    fetch("http://localhost:4000/API/query/getExams")
      .then(res => res.json())
      .then(json => {
        this.setState({
          examData: json
        });
      });
    //console.log(examOptions);

    const packageID = this.props.match.params.packageID;
    if (packageID !== undefined) {
      fetch("http://localhost:4000/API/query/getPackage/" + packageID)
        .then(res => res.json())
        .then(json => {
            // let { formData } = this.state;
            // console.log(json[0]);
            // formData.level.value = "Bachelors";
            // formData.programID.value = json[0].programName;
            // formData.year.value = json[0].year;
            // formData.subjectID.value = json[0].subjectID;
            // formData.date.value = json[0].date;
            // formData.examType.value = json[0].examType;
            // formData.part.value = json[0].part;
            // this.setState({
            //   formData: formData
            // });
            // this.loadProgramOptions();
            // this.loadSubjectOptions();
            // console.log(this.state.formData);
            // console.log("Value set");
        });
    }
  };

  updateForm = (newState, id) => {
    this.setState({
      formData: newState
    });

    if (id === "level") {
      this.loadProgramOptions();
    } else if (id === "programID" || id === "year" || id === "part") {
      this.loadSubjectOptions();
    } else if (id === "subjectID") {
      this.loadExamOptions();
    }
  };

  submitForm = event => {
    // let buttonID = event.target.id;
    // let redirectLink = ''

    let dataToSubmit = {};
    console.log(dataToSubmit);
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      console.log(dataToSubmit[key]);
      const state = this.state;
      //0 check for dropdown
      if (
        dataToSubmit[key].toString() === null ||
        dataToSubmit[key].toString().match(/^ *$/) !== null
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

    console.log(dataToSubmit);
    fetch("http://localhost:4000/API/query/addPackage", {
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
          console.log(body);
          if (res.status === 200) {
            body["status"] = "Not Assigned";
            postedData.push(body);
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
            <PackageTable postedData={postedData} />
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

export default AddNewPackage;
