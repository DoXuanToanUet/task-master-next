'use client'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { useContextApp } from '../../contextApp';
const ProjectsHeader = () => {
  return (
    <div className='flex justify-between'>
         {/* Search Bar */}
         <SearchBar />

         <AddProjectButton />
    </div>
  )
}

export default ProjectsHeader


function SearchBar(){
   return (
      <div className="flex items-center">
         {/* Search Icon  */}
         <div className="border-b-2 border-orange-600 h-[39px] w-11 justify-center flex items-center">
            <SearchIcon
               className='text-slate-400 outline-none'
               sx={{ fontSize: "26px"}}
            />
         </div>

         {/* Search Input */}
         <div className="border-b-2 border-slate-200">
            <input type="text"
               placeholder='Search a project .. '
               className='p-2 bg-transparent text-[14px] outline-none'
            />
         </div>
      </div>
   )
}

// Add Button 
function AddProjectButton(){
   const {  
      openSideBarObject: {openSideBar, setOpenSideBar},
      modelObject: { openModal, setOpenModal},
      openIconObject:{ openIcon, setOpenIcon},
      selectedIconObject: { selectedIcon, setSelectedIcon}
    } = useContextApp()
   return(
      <div className="flex gap-3 items-center">
         <button className='bg-orange-600 text-white p-2 pr-3 text-[14px] rounded-md flex gap-1 items-center' 
            onClick={()=>setOpenModal(!openIcon)}
            >
            <AddIcon
               className='mt-[2px]'
               sx={{fontSize: "22px"}}
            />
            <span>New Task</span>
         </button>
         <MenuIcon 
            onClick={()=> setOpenSideBar(!openSideBar)}
            className='text-slate-400 h-9 cursor-pointer hidden max-sm:block'/>
      </div>
   )
}