import React, { useMemo } from 'react'
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { useContextApp } from '../../contextApp';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Project } from '@/app/Components/Data/AllProjects';
const StatsRightSideBar = () => {
  const {  
    modelObject: { openModal, setOpenModal},
    allProjectsObject: { allProjects, setAllProjects},
    selectedIconObject: { selectedIcon, setSelectedIcon},
    selectedProjectObject:{selectedProject, setSelectedProject},
  } = useContextApp()

  const { completedProjects, completedTasks , completePercen} = useMemo( ()=>{
    let completedProjects: Project[] = []
    let totalTasks = 0 
    let completedTasks = 0

    allProjects.forEach( (project)=>{
      const projectCompleted = project.tasks.every(
        (task) => task.status === "Completed"
      )

      if (projectCompleted) completedProjects.push(project)
      project.tasks.forEach( (task)=>{
        totalTasks++
        if(task.status === "Completed") completedTasks++
      } )
        
    })

    const percen = completedProjects.length > 0 ? Math.round( (completedProjects.length / allProjects.length) * 100 ) : 0

    return {
      completedProjects: completedProjects,
      completedTasks,
      completePercen: percen
    }


  },[allProjects] )
  // console.log("completedProjects",completedProjects);
  // console.log("completedTasks",completedTasks);
  // console.log("completePercen",completePercen);
  return (
    <div className='w-[22%] flex justify-end items-center max-sm:hidden'>
      <div className="h-[92%] w-[94%] bg-white rounded-l-3xl p-3 flex flex-col">
        <Header/>
        <div className="flex flex-col gap-11 items-center justify-center mt-6">
          <CircularChart percen={completePercen} />
          <ProjectCompletedLabels 
            completedTasks= {completedTasks}
            completedProjects= {completedProjects}
          />
        </div>
        <ProjectList completedProjects= {completedProjects}/>
      </div>
    </div>
  )

}

export default StatsRightSideBar

function Header(){
  return (
    <h2 className="text-[22px] font-bold text-center mt-7">Project Completed</h2>
  )
}

function NotProjectIcon(){
  return (
    <div className="">
      <p className='text-slate-400 text-center'>No Project completed ...</p>
    </div>
  )
}
function CircularChart({percen}: {percen: number}){
  return(
    <div className="flex justify-center items-center">
      <div className="w-40 h-40 bg-slate-100 mt-5 rounded-full flex items-center justify-center">
        {/* <div className="w-[86%] flex justify-center items-center h-[86%] bg-white rounded-full">
          <div className="text-xl font-semibold text-orange-600">90%</div>
        </div> */}
        <CircularProgressbar
          value={percen}
          text={`${percen}%`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: 'rgba(234,88,12,2)',
            textColor:'#f97316',
            trailColor: '#f1f5f9',
            backgroundColor:'#3e98c7'
          })}
        />
      </div>
    </div>
  )
}

function ProjectCompletedLabels({completedProjects, completedTasks}: {completedProjects: Project[], completedTasks:number}){
  return(
    <div className="flex justify-center flex-col gap-1 items-center">
      <p className="font-bold text-[17px]"> {completedProjects.length} Completed</p>
      <p className="text-slate-400 text-[13px]"> {completedTasks} Tasks done</p>
    </div>
  )
}

function ProjectList({completedProjects}: {completedProjects: Project[]}){
  return(
    <ul className=' flex flex-col gap-3 mt-16 mx-4 overflow-auto'>
      <div>
        {completedProjects.length === 0 && <NotProjectIcon />}
      </div>
      {completedProjects.map( (project,index) =>(
        <div className="" key={project.id}>
          <SingleProject project={project}/>
          <hr className="w-[80%] mx-auto text-slate-100 opacity-50" />
        </div>
         
      ) )}
       
        {/* <SingleProject />
        <hr className="w-[80%] mx-auto text-slate-100 opacity-50" />
        <SingleProject />
        <hr className="w-[80%] mx-auto text-slate-100 opacity-50" /> */}
    </ul>
  )
}

function SingleProject( {project}: {project: Project}){
  return(
    <li className="p-3 flex gap-2 items-center">
      <div className="w-8 h-8 bg-orange-600 rounded-md justify-center items-center flex text-white">
        <SplitscreenIcon sx={{fontSize:"19px"}}/>
      </div>
      <ul>
        <li className='text-[14px] font-semibold'>{project.title}</li>
        <li className='text-[12px] text-slate-400'>{project.tasks.length} Tasks</li>
      </ul>
    </li>
  )
}