import React from 'react'
import  KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { useContextApp } from '../../contextApp';
import { Task } from '@/app/Components/Data/AllProjects';
const TasksSubHeader = () => {
  return (
   <div className='mt-20 flex justify-between font-bold items-center'>
      <MyProjectText />
      <SortByButton />
   </div>
  )
}

export default TasksSubHeader

function MyProjectText(){
   const {  
     
      allProjectsObject: { allProjects, setAllProjects},
      chosenProjectObject: { chosenProject, setChosenProject },
      
    } = useContextApp()

   // Tính tổng số công việc trong tất cả các dự án
   function allTasksInAllProjects() {
      return allProjects.reduce((acc, project) => acc + project.tasks.length, 0);
   }
   
   // Trả về số lượng công việc đã hoàn thành
   function calcCompletedTasks(tasks: Task[]) {
      return tasks.filter((task) => task.status === "Completed").length;
   }
   
   // Nếu không có dự án được chọn, trả về tổng số công việc,
   // ngược lại trả về số công việc đã hoàn thành của dự án được chọn
   const totalTasks: number = chosenProject
      ? chosenProject.tasks.length
      : allTasksInAllProjects();
   
   const completedTasks: number = chosenProject
      ? calcCompletedTasks(chosenProject.tasks)
      : allProjects.reduce((acc, project) => acc + calcCompletedTasks(project.tasks), 0);
   
   const completePercen: number = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
 
   return (
      <div className="flex items-center gap-3">
         <div className="w-[41px] -mt-1 flex justify-center items-center h-[44px] rounded-md bg-orange-100">
            <SplitscreenIcon sx={{fontSize: "21px"}} className='text-orange-600'/>
         </div>
         <ul className='flex flex-col gap-[7px]'>
            <li className="text-[17px] font-semibold flex gap-2 items-center">
               <div className="text-slate-700 flex gap-2 items-center">
                  <span className="text-lg"> {chosenProject?.title || "All Project"}</span>
                  <span className='bg-slate-700 text-white text-[14px] p-[2px] px-2 rounded-md'>{totalTasks}</span>
                  <KeyboardArrowDownIcon  className='text-slate-600 text0lg'/>
               </div>
            </li>
            <div className="flex gap-1 items-center">
               <li className='text-[12px] h-[4px] w-[280px] bg-slate-200 rounded-md overflow-auto'>
                  <div className="w-1/2 h-[100%] bg-orange-600 round-r-xl" 
                     style={{width: `${completePercen}%`}}
                  ></div>
               </li>
               <p className="text-[12px] text-slate-400 ml-3"> {completePercen.toFixed(0)}% Completed</p>
            </div>
         </ul>
      </div>
   )
}

function SortByButton(){
   return(
      <div className="flex text-[15px] font-semibold gap-3">
         <span className='text-slate-300'>Sort By</span>
         <div className="flex gap-1 items-center cursor-pointer">
            <span className='text-slate-800'>Recent Project</span>
            <KeyboardArrowDownIcon sx={ { fontSize: "19px"} }/>
         </div>
      </div>
   )
}