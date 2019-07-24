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
        personID:'',
        personData:{},
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
            address:{
                element:'input', 
                value:'',
                label:true,
                labelText:'Address',
                config: {
                    name:'address_input',
                    type:'text',
                    placeholder:'Enter Address of receiver'
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
            packages:{
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
    let j = 0 ;
     for (let element in this.state.formData.packages.childs){
         console.log(element)
         j++
     }
    console.log(j)
    if (j>noOfPackage) {
        for (let k = j-1; k>=noOfPackage; k--){
            let key = 'Package-'+k
            delete newChild[key]
        }
    }
    for (let i= j;i<noOfPackage;i++){
       let  key = 'Package-'+i
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
        // console.log(i)
        // console.log("New Child", newChild)
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

componentDidMount = ()=>{
    let {params} = this.props.match;
    console.log(params.personID)
    this.setState({
        personID:params.personID
    })
    fetch (`http://localhost:4000/API/query/getOnePerson/${params.personID}`)
        .then (res=>res.json())
        .then (json=>{          
        console.log(json)
          this.setState({
            isLoaded:true,
            personData:json,
          })
          let {formData,personData} = this.state;
          console.log(personData)

        formData.name.value  = personData[0].name
        formData.contact.value = personData[0].contact
        formData.address.value = personData[0].address
        this.setState ({
            formData:formData
        })
        });
    

}


submitForm = (event) =>{
    event.preventDefault();
    let dataToSubmit = {};
    dataToSubmit['personID'] = this.state.personID;
    for (let key in this.state.formData) {
        if (key==='name'||key==='contact'||key==='address')
        {
            continue
        }
        else if (key ==='packages'){
            const childs= this.state.formData[key].childs;
            const packages = []
            for (let child in childs){
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



