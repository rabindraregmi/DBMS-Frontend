import React from "react";
import Select from "react-dropdown-select";

import "./forms.css";
import DatePicker from "react-datepicker-nepali";

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
      <label class="col-sm-4 col-form-label">
        {labelText}
        <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
      </label>
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

  const dateChangeHandler = (date, id) => {
    console.log(date, id);
    const newState = props.formData;
    newState[id].value = date;
    let validateData = validate(newState[id]);
    newState[id].valid = validateData[0];
    newState[id].validationMessage = validateData[1];
    props.change(newState, id);
  };
  const setValues = (values, id) => {
    console.log(values, id);

    const newState = props.formData;
    console.log(id);
    var re = /^[0-9]+$/;
    if (re.test(id)) {
      newState.packages.childs[id].value =
        values.length !== 0 ? values[0].val : null;
    } else {
      newState[id].value = values.length !== 0 ? values[0].val : null;
      let validateData = validate(newState[id]);
      newState[id].valid = validateData[0];
      newState[id].validationMessage = validateData[1];
    }
    props.change(newState, id);
  };
  const renderTemplates = data => {
    let values = data.settings;
    let formTemplate = "";

    switch (values.element) {
      case "date-picker":
        formTemplate = (
          <div className="form-group row">
            {showLabel(values.required, values.labelText)}
            <div className="col-sm-6">
              {props.formData[data.id].value === "" ? (
                <DatePicker
                  onChange={date => {
                    dateChangeHandler(date, data.id);
                  }}
                />
              ) : (
                <DatePicker
                  date={props.formData[data.id].value}
                  onChange={date => {
                    dateChangeHandler(date, data.id);
                  }}
                />
              )}
              {!values.valid ? (
                <p style={{ color: "red" }}>{values.validationText}</p>
              ) : null}
            </div>
          </div>
        );
        break;
      case "input":
        formTemplate = (
          <div className="form-group row">
            {showLabel(values.required, values.labelText)}
            <div className="col-sm-6">
              <input
                // required={values.required}
                className="form-control"
                {...values.config}
                value={values.value}
                onChange={event => changeHandler(event, data.id)}
              />
              {!values.valid ? (
                <p style={{ color: "red" }}>{values.validationText}</p>
              ) : null}
            </div>
          </div>
        );

        break;
      case "select":
        formTemplate = (
          <div className="form-group row">
            {showLabel(values.required, values.labelText)}
            <div className="col-sm-6">
              <Select
                options={values.config.options}
                clearable={true}
                onChange={values => setValues(values, data.id)}
                searchBy="text"
                labelField="text"
                className="form-control"
              />

              {/* <select
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
              </select> */}
              {!values.valid ? (
                <div autoFocus className="alert alert-danger">
                  {values.validationText}
                </div>
              ) : null}
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
                  className="form-check-input"
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
            <button
              className="btn btn-md btn-success"
              style={{ color: "white" }}
              onClick={increaseChild}
            >
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
              <Select
                options={values.config.options}
                clearable={true}
                onChange={values => setValues(values, data.id)}
                searchBy="text"
                labelField="text"
                className="form-control"
              />

              {/* <select
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
              </select> */}

              <button
                className="btn btn-md btn-danger"
                style={{ marginTop: "-1.8px", marginLeft: "10px" }}
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
  return (
    <form
      className="main-form"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      {renderFields()}

      <button
        className="btn btn-primary"
        id="save"
        onClick={event => props.submitForm(event)}
        type="submit"
      >
        Save
      </button>

      <button
        className="btn btn-secondary"
        type="reset"
        id="snc"
        onClick={event => this.submitForm(event)}
      >
        Save and Continue
      </button>
    </form>
  );
};

export default formFields;
