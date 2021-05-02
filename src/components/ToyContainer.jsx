import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
       {props.toysArr.map(toyObj => <ToyCard key={toyObj.id} toyObj={toyObj} deleteToy={props.deleteToy} likeToy={props.likeToy} />) }
    </div>
  )
}

export default ToyContainer;
