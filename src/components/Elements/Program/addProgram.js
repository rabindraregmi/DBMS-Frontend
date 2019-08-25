import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";
import ProgramTable from "./programTable.js";

class AddNewProgram extends Component {
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
        departmentID: {
            element: "select",
            value: "",
            required: true,
            labelText: "Department",
            config: {
              name: "Level",
              options: []
            },
            validation: {
              required: false
            },
            valid: true,
            touched: false,
            validationText: ""
          },
          programName: {
            element: "input",
            value: "",
            required: true,
            labelText: "Program Name",
            config: {
              name: "programName_input",
              type: "text",
              placeholder: "Example: BCT BEX etc"
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
      posted: false,
      errorOnSubmission: false,
      postedData: []
    };
  }
  componentDidMount = () => {
    fetch("http://localhost:4000/API/query/getDepartmentList")
      .then(res => res.json())
      .then(json => {
        console.log("Department List",json)
        let {formData} = this.state; 
        for (let department of json)
        {
            let temp= {}
            temp["val"] = department.id;
            temp["text"]= department.departmentName;
            formData.departmentID.config.options.push(temp)
        }
        this.setState({
            formData:formData
        })
      });

    //Edit route
    const programID = this.props.match.params.programID;
    if (programID !== undefined) {
      fetch("http://localhost:4000/API/query/getProgram/" + programID)
        .then(res => res.json())
        .then(json => {
          let { formData } = this.state;
          console.log(json[0])
          formData.level.value = json[0].academicDegree;
          formData.departmentID.value = json[0].departmentName;
          formData.programName.value = json[0].programName;
          this.setState({formData: formData});
        });
    }
  };

  updateForm = (newState, id) => {
    this.setState({ formData: newState });
  };

  submitForm = event => {
    let dataToSubmit = {};
    for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value;
        const state = this.state;
        //0 check for dropdown
        if (
          dataToSubmit[key].toString() === null ||
          dataToSubmit[key].toString().match(/^ *$/) !== null
        ) {
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

    let url = "http://localhost:4000/API/query/addProgram";
    let methodType = "POST";

    //URL for update route
    const programID = this.props.match.params.programID;
    if (programID !== undefined) {
      url = `http://localhost:4000/API/query/editProgram/${programID}`;
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
            if (programID !== undefined) {
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
              errorText: "Invalid Value in Form",
              posted: false
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
            <ProgramTable postedData={postedData} postedTable={true} />
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

export default AddNewProgram;
