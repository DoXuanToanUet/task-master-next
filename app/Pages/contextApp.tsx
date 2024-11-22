'use client'

import React, { createContext, useContext, useEffect, useState, useSyncExternalStore  } from "react"
import { AppType, IconData, SidebarMenuItem, SortingOption} from "../types/AppType"
import { allIconsArray } from "../Components/Data/AllIcons"
import { Project, projectsData} from "../Components/Data/AllProjects"
import { resolve } from "path"

// Seeting the default state
const defaultState: AppType = {
   openSideBarObject: { openSideBar: true, setOpenSideBar: () =>{} },
   sideBarMenuObject: { sideBarMenu: [] , setSideBarMenu: () =>{}},
   modelObject: { openModal: false, setOpenModal: ()=>{}},
   allIconsDataObject: { allIconsData: [], setAllIconsData: () =>{}},
   openIconObject:{ openIcon: false, setOpenIcon: ()=>{}},
   selectedIconObject: { selectedIcon:null, setSelectedIcon:()=>{} },
   allProjectsObject: { allProjects: [], setAllProjects: ()=>{}},
   selectedProjectObject:{selectedProject: null, setSelectedProject: ()=>{}},
   openConfirmModelObject: {openConfirmModel: false, setOpenConfirmModel: ()=>{}},
   sortingOptionObject: {sortingOptions: [], setSortingOptions:  ()=>{}}
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
   const [allProjects, setAllProjects]= useState<Project[]>([])
   const [selectedProject, setSelectedProject] = useState<Project | null>(null)
   const [openConfirmModel, setOpenConfirmModel] = useState<boolean>(false)
   const [sortingOptions, setSortingOptions] = useState<SortingOption[]>(
      [
         {
            category: "Order",
            options: [
               {label: "A-Z", value:'asc', selected:true},
               {label: "Z-A", value:'desc', selected:false},
            ]
         },
         {
            category: "Date",
            options: [
               {label: "Newest", value:'newest', selected:false},
               {label: "Oldest", value:'oldest', selected:false},
            ]
         }
      ]
   )
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
   // Simulate the fetching of the projects
   useEffect( ()=>{
      const fetchData = async () =>{
         try {
            // Simulate a network delay
            await new Promise( (resolve) => setTimeout(resolve, 1000) )

            // Update the state
            setAllProjects(projectsData)
         } catch (error) {
            console.log(error)
         }
      }
      fetchData()
   },[] )
   return(
      <ContextApp.Provider 
         value=
            {{ 
               openSideBarObject: {openSideBar, setOpenSideBar},
               sideBarMenuObject: { sideBarMenu, setSideBarMenu},
               modelObject: { openModal, setOpenModal},
               allIconsDataObject: { allIconsData, setAllIconsData},
               openIconObject:{ openIcon, setOpenIcon},
               selectedIconObject: { selectedIcon, setSelectedIcon},
               allProjectsObject: { allProjects, setAllProjects},
               selectedProjectObject:{selectedProject, setSelectedProject},
               openConfirmModelObject: {openConfirmModel, setOpenConfirmModel},
               sortingOptionObject: {sortingOptions, setSortingOptions}
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