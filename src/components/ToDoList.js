import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app';
import { getDatabase, ref, set,update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import app from '../firebase';
import Todo from './Todo';
function ToDoList() {
const [allTodos,setAllTodos] = useState()
    const [add,setAdd] = useState(false)
    const[showBio,setShowBio] = useState(false)
    const [name,setName] = useState()
    const [time,setTime] = useState()
    const [todos,setTodos] = useState([])
    const [bio,setBio] =useState()
    const [todoBio,setTodoBio] = useState()
    const [background ,setBackground] = useState(false)
    const [Category,setCategory] = useState()
    const db = getDatabase();
    function getWeek(date) {
        let monthStart = new Date(date);
        monthStart.setDate(0);
        let offset = (monthStart.getDay() + 1) % 7 - 1; // -1 is for a week starting on Monday
        return Math.ceil((date.getDate() + offset) / 7);
      }
      useEffect(()=>{
if(!allTodos){
    fetch('https://todoappzwei-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
    .then((response) => response.json())
    .then((data) =>{
        if(data=== null){
            setTodos([])
            setAllTodos([])
        }else{ 
               setTodos(Object.values(data))
            setAllTodos(Object.values(data))

        }
        
    


    }
    );
}
     
      },[])
  return (
    <div className='todolist'>
<div className='add-todo'>
    <p>ADD TO DO</p>
<i onClick={()=>{setAdd(true)
setBackground(true)}
} class="hvr-grow-rotate fa-solid fa-plus"></i>
</div>
        <div className='todos'>

        <div className='filter-todos'>
            <div>     <h1>FILTER BY TIME</h1>    
    <p onClick={()=>{
             setTodos(allTodos);
             console.log(allTodos)
    }} className='hvr-pulse-grow'>ALL</p>
    <p onClick={()=>{
        let arr =[]
        let today = new Date()

        allTodos.map((todo)=>{

let compareDate = new Date(todo.date)
if(compareDate.getDate() === today.getDate()){
    arr.push(todo)
}

        })
setTodos(arr)
    }}   className='hvr-pulse-grow'> TODAY</p>
    <p onClick={()=>{
        let arr =[]
        let today = getWeek(new Date())

        allTodos.map((todo)=>{

let compareDate = getWeek( new Date(todo.date))
if(compareDate === today){
    arr.push(todo)
}

        })
        setTodos([])
setTodos(arr)
    }} className='hvr-pulse-grow'>THIS WEEK</p>
    <p  onClick={()=>{
        let arr =[]
        let today = new Date()

        allTodos.map((todo)=>{

let compareDate = new Date(todo.date)
if(compareDate.getMonth() === today.getMonth()){
    arr.push(todo)
}

        })
        setTodos([])
setTodos(arr)
    }} className='hvr-pulse-grow'>THIS MONTH</p></div>
   
    <div>    
         <h1>FILTER BY TYPE</h1>    
    <p onClick={()=>{
       let arr=[]
       allTodos.map((todo)=>{
        if(todo.category === "SHOPPING"){
            arr.push(todo)
            setCategory("SHOPPING")
        }
       })
       setTodos([])
       setTodos(arr)
    }} className='hvr-pulse-grow'>SHOPPING <i class="fa-brands fa-shopify"></i></p>
    <p  onClick={()=>{
       let arr=[]

       allTodos.map((todo)=>{
        if(todo.category === "CHORES"){
            arr.push(todo)
        }
       })
       setTodos([])
       setCategory("CHORES")
       setTodos(arr)
    }} className='hvr-pulse-grow'>CHORES <i class="fa-solid fa-broom"></i></p>
    <p onClick={()=>{
       let arr=[]
       allTodos.map((todo)=>{
        if(todo.category === "SPORT"){
            arr.push(todo)
        }
       })
       setTodos([])
       setCategory("SPORT")
       setTodos(arr)
    }}  className='hvr-pulse-grow'>SPORT <i class="fa-solid fa-basketball"></i></p>
    <p  onClick={()=>{
       let arr=[]
       allTodos.map((todo)=>{
        if(todo.category === "WORK"){
            arr.push(todo)
        }
       })
          setTodos([])
          setCategory("WORK")
       setTodos(arr)
    }} className='hvr-pulse-grow'>WORK <i class="fa-solid fa-briefcase"></i></p>
    <p  onClick={()=>{
       let arr=[]
       allTodos.map((todo)=>{
        if(todo.category === "IMPROVEMENT"){
            arr.push(todo)
        }
       })
          setTodos([])
          setCategory("IMPROVEMENT")
       setTodos(arr)
    }} className='hvr-pulse-grow'>SELF IMPROVEMENT <i class="fa-solid fa-brain"></i></p>
    </div>
   

        </div>
<div className='show-todos'>

{todos && todos.map((todo)=>{
 return <Todo  setShowBio={setShowBio} setTodoBio={setTodoBio}
 setBackground={setBackground} setAllTodos={setAllTodos} setTodos={setTodos} allTodos={allTodos} todos={todos} todo={todo }/>
})}

</div>

        </div>




<div className={background ?'todo-background':"unshow"}>

</div>

<div className={add ?'todo-form':"unshow"}>
    <div className='close-form'><i  onClick={()=>{setAdd(false)
    setBackground(false)} }class="fa-solid fa-x"></i></div>
<div className='todo-form-name'>
<p>Name:</p>
<input onChange={(e)=>{
    setName(e.target.value)
}} type="text"></input>
</div>

<div className='todo-form-category'>
<div id="SHOPPING" onClick={(e)=>{
    let categories = document.querySelectorAll(".todo-category")
    categories.forEach(category => {
        category.classList.remove("category-chosen")
        
    });
    e.target.classList.add("category-chosen")

}}><i class="todo-category fa-brands fa-shopify"></i></div>
<div id="CHORES"  onClick={(e)=>{
    let categories = document.querySelectorAll(".todo-category")
    categories.forEach(category => {
        category.classList.remove("category-chosen")
        
    });
    e.target.classList.add("category-chosen")

}}><i class="todo-category fa-solid fa-broom"></i></div>
<div id="SPORT"  onClick={(e)=>{
    let categories = document.querySelectorAll(".todo-category")
    categories.forEach(category => {
        category.classList.remove("category-chosen")
        
    });
    e.target.classList.add("category-chosen")

}}><i class="todo-category fa-solid fa-basketball"></i></div>
<div id="WORK"  onClick={(e)=>{
    let categories = document.querySelectorAll(".todo-category")
    categories.forEach(category => {
        category.classList.remove("category-chosen")
        
    });
    e.target.classList.add("category-chosen")

}}><i class="todo-category fa-solid fa-briefcase"></i></div>
<div id="IMPROVEMENT"  onClick={(e)=>{
    let categories = document.querySelectorAll(".todo-category")
    categories.forEach(category => {
        category.classList.remove("category-chosen")
        
    });
    e.target.classList.add("category-chosen")

}}><i class="todo-category fa-solid fa-brain"></i></div>
</div>
<div className='todo-form-name'>
<p>Time:</p>
<input onChange={(e)=>{
    setTime(e.target.value)
}} type="date"></input>
</div>
<div className='todo-form-bio'>
<p>Bio:</p>
<textarea onChange={(e)=>{
    setBio(e.target.value)
}} ></textarea>
</div>
<button onClick={()=>{
    let todo;
    let category = document.querySelector(".category-chosen")
    console.log(category)
 
    const d = new Date(time);
    let dater= getWeek(d)
console.log(dater)
let day = d.getDay()
let month = d.getMonth() 
if(month !== 1 ){
    month = month +1
}

console.log(day)
    console.log(todo)
    let key  = uuidv4()
    todo ={  id:key,
        name:name,
        category:category.parentElement.id
        ,week:dater,day:day,month:month,date:time,bio:bio,completed:false
    }
    set(ref(db, 'todos/' + key), {
        id:key,
        name:name,
        category:category.parentElement.id
        ,week:dater,day:day,month:month,date:time,bio:bio,completed:false
      });
     let arr = allTodos
     if(arr=== undefined){
        arr = []
     }
     console.log(arr)
     arr.push(todo)
     if(Category){
        setTodos([])
        let array = []
        arr.map(todo=>{
           if( todo.category === Category){
            array.push(todo)
           }
        })
        setTodos(array)
     }else{
        console.log(arr)
        setTodos(arr)
     }
     setAllTodos([])
     setAllTodos(arr)
   setAdd(false)
   setBackground(false)
}}>Add</button>
</div>
<div className={showBio ?'todo-bio-form':"unshow"}>
    <div className='close-form'><i  onClick={()=>{setBackground(false)
    setShowBio(false)}
    }class="fa-solid fa-x"></i></div>

    

       <div className='todo-bio'><p >{todoBio}</p></div> 
 


</div>
    </div>
  )
}

export default ToDoList