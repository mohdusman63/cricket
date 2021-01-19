import React, { Component } from "react";

class StateFull extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "usman",
      lastName: "azmi",
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    alert("hii");
  }

  render() {
    let f1 = this.state.firstName;
    return (
      <>
        <h1>welcome</h1>
        {f1}
        <h5>{this.state.name}</h5>
        <h5>
          full Name is {this.state.firstName + "  " + this.state.lastName}
          <button onClick={this.handleClick}>click me</button>
        </h5>
      </>
    );
  }
}

export default StateFull;

2<!-111111111111111111111111111111111111111111111111111111111111111111111/>
  this.increament=this.increament.bind(this)
     this.decreament=this.decreament.bind(this)

  increament() {
      console.log(this.state.count)
      if(this.state.count>10){
          alert('greater than 10')
          return false
      }
      //wrong way
    this.setState({
      count: this.state.count + 1,
    });
  }
  decreament(){
       this.setState({
      count: this.state.count - 1,
    });
    //correct way
    increament() {
    this.setState((state, props) => ({
      count: state.count + 1,
    }));

  }
  <!-111111111111111111111111111111111111111111111111111111111111111111111/>