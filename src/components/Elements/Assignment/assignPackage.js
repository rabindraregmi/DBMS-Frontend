import React, { Component } from "react";
import FormFields from "../../Widgets/Form/forms.js";




class AssignPackage extends Component {
  id = 0;
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
        element: "input",
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
      dateOfSubmission: {
        element: "input",
        value: "",
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
      packages: {
        element: "dynamicbtn",
        childs: []
      }
    },
    newChilds : {
      element: "selectDynamic",
      value: "0",
      label: true,
      labelText: "Package",
      config: {
        name: "packageID_input",
        options: [] 
      },
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      validationText: ""
    }
  };

  updateForm = newState => {
    this.setState({
      formData: newState
    });
  };

  increaseDynamicForm = noOfPacket => {
    noOfPacket = 1;

    let key = "Package-"+this.id;

    //  newChild
    this.setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        packages: {
          ...prevState.formData.packages,
          childs: [...prevState.formData.packages.childs, this.state.newChilds]
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
            return value.id != targetIndex;
          })
        }
      }
    }));
  };

  componentDidMount = () => {
    let { params } = this.props.match;
    console.log(params);

    fetch(`http://localhost:4000/API/query/getOnePerson/${params.personID}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          personData: json
        });
        let { formData, personData } = this.state;
        console.log(personData);

        formData.name.value = personData[0].name;
        formData.contact.value = personData[0].contact;
        formData.address.value = personData[0].campus;
        this.setState({
          formData: formData
        });
      });

      let {newChilds} = this.state;
      let packageOptions = newChilds.config.options
      fetch('http://localhost:4000/API/query/getPackages')
      .then(res=>res.json())
      .then (json=>{
        for(let pkg of json){
          let temp = {}
          temp ['val'] = pkg.id
          temp ['text'] = pkg.packageCode
          packageOptions.push(temp)
        }
        this.setState ({
          newChilds:newChilds
        })
        console.log(this.state.newChilds)

      })



  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    dataToSubmit["personID"] = this.state.personID;
    for (let key in this.state.formData) {
      if (
        key === "name" ||
        key === "contact" ||
        key === "address" ||
        key === "noOfPacket"
      ) {
        continue;
      } else if (key === "packages") {
        const childs = this.state.formData[key].childs;
        const packages = [];
        for (let child in childs) {
          packages.push(childs[child].value);
        }
        dataToSubmit[key] = packages;
      } else {
        dataToSubmit[key] = this.state.formData[key].value;
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
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container">
        <form className="main-form" onSubmit={this.submitForm}>
          <FormFields
            formData={this.state.formData}
            change={newState => this.updateForm(newState)}
            createNewForm={noOfPacket => this.increaseDynamicForm(noOfPacket)}
            dynamicIncrease={this.increaseDynamicForm}
            dynamicDecrease={this.decreaseDynamic}
          />
          <br />
          <br />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AssignPackage;
