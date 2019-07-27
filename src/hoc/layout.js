import React , {Component}  from 'react';
import Header from '../components/Header/header.js'
import './layout.css'
class Layout extends Component {

    state = {
        showNav: false
    }
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
                {this.props.children}
            </div>
            </div>
        )
    }
}
export default Layout;