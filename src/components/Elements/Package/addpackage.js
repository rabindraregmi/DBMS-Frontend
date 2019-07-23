import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";
import PackageTable from "./packageTable.js";
import { Redirect } from "react-router-dom";
class AddNewPackage extends Component {
  state = {
    formData: {
      packageID: {
        element: "input",
        value: "",
        label: true,
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
      arrivedDate: {
        element: "input",
        value: "",
        label: true,
        labelText: "Arrived Date",
        config: {
          name: "arrivedDate_input",
          type: "date",
          placeholder: "Enter Arrived Date of Package"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      numberOfCopies: {
        element: "input",
        value: "",
        label: true,
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
      startingCode: {
        element: "input",
        value: "",
        label: true,
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
      endingCode: {
        element: "input",
        value: "",
        label: true,
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
      subjectCode: {
        element: "input",
        value: "",
        label: true,
        labelText: "Subject Code",
        config: {
          name: "subjectCode_input",
          type: "text",
          placeholder: "Enter Subject Code"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      exam: {
        element: "select",
        value: "",
        label: true,
        labelText: "Exam",
        config: {
          name: "Exam",
          options: [
            { val: "1", text: "First Exam" },
            { val: "2", text: "Second Exam" },
            { val: "3", text: "Third Exam" }
          ]
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      }
    }
  };

  updateForm = newState => {
    this.setState({
      formData: newState
    });
  };

  submitForm = event => {
    let dataToSubmit = {};
    event.preventDefault();
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }
    //console.log(dataToSubmit);
    let response = fetch("http://127.0.0.1:8000/packages/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSubmit)
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  render() {
    return (
      <div className="container">
        <form className="main-form" onSubmit={this.submitForm}>
          <FormFields
            formData={this.state.formData}
            change={newState => this.updateForm(newState)}
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddNewPackage;
