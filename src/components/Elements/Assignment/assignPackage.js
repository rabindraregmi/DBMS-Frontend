import React,{Component} from 'react';
import FormFields from '../../Widgets/Form/forms.js'

class AssignPackage extends Component {
    packageID =[{
        element:'select', 
        value:'1',
        label:true,
        labelText:'Package ID',
        config: {
            name:'packageID_input',
            options: [
                {val: '1', text: 'First Package'},
                {val:'2', text: 'Second Package'},
                {val:'3', text:'Third Package'},
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
]
    
    
    state = {
        formData:{
            name:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Name',
                config: {
                    name:'name_input',
                    type:'text',
                    placeholder:'Enter Name of Pakager Receiver'
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            email:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Email',
                config: {
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter email of receiver'
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            contact:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Contact',
                config: {
                    name:'contact_input',
                    type:'tel',
                    placeholder:'Enter Contact Number'
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            dateofAssignment:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Date of Assignment',
                config: {
                    name:'assignedDate_input',
                    type:'date',
                    placeholder:'Enter Date of Assignment',
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            dateofSubmission:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Date of Submission',
                config: {
                    name:'submissionDay_input',
                    type:'date',
                    placeholder:'Enter Submission Day'
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            noOfPackage:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Number of Packages',
                config: {
                    name:'noOfPackages_input',
                    type:'text',
                    placeholder:'Enter No Of Packages'
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            packages: {
                element:'dynamic',
                childs: {
                    
            },
            
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

dynamicForm = (noOfPackage) => {

    let newChild = this.state.formData.packages.childs;
    let packageID = this.packageID;
    console.log("Dynamic Form is Called")
    let j = 0 ;
     for (let element in this.state.formData.packages.childs){
         console.log(element)
         j++
     }
    console.log(j)
    if (j>noOfPackage) {
        console.log("This is j",j,noOfPackage)
        for (let k = j-1; k>=noOfPackage; k--){
            let key = 'package'+k
            delete newChild[key]
        }
    }
    for (let i= j;i<noOfPackage;i++){
       let  key = 'package'+i
     //  newChild
        newChild[key] = {
            element:'select', 
            value:'1',
            label:true,
            labelText:'Package#'+i,
            config: {
                name:'packageID_input',
                options: [
                    {val: '1', text: 'First Package'},
                    {val:'2', text: 'Second Package'},
                    {val:'3', text:'Third Package'},
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
        console.log(i)
        console.log("New Child", newChild)
    }
    
    this.setState(prevState => ({
        ...prevState,
        formData: {
            ...prevState.formData,
            packages: {
                ...prevState.formData.packages, 
                childs: newChild
            }
        }
    }))
}

submitForm = (event) =>{
    event.preventDefault();
    let dataToSubmit = {};

    for (let key in this.state.formData) {
        if (key ==='packages'){
            const childs= this.state.formData[key].childs;
            const packages = []
            console.log("Haha",childs)
            for (let child in childs){
               console.log(childs[child].value)
               packages.push(childs[child].value)
            } 
           dataToSubmit[key] = packages
        }
        else
        {

            dataToSubmit[key] = this.state.formData[key].value
        }

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
                    createNewForm = {(noOfPackage)=>this.dynamicForm(noOfPackage)}

                />
                <button className = "btn btn-primary" type= 'submit'>Submit</button>
            </form>
        </div>
    )
}
}

export default AssignPackage;



