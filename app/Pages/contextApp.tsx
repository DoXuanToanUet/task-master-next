'use client'

import React, { createContext, useContext, useState, useSyncExternalStore  } from "react"
import { AppType, IconData, SidebarMenuItem} from "../types/AppType"
import { allIconsArray } from "../Components/Data/AllIcons"


// Seeting the default state
const defaultState: AppType = {
   openSideBarObject: { openSideBar: true, setOpenSideBar: () =>{} },
   sideBarMenuObject: { sideBarMenu: [] , setSideBarMenu: () =>{}},
   modelObject: { openModal: false, setOpenModal: ()=>{}},
   allIconsDataObject: { allIconsData: [], setAllIconsData: () =>{}},
   openIconObject:{ openIcon: false, setOpenIcon: ()=>{}},
   selectedIconObject: { selectedIcon:null, setSelectedIcon:()=>{} }
}

// Creating the context
const ContextApp = createContext<AppType>(defaultState)

// Creating the provider
export default function ContextAppProvider({
   children
}:{
   children: React.ReactNode
}){
   const [openSideBar, setOpenSideBar] = useState(false)
   const [openModal, setOpenModal] = useState(false)
   const [allIconsData, setAllIconsData] = useState<IconData[]>(allIconsArray)
   const [openIcon, setOpenIcon] = useState(false)
   const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null)
   const [sideBarMenu, setSideBarMenu] = useState<SidebarMenuItem[]>([
      {
         id: 1, 
         name: "All Projects",
         isSelected: true
      },
      {
         id: 2, 
         name: "All Tasks",
         isSelected: false
      },
      {
         id: 3, 
         name: "Logout",
         isSelected: false
      },
   ])
   return(
      <ContextApp.Provider 
         value=
            {{ 
               openSideBarObject: {openSideBar, setOpenSideBar},
               sideBarMenuObject: { sideBarMenu, setSideBarMenu},
               modelObject: { openModal, setOpenModal},
               allIconsDataObject: { allIconsData, setAllIconsData},
               openIconObject:{ openIcon, setOpenIcon},
               selectedIconObject: { selectedIcon, setSelectedIcon}

            }}
         >
         {children}
      </ContextApp.Provider>
   )
}

// Create the hook

export function useContextApp(){
   return useContext(ContextApp)
}