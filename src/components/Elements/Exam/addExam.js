import React,{Component} from 'react';
import FormFields from '../../Widgets/Form/forms.js'
import Button from '../../Widgets/Buttons/buttons.js'

class AddNewExam extends Component {
    state = {
        formData:{
            examID:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Exam ID',
                config: {
                    name:'examID_input',
                    type:'text',
                    placeholder:'Enter New Exam'
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            subject:{
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
        }
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


}
render(){
    return(
        <div className= 'container'>
            <form className = "main-form" onSubmit= {this.submitForm}>
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