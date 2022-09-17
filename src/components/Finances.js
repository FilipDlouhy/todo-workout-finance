import React, { useEffect } from 'react'
import { useState } from "react";
import TotalBugdet from './TotalBudget';
import {BudgetContext} from '../context/BudgetContext'
import GroupExpense from './GroupExpense';
import NormalExpense from './NormalExpense';
import { v4 as uuidv4 } from 'uuid';
import FormExpenseItem from './FormExpenseItem';
import { getDatabase, ref, set,update,remove } from "firebase/database";
function Finances() {
    const db = getDatabase();
   const [totalBudget,setTotalBudget] = useState(0)
   const [background,setBackground] = useState(false)
   const [totalSpentBudget,setTotaSpentlBudget] = useState(0)
   const[showTotalForm,setShowTotalForm]=useState(false)
   const[showAddExpenseForm,setShowAddExpenseForm]=useState(false)
   const [expenseName,setExpenseName]= useState()
   const [expenseBudget,setExpenseBudget]= useState()
   const [groupExpenseName,setGroupExpenseName]= useState()
   const [groupExpenseBudget,setGroupExpenseBudget]= useState()
   const[expenses,setExpenses]= useState([])
   const [group,setGroup] = useState(false)
const[wrongInput,setWrongInput] = useState(false)
const[expenseKey,setExpenseKey] = useState()
const[showFormExpenseGroup,setShowFormExpenseGroup] = useState(false)
const[showGroupExpenseForm,setShowGroupExpenseForm] = useState(false)
const[expenseGroupExpenses,setExpenseGroupExpenses] = useState([])
useEffect(()=>{
fetch('https://todoappzwei-default-rtdb.europe-west1.firebasedatabase.app/finances.json') .then((response) => response.json())
  .then((data) =>{ console.log(data)

if(data.total.totalBudget === null ||data.total.totalBudget=== undefined ){
  setTotalBudget(0)
}else{
  setTotalBudget(data.total.totalBudget)
}
if(data.expenses === null ||data.expenses=== undefined ){
  setExpenses([])  
}else{
  setExpenses(Object.values(data.expenses))  
}
if(data.spent.totalSpentBudget === null ||data.spent.totalSpentBudget === undefined ){
  setTotaSpentlBudget(0)
}else{
  setTotaSpentlBudget(data.spent.totalSpentBudget)
}
console.log(data)
}
  
  
  );
},[])  
return (
    <div className='finances'>
   <BudgetContext.Provider value={{expenseKey,setExpenses,setExpenseGroupExpenses, setShowGroupExpenseForm,setExpenseKey,setShowFormExpenseGroup,expenses,setShowTotalForm,setBackground,totalBudget,setTotalBudget,totalSpentBudget,setTotaSpentlBudget}}>



    <TotalBugdet/>

<form className={ showTotalForm ? 'totalBudgetForm':'unshow'}>
<p className={ wrongInput ? "wrongBudgetText":'normalBudgetText'}>Your input is a number</p>
<input type="text" onChange={(e)=>{

if(isNaN(e.target.value)){
  setWrongInput(true)
 }else{
  setWrongInput(false)
 } 
}} placeholder={totalBudget}></input>

<button onClick={(e)=>{
  e.preventDefault()
  if(e.target.parentElement.firstChild.nextSibling.value === ""){
    setBackground(false)
setShowTotalForm(false)
  }else{
    setWrongInput(false)
    setTotalBudget(parseInt(e.target.parentElement.firstChild.nextSibling.value))
    console.log(parseInt(e.target.parentElement.firstChild.nextSibling.value))
    let budget = parseInt(e.target.parentElement.firstChild.nextSibling.value)
    set(ref(db, 'finances/total'), {
      totalBudget:budget
    });
    setBackground(false)
setShowTotalForm(false)
  }

}}>Edit</button>
</form>


<form className={ showAddExpenseForm ? 'expenseForm':'unshow'}>
<p className={ wrongInput ? "wrongBudgetText":'normalBudgetText'}>Add An Expense Group</p>
<input type="text" onChange={(e)=>{
  setExpenseName(e.target.value)
}}></input>
<input type="text" placeholder='Budget for this expense'  onChange={(e)=>{
  if(isNaN(e.target.value)){
    setWrongInput(true)
   }else{
    setWrongInput(false)
    setExpenseBudget(e.target.value)
   } 
}}></input>
<button onClick={(e)=>{
  e.preventDefault()
  setGroup(!group)
}}>
  <p>{group ? "Group":"Normal Expense"}</p>
</button>
<button onClick={(e)=>{
  e.preventDefault()
  if(wrongInput){
    setWrongInput(false)
    setBackground(false)
    setShowAddExpenseForm(false)
  }else{
    if(expenseBudget===""||expenseBudget=== undefined ){
      setWrongInput(false)
      setBackground(false)
      setShowAddExpenseForm(false)
  setExpenseName("")
  setExpenseBudget("")
    }else if (expenseName===""||expenseName=== undefined ){
      setWrongInput(false)
      setBackground(false)
      setShowAddExpenseForm(false)
  setExpenseName("")
  setExpenseBudget("")
  e.target.parentElement.firstChild.nextSibling.value=""
e.target.parentElement.firstChild.nextSibling.nextSibling.value=""
    }
    else{
      if(group === false){
        let array = expenses
        let key= uuidv4()
      let obj = {
        expenseName:expenseName,
        expenseBudget:expenseBudget,
        category:"normal",key:key
      }

      set(ref(db,'finances/expenses/' + key), {
        expenseName:expenseName,
        expenseBudget:expenseBudget,
        category:"normal",
        key:key
      });
      array.push(obj)
      setExpenses(array)
      let spent = totalSpentBudget + parseInt( expenseBudget)
      console.log(spent)
      set(ref(db, 'finances/spent'), {
        totalSpentBudget:spent
      });
      setTotaSpentlBudget(spent)
      setExpenseName("")
      setExpenseBudget("")
      console.log(array)
          setBackground(false)
          setShowAddExpenseForm(false)
          e.target.parentElement.firstChild.nextSibling.value=""
      e.target.parentElement.firstChild.nextSibling.nextSibling.value=""
      }else{
        let array = expenses
        let key= uuidv4()
        let obj = {
          expenseName:expenseName,
          expenseBudget:expenseBudget,category:"group",key:key,budgetSpent:0
        }
        
      set(ref(db, 'finances/expenses/' + key), {
        expenseName:expenseName,
        expenseBudget:expenseBudget,category:"group",key:key,budgetSpent:0
      });
        array.push(obj)
        setExpenses(array)

        setExpenseName("")
        setExpenseBudget(" ")
        console.log(array)
            setBackground(false)
            setShowAddExpenseForm(false)
            e.target.parentElement.firstChild.nextSibling.value=""
        e.target.parentElement.firstChild.nextSibling.nextSibling.value=""
      }

    }

  }
  e.target.parentElement.firstChild.nextSibling.value=""
  e.target.parentElement.firstChild.nextSibling.nextSibling.value=""
  }}>Add</button>
</form>


<form className={ showFormExpenseGroup ? 'expenseForm':'unshow'}>
<p className={ wrongInput ? "wrongBudgetText":'normalBudgetText'}>Add An Expense</p>
<input type="text" onChange={(e)=>{
  setGroupExpenseName(e.target.value)
}}></input>
<input type="text" placeholder='Budget for this expense'  onChange={(e)=>{
  if(isNaN(e.target.value)){
    setWrongInput(true)
   }else{
    setWrongInput(false)
    setGroupExpenseBudget(e.target.value)
   } 
}}></input>

<button onClick={(e)=>{
    e.preventDefault()
   if(wrongInput){
    setWrongInput(false)
    setShowFormExpenseGroup(false)
    setBackground(false)
  }else{
    if(groupExpenseBudget=== undefined ||groupExpenseBudget=== "" ){
      setWrongInput(false)
      setShowFormExpenseGroup(false)
      setBackground(false)
    }
    else if(groupExpenseName=== undefined ||groupExpenseName=== "" ){
      setWrongInput(false)
      setShowFormExpenseGroup(false)
      setBackground(false)
    }else{
      let array=[]
      expenses.map((expense)=>{
        if(expense.key === expenseKey){
          let newGroupExpenses = [];
        
          if(expense.groupExpenses){
            newGroupExpenses =Object.values( expense.groupExpenses) 
          }
        let budget = parseInt( groupExpenseBudget)
      let key = uuidv4()
          let newGroupExpense={
            name:groupExpenseName,
            budget:budget
,key:key,groupId:expense.key
          }
          set(ref(db, 'finances/expenses/' + expenseKey +"/groupExpenses/"+key), {
            name:groupExpenseName,
            budget:budget
,key:key,groupId:expense.key
          });
          newGroupExpenses.push(newGroupExpense)
     
let number = 0
newGroupExpenses.map(expense=>number += expense.budget)


 let spent = totalSpentBudget + number
  setTotaSpentlBudget(totalSpentBudget+number)
  set(ref(db, 'finances/spent'), {
    totalSpentBudget:spent
  });
          let newExpense={
            expenseName:expense.expenseName,
            expenseBudget:expense.expenseBudget,category:"group",key:expense.key,budgetSpent:number,groupExpenses:newGroupExpenses
          }
          set(ref(db, 'finances/expenses/'+expense.key), {
            expenseName:expense.expenseName,
            expenseBudget:expense.expenseBudget,category:"group",key:expense.key,budgetSpent:number,groupExpenses:newGroupExpenses
          
          });
          array.push(newExpense)
        }else{
          array.push(expense)
        }
      })
setExpenses(array)
    }
  }
e.target.parentElement.firstChild.nextSibling.value=""
e.target.parentElement.firstChild.nextSibling.nextSibling.value=""
   setShowFormExpenseGroup(false)
   setBackground(false)
   setWrongInput(false)
   setShowFormExpenseGroup(false)
   setBackground(false)
   setGroupExpenseName(undefined)
setGroupExpenseBudget(undefined)
}}>Add</button>
</form>









<div className={background ?'todo-background':"unshow"}>

</div>     

<button onClick={()=>{
  setBackground(true)
  setShowAddExpenseForm(true)
}} className='addExpenseGroup'>
  Add Expense Group
</button>

<div className='expenseGroups'>

{expenses && expenses.map(expense=>{
 if(expense.category === "group"){
  return <GroupExpense expense={expense}/>
 }else{return <NormalExpense expense={expense}/>}
})}

</div>

<form className={ showGroupExpenseForm ?'groupExpensesForm':'unshow'}>
<h1 className='groupExpensesFormClose'><i onClick={()=>{
  setShowGroupExpenseForm(false)
  setBackground(false)
}}
class="fa-solid fa-x"></i></h1>
        <h1>Expenses in the    group</h1>
        {expenseGroupExpenses && expenseGroupExpenses.map(expense=>{
          return <FormExpenseItem expense={expense}/>
        })}

    </form>




       </BudgetContext.Provider> 
       </div>
  )
}

export default Finances