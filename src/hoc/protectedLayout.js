import React from 'react';
import Routes from '../routes.js'
import {Redirect} from 'react-router-dom';
class ProtectedLayout extends React.Component {
    state= {
        isAuthorized: true
    }

    render(){
        if(this.state.isAuthorized)
        {
            return(
                <React.Fragment>
                    {this.childrens}
                </React.Fragment>
            )
        }
        else 
        {   return (

            <Redirect to= '/login'/>
        )
        }
        
    }
}
export default ProtectedLayout;