import React, { useEffect, useState } from 'react'
import Back from "./Back.jpg"
import { getDatabase, ref, set,update } from "firebase/database";
import Cardio from "./Cardio.jpg"
import Biceps from "./Biceps.jpg"
import Forearms from "./Forearms.jpg"
import Chest from "./Chest.jpg"
import LowerLegs from "./LowerLegs.jpg"
import Neck from "./neck.jpg"
import Shoulders from "./shoulders.jpg"
import Triceps from "./Triceps.jpg"
import Waist from "./waist.jpg"
import FilteredExcersize from './FilteredExcersize'
import WorkoutExersize from './WorkoutExersize';
function Workout(props) {

const [allExersizes,setAllExrssizes ] = useState()
const [bodyPart,setBodyPart] = useState()
const [filteretExercises,setFilteretExercises] =useState()
const [exercise,setExrcise] = useState()
const [showExercize,setShowExercize] = useState(false)
 const [ background ,setBackground] = useState(false)
const [fitPic,setFitPic]=useState()
const [fitName,setFitName]=useState()
const [workout,setWorkout] = useState([])
const [showWorkout,setShowWorkout] = useState(false)
const [back,setback] = useState(false)
const [cardio,setcardio] = useState(false)
const [chest,setchest] = useState(false)
const [lowerarms,setlowerarms] = useState(false)
const [lowerlegs,setlowerlegs] = useState(false)
const [neck,setneck] = useState(false)
const [shoulders,setshoulders]= useState(false)
const [upperarms,setupperarms] = useState(false)
const [upperlegs,setupperlegs] = useState(false)
const [waist,setwaist] = useState(false)
const db = getDatabase()
    useEffect(()=>{
        setback(false)
        setcardio(false)
        setchest(false)
        setlowerarms(false)
        setlowerlegs(false)
        setneck(false)
        setshoulders(false)
        setupperarms(false)
        setupperlegs(false)
        setwaist(false)
console.log(props)
if(props.workoutType === "fullBody"){
    setback(true)
    setcardio(true)
    setchest(true)
    setlowerarms(true)
    setlowerlegs(true)
    setneck(true)
    setshoulders(true)
    setupperarms(true)
    setupperlegs(true)
    setwaist(true)
} else if(props.workoutType === "push"){
    setchest(true)
    setlowerarms(true)
 
    setshoulders(true)
    setupperarms(true)

}
else if(props.workoutType === "upperBody"){
    setback(true)
    setlowerarms(true)
    setchest(true)
    setshoulders(true)
    setupperarms(true)

}
else if(props.workoutType === "pull"){
    setback(true)
    setlowerarms(true)

    setshoulders(true)
    setupperarms(true)

}
else if(props.workoutType === "legs"){
    setlowerlegs(true)
    setupperlegs(true)

}
else if(props.workoutType === "cardio"){
    setcardio(true)

}
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b80f830f47mshbdc02e39933335bp1fe73ajsn536b946fda37',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };
        
        fetch('https://exercisedb.p.rapidapi.com/exercises', options)
            .then(response => response.json())
            .then(response => {setAllExrssizes(response)
            console.log(response)})
            .catch(err => console.error(err));
        fetch(`https://todoappzwei-default-rtdb.europe-west1.firebasedatabase.app/workouts/${props.workoutId}/workout.json`).then(response => response.json())
        .then((data)=>{
            if(data !== null){
                console.log(Object.values(data))
                setWorkout(Object.values(data))
            }
        })
        console.log(props)
    },[props.category])
  return (
    <div className='workout'>
        <div className='see-workout' onClick={()=>{
            setShowWorkout(true)
            setBackground(true)
        }} ><p>SEE WORKOUT</p></div>
<div

className='choose-body-part'>
   { back && <div className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}

e.target.classList.add("bodyPartChosen")
setBodyPart("back")
}}>
        <img src={Back}></img>
        <p>back</p>
    </div>}

     { cardio &&  <div className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}
e.target.classList.add("bodyPartChosen")
setBodyPart("cardio")
}}>
        <img src={Cardio}></img>
        <p>cardio</p>
    </div>}
  { chest&& <div className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}
e.target.classList.add("bodyPartChosen")
setBodyPart("chest")
}}>
            <img src={Chest}></img>
        <p>chest</p>
    </div>}
   {lowerarms&& <div className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}
e.target.classList.add("bodyPartChosen")
setBodyPart("lower arms")
}}>
        <img src={Biceps}></img>
        <p>lower arms</p>
    </div>}
{ lowerlegs&&    <div className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}
e.target.classList.add("bodyPartChosen")
setBodyPart("lower legs")
}}>
        <img src={LowerLegs}></img>
        <p>lower legs</p>
    </div>}
   { neck && <div  className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}
e.target.classList.add("bodyPartChosen")
setBodyPart("neck")
}}>
        <img src={Neck}></img>
        <p>neck</p>
    </div>}
   {shoulders && <div className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}
e.target.classList.add("bodyPartChosen")
setBodyPart("shoulders")
}}>
        <img src={Shoulders}></img>
        <p>shoulders</p>
    </div>}
 {  upperarms && <div className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}
e.target.classList.add("bodyPartChosen")
setBodyPart("upper arms")
}}>
        <img src={Triceps}></img>
        <p>upper arms</p>
    </div>}
   { upperlegs &&  <div className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}
e.target.classList.add("bodyPartChosen")
setBodyPart("upper legs")
}}>
        <img  src={LowerLegs}></img>
        <p>upper legs</p>
    </div>}
  { waist &&  <div className='bodyPartDiv' onClick={(e)=>{
          setFilteretExercises([])
let removen = document.querySelector(".bodyPartChosen")
if(removen){
    e.target.classList.add("bodyPartDiv")
    removen.classList.remove("bodyPartChosen")
}
e.target.classList.add("bodyPartChosen")
setBodyPart("waist")
}}>
        <img src={Waist}></img>
        <p>waist</p>
    </div>}
</div>

<div>

</div>
<div className='excersize-search'>
<h1>SEARCH YOUR EXERCISE</h1>
<input onChange={(e)=>{setExrcise(e.target.value)
if(e.target.value === ""){
    setFilteretExercises([])
}else{
    let arr = allExersizes
    let neuArr = []
    arr.map((fit)=>{
        if(fit.bodyPart === bodyPart){
     if(fit.name.includes(e.target.value.toLocaleLowerCase())){
      neuArr.push(fit)
     }
    
    
        }
       
    })
    
    if(neuArr.length < 40 ){
        
        setFilteretExercises(neuArr)
    }else if (neuArr === []){
        setFilteretExercises([])
    }
}


}} type="text"></input>



</div>

<div className='filteret-excersizes'>
{filteretExercises && filteretExercises.map((EXCERSIZE)=>{
    return <FilteredExcersize setFitPic={setFitPic}
    setShowExercize={setShowExercize}
    setBackground={setBackground}
    setFitName={setFitName} fit ={EXCERSIZE}/>
})}
</div>



<div className={background ?'todo-background':"unshow"}>

</div>

<div className={ showExercize? 'excersize-form':"unshow"}>
    <p onClick={()=>{
      setShowExercize(false)
      setBackground(false)
    }}><i class="fa-solid fa-x"></i></p>
    <img src={fitPic}></img>
    <p>{fitName}</p>
    <button
    onClick={()=>{
        let truth = false
        let arr =[]
        
        workout.map((fit)=>{
            if(fit.name===fitName){
                let numero = fit.sets +1
let newExersize={
    name:fit.name,
                    img:fit.img,
                    sets:numero
}
console.log(newExersize)
arr.push(newExersize)
        update(ref(db, `workouts/${props.workoutId}/workout/${fit.name}`), {
                    name:fit.name,
                    img:fit.img,
                    sets:numero
                  });
                 
                  truth = true
            }else{
                arr.push(fit)
            }

        })
if(truth){
    console.log(arr)
    setWorkout([])
    setWorkout(arr)
}else{

    allExersizes.map((fit)=>{

        if(fit.name=== fitName){
            let newExersize={
                name:fit.name,
                                img:fit.gifUrl,
                                sets:1
            }
            console.log(newExersize)
            
                    set(ref(db,  `workouts/${props.workoutId}/workout/${fit.name}`), {
                                name:fit.name,
                                img:fit.gifUrl,
                                sets:1
                              });
                              arr.push(newExersize)
        }
      })
      setWorkout([])
      setWorkout(arr)
}


    }}
    
    >ADD TO WORKOUT</button>
</div>




<div className={ showWorkout ? 'see-workout-form':"unshow"}>
 
<p onClick={()=>{
      setShowWorkout(false)
      setBackground(false)
    }}><i class="fa-solid fa-x"></i></p>

{workout && workout.map((fit)=>{

      if(fit.sets !== 0){
        return <WorkoutExersize workout={workout} workoutId={props.workoutId }setWorkout={setWorkout} name={fit.name} img={fit.img} sets={fit.sets} />

      }
         
      
    })
}

</div>



    </div>
  )
}

export default Workout


/* setEmployees(current =>
      current.map(obj => {
        if (obj.id === 2) {
          return {...obj, name: 'Sophia', country: 'Sweden'};
        }

        return obj;
      }), */