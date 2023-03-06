import React from 'react'

export default function Workout({workout}) {
  return (
    
    <div>
      <label>ID: </label>
      <span> {workout.id}</span>
      <br />
      <label>Name: </label>
      <span> {workout.name}</span>
      <br />
      <label>Weight: </label>
      <span> {workout.weight}</span>
      <br />
      <label>Reps: </label>
      <span> {workout.reps}</span>
      <br />
      <label>Sets: </label>
      <span> {workout.sets}</span>
    </div>
  )
}
