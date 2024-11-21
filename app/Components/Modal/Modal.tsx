'use client'
import React from 'react'
import CloseOutlinedICon from "@mui/icons-material/CloseOutlined"
import BorderAllICon from "@mui/icons-material/BorderAll"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import { useContextApp } from '@/app/Pages/contextApp'
import { useForm, SubmitHandler, UseFormRegister, FieldError, FieldErrors } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { getIconComponent } from '../functions/IconsActions'
const schema = z.object({
   projectName: z
   .string()
   .min(1, {message: "Project name is reqeuired"})
   .max(30, {message: "Project name must be 30 characters or less"})
})

type FormData = z.infer<typeof schema>
const Modal = () => {
   const {  
      modelObject: { openModal, setOpenModal}
    } = useContextApp()
   const {
      register,
      handleSubmit,
      setValue,
      formState: {errors},
      reset
   } = useForm<FormData>({
      resolver: zodResolver(schema)
   })

   const onSubmit: SubmitHandler<FormData> = (data) =>{
      console.log("Form submitted with data", data)
      handleClose();
   }
   const handleClose =()=>{
      console.log("closing window and reseting form")
      setOpenModal(false)
      reset()
   }
  return (
    <div className={`${openModal ? "block ": "hidden "} w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[90] p-3 top-[47%] left-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md`}>
      <Header handleClose={handleClose}/>
      <form className='flex flex-col gap-2 pt-8 px-7 mt-3' onSubmit={handleSubmit(onSubmit)}>
         <ProjectInput register={register} errors={errors}/>
         <Footer handleClose={handleClose}/>
      </form>
     
    </div>
  )
}

export default Modal

function Header( {handleClose}: {handleClose: ()=> void}){
   const {  
      selectedIconObject: { selectedIcon, setSelectedIcon}
    } = useContextApp()
   console.log("header render")
   return (
      <div className="flex justify-between items-center pt-7 px-7">
         <div className="flex items-center gap-2">
            <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">

            </div>
            <span className='font-semibold text-lg'>Add Project</span>
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
      modelObject: { openModal, setOpenModal}
    } = useContextApp()
   return (
      <div className="w-full p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
         <button 
             onClick={ ()=> handleClose()}
         className='border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all'>
            Cancel
         </button>
         <button 
           type='submit'
         className='text-white bg-orange-600 text-[13px] p-2 px-6 rounded-md hover:bg-orange-700 transition-all'>
            Add project
         </button>
      </div>
   )
}