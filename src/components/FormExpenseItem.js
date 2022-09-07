import React, { useContext, useEffect, useState } from 'react'
import {BudgetContext} from '../context/BudgetContext'
import { getDatabase, ref, set,update,remove } from "firebase/database";
function FormExpenseItem(props) {
const {    setExpenseGroupExpenses}= useContext(BudgetContext)
const {setExpenses}= useContext(BudgetContext)
const {totalSpentBudget} = useContext(BudgetContext)
const {expenses}= useContext(BudgetContext)
const{setTotaSpentlBudget} = useContext(BudgetContext)
const {expenseKey}= useContext(BudgetContext)
const db = getDatabase();
  return (
   
    <div className='formGroupExpense'>
    <p>{props.expense.name}</p>
    <p>{props.expense.budget} Kč</p>
    <button onClick={(e)=>{
        e.preventDefault()
let array = []
let obj ;
expenses.map(expense=>{
    if(props.expense.groupId === expense.key){
obj = expense
    }
  
   
})
let arr = []
obj.groupExpenses.map((expense)=>{
    if(expense.key !== props.expense.key){
        arr.push(expense)
    }
})
console.log(obj)
let newSpent = parseInt( obj.budgetSpent) - parseInt(props.expense.budget)
setTotaSpentlBudget(totalSpentBudget-parseInt(props.expense.budget))
set(ref(db, 'finances/spent'), {
    totalSpentBudget:newSpent
  });
obj = {...obj,budgetSpent:newSpent,groupExpenses:arr}
console.log(obj)
expenses.map(expense=>{
    if(expense.key===props.expense.groupId){
        array.push(obj)
        set(ref(db, 'finances/expenses/'+expense.key), {
            expenseName:expense.expenseName,
            expenseBudget:expense.expenseBudget,
            category:"group",key:expense.key,
            budgetSpent:newSpent,
            groupExpenses:expense.groupExpenses
          
          });
    }else{
        array.push(expense)
    }
})
setExpenses(array)
setExpenseGroupExpenses(arr)

remove(ref(db, 'finances/expenses/' + expenseKey +"/groupExpenses/"+props.expense.key), {
    name:props.expense.name,
    budget:props.expense.budget
,key:props.expense.key,groupId:props.expense.groupId
  });
    }}>Delete</button>
  </div>
  )
}

export default FormExpenseItem/*







budgetSpent: 4400
category: "group"
expenseBudget: "40000"
expenseName: "4000"
groupExpenses: (2) [{…}, {…}]
key: "8385e83b-f2d1-4e66-9a70-43a14d6c312d"


*/ 