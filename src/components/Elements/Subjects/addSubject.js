import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";
import SubjectTable from "./subjectTable.js";

class AddNewSubject extends Component {
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
        courseCode: {
            element: "input",
            value: "",
            required: true,
            labelText: "Course Code",
            config: {
              name: "courseCode_input",
              type: "text",
              placeholder: "Example: SH401,CT502 ... etc"
            },
            validation: {
              required: false
            },
            valid: true,
            touched: false,
            validationText: ""
          },
          subjectName: {
            element: "input",
            value: "",
            required: true,
            labelText: "Subject Name",
            config: {
              name: "programName_input",
              type: "text",
              placeholder: "Eg:Engineering Mathematics"
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
      posted: false,
      errorOnSubmission: false,
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
    let programOptions = [];
    for (let program of filteredProgramData) {
      //console.log(program);
      let temp = {};
      temp["val"] = program.id;
      temp["text"] = program.programName;
      programOptions.push(temp);
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
            options: programOptions
          }
        }
      }
    });
  };

  componentDidMount = async() => {
    let programData = []
    await fetch("http://localhost:4000/API/query/getProgramList")
      .then(res => res.json())
      .then(json => {
        programData = json
      });

    //Edit route
    const subjectID = this.props.match.params.subjectID;
    if (subjectID !== undefined) {
      fetch("http://localhost:4000/API/query/getSubject/" + subjectID)
        .then(res => res.json())
        .then(async json => {
          let { formData } = this.state;

          formData.level.value = json[0].academicDegree;
          formData.programID.value = json[0].programName;
          formData.year.value = json[0].year;
          formData.date.value = json[0].date;
          formData.examType.value = json[0].examType;
          formData.part.value = json[0].part;
          formData.subjectName.value = json[0].subjectName;

          await this.setState(
            {
              formData: formData,
              programData:programData
            },
            async () => {
              await this.loadProgramOptions();
              
            }
          );
        });
    }
    else 
    {
      this.setState({
        programData:programData
      })
    }
  };

  updateForm = (newState, id) => {
      this.setState({ formData: newState });
      if (id === "level") this.loadProgramOptions();
    
    //If Change in Level Options Occur, Load Programs List and year list for that Level
  };

  submitForm = event => {
    let dataToSubmit = {};
    let {formData} = this.state;
    console.log(formData);
    for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value;
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
    let url = "http://localhost:4000/API/query/addSubject";
    let methodType = "POST";

    //URL for update route
    const subjectID = this.props.match.params.subjectID;
    if (subjectID !== undefined) {
      url = `http://localhost:4000/API/query/editSubject/${subjectID}`;
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
            if (subjectID !== undefined) {
              this.props.history.goBack();
              return;
            }
            console.log(body);
            let dataToDisplay =body;
            postedData.push(dataToDisplay);
            this.setState({
              posted: true,
              errorOnSubmission: false,
              postedData: postedData
            });
          } 
          else {
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
    console.log("Posted Data", postedData)
    if (posted) {
      return (
        <div className="p">
          <div className="left-floated-form">{this.loadForm()}</div>
          <div>
            <SubjectTable postedData={postedData}  postedTable={true} />
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

export default AddNewSubject;
