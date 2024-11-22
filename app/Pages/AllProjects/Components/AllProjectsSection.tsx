import React from 'react'
import SingleProjectCard from './SingleProjectCard'
import { useContextApp } from '../../contextApp'

const AllProjectsSection = () => {
  const {  allProjectsObject: { allProjects, setAllProjects}} = useContextApp()
  return (
    <div className='h-[78%] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-8 flex-wrap mt-6 '>
      {allProjects.map( (project) =>(
        <SingleProjectCard key={project.id} project={project}/>
      ) ) }
      
      {/* <SingleProjectCard/>
      <SingleProjectCard/>
      <SingleProjectCard/>
      <SingleProjectCard/> */}
    </div>
  )
}

export default AllProjectsSection