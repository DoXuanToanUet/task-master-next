import React from 'react'
import TasksHeader from './Components/TasksHeader'
import TasksSubHeader from './Components/TasksSubHeader'
import TaskList from './Components/TaskList'

const AllTasks = () => {
  return (
    <div className='bg-slate-50 w-full p-10'>
      <TasksHeader/>
      <TasksSubHeader/>
      <TaskList/>
    </div>
  )
}

export default AllTasks