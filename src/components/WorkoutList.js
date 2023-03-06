import React from 'react'
import Workout from './Workout'

export default function WorkoutList({ workouts }) {
  return (
    workouts.map(workout => {
        return <Workout key={workout.id} workout={workout}/>
    })
  )
}
