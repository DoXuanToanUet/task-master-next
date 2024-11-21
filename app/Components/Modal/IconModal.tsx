import React, {useEffect, useState} from "react";

import AppsIcon from "@mui/icons-material/Apps"
import CloseIcon from "@mui/icons-material/Close"
import AllIcons from "../Data/AllIcons";
import { useContextApp } from "@/app/Pages/contextApp";
function IconModal(){
   const {  
      modelObject: { openModal, setOpenModal},
      openIconObject:{ openIcon, setOpenIcon},
      selectedIconObject: { selectedIcon, setSelectedIcon}
    } = useContextApp()
   return(
      <div className={`${openIcon ? "block ": "hidden "} absolute p-3 h-[500px] w-[50%] max-sm:w-[90%] bg-white shadow-md left-1/2 top-28 rounded-lg -translate-x-1/2 z-[100]`}>
         <Header />
         <span className="mx-8 text-[13px] mt-12 text-slate-400">
            {`Please select the icons use the collection`}
         </span>
         <IconsArea />
      </div>
   )
}

export default IconModal

function Header(){
   const {  
      modelObject: { openModal, setOpenModal},
      openIconObject:{ openIcon, setOpenIcon},
      selectedIconObject: { selectedIcon, setSelectedIcon}
    } = useContextApp()
   return(
      <div className="flex justify-between items-center pt-7 px-7 mb-8">
         <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-200 rounded-lg flex items-center justify-center">
               <AppsIcon
                  sx={{fontSize: 21}}
                  className="text-orange-400 text-[17px]"
               />
            </div>
            <span className="font-semibold text-lg">All icons</span>
         </div>
         <CloseIcon className="text-slate-400 text-[18px] cursor-pointer" 
            onClick={  ()=> setOpenIcon(false)}
         />
      </div>
   )
}

function IconsArea(){
   return (
      <div className="w-full flex flex-col items-center mt-3">
         <div className="border border-slate-100 w-[92%] h-[330px] overflow-auto rounded-md bg-slate-100">
            <AllIcons/>
         </div>
      </div>
   )
}