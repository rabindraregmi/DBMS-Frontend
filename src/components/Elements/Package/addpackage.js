import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";
import PackageTable from "./packageTable.js";
import { Redirect } from "react-router-dom";
import API from "../../../utils/API.js";
class AddNewPackage extends Component {
  state = {
    formData: {
      packageCode: {
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
      // arrivedDate:{
      //     element:'input',
      //     value:'',
      //     label:true,
      //     labelText:'Arrived Date',
      //     config: {
      //         name:'arrivedDate_input',
      //         type:'date',
      //         placeholder:'Enter Arrived Date of Package'
      //     },
      //     validation: {
      //         required:false,
      //     }
      //     ,
      //     valid:true,
      //     touched:false,
      //     validationText:'',
      // },
      noOfCopies: {
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
      codeStart: {
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
      codeEnd: {
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
      examID: {
        element: "select",
        value: "",
        label: true,
        labelText: "Exam",
        config: {
          name: "Exam",
          options: []
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      status: {
        element: "radio",
        value: "",
        label: true,
        labelText: "Status",
        config: {
          name: "Status",
          options: [{ val: "Submitted", text: "Submitted" }, { val: "Pending", text: "Pending" },,{val:"Not Assigned",text:"Not Assigned"}]
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

  componentWillMount = () =>
  {
    let {options}  = this.state.formData.examID.config;
    fetch ("http://localhost:4000/API/query/getExams")
    .then (res=>res.json())
    .then (json=>{          
      for(let exams of json)
      {
        let temp = {}
        temp ['val'] = exams.id 
        temp ['text'] = exams.programName+" "+exams.date
        options.push(temp)
      }
      this.setState ({
        options:options
      })
    });
    console.log(options)
}

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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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
