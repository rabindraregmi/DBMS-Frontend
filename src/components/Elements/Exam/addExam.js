import React,{Component} from 'react';
import FormFields from '../../Widgets/Form/forms.js'
import Button from '../../Widgets/Buttons/buttons.js'
import { Redirect } from 'react-router-dom'
class AddNewExam extends Component {
    state = {
        formData:{
            
            
            
            syllabusID:{
                element:'select', 
                value:'',
                label:true,
                labelText:'Subject',
                config: {
                    name:'Subject',
                    options: [
                        {val: '1', text: 'First Subject'},
                        {val:'2', text: 'Second Subject'},
                        {val:'3', text:'Third Subject'},
                        ]
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
              
            examType:{
                element:'select', 
                value:'',
                label:true,
                labelText:'Exam Type',
                config: {
                    name:'examType',
                    options: [
                        {val: '1', text: 'Regular'},
                        {val:'2', text: 'Back'},
                        ]
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            date:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Date',
                config: {
                    name:'date_input',
                    type:'date',
                    placeholder:'Enter the date of Exam'
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
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

submitForm = (event) =>{
    event.preventDefault();
    let dataToSubmit = {};

    for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value

    }
    console.log(dataToSubmit);
    fetch("/API/query/addExam", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSubmit)
      })
        .then(res => {
            if (res.status===200){
                this.setState({
                    redirect:true,
                    error:false,
                })
            }
            else{
                this.setState({
                    error:true,
                    errorText:res.statusText
                })
            }
            this.setState({
                isLoaded:true
            })
            console.log(res);
        })
        .catch(err => {
            this.setState({
                error:true,
                errorText:err,
            })
          console.log(err);
        });


}
errorCheck = ()=>{
    const {isLoaded, error,errorText} = this.state;
    if (error) {
        return(
            <p>{errorText}</p>
        )
    }
    
}
render(){
    if (!this.state.error&&this.state.redirect){
        return (

            <Redirect to= '/'/>
            )
    }
   
    return(
        <div className= 'container'>
            
            <form className = "main-form" onSubmit= {this.submitForm}>
            {this.errorCheck()}
                <FormFields 
                    formData= {this.state.formData}
                    change = {(newState)=>this.updateForm(newState)}
                />
                <button className = "btn btn-primary" type= 'submit'>Submit</button>
            </form>
        </div>
    )
}
}

export default AddNewExam;