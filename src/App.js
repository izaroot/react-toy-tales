import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toysArr: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toysArr => {
          this.setState({
            toysArr: toysArr
          })
      })
  }

  createToy = (toyObj) => {
    this.setState({
      toysArr: [...this.state.toysArr, toyObj]
    })
  }

  deleteToy = (toyObj) => {
    const newToysArr = this.state.toysArr.filter(toy => toy.id !== toyObj.id)
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {method: "DELETE"})
    this.setState({
      toysArr: newToysArr
    })
  }

  likeToy = (toyObj) => {
    // const index = this.state.toysArr.findIndex( toy => toyObj.id === toy.id)
    // const filteredToys = this.state.toysArr.filter ( toy => toy.id !== toyObj.id)
    // toyObj.likes = ++toyObj.likes
    const newLikes = toyObj.likes +1
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
    .then(() => {
      const toys = this.state.toysArr.map( toy => {
        return toy.id === toyObj.id ? {...toy, likes: ++toy.likes} : toy
      })
      this.setState({
        toysArr: toys
      })
    })
  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toysArr={this.state.toysArr} deleteToy={this.deleteToy} likeToy={this.likeToy} />
      </>
    );
  }

}

export default App;
