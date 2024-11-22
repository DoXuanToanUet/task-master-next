import React from 'react'
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import { Project } from '@/app/Components/Data/AllProjects';
import { getIconComponent } from '@/app/Components/functions/IconsActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContextApp } from '../../contextApp';
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import { useEffect } from 'react';
const SingleProjectCard = ({project}: {project: Project}) => {
   // console.log("createdAt",project.createdAt);
   const dayLeft = calculateDaysLeft(project.createdAt)
   const progressPercent = calcProgress(
      project.tasks.length,
      project.tasks.filter((task) => task.status=="Completed").length
   )
  return (
    <div className='flex flex-col gap-8 rounded-lg p-7 bg-white shadow-md h-[400px]'>
   {/* //  <div className=' rounded-lg p-7 bg-white'> */}
      <ProjectCardHeader dayLeft={dayLeft}/>
      <ProjectCardBody />
      <ProjectCardFooter progressPercent={progressPercent}/>
    </div>
  )
  
// function ProjectCardHeader({dayLeft}: {dayLeft: number}){
//    return(
//       <div className="flex justify-between items-center">

//          {/* Title and Icon  */}
//          <div className="flex gap-3 items-center">
            
//             {/* Project Icon */}
//             <div className="bg-orange-600 flex justify-center items-center w-[38px] h-[38px] rounded-md">
//                {/* <SplitscreenIcon  sx={{ fontSize: "19px"}} className='text-white'/> */}
//                {getIconComponent(project.icon, 'text-white','23px')}
//             </div>

//             {/* Project Title */}
//             <div className="flex flex-col">
//                <span className='font-semibold text-[19px]'>{project.title}</span>
//                <span className='text-slate-400 text-[13px]'>{dayLeft} days ago</span>
//             </div>

//             {/* Project Bar */}
//          </div>

//          {/* More Options */}
//          <div className="">
//             <MoreVertIcon className='text-slate-400 text-[19px] cursor-pointer'/>
//          </div>
//       </div>

//    )
// }
function ProjectCardHeader({ dayLeft }: { dayLeft: number }) {
   const {   
      openConfirmModelObject: {openConfirmModel, setOpenConfirmModel},
      selectedProjectObject:{selectedProject, setSelectedProject},
      selectedIconObject: { selectedIcon, setSelectedIcon},
      modelObject: { openModal, setOpenModal},
   } = useContextApp()
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
 
   const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
     setAnchorEl(event.currentTarget); // Đặt vị trí nút bấm làm điểm neo
   };
 
   const handleClose = () => {
     setAnchorEl(null); // Đóng menu
   };
 
   const handleEdit = () => {
     console.log("Edit clicked");
     setOpenModal(true)
     setSelectedProject(project)
     handleClose(); // Đóng menu sau khi xử lý
   };
 
   const handleDelete = () => {
     console.log("Delete clicked");
     setSelectedProject(project)
      // console.log("setSelectedProject", selectedProject)
     setOpenConfirmModel(true)
     handleClose(); // Đóng menu sau khi xử lý
   };
   useEffect(() => {
      console.log("Selected Project changed:", selectedProject);
    }, [selectedProject]);
   return (
     <div className="flex justify-between items-center">
       {/* Title and Icon */}
       <div className="flex gap-3 items-center">
         <div className="bg-orange-600 flex justify-center items-center w-[38px] h-[38px] rounded-md">
           {/* Placeholder for Project Icon */}
           {/* <SplitscreenIcon sx={{ fontSize: "19px" }} className="text-white" /> */}
           {project?.icon ? (
                  getIconComponent(project?.icon, 'text-white')
               ) :(
                  <LibraryBooksIcon/>
               )}
         </div>
         <div className="flex flex-col">
           <span className="font-semibold text-[19px]">{project.title}</span>
           <span className="text-slate-400 text-[13px]">{dayLeft} days ago</span>
         </div>
       </div>
 
       {/* More Options */}
       <div
         onClick={handleMenuClick}
         className="text-slate-400 text-[19px] cursor-pointer"
       >
         <MoreVertIcon />
       </div>
 
       {/* Popup Menu */}
       {/* Popup Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={handleEdit}
          className="flex gap-2 items-center hover:text-orange-600"
        >
          <EditOutlinedIcon fontSize="small" />
          <span>Edit</span>
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          className="flex gap-2 items-center hover:text-orange-600"
        >
          <DeleteIcon fontSize="small" />
          <span>Delete</span>
        </MenuItem>
      </Menu>
     </div>
   );
 }
function ProjectCardBody(){
   return (
      <div className="h-[80px] flex flex-col gap-3 mb-1">
         <ul className="text-slate-400  text-[13px] flex flex-col gap-2 ml-3">
            {project.tasks.slice(0,3).map( (task)=>(
               <li className='flex gap-2 items-center' key={task.id}>
                  <CircleIcon className='text-[8px]'/>
                  <span>{trancateString(task.title, 40)}</span>
               </li>
            ))}
            
         </ul>

         <div className="text-[11px] text-slate-400">
            {project.tasks.length > 3 && (
               <span className='text-orange-600'> + {project.tasks.length - 3 } tasks</span>
            )}
         </div>
      </div>
     
   )
}

function ProjectCardFooter({progressPercent}: {progressPercent: number}){
   return(
      <div className="flex gap-4 flex-col mt-2">

         <div className="text-[12px] gap-3 flex items-center w-full">
            <div className="w-full h-[7px] rounded-xl bg-slate-100 overflow-hidden">
               <div 
                  style={{width: `${progressPercent}%`}}
               className=" bg-orange-600 h-full rounded-r-xl"></div>
            </div>
         </div>

         <div className="flex justify-between">
            <p className='text-[13px] text-slate-400'> On progress</p>
            <div className="flex gap-1 text-[13px]">

               {/* List icon */}
               <p>{progressPercent}%</p>
            </div>
         </div>
      </div>
   )
}

function trancateString(str: string, maxLength: number): string{
   if(  str.length > maxLength){
      return str.slice(0, maxLength) + "..."
   }
   return str
}
function calculateDaysLeft(creationDate: string): number {
   const creation = new Date(creationDate);
   // if (isNaN(creation.getTime())) {
   //   throw new Error("Ngày tạo không hợp lệ!");
   // }
   
   // Lấy thời gian hiện tại ở UTC
   const now = new Date();
   const nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
 
   // Tính khoảng cách thời gian
   const diffTime = Math.abs(nowUTC.getTime() - creation.getTime());
   return Math.floor(diffTime / (1000 * 3600 * 24)); // Trả về số ngày
 }
 

 
function calcProgress(
   totalTasks: number,
   completedTasks: number
): number{
   return  totalTasks>0 ? Math.round((completedTasks/totalTasks) * 100) : 0
}

}

export default SingleProjectCard
