import React, { Component } from "react";
import "./navbar.css";
import PieChart from "../PieChart";


export default class Welcome extends Component {
render() {
      const { state } = this.props.location// this.props.location
  
  var user = [JSON.parse(localStorage.getItem("username"))];
  //var name = JSON.parse(localStorage.getItem("fullname"));
  console.log(user);
  return (
 <div>
  <welcome>
  <strong>Welcome {user} </strong>
   
  </welcome> 
  <PieChart/> 
  </div> 
    );
  }  
}