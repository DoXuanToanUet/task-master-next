import AllProjects from "@/app/Pages/AllProjects/AllProjects"
import { useContextApp } from "@/app/Pages/contextApp"
import { resolve } from "path"
import { useState } from "react"
import toast from "react-hot-toast"
import { deleteProject } from "../functions/projectsActions"
function ConfirmModal(){
   const [isLoading, setLoading] = useState(false)
   const {   
      openConfirmModelObject: {openConfirmModel, setOpenConfirmModel},
      selectedProjectObject:{selectedProject, setSelectedProject},
      allProjectsObject: { allProjects, setAllProjects},
   } = useContextApp()
   function closeConfirm(){
      setOpenConfirmModel(false)
      setSelectedProject(null)
   }
   async function deleteFunc(){
      try {
         setLoading(true)
         
         await new Promise( (resolve) => setTimeout(resolve,1000) )

         deleteProject(
            selectedProject,
            setSelectedProject,
            allProjects,
            setAllProjects,
            setOpenConfirmModel
         )
      } catch (error) {
         console.log(error);
         toast.error('Something went wrong')
      } finally{
         setLoading(false)
         setOpenConfirmModel(false)
         toast.success('Project deleted successfully')
      }
   }
   return (
      <div className={`w-[38%] max-sm:w-[82%] max-[600px]:w-[93%] z-[90] p-3 top-[47%] left-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md ${openConfirmModel ? "block" : "hidden"}`}>
         <div className="rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Delete Project</h2>
            <p className="text-gray-600 mb-4 text-sm">
               Are you sure want to delele?
            </p>
            <div className="flex justify-end gap-2 mt-10 text-[13px]">
               <button
                  onClick={closeConfirm}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
               >
                  Cancel
               </button>
               <button 
                  onClick={deleteFunc}
               className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white">
                  {isLoading ? "Deleting ..." : "Delete"}
               </button>
            </div>
         </div>
      </div>
   )
}

export default ConfirmModal