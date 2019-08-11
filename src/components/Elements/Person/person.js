import React from "react";
import FormFields from "../../Widgets/Form/forms.js";

class Person extends React.Component {
  state = {
    formData: {
      name: {
        element: "input",
        value: "",
        required: true,
        labelText: "Name",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter the name"
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
        required: true,
        labelText: "Contact",
        config: {
          name: "contact_input",
          type: "phone",
          placeholder: "Enter the contact"
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
        required: true,
        labelText: "Course code",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter the course code"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      programme: {
        element: "input",
        value: "",
        required: true,
        labelText: "Programme",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter the Programme"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      year_part: {
        element: "input",
        value: "",
        required: true,
        labelText: "Year/part",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter the year part of subject"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      subject: {
        element: "input",
        value: "",
        required: true,
        labelText: "Subject Name",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter the full subject name"
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
        required: true,
        labelText: "Campus",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter the campus code"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      teachingExperience: {
        element: "input",
        value: "",
        required: true,
        labelText: "Teaching experience",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter the experience"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      experienceinthisSubj: {
        element: "input",
        value: "",
        required: true,
        labelText: "Experience in this subject",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter the experience"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      academicQualification: {
        element: "input",
        value: "",
        required: true,
        labelText: "Academic qualification",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter qualification"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      jobType: {
        element: "input",
        value: "",
        required: true,
        labelText: "Type of job",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Part time or full time"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      },
      email: {
        element: "input",
        value: "",
        required: true,
        labelText: "Email",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter the email"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationText: ""
      }
    },
    error: false,
    errorText: "",
    redirect: false
  };
  updateForm = newState => {
    this.setState({
      formData: newState
    });
  };

  componentWillMount() {
    console.log(this.props);

    //Update route
    if (this.props.match) {
      const personID = this.props.match.params.personID;
      if (personID !== undefined) {
        fetch("http://localhost:4000/API/query/getOnePerson/" + personID)
          .then(res => res.json())
          .then(json => {
            let {formData} = this.state;
            //console.log(json[0]);
            formData.academicQualification.value=json[0].academicQualification;
            formData.campus.value = json[0].campus;
            formData.contact.value = json[0].contact;
            formData.courseCode.value = json[0].courseCode;
            formData.email.value = json[0].email;
            formData.experienceinthisSubj.value =json[0].experienceinthisSubj;
            formData.jobType.value = json[0].jobType;
            formData.name.value = json[0].name;
            formData.programme.value = json[0].programme;
            formData.subject.value = json[0].subject;
            formData.teachingExperience.value =json[0].teachingExperience;
            formData.year_part.value = json[0].year_part;
            this.setState({
              formData
            })
          });
      }
    }
  }

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }
    console.log(dataToSubmit);
    let url = "http://localhost:4000/API/query/addPerson";
    let methodType = "POST";
    //Update route , change params
    if (this.props.match) {
      const personID = this.props.match.params.personID;
      if (personID !== undefined) {
        url = "http://localhost:4000/API/query/editPerson/" + personID;
        methodType = "PUT";
      }
    }

    fetch(url, {
      method: methodType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSubmit)
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ error: false });
          this.props.onSubmission();
        } else this.setState({ error: true, errorText: res.statusText });
      })
      .catch(err => {
        this.setState({ error: true, errorText: err });
      });
  };

  errorCheck = () => {
    const { error, errorText } = this.state;
    if (error) {
      return <p>{errorText}</p>;
    }
  };
  render() {
    return (
      <div clasName="container">
        <form className="main-form" onSubmit={this.submitForm}>
          {this.errorCheck()}
          <FormFields
            formData={this.state.formData}
            change={newState => this.updateForm(newState)}
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Person;
