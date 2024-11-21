import React from 'react'
import ProjectsHeader from './Components/ProjectsHeader'
import ProjectsSubHeader from './Components/ProjectsSubHeader'
import AllProjectsSection from './Components/AllProjectsSection'
import StatsRightSideBar from './Components/StatsRightSideBar'

const AllProjects = () => {
  return (
   <div className="bg-slate-100 w-full min-h-screen flex">
      <div className="w-[78%] p-10 flex flex-col gap-3 max-sm:w-[100%] max-sm:p-[30px]">
         <ProjectsHeader/>
         <ProjectsSubHeader/>
         <AllProjectsSection/>
      </div>
      <StatsRightSideBar/>
   </div>
   
  )
}

export default AllProjects