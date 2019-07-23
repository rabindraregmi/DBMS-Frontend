import React,{Component} from 'react';
import FormFields from '../../Widgets/Form/forms.js'
import PackageTable from './packageTable.js';
import {Redirect} from 'react-router-dom';
import API from '../../../utils/API.js'
class AddNewPackage extends Component {
    state = {
        formData:{
            packageCode:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Package ID',
                config: {
                    name:'packageID_input',
                    type:'text',
                    placeholder:'Enter new Package ID'
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
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
            noOfCopies:{
                element:'input', 
                value:'',
                label:true,
                labelText:'No of Copies',
                config: {
                    name:'noOfCopies_input',
                    type:'number',
                    placeholder:'Enter Number of Copies'
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            codeStart:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Start Code',
                config: {
                    name:'startCode_input',
                    type:'text',
                    placeholder:'Enter First Code of Code Range',
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },   
            codeEnd:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Last Code',
                config: {
                    name:'lastCode_input',
                    type:'text',
                    placeholder:'Enter Last Code of Code Range',
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            examID:{
                element:'select', 
                value:'',
                label:true,
                labelText:'Exam',
                config: {
                    name:'Exam',
                    options: [
                        {val: 1, text: 'First Exam'},
                        {val:2, text: 'Second Exam'},
                        {val:3, text:'Third Exam'},
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
            status:{
                element:'select',
                value:'',
                label:true,
                labelText:'Status', 
                config: {
                    name:'Status',
                    options: [
                        {val:1, text:'Received'},
                        {val:2, text: 'Pending'},
                    ]
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            }
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
    let dataToSubmit = {};
    event.preventDefault();
    dataToSubmit["id"]= null
    for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value

    }
    console.log(dataToSubmit);
    let response = API.post('/newPackages', {dataToSubmit}).then(res=>{
        console.log(res);
        console.log(res.data)
    })

    
//     let response = fetch('http://127.0.0.1:8000/packages/', {
//     method: 'POST',
//     headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(dataToSubmit),
// }).then(res => res.json())
// .then(response => console.log('Success:', JSON.stringify(response)))
// .catch(error => console.error('Error:', error));

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

export default AddNewPackage;