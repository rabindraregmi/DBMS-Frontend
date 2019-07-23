import React from 'react';
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom';
import './buttons.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus,faEdit} from '@fortawesome/free-solid-svg-icons'




const HomePageButtons = (props) => {

    
    const showButtons = () => {
        return props.buttons.map( (button,i) =>{
            const divStyle = {
                background: button.color
            }
            return (
               <div key={i} className={button.className} style = {divStyle}>
                        <div className= 'buttonText'>
                        <FontAwesomeIcon icon=  {button.icon}/>
                        <Link to ={button.link}>
                        {button.text}
                        </Link>
                        </div>
                   
                </div>
            )
        } )
    }
    
    
    return (
        <div className = {props.class}>
            {showButtons()}
        </div>
    )

}
export default HomePageButtons;