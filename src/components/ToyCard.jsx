import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.toyObj.name}</h2>
        <img src={this.props.toyObj.image} alt={this.props.toyObj.name} className="toy-avatar" />
        <p>{this.props.toyObj.likes} Likes </p>
        <button onClick={() => this.props.likeToy(this.props.toyObj)} className="like-btn">Like {'<3'}</button>
        <button onClick={() => this.props.deleteToy(this.props.toyObj)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
