import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";
import { calendarFunctions } from "../../Widgets/jquery.nepaliDatePicker";
import BreadCrumbs from '../../Widgets/Breadcrumb/breadcrumb.js'
let adbs = require("ad-bs-converter");


const breadCrumbItem = [
{
  text:"Person Table",
  link:"/intermediate"
},
{
  text:"Assign Package",
  link:"#"
}
]
class AssignPackage extends Component {
  id = 0;
  options = [];

  state = {
    personID: "",
    personData: {},
    formData: {
      name: {
        element: "input",
        value: "",
        label: true,
        labelText: "Name",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter Name of Pakager Receiver"
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
          placeholder: "Enter Address of receiver"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      courseCode: {
        element: "input",
        value: "",
        label: true,
        labelText: "Course Code",
        config: {
          name: "courseCode_input",
          type: "text",
          placeholder: "Eg. SH401"
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
          type: "tel",
          placeholder: "Enter Contact Number"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      dateOfAssignment: {
        element: "date-picker-jq",
        value: "",
        label: true,
        labelText: "Date of Assignment",
        config: {
          name: "assignedDate_input",
          type: "date",
          placeholder: "Enter Date of Assignment"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      dateOfDeadline: {
        element: "date-picker-jq",
        value: "",
        label: true,
        labelText: "Date of Deadline",
        config: {
          name: "submissionDay_input",
          type: "date",
          placeholder: "Enter Deadline Day"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      packages: {
        element: "dynamicbtn",
        childs: []
      }
    }
  };

  updateForm = newState => {
    this.setState({
      formData: newState
    });
  };

  increaseDynamicForm = noOfPacket => {
    noOfPacket = 1;
    //  newChild
    let newChild = {
      id: this.id,
      element: "inputselect",
      removeButton: true,
      value: "0",
      label: true,
      labelText: "Package",
      config: {
        name: "Package",
        options: this.options
      },
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      validationText: ""
    };

    this.setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        packages: {
          ...prevState.formData.packages,
          childs: [...prevState.formData.packages.childs, newChild]
        }
      }
    }));
    this.id += 1;
  };

  decreaseDynamic = targetIndex => {
    this.setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        packages: {
          ...prevState.formData.packages,
          childs: prevState.formData.packages.childs.filter((value, index) => {
            return value.id !== targetIndex;
          })
        }
      }
    }));
  };
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    const nepaliDate = adbs.ad2bs(year + "/" + month + "/" + day).en;
    year = nepaliDate.year;
    month = nepaliDate.month;
    day = nepaliDate.day;

    if (nepaliDate.month.length < 2) month = "0" + nepaliDate.month;
    if (nepaliDate.day.length < 2) day = "0" + nepaliDate.day;

    return [year, month, day].join("/");
  }
  componentDidMount = () => {
    let { params } = this.props.match;
    console.log(params);
    Date.prototype.addDays = function(d) {
      return new Date(this.valueOf() + 864e5 * d);
    };
    fetch(`http://localhost:4000/API/query/getOnePerson/${params.personID}`)
      .then(res => res.json())
      .then(json => {
        
        let { formData } = this.state;
        console.log(this.formatDate(new Date()));
        let assignmentDate = this.formatEnglishDateToNep(
          this.formatDate(new Date())
        );
        let date = new Date();
        let deadlineDate = this.formatEnglishDateToNep(
          this.formatDate(date.addDays(20))
        );
        console.log(assignmentDate);
        formData.name.value = json[0].name;
        formData.contact.value = json[0].contact;
        formData.address.value = json[0].campus;
        formData.courseCode.value = json[0].courseCode.toString().replace(" ","");
        formData.dateOfAssignment.value = assignmentDate;
        formData.dateOfDeadline.value = deadlineDate;
        this.setState({
          formData: formData,
          isLoaded: true,
          personData: json,
          personID: params.personID
        });
      });

    //Fetch data from API and store data in options
    fetch("http://localhost:4000/API/query/getNotAssignedPackages")
      .then(res => res.json())
      .then(json => {
        for (let pkg of json) {
          let temp = {};
          temp["val"] = pkg.id;
          temp["text"] = pkg.packageCode;
          this.options.push(temp);
        }
      });
  };

  formatNepaliDateToEng = nepaliDate => {
    if (nepaliDate !== "") {
      const date = nepaliDate.split("/");
      const year = calendarFunctions.getNumberByNepaliNumber(date[0]);
      const month = calendarFunctions.getNumberByNepaliNumber(date[1]);
      const day = calendarFunctions.getNumberByNepaliNumber(date[2]);
      return [year, month, day].join("/");
    }
    return "";
  };

  formatEnglishDateToNep = englishDate => {
    if (englishDate !== "") {
      const date = englishDate.split("/");
      const year = calendarFunctions.getNepaliNumber(parseInt(date[0]));
      const month = calendarFunctions.getNepaliNumber(parseInt(date[1]));
      const day = calendarFunctions.getNepaliNumber(parseInt(date[2]));
      return [year, month, day].join("/");
    }
    return "";
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    dataToSubmit["personID"] = this.state.personID;
    for (let key in this.state.formData) {
      if (key === "dateOfAssignment" || key === "dateOfDeadline") {
        dataToSubmit[key] = this.formatNepaliDateToEng(
          this.state.formData[key].value
        );
        if (dataToSubmit[key] === "") {
          console.log("Insert today");
          //Set the default value to today
          const today = new Date();
          const dd = today.getDate();
          const mm = today.getMonth() + 1; //Months are zero based
          const yyyy = today.getFullYear();
          const nepaliDate = adbs.ad2bs(yyyy + "/" + mm + "/" + dd).en;
          //Year month day format with  0 padded if mm or dd < 10
          dataToSubmit[key] =
            nepaliDate.year.toString() +
            "/" +
            ("0" + nepaliDate.month.toString()).slice(-2) +
            "/" +
            ("0" + nepaliDate.day.toString()).slice(-2);
        }
      } else if (key === "packages") {
        const childs = this.state.formData[key].childs;
        const packages = [];
        console.log(childs);
        for (let child in childs) {
          packages.push(childs[child].value);
        }
        dataToSubmit[key] = packages;
      } else {
        dataToSubmit[key] = this.state.formData[key].value;

        //Validation
        const state = this.state;
        if (
          dataToSubmit[key] === null ||
          dataToSubmit[key].match(/^ *$/) !== null ||
          dataToSubmit[key] === 0
        ) {
          console.log("Empty ");
          state.formData[key].validationText =
            state.formData[key].labelText + " cannot be empty";
          state.formData[key].valid = false;
          this.setState(state);
          return;
        } else {
          state.formData[key].validationText = "";
          state.formData[key].valid = true;
          this.setState(state);
        }
      }
    }
    console.log(dataToSubmit);
    fetch("http://localhost:4000/API/query/addAssignment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSubmit)
    })
      .then(res => {
        console.log(res);
        this.props.history.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>

      <BreadCrumbs breadcrumbItems = {breadCrumbItem}/>
      <FormFields
        formData={this.state.formData}
        change={newState => this.updateForm(newState)}
        createNewForm={noOfPacket => this.increaseDynamicForm(noOfPacket)}
        dynamicIncrease={this.increaseDynamicForm}
        dynamicDecrease={this.decreaseDynamic}
        submitForm={event => this.submitForm(event)}
        />
      </div>
    );
  }
}

export default AssignPackage;
