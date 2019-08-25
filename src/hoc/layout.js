import React , {Component}  from 'react';
import Header from '../components/Header/header.js'
import './layout.css'
import {Breadcrumbs} from 'react-breadcrumbs-dynamic';
import {NavLink} from 'react-router-dom';
class Layout extends Component {

    state = {
        showNav: false
    }
    //This is used to display Sidenav after button is clicked
    toggleSideNav = (action) =>
    {
        this.setState (
            {
                showNav:action
            })
    }

    render (){
        return(
            <div className = 'layout'>
                
                
                <div className = "header">

                <Header
                showNav={this.state.showNav}
                onHideNav={() => this.toggleSideNav(false)}
                onOpenNav={() => this.toggleSideNav(true)}
                />
            </div>
            <div className = "main-content">
            {/* <Breadcrumbs
                separator={<b> / </b>}
                item={NavLink}
                finalItem={'b'}
                finalProps={{
                style: {color: 'red'}
                }}
                /> */}
                {/* EVery other component is rendered here as a child of HOC */}
                {this.props.children}
            </div>
            </div>
        )
    }
}
export default Layout;