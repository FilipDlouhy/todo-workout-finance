import React, { useContext, useEffect, useState } from 'react'
import {BudgetContext} from '../context/BudgetContext'
import { getDatabase, ref, set,update,remove } from "firebase/database";
function GroupExpense(props) {    const db = getDatabase();
  const {setExpenses}= useContext(BudgetContext)
const {totalSpentBudget} = useContext(BudgetContext)
const {expenses}= useContext(BudgetContext)
const{setTotaSpentlBudget} = useContext(BudgetContext)
  const  {setShowFormExpenseGroup} = useContext(BudgetContext)
  const{setBackground}=  useContext(BudgetContext)
  const{setExpenseKey} =  useContext(BudgetContext)
  const{setShowGroupExpenseForm} = useContext(BudgetContext)
  const [width,setWidth] = useState()
  const {setExpenseGroupExpenses} = useContext(BudgetContext)
  const {expenseKey}= useContext(BudgetContext)
  const[percentage,setPercentage] = useState()
  useEffect(()=>{
    console.log(props)
    let numero = props.expense.budgetSpent/parseInt(props.expense.expenseBudget)*100
    numero = Math.floor(numero)
    if(numero <101){
      setWidth(numero)
    }else{
      setWidth(100)
    }
   setPercentage(numero)
    console.log(width)
  })
  return (
    <div className='groupExpense'>

<h1>{props.expense.expenseName}</h1>
<h1>{props.expense.budgetSpent} Kč / {props.expense.expenseBudget} Kč</h1>

<div className='groupExpenseBar'>
<div  style={{ transition:"0.4s", display:"flex",alignItems:'center', backgroundColor: `red`, width: `${width}%`,height:"20px",borderRadius:"40px"}}>
</div>
</div>

<h1>{percentage} %</h1>
<div className='groupExpenseButtons'>

<button
onClick={()=>{
  setExpenseKey(props.expense.key)
  setShowFormExpenseGroup(true)
  setBackground(true)
}}
>Add Expense</button>
<button onClick={()=>{
  setBackground(true)
  setShowGroupExpenseForm(true)

  if(props.expense.groupExpenses){
    setExpenseGroupExpenses(Object.values(props.expense.groupExpenses))
  }
}}>View</button>

<button onClick={()=>{
let numero = 0
let arrr=[]
expenses.map(expense=>{
  if(expense.key !== props.expense.key){
    arrr.push(expense)
  }})
  props.expense.groupExpenses.map(expense=>
    {numero+=parseInt(expense.budget)})
    console.log(numero)
  setTotaSpentlBudget(totalSpentBudget - numero)
  let spent = totalSpentBudget - numero
  set(ref(db, 'finances/spent'), {
    totalSpentBudget:spent
  });
setExpenses(arrr)
remove(ref(db, 'finances/expenses/' + props.expense.key));

}}>Delete</button>
</div>
    </div>
  )
}

export default GroupExpense