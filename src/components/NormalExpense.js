import React, { useContext, useEffect, useState } from 'react'
import {BudgetContext} from '../context/BudgetContext'
import { getDatabase, ref, set,update,remove } from "firebase/database";
function NormalExpense(props) {
  const {setExpenses}= useContext(BudgetContext)
const {totalSpentBudget} = useContext(BudgetContext)
const {expenses}= useContext(BudgetContext)
const{setTotaSpentlBudget} = useContext(BudgetContext)
const db = getDatabase();
  return (
    <div className='normalExpense'>
<h1>{props.expense.expenseName}</h1>
<h1>{props.expense.expenseBudget} kč</h1>
<button onClick={()=>{
setTotaSpentlBudget(totalSpentBudget - parseInt(props.expense.expenseBudget))
let spent = totalSpentBudget - parseInt(props.expense.expenseBudget)
set(ref(db, 'finances/spent'), {
  totalSpentBudget:spent
});
let arrr=[]
expenses.map(expense=>{
  if(expense.key !== props.expense.key){
    arrr.push(expense)
  }})

setExpenses(arrr)
remove(ref(db, 'finances/expenses/' + props.expense.key));

}}>Delete</button>
    </div>
  )
}

export default NormalExpense