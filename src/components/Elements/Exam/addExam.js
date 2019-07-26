import React,{Component} from 'react';
import FormFields from '../../Widgets/Form/forms.js'
import { Redirect } from 'react-router-dom'
class AddNewExam extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
        formData:{
            level:{
                element:'select', 
                value:'',
                label:true,
                labelText:'Level',
                config: {
                    name:'Level',
                    options: [
                        {val :"Bachelors", text:'Bachelors'},
                        {val:"Masters", text:'Masters'}
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
            programID:{
                element:'select', 
                value:'',
                label:true,
                labelText:'Program',
                config: {
                    name:'program',
                    options:[]
                },
                validation: {
                    required:false,
                }
                ,
                valid:true,
                touched:false,
                validationText:'',
            },
            year:{
                element:'select', 
                value:'I',
                label:true,
                labelText:'Year',
                config: {
                    name:'year',
                    options: [
                        {val: 'I', text: 'I'},
                        {val:'II', text: 'II'},
                        {val:'III', text:'III'},
                        {val:'IV', text:'IV'}
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
            part:{
                element:'select', 
                value:'I',
                label:true,
                labelText:'Part',
                config: {
                    name:'part',
                    options: [
                        {val: 'I', text: 'I'},
                        {val:'II', text: 'II'},
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
            
            subjectID:{
                element:'select', 
                value:'',
                label:true,
                labelText:'Subject',
                config: {
                    name:'Subject',
                    options: []
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
                value:'Regular',
                label:true,
                labelText:'Exam Type',
                config: {
                    name:'examType',
                    options: [
                        {val: 'Regular', text: 'Regular'},
                        {val:'Back', text: 'Back'},
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
        programData:[],
        subjectData:[],
        filteredProgramData:[],
        filteredSubjectData:[],

    }
}

componentWillMount = () =>
    
{
    console.log("This is called")
      fetch("http://localhost:4000/API/query/getProgramList")
      .then(res=>res.json())
      .then(json=>{
          this.setState({
              programData: json
          })
      });
      fetch ("http://localhost:4000/API/query/getSubjectList")
      .then (res=>res.json())
      .then (json=>{          
        this.setState ({
          subjectData: json
        })
      });

}

updateForm = (newState,id) => {
    console.log(id)
    this.setState({formData:newState,})

    let {programData, subjectData} = this.state;
    let {subjectID, programID,level}  = this.state.formData;
    let subjectOptions = subjectID.config.options;
    let programOptions = programID.config.options;
    
    
    
    if (id ==='level')
    {   
        
        let levelValue = level.value;
        let filteredProgramData = programData.filter((item)=>{
            return item["academicDegree"]===levelValue
            })
            let options1 = []
            for (let program of filteredProgramData)
            {   console.log(program)
                let temp = {}
                temp['val'] = program.programName
                temp['text'] = program.programName
                options1.push(temp)
            }
            this.setState({
                ...this.state,
                formData:{
                    ...this.state.formData,
                    programID:{
                        ...this.state.formData.programID,
                        config:{
                            ...this.state.formData.programID.config,
                            options:options1
                        }
                    }
                }
            })  
        
    }
    else if (id ==='programID'||id ==="year"||id==="part"){
        let programValue = programID.value;
        let yearValue  = this.state.formData.year.value;
        let partValue = this.state.formData.part.value;
        let filteredSubjectData = subjectData.filter((item)=>{
            return item["programName"] === programValue&&item["year"] ===yearValue &&item["part"]===partValue
        })
        let options1 = []
        for (let subject of filteredSubjectData)
            {   console.log(subject)
                let temp = {}
                temp['val'] = subject.id
                temp['text'] = `${subject.subjectName}  (${subject.courseCode})`
                options1.push (temp)
            }
            this.setState({
                ...this.state,
                formData:{
                    ...this.state.formData,
                    subjectID:{
                        ...this.state.formData.subjectID,
                        config:{
                            ...this.state.formData.subjectID.config,
                            options:options1
                        }
                    }
                }
            })   
    }
    
    
    
}

submitForm = (event) =>{
    event.preventDefault();
    let dataToSubmit = {};
    let formData = this.state.formData
    console.log(formData)
    dataToSubmit["subjectID"] = formData["subjectID"].value
    dataToSubmit["examType"] = formData["examType"].value
    dataToSubmit["date"] = formData["date"].value


    console.log(dataToSubmit);
    fetch("http://localhost:4000/API/query/addExam", {
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

            <Redirect to= '/home'/>
            )
    }
   
    return(
        <div className= 'container'>
            
            <form className = "main-form" onSubmit= {this.submitForm}>
            {this.errorCheck()}
                <FormFields 
                    formData= {this.state.formData}
                    change = {(newState,id)=>this.updateForm(newState,id)}
                />
                <button className = "btn btn-primary" type= 'submit'>Submit</button>
            </form>
        </div>
    )
}
}

export default AddNewExam;