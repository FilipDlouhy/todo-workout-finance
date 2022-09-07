import React from 'react'

function ViewWorkoutExersize(props) {
  return (
   
    <div className='workout-excersize'>
    <img src={props.img}></img>
    <p>{props.name}</p>
    <div>
<p> Sets: {props.sets}</p>

    </div>

</div>
  )
}

export default ViewWorkoutExersize