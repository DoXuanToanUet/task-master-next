'use client'
import React, { useLayoutEffect, useState } from 'react'
import CloseOutlinedICon from "@mui/icons-material/CloseOutlined"
import BorderAllICon from "@mui/icons-material/BorderAll"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import { useContextApp } from '@/app/Pages/contextApp'
import { useForm, SubmitHandler, UseFormRegister, FieldError, FieldErrors, set } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { getIconComponent } from '../functions/IconsActions'
import AllProjects from '@/app/Pages/AllProjects/AllProjects'
import { addNewProject, editProject } from '../functions/projectsActions'
import toast from 'react-hot-toast'
import { allIconsArray } from '../Data/AllIcons'
import { ElevatorSharp } from '@mui/icons-material'
const schema = z.object({
   projectName: z
   .string()
   .min(1, {message: "Project name is reqeuired"})
   .max(30, {message: "Project name must be 30 characters or less"})
})

export type FormData = z.infer<typeof schema>
const Modal = () => {
   const {  
      modelObject: { openModal, setOpenModal},
      allProjectsObject: { allProjects, setAllProjects},
      selectedIconObject: { selectedIcon, setSelectedIcon},
      selectedProjectObject:{selectedProject, setSelectedProject},
    } = useContextApp()
    const [isLoading, setLoading] = useState(false)
   const {
      register,
      handleSubmit,
      setValue,
      formState: {errors},
      setError,
      setFocus,
      reset
   } = useForm<FormData>({
      resolver: zodResolver(schema)
   })

   const onSubmit: SubmitHandler<FormData> = (data: FormData) =>{

      // Check if the project already exists
      const existingProject = allProjects.find(
         (project) => project.title.toLowerCase() === data.projectName.toLowerCase()
      )
      console.log("existingProject",existingProject);   
      // if exist return an error
      if (existingProject){
         setError('projectName',{
            type:'manual',
            message: 'Project already exists'
         })
         setFocus('projectName')
      }else{
         // Call addNewProject function, if everthing is valid
         // addNewProject(
         //    data,
         //    allProjects,
         //    setAllProjects,
         //    setOpenModal,
         //    selectedIcon,
         //    reset
         // )
         // toast.success('Add new project Success')
         // console.log("Form submitted with data", data)
         addFun(data)
         // handleClose();
      }
     
   }
   async function addFun(data: FormData){
      try {
         setLoading(true)
         
         await new Promise( (resolve) => setTimeout(resolve,1000) )
         if(!selectedProject){
            addNewProject(
               data,
               allProjects,
               setAllProjects,
               setOpenModal,
               selectedIcon,
               reset
            )
         }else{
            editProject(
               data,
               selectedProject,
               selectedIcon,
               setSelectedProject,
               allProjects,
               setAllProjects,
               setOpenModal
               
            )
         }
         
      } catch (error) {
         console.log(error);
         toast.error('Something went wrong')
      } finally{
         setLoading(false)
         toast.success(
            `Project ${selectedProject ? 'Edited': "Added" } successfully`
         )
         setOpenModal(false)
         
      }
   }
   const handleClose =()=>{
      console.log("closing window and reseting form")
      setOpenModal(false)
      reset()
   }

   // Reset the form when the opModal state change
   useLayoutEffect(()=>{
      if(openModal){
         if(!selectedProject){
            reset()
         }else{
            setValue('projectName', selectedProject.title)

            const findIconAllIconArr = allIconsArray.find(
               (icon) => icon.name === selectedProject.icon
            )
            if( findIconAllIconArr){
               setSelectedIcon(findIconAllIconArr)
            }
         }
      }
   },[openModal,reset])
  return (
    <div className={`${openModal ? "block ": "hidden "} w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[90] p-3 top-[47%] left-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md`}>
      <Header handleClose={handleClose}/>
      <form className='flex flex-col gap-2 pt-8 px-7 mt-3' onSubmit={handleSubmit(onSubmit)}>
         <ProjectInput register={register} errors={errors}/>
         <Footer handleClose={handleClose}/>
      </form>
     
    </div>
  )
  
function Header( {handleClose}: {handleClose: ()=> void}){
   const {  
      selectedIconObject: { selectedIcon, setSelectedIcon},
      selectedProjectObject:{selectedProject, setSelectedProject},
    } = useContextApp()
   // console.log("header render")
   return (
      <div className="flex justify-between items-center pt-7 px-7">
         <div className="flex items-center gap-2">
            <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">

            </div>
            <span className='font-semibold text-lg'>
               {selectedProject ? "Edit Project" : "New Project"}
            </span>
         </div>
         <CloseOutlinedICon
            sx={{fontSize: "18px"}}
            className='text-slate-300 cursor-pointer'
            onClick={ ()=> {
               console.log("Close icon clicked")
               setSelectedIcon(null)
               handleClose()
            }}
         />
      </div>
   )
}
function ProjectInput({
   register,
   errors
}:{
   register: UseFormRegister<FormData>
   errors: FieldErrors<FormData>
}){
   const {  
      modelObject: { openModal, setOpenModal},
      openIconObject:{ openIcon, setOpenIcon},
      selectedIconObject: { selectedIcon, setSelectedIcon}
    } = useContextApp()
    console.log("modal selectedIcon",selectedIcon)
   return (
      <div className="flex flex-col gap-2">
         <span className='text-[14px] font-medium text-slate-600'>Project Name</span>
         <div className="flex gap-3 justify-between">
            {/* Input */}
            <div className="w-full">
               <input type="text" className='p-[10px] text-[13px] w-full rounded-md border outline-none'
                  {...register('projectName')}
                  placeholder='Enter your Project'
               />
               {errors.projectName && (
                  <p className='text-[11px] mt-2 text-red-500'>{errors.projectName.message}</p>
               )}
               
            </div>
            {/* Icon */}
            <div 
               onClick={()=>{ setOpenIcon(true)}}
               className="w-12 h-10 text-white flex items-center justify-center bg-orange-600 rounded-lg"
            >
               {selectedIcon ? (
                  getIconComponent(selectedIcon?.name, 'text-white')
               ) :(
                  <LibraryBooksIcon/>
               )}
              
            </div>
         </div>
      </div>
   )
}

  function Footer({handleClose}: {handleClose: ()=> void}){
   const {  
      modelObject: { openModal, setOpenModal},
      selectedProjectObject:{selectedProject, setSelectedProject},
    } = useContextApp()
   return (
      <div className="w-full p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
         <button 
             onClick={ ()=> {
               handleClose()
               // setSel
             }}
         className='border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all'>
            Cancel
         </button>
         <button 
           type='submit'
         className='text-white bg-orange-600 text-[13px] p-2 px-6 rounded-md hover:bg-orange-700 transition-all'>
            {isLoading ? "saving .. " : selectedProject ? "Edit Project" : "Add Project"}
         </button>
      </div>
   )
}
}

export default Modal



