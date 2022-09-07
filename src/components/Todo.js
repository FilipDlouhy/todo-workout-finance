import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set , remove,update} from "firebase/database";


function Todo(props) {
const [icon,setIcon] = useState()
const [day,setDay] =  useState()
const [month, setMonth] = useState()
const  [classen,setClass] = useState()
const [completed,setCompleted] = useState(props.todo.completed)
const [count,setCount] = useState(0)
const db = getDatabase();
const dateInPast = function (firstDate, secondDate) {
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }
  
    return false;
  };
    useEffect(()=>{
        
        let compareDate = new Date(props.todo.date)
let today = new Date()

if(completed === true){
    setClass("todoCOMPLETED")
}else{
    if(compareDate.getDate() === today.getDate()){
        setClass("urgent")
        }
        
        else if(dateInPast(compareDate,today)){
            setClass("todoEXPIRED")
        }
        else{
            setClass("todo")
        }
}
 if(props.todo.category === "SHOPPING"){
    setIcon("fa-brands fa-shopify")
 }
else if(props.todo.category ===  "CHORES"){
       setIcon("fa-solid fa-broom")
}
else if(props.todo.category ==="SPORT"
){
   setIcon("fa-solid fa-basketball")
}
else if(props.todo.category ==="WORK"
){
   setIcon("fa-solid fa-briefcase")
}
else if(props.todo.category ==="IMPROVEMENT"
){
   setIcon("fa-solid fa-brain")
}

if(props.todo.day === 1){
setDay("Monday")
}else if (props.todo.day === 2){
setDay("Tuesday")
}
else if (props.todo.day === 3){
  setDay("Wensday")  
}
else if (props.todo.day === 4){
 setDay("Thursday") 
}
else if (props.todo.day === 5){
  setDay("Friday")  
}
else if (props.todo.day === 6){
 setDay("Saturday")   
}

else if (props.todo.day === 7){
  setDay("Sunday")  
}

if(props.todo.month === 1){
    setMonth("January")
}
else if(props.todo.month === 2){
    setMonth("February")
}
else if(props.todo.month === 3){
    setMonth("March")
}
else if(props.todo.month === 4){
    setMonth("April")
}
else if(props.todo.month === 5){
    setMonth("May") 
} 
else if(props.todo.month === 6){
    setMonth("June")
}
else if(props.todo.month === 7){
    setMonth("July")
}
else if(props.todo.month === 8){
    setMonth("Augustus")
}
else if(props.todo.month === 9){
    setMonth("September")
}
else if(props.todo.month === 10){
    setMonth("October")
}
else if(props.todo.month === 11){
    setMonth("November")
}
else if(props.todo.month === 12){
    setMonth("December")
}







        





},[props.todos,completed])
  return (
<div  className={classen && classen}>
<p onClick={()=>{
    props.setTodoBio(props.todo.bio)
    props.setShowBio(true)
    props.setBackground(true)
}}>
    Name:<br></br>
<span>{props.todo.name}</span>
</p>
<p onClick={()=>{
    props.setTodoBio(props.todo.bio)
    props.setShowBio(true)
    props.setBackground(true)
}}>
    Category:<br></br>
<span><i className={icon && icon}></i></span>
</p>
<p>
    Day:<br></br>
<span>{day && day}</span>
</p>
<p onClick={()=>{
    props.setTodoBio(props.todo.bio)
    props.setShowBio(true)
    props.setBackground(true)
}}>
    Week of the Month:<br></br>
 <span>{props.todo.week}</span>
</p>
<p onClick={()=>{
    props.setTodoBio(props.todo.bio)
    props.setShowBio(true)
    props.setBackground(true)
}}>
    Month:<br></br>
<span>{month && month}</span>
</p>
<div onClick={()=>{

  let newTodo
    if(completed=== false){
   
       
               newTodo={
                id:props.todo.id,
                name:props.todo.name,
                category:props.todo.category
                ,week:props.todo.week,day:props.todo.day,month:props.todo.month,date:props.todo.date,bio:props.todo.bio,completed:true
               }
         
               update(ref(db, 'todos/' + props.todo.id), {
                id:props.todo.id,
                name:props.todo.name,
                category:props.todo.category
                ,week:props.todo.week,day:props.todo.day,month:props.todo.month,date:props.todo.date,bio:props.todo.bio,completed:true
               });
           
  setCompleted(true)
     

        
    }else{
        newTodo={
            id:props.todo.id,
            name:props.todo.name,
            category:props.todo.category
            ,week:props.todo.week,day:props.todo.day,month:props.todo.month,date:props.todo.date,bio:props.todo.bio,completed:false
           }
     
           update(ref(db, 'todos/' + props.todo.id), {
            id:props.todo.id,
            name:props.todo.name,
            category:props.todo.category
            ,week:props.todo.week,day:props.todo.day,month:props.todo.month,date:props.todo.date,bio:props.todo.bio,completed:false
           });
       
setCompleted(false)
        
    }
}} className='todoComplete'><i onClick={()=>{
    let newTodo
    if(completed=== false){
   
       
        newTodo={
         id:props.todo.id,
         name:props.todo.name,
         category:props.todo.category
         ,week:props.todo.week,day:props.todo.day,month:props.todo.month,date:props.todo.date,bio:props.todo.bio,completed:true
        }
  
        update(ref(db, 'todos/' + props.todo.id), {
         id:props.todo.id,
         name:props.todo.name,
         category:props.todo.category
         ,week:props.todo.week,day:props.todo.day,month:props.todo.month,date:props.todo.date,bio:props.todo.bio,completed:true
        });
    
setCompleted(true)


 
}else{
 newTodo={
     id:props.todo.id,
     name:props.todo.name,
     category:props.todo.category
     ,week:props.todo.week,day:props.todo.day,month:props.todo.month,date:props.todo.date,bio:props.todo.bio,completed:false
    }

    update(ref(db, 'todos/' + props.todo.id), {
     id:props.todo.id,
     name:props.todo.name,
     category:props.todo.category
     ,week:props.todo.week,day:props.todo.day,month:props.todo.month,date:props.todo.date,bio:props.todo.bio,completed:false
    });

setCompleted(false)
 
}
}} class={completed ?"fa-solid fa-x" :"fa-solid fa-check"}></i></div>
<div id={props.todo.id} onClick={(e)=>{
   
    let arr= props.todos
    let arrZwei = []
    arr.map((todo)=>{
        if(todo.id !== e.target.id){
            arrZwei.push(todo)
        }
    })
    props.setTodos(arrZwei)
}} className='todoDelete'><i id={props.todo.id} onClick={(e)=>{


    let arrDrei=[]
props.allTodos.map(todo=>{
    if(todo.id === props.todo.id){
     
        remove(ref(db, 'todos/' + props.todo.id), {
            id:props.todo.id,
            name:props.todo.name,
            category:props.todo.category
            ,week:props.todo.week,day:props.todo.day,month:props.todo.month
          });
    }else{
        arrDrei.push(todo)
    }
})
console.log(arrDrei)
  props.setAllTodos(arrDrei)
console.log(props.todos)
    let arr= props.todos
    let arrZwei = []
    arr.map((todo)=>{
        if(todo.id !== props.todo.id){
            arrZwei.push(todo)
        }else{
            remove(ref(db, 'todos/' + props.todo.id), {
                id:props.todo.id,
                name:props.todo.name,
                category:props.todo.category
                ,week:props.todo.week,day:props.todo.day,month:props.todo.month
              });
        }
    })
    props.setTodos(arrZwei)

}} class="fa-solid fa-x"></i></div>
</div>

  )
}

export default Todo