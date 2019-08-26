import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

//HOC
import Layout from "./hoc/layout.js";
// Components
import Home from "./components/Home/home.js";

import AddPackage from "./components/Elements/Package/addpackage.js";
import Intermediate from "./components/Elements/Assignment/intermediate.js";
import AssignPackage from "./components/Elements/Assignment/assignPackage.js";
import PackageHome from "./components/Elements/Package/packageHome.js";
import PackageHistory from "./components/Elements/Package/History/packageModal.js";
import ReceivePackage from './components/Elements/Package/receivePackage.js'


import AddNewExam from "./components/Elements/Exam/addExam.js";
import ExamTable from "./components/Elements/Exam/examTable.js";
import ExamDetails from "./components/Elements/Exam/examDetails.js";

import Department from "./components/Elements/Department/departmentHome.js";
import AddDepartment from "./components/Elements/Department/addDepartment.js";

import Subject from "./components/Elements/Subjects/subjectTable.js";
import AddNewSubject from "./components/Elements/Subjects/addSubject.js"

import Person from "./components/Elements/Person/person.js";

import Program from "./components/Elements/Program/programTable.js";
import AddNewProgram from "./components/Elements/Program/addProgram.js"


import Test from './components/Widgets/test.js'
// import Auth from './hoc/protectedLayout.js'
class Routes extends Component {
  render() {
    return (
      <div>
        {/* Layout is HOC, it contains header and footer and loads for every component. Every other component are children of HOC*/}
        <Layout>
          <Switch>
            {/*exact is used to match path of component exactly. Otherwise, if there are two path home and homes, path home is rendered */}
            <Route path="/" exact component={Home}/>
            {/* Package Route */}
            <Route path="/packages" exact component={PackageHome} />
            <Route path="/add-new-package" exact component={AddPackage}/>
            <Route path="/edit-package/:packageID" exact component={AddPackage}/>
            <Route path="/assign-package/:personID" exact component={AssignPackage}/>
            <Route path="/intermediate" exact component={Intermediate} />
            <Route path = "/receivePackage/:assignmentID" exact component = {ReceivePackage}/>
            <Route path = "/packageHistory/:packageCode?" exact component = {PackageHistory}/>
            {/* Exam ROutes */}
            <Route path="/add-new-exam" exact component={AddNewExam} />
            <Route path="/edit-exam/:examID" exact component={AddNewExam} />
            <Route path="/exam-details/:examID" exact component={ExamDetails} />
            <Route path='/edit-person/:personID' exact render={(props) => (<Person onSubmission={props.history.goBack} {...props}/>)}/>
            <Route path="/add-new-person" exact component = {Person}/>
            
            {/* Subject Route */}
            <Route path="/subjects" exact component={Subject} />
            <Route path="/add-new-subject" exact component= {AddNewSubject}/>
            <Route path="/edit-subject/:subjectID" exact component= {AddNewSubject}/>

            {/* Department Route */}
            <Route path="/departments" exact component={Department} />
            <Route path="/add-new-department" exact component={AddDepartment} />
            <Route path="/edit-department/:departmentID" exact component={AddDepartment}/>

            {/* Program Route */}
            <Route path= '/add-new-program' exact component= {AddNewProgram}/>
            <Route path= '/edit-program/:programID' exact component= {AddNewProgram}/>
            <Route path= "/programs" exact component = {Program}/>
            {/* Exam Route */}
            <Route path="/exams" exact component={ExamTable} />

            <Route path = '/test' exact component = {Test}/>
            
            <Route path= '*' exact render = {()=>{
                return (<h1>404 Not Found</h1>)
            }}/>
          </Switch>
        </Layout>
      
      </div>
    );
  }
}

export default Routes;
