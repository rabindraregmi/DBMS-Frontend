import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home/home.js";
import AddPackage from "./components/Elements/Package/addpackage.js";
import AssignPackage from "./components/Elements/Assignment/assignPackage.js";
import AddNewExam from "./components/Elements/Exam/addExam.js";
import PackageHome from "./components/Elements/Package/packageHome.js";
import Layout from "./hoc/layout.js";
import Department from "./components/Elements/Department/departmentHome.js";
import Subject from "./components/Elements/Subjects/subjects.js";
import Intermediate from "./components/Elements/Assignment/intermediate.js";
import ExamTable from "./components/Elements/Exam/examTable.js";
import Person from "./components/Elements/Person/person.js"
import Login from "./components/Elements/Login/login.js";

class Routes extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/home" exact component={Home}/>
            <Route path="/add-new-package" exact component={AddPackage} />
            <Route
              path="/assign-package/:personID"
              exact
              component={AssignPackage}
            />
            <Route path="/add-new-exam" exact component={AddNewExam} />
            <Route path="/edit-exam/:examID" exact component={AddNewExam} />

            <Route path='/edit-person/:personID' exact render={(props) => (<Person onSubmission={props.history.goBack} {...props}/>)}/>

            <Route path="/packages" exact component={PackageHome} />
            <Route path="/departments" exact component={Department} />
            <Route path="/subjects" exact component={Subject} />
            <Route path="/intermediate" exact component={Intermediate} />
            <Route path="/exams" exact component={ExamTable} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Routes;
