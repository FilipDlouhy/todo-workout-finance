import React, { useContext, useEffect, useState } from 'react'
import {  createContext } from "react";
import {BudgetContext} from '../context/BudgetContext'
import { getDatabase, ref, set,update } from "firebase/database";
function TotalBugdet() {
      const db = getDatabase();
  const {totalBudget} = useContext(BudgetContext)
  const {totalSpentBudget} = useContext(BudgetContext)
  const {setBackground} = useContext(BudgetContext)
  const {setShowTotalForm} = useContext(BudgetContext)
  const[color,setColor]=useState()
  const[percentage,setPercentage]=useState(0)
  const [parageaphPercent,setParagraphPercent]=useState(0)
  const {expenses}= useContext(BudgetContext)
  useEffect(()=>{
let percentage = totalSpentBudget/totalBudget *100
percentage = Math.floor(percentage)
if(totalBudget === 0){
  setPercentage(0)
  setParagraphPercent(0)
}else if(percentage>100){
  setPercentage(100)
  setParagraphPercent(percentage)
}
else{
  setPercentage(percentage)
  setParagraphPercent(percentage)
}
if(totalBudget<totalSpentBudget){
  setColor("red")
}else{
  setColor("blue")
}

  },[totalSpentBudget,expenses,totalBudget])
  return (
    <div className='totalBudget'>

<h1>{totalSpentBudget} Kč / {totalBudget} Kč</h1>
<button onClick={()=>{
  setBackground(true)
  setShowTotalForm(true)

}} >Edit </button>
<div className='bar'>

<div  style={{ transition:"0.4s", display:"flex",alignItems:'center',justifyContent:"center", backgroundColor: `${color}`, width: `${percentage}%`,height:"100%",borderRadius:"40px"}}>


</div>
<p>{parageaphPercent} %</p>
</div>

    </div>
  )
}

export default TotalBugdet