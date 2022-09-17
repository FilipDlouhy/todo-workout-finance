import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set , remove,update} from "firebase/database";
function DisplayedWorkout(props) {
    let navigate = useNavigate()
    const db = getDatabase()
  return (
    <div className='displayed-workout'>
    <p>NAME: {props.workout.name}</p>
    <p>TYPE:{props.workout.type}</p>
    <button onClick={()=>{
      props.setBackground(true)
      props.setShowWorkout(true)

      fetch(`https://todoappzwei-default-rtdb.europe-west1.firebasedatabase.app/workouts/${props.workout.id}/workout.json`)
      .then((response) => response.json())
      .then((data) => {
        if(data === null){
          props.setViewWorkout([])
        }else{
          props.setViewWorkout(Object.values(data))
      
        }
        
  
      
      });

  
    }}>VIEW</button>
    <button onClick={()=>{
        props.setWorkoutId(props.workout.id)
        props.setWorkoutType(props.workout.type)
        navigate("/workout")
    }} >UPDATE</button>
    <button
    onClick={()=>{
     let arr =[]
     props.workouts.map((workout)=>{
      if(workout.id !== props.workout.id){
        arr.push(workout)
      }
     })

     remove(ref(db, `workouts/${props.workout.id}`))
props.setWorkouts(arr)
    }}
    >DELETE</button>
    </div>
  )
}

export default DisplayedWorkout