import React from 'react'
import SingleProjectCard from './SingleProjectCard'

const AllProjectsSection = () => {
  return (
    <div className='h-[78%] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-8 flex-wrap mt-6 '>
      <SingleProjectCard/>
      <SingleProjectCard/>
      <SingleProjectCard/>
      <SingleProjectCard/>
      <SingleProjectCard/>
    </div>
  )
}

export default AllProjectsSection