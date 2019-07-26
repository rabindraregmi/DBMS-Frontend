import React from 'react';
import './forms.css'
const formFields = (props)=> {

    const renderFields =() => {
        const formArray = [];

        for (let elementName in props.formData){
            formArray.push({
                id:elementName,
                settings:props.formData[elementName]
            })
        }
        return formArray.map((item,i)=>{
            return (
                <div key= {i}>
                    {renderTemplates(item)}
                </div>
            )
        })
    }

    const showLabel = (label, labelText)=>{
        return label? 
        <label class="col-sm-4 col-form-label">{labelText}</label>
        :null;
    }
    const changeHandler =(event,id)=>{
        const newState = props.formData;
        console.log(id)
        if (id.includes("Package-"))
        {
            newState.packages.childs[id].value = event.target.value;
        
        }
        else
        {

            newState[id].value = event.target.value;
            let validateData = validate(newState[id])
            newState[id].valid = validateData[0]
            newState[id].validationMessage = validateData[1]
        }
       props.change(newState,id) 

    }
    const blurHandler = (event,id) => {
        if (id ==='noOfPacket'){
            props.createNewForm(event.target.value)
        }
    }

    const validate = (element)=> {
        let error = [true, '']
        if (element.validation.required) {
            const valid = element.value.trim()!=='';
            const message = `${!valid ? 'This field is required':''}`

            error = !valid ?[valid,message]:error
        }
        return error;
    }

    const renderChild = (data)=>{
        
        const formArray = [];

        for (let elementName in data){
            formArray.push({
                id:elementName,
                settings:data[elementName]
            })
        }
        console.log(formArray)
        return formArray.map((item,i)=>{
            return (
                <div key= {i}>
                    {renderTemplates(item)}
                </div>
            )
        })
    }
    const renderTemplates =(data) =>{
        let values= data.settings;
        let formTemplate ='';
        
        switch(values.element){
            case('input'):
            formTemplate = (
                <div class = 'form-group row'>
                    {showLabel(values.label,values.labelText)}
                    <div className = "col-sm-6">

                    <input 
                    className = "form-control"
                    {...values.config}
                    value = {values.value}
                    onChange= {
                        (event)=>changeHandler(event,data.id)
                    }
                    onMouseOut = {
                        (event) =>blurHandler(event,data.id)
                    }
                    />
                    </div>
                </div>
            )
            
            break;
            case('select'):
            formTemplate = (
                <div className= 'form-group row'>
                    {showLabel(values.label, values.labelText)}
                    <div className = "col-sm-6">
                        <select
                        value = {values.value}
                        name = {values.config.name}
                        onChange = {
                            (event)=>changeHandler(event, data.id)
                        }
                        className = "form-control">
                            <option value  = "0">Select {values.config.name}</option>
                        {values.config.options.map ((item, i)=>(
                            <option key = {i} value= {item.val}>{item.text}</option>
                         ) )}
                        </select>

                    </div>

                </div>
            )
            break;
            case('dynamic'):
            formTemplate = (
                <div>
                <fieldset className= "form-fieldset">Packages:{props.formData.noOfPacket.value}</fieldset>
                    {renderChild(data.settings.childs)}               
                </div>
            )
            break;
            case('radio'):
            formTemplate = (
                <div className="form-group">
                    <div className="radio-label">
                {showLabel(values.label, values.labelText)}

                    </div>
                    
                    {values.config.options.map ((item, i)=>(
                    <div className = "form-check form-check-inline">
                        <input key = {i} class="form-check-input" type="radio" name = "status" id = {`for-${i}`} value={item.val}
                        onChange= {
                            (event)=>changeHandler(event,data.id)
                        }
                        />
                        <label class="form-check-label">{item.text}</label>
                    </div>
                        ) )}
                
              </div>
            )
            break;
            default:
            formTemplate = null
        }
        return formTemplate;

    }
    return (
        <div>
            {renderFields()}
        </div>
    )
}

export default formFields;