import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './hoc/layout.js';
import Routes from './routes.js'
import LoginRoutes from './loginroutes.js'
import { BrowserRouter } from 'react-router-dom';


class App extends React.Component {
    
    render (){
        return (
            <div>
                {/* first time this app is get rendered and all other component are inside Routes*/}
               <BrowserRouter>
                <LoginRoutes/>
                <Routes/>
                </BrowserRouter>
            </div>
        )
    }
}


ReactDOM.render (<App/>, document.querySelector ('#root'))