import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: "",
    image: "",
    likes: 0
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...this.state})
    })
    .then(resp => resp.json())
    .then(newToyObj => {
      this.props.createToy(newToyObj)
      this.setState({
        name: "",
        image: ""
      })
    })
  }

  render() {
    return (
      <div className="container">
        <form onChange={(e) => this.handleChange(e)} onSubmit={(e) => this.handleSubmit(e)} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input value={this.state.name} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input value={this.state.image} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
