import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/home.js';
import AddPackage from './components/Elements/Package/addpackage.js';
import AssignPackage from './components/Elements/Package/assignPackage.js';
import AddNewExam from './components/Elements/Exam/addExam.js'
import PackageHome from './components/Elements/Package/packageHome.js'
import Layout from './hoc/layout.js';
import Department from './components/Elements/Department/departmentHome.js'
import Subject from './components/Elements/Subjects/subjects.js'


class Routes extends Component {
    render(){
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path= '/add-new-package' exact component = {AddPackage}/>
                    <Route path= '/assign-package' exact component = {AssignPackage}/>
                    <Route path= '/add-new-exam' exact component = {AddNewExam}/>
                    <Route path= '/packages' exact component = {PackageHome}/>
                    <Route path= '/departments' exact component = {Department}/>
                    <Route path= '/subjects' exact component = {Subject}/>
                </Switch>
            </Layout>
           
        )
    }
}

export default Routes;