import { useContextApp } from "@/app/Pages/contextApp";
import { CategoryRounded } from "@mui/icons-material";
import { useState } from "react";

function Sorting(){
   const {
      sortingOptionObject: {sortingOptions, setSortingOptions}
   } = useContextApp()
   // const [sortingOptions, setSortingOptions] = useState([
   //    {
   //       category: "Order",
   //       options: [
   //          {label: "A-Z", value:'asc', selected:true},
   //          {label: "Z-A", value:'desc', selected:false},
   //       ]
   //    },
   //    {
   //       category: "Date",
   //       options: [
   //          {label: "Newest", value:'newest', selected:false},
   //          {label: "Oldest", value:'oldest', selected:false},
   //       ]
   //    }
   // ])
   return (
      <div className="bg-white text-sm top-[200px] flex flex-col w-[100px]">
         {sortingOptions.map( (category, categoryIndex) =>(
            <div className="flex flex-col gap-1 text-slate-700 cursor-pointer" key={categoryIndex}>
               <span className={`text-[13px] font-bold ${category.category=='Date'? 'mt-5': ''}`}>{category.category}</span>
               <div className="flex flex-col gap-2 ml-2 mt-[5px]">
                  {category.options.map( (option,optionIndex)=>(
                     <div className="" key={optionIndex}>
                        <span
                           className={`${option.selected ? 'text-orange-600': 'text-slate-500'} cursor-pointer hover:text-orange-600`}
                           
                        >
                           {option.label}
                        </span>
                     </div>
                  ) )}
               </div>
            </div>
         ) )}
      </div>
   )
}

export default Sorting