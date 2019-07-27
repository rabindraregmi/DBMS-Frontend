import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";
import PackageTable from "./packageTable.js";
import { Redirect } from "react-router-dom";
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
          name: "exam",
          options: []
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
    }, 
    posted:false, 
    errorOnSubmission:false,
    errorText: '',
    postedData: []

  };

  componentWillMount = () =>
  {
    let {examID, subject}  = this.state.formData;
    let examOptions = examID.config.options;
    fetch ("http://localhost:4000/API/query/getExams")
    .then (res=>res.json())
    .then (json=>{          
      for(let exam of json)
      {
        let temp = {}
        temp ['val'] = exam.id 
        temp ['text'] = `${exam.programName}(${exam.year}/${exam.part})-${exam.courseCode} ${exam.date}`
        examOptions.push(temp)
      }
      this.setState ({
        examID :examID
      })
    });
    console.log(examOptions)
}

  updateForm = newState => {
    this.setState({
      formData: newState
    });
  };

  submitForm = event => {
    // let buttonID = event.target.id;
    // let redirectLink = ''

    let dataToSubmit = {};
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }
    

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
          let {postedData} = this.state
          console.log(body)
          if (res.status ===200)
          { 
            body['status'] = "Not Assigned"
            postedData.push (body)
            this.setState({
              posted:true,
              errorOnSubmission:false,
              postedData:postedData
            
            })
          }
          else
          {
            this.setState ({
              errorOnSubmission:true,
              errorText:'Error in submission',
              posted:true
            })
          }
        });
       
      })
      .catch(err => {
        console.log(err);
      });
  };
  
errorCheck = ()=>{
    const {errorOnSubmission,errorText} = this.state;
    if (errorOnSubmission) {
        return(
            <p>{errorText}</p>
        )
    }
    
}

loadForm = ()=>{
  return (
    <form className="main-form" onSubmit = {(event)=>{event.preventDefault()}}>
    {this.errorCheck()}
    <FormFields
      formData={this.state.formData}
      change={newState => this.updateForm(newState)}
    />
    <button className="btn btn-primary" id = "save" onClick = {(event)=>this.submitForm(event)} type="submit">
      Save
    </button>
    <button className ="btn btn-secondary" type="reset" id = "snc" onClick = {(event)=>this.submitForm(event)}>Save and Continue</button>
  </form>
  )
}

mainContent = () =>{
  let {postedData,posted} = this.state;


  if (posted){
    return (
      <div className = "p">
        <div className= "left-floated-form">
        {this.loadForm()}

        </div>
        <div>
        <PackageTable postedData = {postedData}/>

        </div>
      </div>
    )
  }
  else
  {
    return (
      <div>
        {this.loadForm()}
      </div>
    )
  }
}


  render() {
    


    return (
      <div className="container-fluid">
       
      {this.mainContent()}
      </div>
    );
  }
}

export default AddNewPackage;
