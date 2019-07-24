import React from 'react'
import FormFields from "../../Widgets/Form/forms.js";

class Person extends React.Component {
    state = {
        formData: {
          name: {
            element: "input",
            value: "",
            label: true,
            labelText: "Name",
            config: {
              name: "name_input",
              type: "text",
              placeholder: "Enter the name"
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
              type: "phone",
              placeholder: "Enter the contact"
            },
            validation: {
              required: false
            },
            valid: true,
            touched: false,
            validationText: ""
          },
          address: {
            element: "input",
            value: "",
            label: true,
            labelText: "Address",
            config: {
              name: "address_input",
              type: "text",
              placeholder: "Enter the Address"
            },
            validation: {
              required: false
            },
            valid: true,
            touched: false,
            validationText: ""
          },


        },
        error: false, 
        errorText : '',
        redirect:false,
    }
    updateForm = (newState) => {
      this.setState (
          {
              formData:newState,
          }
      )
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = {}
    for (let key in this.state.formData)
    {
      dataToSubmit[key] = this.state.formData[key].value
    }
    console.log(dataToSubmit)
    fetch("/API/query/addPerson", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSubmit)
    })
    .then(res=>{
                if(res.status===200) {
                  this.setState({error:false})
                  
                  
                  this.props.onSubmission()

                }
                else
                  this.setState({error:true,errorText:res.statusText})
              })
    .catch(err=>{
                this.setState ({error:true, errorText:err})
              });
            }

      
errorCheck = ()=>{
      const {error,errorText} = this.state;
      if (error) {
      return(
              <p>{errorText}</p>
            )
      }
  }
    render(){
      
        return (
            <div clasName= 'container'>
                <form className = "main-form" onSubmit= {this.submitForm}>
                  {this.errorCheck()}
                    <FormFields formData = {this.state.formData}
                    change={newState => this.updateForm(newState)}
                    />
                    <button className = "btn btn-primary" type= 'submit'>Submit</button> 
                </form>
            </div>
        )
    }
}
export default Person;