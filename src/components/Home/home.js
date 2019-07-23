import React from 'react';
import HomePageButtons from './homebuttons.js'
import PendingPackageTable from './pendingPackageTable.js'
import './buttons.css'
//import Chart from '../Widgets/Charts/charts.js'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus,faEdit} from '@fortawesome/free-solid-svg-icons'

const buttons = [
    {
        text: 'Entry New Package',
        className: 'home-button',
        color:'#3ec7c2',
        icon: faPlus,
        link: '/add-new-package'
    },
    {
        text: 'Assign Packages',
        className: 'home-button',
        color:'#1cafec',
        icon:faEdit,
        link:'/assign-package'
    },
    {
        text: 'Add New Exam',
        className: 'home-button',
        link: '/add-new-exam',
        color:'#3ec7c2',
        icon:faPlus,
    },

]


const Home = () =>{
    const PendingTitle =()=>{
        return(
            <div className = "pendingTitle">
            <span className = "pendingTitleText">
                PENDING PACKAGES
            </span>
            </div>
        )
    }
    
    
    return (
        <div>
            
            <HomePageButtons class= "homepageButtons" buttons = {buttons}/>
            {PendingTitle()}
            <PendingPackageTable/>
        </div>
    )
}
export default Home;