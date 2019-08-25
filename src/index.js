import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes.js'

import { BrowserRouter } from 'react-router-dom';


class App extends React.Component {
    
    render (){
        return (
            <div>
                {/* first time this app is get rendered and all other component are inside Routes*/}
                
                <Routes/>
            </div>
        )
    }
}


ReactDOM.render (<BrowserRouter><App/></BrowserRouter>, document.querySelector ('#root'))