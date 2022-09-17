
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set , remove,update} from "firebase/database";
import DisplayedWorkout from './DisplayedWorkout';
import ViewWorkoutExersize from './ViewWorkoutExersize';
function Workouts(props) {
    const[add,setAdd] = useState(false)
    const [background ,setBackground] = useState()
const [name,setName] = useState()
    const [category,setCategory] = useState()
    const [showWorkout,setShowWorkout] = useState(false)
const [workouts,setWorkouts] = useState()
const [viewWorkout,setViewWorkout] = useState()
useEffect(()=>{

  fetch('https://todoappzwei-default-rtdb.europe-west1.firebasedatabase.app/workouts.json')
  .then((response) => response.json())
  .then((data) =>{
    if(data=== null){
      setWorkouts([]) }else{
        setWorkouts(Object.values(data))
      }
  })
  }
  ,[])
const db =getDatabase()
  return (
    <div className='workouts' >
        <h1>CHOOSE YOUR WORKOUTS</h1>
        <div className='add-workout'>
    <p>ADD TO WORKOUT</p>
<i onClick={()=>{setAdd(true)
setBackground(true)}
} class="hvr-grow-rotate fa-solid fa-plus"></i>
</div>


<div className='display-workouts'>
  <h1>Your Workouts</h1>
{workouts && workouts.map((workout)=>{
  return <DisplayedWorkout setWorkouts={setWorkouts}
  workouts={workouts} setBackground={setBackground} setShowWorkout={setShowWorkout} setViewWorkout={setViewWorkout} setWorkoutType={props.setWorkoutType} setWorkoutId={props.setWorkoutId} workout={workout} />
})}
</div>

<div className={background ?'todo-background':"unshow"}>

</div>
<div className={add ?'workout-form':"unshow"}>
    <div className='close-form'><i  onClick={()=>{setAdd(false)
    setBackground(false)} }class="fa-solid fa-x"></i></div>
<div className='workout-options'>
  <h1>OPTIONS FOR WORKOUT</h1>
  <p className='workout-option' onClick={(e)=>{
    let options = document.querySelectorAll(".workout-option")
    options.forEach((option)=>{
      option.classList.remove("workout-chosen")
    })
    e.target.classList.add("workout-chosen")
    setCategory("upperBody")
  }}>UPPER BODY</p>
  <p onClick={(e)=>{
        let options = document.querySelectorAll(".workout-option")
        options.forEach((option)=>{
          option.classList.remove("workout-chosen")
        })
        e.target.classList.add("workout-chosen")
        setCategory("legs")
  }} className='workout-option'>LEGS</p>
  <p onClick={(e)=>{
    let options = document.querySelectorAll(".workout-option")
    options.forEach((option)=>{
      option.classList.remove("workout-chosen")
    })
    e.target.classList.add("workout-chosen")
    
    setCategory("push")
  }} className='workout-option'>PUSH</p>
  <p onClick={(e)=>{
    let options = document.querySelectorAll(".workout-option")
    options.forEach((option)=>{
      option.classList.remove("workout-chosen")
    })
    e.target.classList.add("workout-chosen")
    
    setCategory("pull")
 }} className='workout-option'>PULL</p>
  <p   onClick={(e)=>{
    let options = document.querySelectorAll(".workout-option")
    options.forEach((option)=>{
      option.classList.remove("workout-chosen")
    })
    e.target.classList.add("workout-chosen")
    setCategory("fullBody")
 }} className='workout-option'>FULL BODY</p>
  <p   onClick={(e)=>{
    let options = document.querySelectorAll(".workout-option")
    options.forEach((option)=>{
      option.classList.remove("workout-chosen")
    })
    e.target.classList.add("workout-chosen")
    setCategory("cardio")
 }} className='workout-option'>CARDIO</p>
</div>
<div className='todo-form-name'>
<p>Name:</p>
<input onChange={(e)=>{
    setName(e.target.value)
}} type="text"></input>
</div>
<button onClick={()=>{
let key = uuidv4()
let workout={
  type:category
  ,name:name,
id:key
}
let arr = workouts
set(ref(db, 'workouts/' +key), {
  type:category
  ,name:name,
id:key });
arr.push(workout)
setWorkouts(arr)
setAdd(false)
    setBackground(false)
}} >Add</button>
</div>


<div className={ showWorkout ? 'see-workout-form':"unshow"}>
 
<p onClick={()=>{
      setShowWorkout(false)
      setBackground(false)
    }}><i class="fa-solid fa-x"></i></p>

{viewWorkout && viewWorkout.map((fit)=>{

      if(fit.sets !== 0){
        return <ViewWorkoutExersize img={fit.img} sets={fit.sets } name={fit.name} />

      }
         
      
    })
}

</div>

    </div>
  )
}

export default Workouts