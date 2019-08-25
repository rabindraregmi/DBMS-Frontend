import React from 'react';
import {MDBBreadcrumb, MDBBreadcrumbItem} from 'mdbreact';
import {Link} from 'react-router-dom';
const BreadcrumSection = (props) => {
  
  const breadCrumbItem = ()=>{
    console.log(props)
    if(props.breadcrumbItems)  
    return props.breadcrumbItems.map((element, index)=>{
        return(
          <MDBBreadcrumbItem key= {index} active><Link to={element.link}>{element.text}</Link></MDBBreadcrumbItem>
        )
      })
  }
  
  return (
          
        <MDBBreadcrumb>
                  <MDBBreadcrumbItem><Link to="/">Home</Link></MDBBreadcrumbItem>
                  {breadCrumbItem()}
                  {/* <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                  <MDBBreadcrumbItem active>Dashboard</MDBBreadcrumbItem> */}
        </MDBBreadcrumb>
               
                  
           
     
  )
}

export default BreadcrumSection;

