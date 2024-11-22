import { Dispatch, SetStateAction } from "react";
import { Project } from "../Data/AllProjects";
import { FormData } from "../Modal/Modal";
import { IconData } from "@/app/types/AppType";
import { v4 as uuidv4 } from 'uuid';
export function addNewProject(
   data: FormData,
   allProjects: Project[],
   setAllProjects: Dispatch<SetStateAction<Project[]>>,
   setOpenModal: Dispatch<SetStateAction<boolean>>,
   selectedIcon: IconData | null,
   reset: ()=>void
){
   try {
      const newProject: Project={
         id:uuidv4(),
         clerkUserId: '123',
         title: data.projectName,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
         icon: selectedIcon?.name || "LocalLibrary",
         tasks: []
      }
      setAllProjects([...allProjects, newProject])
      setOpenModal(false)
      reset()
   } catch (error) {
      console.log("add new project error");
   }
}

export function deleteProject(
   selectedProject: Project | null,
   setSelectedProject: Dispatch<SetStateAction<Project | null>>,
   allProjects: Project[],
   setAllProjects: Dispatch<SetStateAction<Project[] >>,
   setOpenConfirmModel: Dispatch<SetStateAction<boolean>>
){
   if(selectedProject){
      const updateAllProjects = allProjects.filter(
         (project) => project.id !== selectedProject.id
      )

      setAllProjects(updateAllProjects)
      setSelectedProject(null)
      setOpenConfirmModel(false)
   }
}

export function editProject(
   data: FormData,
   selectedProject: Project | null,
   selectedIcon: IconData | null,
   setSelectedProject: Dispatch<SetStateAction<Project | null>>,
   allProjects: Project[],
   setAllProjects: Dispatch<SetStateAction<Project[] >>,
   setOpenConfirmModel: Dispatch<SetStateAction<boolean>>
){
   if(selectedProject){
      const updateProject: Project = {
         ...selectedProject, 
         title: data.projectName,
         icon: selectedIcon?.name || "LocalLibrary"
      }

      const updateAllProjects = allProjects.map( (project) =>{
         if(project.id == selectedProject.id){
            return updateProject
         }
         return project
      } )

      setAllProjects(updateAllProjects)
      setSelectedProject(null)
      setOpenConfirmModel(false)
   }
}