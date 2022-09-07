import React from 'react'

function FilteredExcersize(props) {
  return (
<div onClick={()=>{
  props.setFitPic(props.fit.gifUrl)
props.setShowExercize(true)
  props.setBackground(true)
    props.setFitName(props.fit.name)
}} className='filteret-excersize'>
<img src={props.fit.gifUrl}></img>
<p>{props.fit.name}</p>
</div>
  )
}

export default FilteredExcersize