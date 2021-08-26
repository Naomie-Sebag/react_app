import React, { Component } from "react";
import "./navbar.css";


export default class Welcome extends Component {
render() {
      const { state } = this.props.location// this.props.location
  
  var user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
<div>
  <welcome>
  <strong>Welcome {user} </strong> 
  
  </welcome>
  </div> 
    );
  }  
}