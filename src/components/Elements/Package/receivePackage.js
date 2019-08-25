import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { calendarFunctions } from "../../Widgets/jquery.nepaliDatePicker";
//Components
import Form from "../../Widgets/Form/forms.js";
let adbs = require("ad-bs-converter");

class ReceivePackage extends Component {
  state = {
    packageReceived: false,
    formData: {
      packageCode: {
        element: "input",
        value: "",
        label: true,
        labelText: "Package Code",
        config: {
          name: "packageCode_input",
          type: "text",
          disabled: "disabled",
          placeholder: "Enter Package Code"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },

      name: {
        element: "input",
        value: "",
        label: true,
        labelText: "Name",
        config: {
          name: "name_input",
          type: "text",
          disabled: "disabled",
          placeholder: "Enter Name of Pakager Receiver"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      campus: {
        element: "input",
        value: "",
        label: true,
        labelText: "Address",
        config: {
          name: "address_input",
          type: "text",
          disabled: "disabled",
          placeholder: "Enter Address of receiver"
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
          disabled: "disabled",
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
        element: "input",
        value: null,
        label: true,
        labelText: "Date of Assignment",
        config: {
          name: "assignedDate_input",

          disabled: "disabled",
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
        element: "input",
        value: null,
        label: true,
        labelText: "Date of Deadline",
        config: {
          name: "submissionDay_input",

          disabled: "disabled",
          placeholder: "Enter Deadline Day"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      dateOfSubmission: {
        element: "date-picker-jq",
        value: null,
        label: true,
        labelText: "Date of Submission",
        config: {
          name: "submissionDay_input",
          type: "date",
          placeholder: "Enter Submission Day"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      dueDay: {
        element: "input",
        value: "",
        label: true,
        labelText: "Due Days",
        config: {
          name: "dueDay_input",
          type: "number",
          disabled: "disabled",
          placeholder: "Enter Due Day"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      }
    }
  };

  //This methods will be called from form.js to set value of formElement in state of this component
  updateForm = newState => {
    this.setState({
      formData: newState
    });
  };

  //Format english date to nepali (YYYY/MM/DD)
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

  parseDate(str) {
    //Convert to english
    const englishDate = adbs.bs2ad(str);
    return new Date(
      englishDate.year,
      englishDate.month - 1,
      englishDate.day + 1
    );
  }

  findDateDifference(myDate) {
    const now = new Date();
    //console.log(now, myDate);
    return Math.round((myDate - now) / (1000 * 60 * 60 * 24));
  }

  //This method will automatically called by React once the Component finished mount
  componentDidMount = () => {
    let { params } = this.props.match; //this.props.match.params gives the parameter sent along with link eg revivePackeg/ <<assignmentID>>

    fetch(
      `http://localhost:4000/API/query/getOneAssignment/${params.assignmentID}`
    )
      .then(res => res.json())
      .then(json => {
        //This type of Destructing enable to use that state variable directly and it is better than setting state directly this.state = ....
        let { formData } = this.state;
        for (let key of Object.keys(json[0])) {
          console.log(key, json[0][key]);

          formData[key].value = json[0][key];
        }

        // formData.dateOfSubmission.value = this.formatEnglishDateToNep(
        //   this.formatDate(new Date())
        // );
        formData.dueDay.value = -this.findDateDifference(
          this.parseDate(json[0]["dateOfDeadline"])
        );
        this.setState({
          formData: formData
        });
      });
  };
  handleReceive = () => {
    let { params } = this.props.match;
    let dataToSubmit = {};
    dataToSubmit["id"] = params.assignmentID;
    if (
      this.state.formData.dateOfSubmission.value === "" ||
      this.state.formData.dateOfSubmission.value === null
    ) {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1; //Months are zero based
      const yyyy = today.getFullYear();
      const nepaliDate = adbs.ad2bs(yyyy + "/" + mm + "/" + dd).en;
      //Year month day format with  0 padded if mm or dd < 10
      dataToSubmit["dateOfSubmission"] =
        nepaliDate.year.toString() +
        "/" +
        ("0" + nepaliDate.month.toString()).slice(-2) +
        "/" +
        ("0" + nepaliDate.day.toString()).slice(-2);
    } else {
      dataToSubmit["dateOfSubmission"] = this.formatNepaliDateToEng(
        this.state.formData.dateOfSubmission.value
      );
    }
    console.log(dataToSubmit);

    fetch("http://localhost:4000/API/query/receivePackage", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSubmit)
    }).then(res => {
      if (res.status === 200) {
        alert("Package Received Sucessfully");
        this.setState({
          packageReceived: true
        });
      }
    });
  };

  //Difference between Deadling and Submission Day to calculate Due Day
  setDifference = () => {
    let { dateOfDeadline, dateOfSubmission, dueDay } = this.state.formData;
    let deadlineDate = this.parseDate(dateOfDeadline.value);
    let submissionDate = this.parseDate(dateOfSubmission.value);
    console.log(deadlineDate, submissionDate);
    dueDay.value = Math.round(
      (deadlineDate - submissionDate) / (1000 * 60 * 60 * 24)
    );
    this.setState({
      dueDay
    });
  };
  render() {
    if (this.state.packageReceived) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Form
          formData={this.state.formData}
          change={newState => this.updateForm(newState)}
          submitForm={() => this.handleReceive()}
          setDifference={() => this.setDifference()}
        />
      </div>
    );
  }
}
export default ReceivePackage;
