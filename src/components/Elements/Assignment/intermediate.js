import React, {Component} from 'react';
import PersonTable from '../Person/personTable.js'
import PersonForm from '../Person/person.js'
import './assignment.css'
class Intermediate extends Component {
    state = {
        isRegistered: true,
        isFormSubmitted:false,
        tableData: []
    }
    
    onChangeHandler = ()=>{
        let {isRegistered} = this.state;
        if (isRegistered) {
            this.setState({
                isRegistered:false
            })
        }
        else {
            this.setState({
                isRegistered:true
            })
        }
        
    }
    
    render(){
        let {isRegistered} = this.state;
        if(isRegistered){
            return (
                <div>
                    <button className = "btn btn-danger notRegisteredButton"onClick = {this.onChangeHandler}>Not Registerd Yet?</button>
                    <div className = "col-sm-2 pointer">
                        <span className = "pointer-text">

                        Choose person to Assign
                        </span>
                    </div>
                    <PersonTable/>
                </div>
        )
        }
        else {
            return (
                <div>
                    <button onClick = {this.onChangeHandler}>Go Back</button>
                    <PersonForm onSubmission={this.onChangeHandler}/>
                </div>
            )
        }
    }
}

export default Intermediate;