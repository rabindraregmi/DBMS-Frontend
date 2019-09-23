import React from "react";
import FormFields from "../../Widgets/Form/forms.js";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBProgress,MDBDataTable} from "mdbreact";
import axios from "axios";
import Table from '../../Widgets/Tables/tables.js'
class Person extends React.Component {
  data = {
  columns : [
    // name,contact,courseCode,programme,year_part,subject,campus,teachingExperience,experienceinthisSubj,academicQualification,jobType,email
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: "100",
    },
    {
      label: "Contact",
      field: "contact",
      sort: "asc",
      width: 100
    },
    {
      label: "Course Code",
      sort: "asc",
      field: "courseCode",
      grouping:true
    },
    {
      label: "Programme",
      sort: "asc",
      field: "programme",
      grouping:true
    },
    {
      label: "Year/Part",
      sort: "asc",
      field: "year_part",
      grouping:true
    },
    {
      label: "Subject",
      sort: "asc",
      field: "subject"
    },
    {
      label: "Campus",
      sort: "asc",
      field: "campus"
    },
    {
      label: "Teaching Experience",
      sort: "asc",
      field: "teachingExperience"
    },
    {
      label: "Experince in this Subject",
      sort: "asc",
      field: "experienceinthisSub"
    },
    {
      label: "Academic Qualification",
      sort: "asc",
      field: "academicQualification"
    },
    {
      label: "Job Type",
      sort: "asc",
      field: "jobType"
    },
    {
      label: "Email",
      sort: "asc",
      field: "email"
    }
  ],
  rows:[]
}
  
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
    redirect: false,
    selectedFile: null,
    loaded: 0,
    isImport: false,
    isInserting: "no"
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
        fetch(
          process.env.REACT_APP_BASE_URL + "API/query/getOnePerson/" + personID
        )
          .then(res => res.json())
          .then(json => {
            let { formData } = this.state;
            //console.log(json[0]);
            formData.academicQualification.value =
              json[0].academicQualification;
            formData.campus.value = json[0].campus;
            formData.contact.value = json[0].contact;
            formData.courseCode.value = json[0].courseCode;
            formData.email.value = json[0].email;
            formData.experienceinthisSubj.value = json[0].experienceinthisSubj;
            formData.jobType.value = json[0].jobType;
            formData.name.value = json[0].name;
            formData.programme.value = json[0].programme;
            formData.subject.value = json[0].subject;
            formData.teachingExperience.value = json[0].teachingExperience;
            formData.year_part.value = json[0].year_part;
            this.setState({
              formData
            });
          });
      }
    }
  }

  submitForm = event => {
    event.preventDefault();
    event.persist();
    let dataToSubmit = {};
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
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
    console.log(dataToSubmit);
    let url = `${process.env.REACT_APP_BASE_URL}API/query/addPerson`;
    let methodType = "POST";
    //Update route , change params
    if (this.props.match) {
      const personID = this.props.match.params.personID;
      if (personID !== undefined) {
        url =
          `${process.env.REACT_APP_BASE_URL}API/query/editPerson/` + personID;
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
        // console.log(res);
        const personID = this.props.match.params.personID;
        if (res.status === 200) {
          if (personID !== undefined || event.target.id === "save")
            this.props.history.goBack();
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
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };
  uploadFile = async () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    if (this.state.selectedFile === null) {
        await this.setState({
          isInserting: "empty",
          loaded: 0
        });
        return;
      }
    const res = await axios.post(
      process.env.REACT_APP_BASE_URL + "API/query/upload",
      data,
      {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      }
    );

    await this.setState({
      isInserting: "onProgress"
    });

    let response = await fetch(
      process.env.REACT_APP_BASE_URL + "API/query/postExcel",
      {
        method: "post",
        headers: {
          Accept: "application/json"
        }
      }
    );
    if (response.status == 500) {
      await this.setState({
        isInserting: "error",
        loaded: 0
      });
    }
    if (response && response.status == 200) {
      await this.setState({
        isInserting: "done"
      });
    }

    //  fetch(process.env.REACT_APP_BASE_URL+"API/query/upload", {
    //    method: "POST",
    //   //  headers: {
    //   //   Accept: "application/json",
    //   // },
    //   body: data
    // }).then(res=>{
    //   console.log(res)
    // })
  };
  checkInserting = () => {
    let isInserting = this.state.isInserting;
    if (isInserting == "no") return <h3></h3>;
    else if (isInserting == "onProgress") return <h3>Insertion in progress</h3>;
    else if (isInserting == "error") return <h3>Error inserting data</h3>;
    else if (isInserting == "empty") return <h3>Select a file to insert</h3>;
    else return <h3>{this.props.history.goBack()}</h3>;
  };
  render() {
    return (
      <div clasName="container">
        {this.errorCheck()}
        <MDBCard>
          <MDBCardHeader>
            Add New Person
            <button
              className="btn btn-xl btn-secondary"
              style={{ float: "right" }}
              onClick={() => {
                this.setState(prevState => ({
                  isImport: !prevState.isImport
                }));
              }}
            >
              Import{" "}
            </button>
          </MDBCardHeader>
          <MDBCardBody>
            {this.state.isImport ? (
              <div>
                {this.checkInserting()}
                <MDBProgress value={this.state.loaded}>
                  {Math.round(this.state.loaded, 2)}%
                </MDBProgress>
                <input
                  type="file"
                  name="file"
                  className="btn"
                  onChange={this.onChangeHandler}
                />
                <button className="btn btn-secondary" onClick={this.uploadFile}>
                  UpLoad File
                </button>
                <br/>
                <br/>
                <br/>
                <br/>
                <h4 style= {{color:'red'}}>Table in excel file should be in this format:</h4>
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={this.data}
                  paging={false}
                  searching={false}
                  />
                
              </div>
            ) : (
              <FormFields
                formData={this.state.formData}
                change={newState => this.updateForm(newState)}
                submitForm={event => this.submitForm(event)}
              />
            )}
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}
export default Person;
