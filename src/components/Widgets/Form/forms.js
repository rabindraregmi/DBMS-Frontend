import React from "react";
import "./forms.css";



const formFields = props => {
  

  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.formData) {
      formArray.push({
        id: elementName,
        settings: props.formData[elementName]
      });
    }
    return formArray.map((item, i) => {
      return <div key={i}>{renderTemplates(item)}</div>;
    });
  };

  const showLabel = (required, labelText) => {
    return required ? (
      (<label class="col-sm-4 col-form-label">{labelText}<span style={{color: 'red', fontSize:'1.2rem'}}>*</span></label>)
    ) : (
      <label class="col-sm-4 col-form-label">{labelText}</label>
    );
  };
  
  const changeHandler = (event, id) => {
    const newState = props.formData;
    console.log(id);
    var re = /^[0-9]+$/;
    if (re.test(id)) {
      newState.packages.childs[id].value = event.target.value;
    } else {
      newState[id].value = event.target.value;
      let validateData = validate(newState[id]);
      newState[id].valid = validateData[0];
      newState[id].validationMessage = validateData[1];
    }
    props.change(newState, id);
  };

  const validate = element => {
    let error = [true, ""];
    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const message = `${!valid ? "This field is required" : ""}`;

      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  const increaseChild = () => {
    props.dynamicIncrease();
  };

  const renderChild = data => {
    const formArray = [];

    for (let elementName in data) {
      formArray.push({
        id: elementName,
        settings: data[elementName]
      });
    }
    console.log(formArray);
    return formArray.map((item, i) => {
      return <div key={i}>{renderTemplates(item)}</div>;
    });
  };

  const renderTemplates = data => {
    let values = data.settings;
    let formTemplate = "";

    switch (values.element) {
      case "input":
        formTemplate = (
          <div class="form-group row">
            {showLabel(values.required, values.labelText)}
            <div className="col-sm-6">
              <input
                className="form-control"
                {...values.config}
                value={values.value}
                onChange={event => changeHandler(event, data.id)}
              />
            </div>
          </div>
        );

        break;
      case "select":
        formTemplate = (
          <div className="form-group row">
            {showLabel(values.required, values.labelText)}
            <div className="col-sm-6">
              <select
                value={values.value}
                name={values.config.name}
                onChange={event => changeHandler(event, data.id)}
                className="form-control"
              >
                <option value="0">Select {values.config.name}</option>
                {values.config.options.map((item, i) => (
                  <option key={i} value={item.val}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
        break;
      case "dynamic":
        formTemplate = (
          <div>
            <fieldset className="form-fieldset">
              Packages:{props.formData.noOfPacket.value}
            </fieldset>
            {renderChild(data.settings.childs)}
          </div>
        );
        break;
      case "radio":
        formTemplate = (
          <div className="form-group">
            <div className="radio-label">
              {showLabel(values.required, values.labelText)}
            </div>

            {values.config.options.map((item, i) => (
              <div className="form-check form-check-inline">
                <input
                  key={i}
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id={`for-${i}`}
                  value={item.val}
                  onChange={event => changeHandler(event, data.id)}
                />
                <label class="form-check-label">{item.text}</label>
              </div>
            ))}
          </div>
        );
        break;

      case "dynamicbtn":
        formTemplate = (
          <div>
            {renderChild(data.settings.childs)}
            <button className = "btn btn-md btn-success"style={{ color: "white" }} onClick={increaseChild}>
              <i class="fas fa-plus-circle"> </i>
              Add
            </button>
            {/* {renderChild(data.settings.childs)} */}
          </div>
        );
        break;
      case "selectDynamic":
        formTemplate = (
          <div className="form-group row">
            {showLabel(values.required, values.labelText)}
            <div className="col-sm-6" style={{ display: "flex" }}>
              <select
                value={values.value}
                name={values.config.name}
                onChange={event => changeHandler(event, data.id)}
                className="form-control"
              >
                <option value="0">Select {values.config.name}</option>
                {values.config.options.map((item, i) => (
                  <option key={i} value={item.val}>
                    {item.text}
                  </option>
                ))}
              </select>

              <button
               className = "btn btn-md btn-danger"
               style = {{marginTop:'-1.8px', marginLeft:'10px'}}
                onClick={() => {
                  // console.log(props);
                  props.dynamicDecrease(values.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
        break;

      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <div>{renderFields()}</div>;
};

export default formFields;
