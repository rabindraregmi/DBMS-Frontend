import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

//Components
import Form from '../../Widgets/Form/forms.js'

class ReceivePackage extends Component {

    state = {
        packageReceived:false,
        formData: {
            packageCode: {
                element: "input",
                value: "",
                label: true,
                labelText: "Package Code",
                config: {
                    name: "packageCode_input",
                    type: "text",
                    disabled: 'disabled',
                    placeholder: "Enter Package Code"
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationText: ""
            },

            name: {
              element: "input",
              value: "",
              label: true,
              labelText: "Name",
              config: {
                name: "name_input",
                type: "text",
                disabled: 'disabled',
                placeholder: "Enter Name of Pakager Receiver"
              },
              validation: {
                required: false
              },
              valid: true,
              touched: false,
              validationText: ""
            },
            campus: {
              element: "input",
              value: "",
              label: true,
              labelText: "Address",
              config: {
                name: "address_input",
                type: "text",
                disabled:'disabled',
                placeholder: "Enter Address of receiver"
              },
              validation: {
                required: false
              },
              valid: true,
              touched: false,
              validationText: ""
            },
            contact: {
              element: "input",
              value: "",
              label: true,
              labelText: "Contact",
              config: {
                name: "contact_input",
                type: "tel",
                disabled:'disabled',
                placeholder: "Enter Contact Number"
              },
              validation: {
                required: false
              },
              valid: true,
              touched: false,
              validationText: ""
            },
            dateOfAssignment: {
              element: "input",
              value: null,
              label: true,
              labelText: "Date of Assignment",
              config: {
                name: "assignedDate_input",
                type: "date",
                disabled:'disabled',
                placeholder: "Enter Date of Assignment"
              },
              validation: {
                required: false
              },
              valid: true,
              touched: false,
              validationText: ""
            },
            dateOfDeadline: {
              element: "input",
              value: null,
              label: true,
              labelText: "Date of Deadline",
              config: {
                name: "submissionDay_input",
                type: "date",
                disabled:'disabled',
                placeholder: "Enter Deadline Day"
              },
              validation: {
                required: false
              },
              valid: true,
              touched: false,
              validationText: ""
            },
            dateOfSubmission: {
                element: "input",
                value: null,
                label: true,
                labelText: "Date of Submission",
                config: {
                  name: "submissionDay_input",
                  type: "date",
                  placeholder: "Enter Submission Day"
                },
                validation: {
                  required: false,
                },
                valid: true,
                touched: false,
                validationText: ""
              },
              dueDay:{
                element: "input",
                value: "",
                label: true,
                labelText: "Due Days",
                config: {
                  name: "dueDay_input",
                  type: "number",
                  disabled:'disabled',
                  placeholder: "Enter Due Day"
                },
                validation: {
                  required: false,
                },
                valid: true,
                touched: false,
                validationText: ""
              }
          }
    }
    updateForm = (newState)=>
    {
        this.setState({
            formData:newState
        })
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    componentDidMount = ()=>{
        let { params } = this.props.match;
        console.log(params);

    fetch(`http://localhost:4000/API/query/getOneAssignment/${params.assignmentID}`)
      .then(res => res.json())
      .then(json => {
        let {formData} = this.state;
        for (let [key, value] of Object.entries(json[0])) {
            console.log(key, json[0][key])
            
            formData[key].value = json[0][key]; 
          }
          formData.dateOfSubmission.value = this.formatDate(new Date())
          formData.dueDay.value = Math.round((this.parseDate(json[0]['dateOfDeadline']) - this.parseDate(this.formatDate(new Date()))) / (1000 * 60 * 60 * 24))
          this.setState ({
              formData:formData
          })
      });


    }
    handleReceive = () =>{
        let {params} = this.props.match;
        let dataToSubmit = {}
        dataToSubmit ['id'] = params.assignmentID
        dataToSubmit ['dateOfSubmission'] = this.state.formData.dateOfSubmission.value;
       // console.log(dataToSubmit)

       fetch("http://localhost:4000/API/query/receivePackage", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSubmit)
      })
      .then(res=>{
          if (res.status ===200){
              alert ("Package Received Sucessfully")
              this.setState({
                  packageReceived:true 
              })
          }
      })
    }

    parseDate(str) {
        const mdy = str.split("-");
        return new Date(mdy[0], mdy[1] - 1, parseInt(mdy[2]) + 1);
      }
    setDifference = ()=>{
            let {dateOfDeadline, dateOfSubmission, dueDay} = this.state.formData;
           let deadlineDate = this.parseDate (dateOfDeadline.value)
           let submissionDate = this.parseDate (dateOfSubmission.value)
            dueDay.value = Math.round((deadlineDate - submissionDate) / (1000 * 60 * 60 * 24));
            this.setState({
                dueDay
            })
          
    }
    render(){
        if (this.state.packageReceived){
            return <Redirect to = '/home'/>
        }
        return (
            <div>
                <form className="main-form" onSubmit = {(event)=>{event.preventDefault()}} onChange = {this.setDifference}>
                <Form
                    formData={this.state.formData}
                    change={newState => this.updateForm(newState)}/>
          <br />
          <br />
          <button className="btn btn-primary" type="submit" onClick = {this.handleReceive}>
            Receive
          </button>
        </form>
            </div>
        )
    }

}
export default ReceivePackage;