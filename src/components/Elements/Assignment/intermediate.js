import React, {Component} from 'react';
import PersonTable from '../Person/personTable.js'
import PersonForm from '../Person/person.js'
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
                    <button className = "btn"onClick = {this.onChangeHandler}>Not Registerd Yet?</button>
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