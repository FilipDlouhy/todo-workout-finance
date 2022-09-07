import React, { useState } from 'react'
import ToDoList from './ToDoList'
import Workout from './Workout'
import Workouts from './Workouts'
import { BrowserRouter as Router,Routes,Route,Link, } from 'react-router-dom'
import Finances from './Finances'
function Container() {
  const [workoutId,setWorkoutId] = useState()
  const [workoutType,setWorkoutType]= useState()
  return (
    <Router>
    <div>
        <header>
          <Link to='/'>  <div className='hvr-pop'>TO DO LIST </div></Link>
          <Link to='/workouts'> <div className='hvr-pop'>WORKOUTS</div></Link>
          <Link to='/finances'> 
 <div className='hvr-pop'>FINANCES</div></Link> 
        </header>



<Routes>
  <Route path='/finances' element={<Finances/>}></Route>
  <Route path='/' element={<ToDoList/>}></Route>
  <Route path='/workouts' element={<Workouts setWorkoutType={setWorkoutType} setWorkoutId={setWorkoutId}/>}></Route>
  <Route path='/workout' element={<Workout workoutType={workoutType}  workoutId={workoutId} />}></Route>
</Routes>




    </div>
    </Router>
  )
}

export default Container