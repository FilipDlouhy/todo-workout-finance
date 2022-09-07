import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set,update,remove } from "firebase/database";
function WorkoutExersize(props) {
    const [sets,setSets] = useState(props.sets)
    const db = getDatabase()
    useEffect(()=>{
        setSets(props.sets)
    } ,[props.workout])
  return (
    <div className='workout-excersize'>
    <img src={props.img}></img>
    <p>{props.name}</p>
    <div>
<button onClick={(e)=>{
    let arr = props.workout
    let newArr =[]
 console.log(arr)
    arr.map((fiten)=>{
       
        if(fiten.name=== props.name){ 
            newArr = arr.map(obj => {
                if (obj.name === props.name) { 
                   console.log("SADASD")
                    let numero = sets +1
                    setSets(sets+1)
                    console.log(numero)
                    update(ref(db,`workouts/${props.workoutId}/workout/${props.name}`), {
                        name:props.name,
                        img:props.img,
                        sets:numero
                      });
                  return {...obj,sets :numero };
              
                }
            else {
                return obj
            }})
         
                   
                console.log(newArr)
                
                props.setWorkout(newArr)      


}})}}>
    +
</button>
<p> Sets: {sets}</p>
<button onClick={(e)=>{
    let arr = props.workout
    let newArr =[]
 console.log(arr)
    arr.map((fiten)=>{
       
        if(fiten.name=== props.name){ 
            newArr = arr.map(obj => {
                if (obj.name === props.name) { 
                   console.log("SADASD")
                    let numero = sets-1
                    if(numero === 0){
                        remove(ref(db, `workouts/${props.workoutId}/workout/${props.name}`), {
                            name:props.name,
                            img:props.img,
                            sets:numero
                          });
                          return {...obj,sets :numero };
                    }else{
                        setSets(sets-1)
                        console.log(numero)
                        update(ref(db, `workouts/${props.workoutId}/workout/${props.name}`), {
                            name:props.name,
                            img:props.img,
                            sets:numero
                          });
                      return {...obj,sets :numero };
                    }
                   
              
                }
            else {
                return obj
            }})
         
                   
                console.log(newArr)
                
                props.setWorkout(newArr)      


}})}}> -</button>
    </div>

</div>
  )
}

export default WorkoutExersize