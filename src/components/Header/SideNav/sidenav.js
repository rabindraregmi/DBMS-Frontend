import React from 'react';
import SideNav from 'react-simple-sidenav';

import SideNavItems from './sideNavItem.js'

const SideNavigation = (props) => {
    return (
        <div>
            <SideNav
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                navStyle={{
                    background:'rgb(23,100,131)',
                    maxWidth:'220px'
                }}
                >
               <SideNavItems/>
               
            </SideNav>
               
            
        </div>
    )
}

export default SideNavigation;