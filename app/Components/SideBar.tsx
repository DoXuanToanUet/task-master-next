'use client'
import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContextApp } from '../Pages/contextApp';
import { SvgIconProps } from '@mui/material';
const SideBar = () => {
   const {  
      openSideBarObject: {openSideBar}
   } = useContextApp()
  return (
    <div 
    className={`${openSideBar ? "w-[280px] fixed shadow-xl": "w-[150px] max-[940px]:hidden"}
    h-screen py-8 bg-white flex flex-col items-center justify-between border-r z-[90] transition-all`}>
      <Logo/>
      <Menu/>
      <Profile/>
    </div>
  )
}

export default SideBar


function Profile(){
   const {  openSideBarObject: {
      openSideBar,
      
   }} = useContextApp()
   return (
      <div className="flex items-center gap-2">
         <div className="w-7 h-7 bg-orange-600 rounded-md">
            
         </div>
         {openSideBar &&(
            <ul>
               <li className='font-bold text-[14px]'>Alex</li>
               <li className='text-slate-400 text-[11px]'>alex@gmail.com</li>
            </ul>
         )}
      </div>
   )
}


function Menu(){
   const {  
      openSideBarObject: { openSideBar} ,
      sideBarMenuObject: { sideBarMenu, setSideBarMenu}
    } = useContextApp()
   const iconMap: Record<string, React.ComponentType<SvgIconProps>> = {
      "1": BorderAllIcon,
      "2": SplitscreenIcon,
      "3": LogoutIcon
    }
   function handleClickedItem(id: number){
      const updateMenuSideBar = sideBarMenu.map((item)=>{
         if(item.id === id){
            return {...item, isSelected: true}
         }
         return {...item, isSelected: false}
      })

      setSideBarMenu(updateMenuSideBar)
   }
   // console.log("sideBarMenu",sideBarMenu)
   return (
      <div className="flex flex-col gap-6 items-start">
         {sideBarMenu.map( (menuItem)  =>   {
            const IconComponent = iconMap[menuItem.id.toString()]
            return(
               <div 
                  onClick={()=>{
                     if(menuItem.id === 1 || menuItem.id ===2 || menuItem.id ===3){
                        handleClickedItem(menuItem.id)
                     }
                  }}
                  key={menuItem.id}
                  className="flex items-center gap-2 cursor-pointer"
                 
               >
                  <IconComponent
                     sx={{fontSize: "25px"}}
                     className={`${menuItem.isSelected ? " text-orange-600 ":" text-slate-300 "}`}
                  />
                  {openSideBar &&(
                     <span
                        className={`${menuItem.isSelected ? " text-orange-600 ":" text-slate-300 "}`}
                     >
                        {menuItem.name}
                     </span>
                  )}
               </div>
            )}
         )}
         
      </div>
   )
}

function Logo(){
   return (
      <div className="rounded-md w-10 h-10 flex items-center justify-center">
         <TaskAltIcon
            className="text-orange-600 font-bold"
            sx={{ fontSize: "41px"}}
         />
      </div>
   )
}