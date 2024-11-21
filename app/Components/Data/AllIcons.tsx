import { useContextApp } from "@/app/Pages/contextApp";
import { IconData } from "@/app/types/AppType";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
export const allIconsArray: IconData[]=[
   {
      id:1,
      icon:<LibraryBooksIcon/>,
      name: 'LibraryBooksIcon',
      isSelected:false
   },
   {
      id:2,
      icon:<TaskAltIcon/>,
      name: 'TaskAltIcon',
      isSelected:false
   },
   {
      id:3,
      icon:<AddIcon/>,
      name: 'AddIcon',
      isSelected:false
   }
]

export default function AllIcons(){
   const {
      allIconsDataObject: { allIconsData, setAllIconsData},
      selectedIconObject: { selectedIcon, setSelectedIcon}
   } = useContextApp();

   function handleTheIconSelection(singleIcon: IconData) {
      setAllIconsData((prevIcons) => 
        prevIcons.map((icon) => {
          if (icon.name === singleIcon.name) {
            return { ...icon, isSelected: true };
          }
          return { ...icon, isSelected: false };
        })
      );
      // setSelectedIcon(allIconsData.find((item) => item.isSelected ) || null )
    }
      // Cập nhật `selectedIcon` mỗi khi `allIconsData` thay đổi
   useEffect(() => {
      const selected = allIconsData.find((item) => item.isSelected) || null;
      setSelectedIcon(selected);
   }, [allIconsData, setSelectedIcon]);
    console.log("allIconsData",allIconsData); 
    console.log("selectedIcon",selectedIcon); 
    return (
      <div className="flex flex-wrap gap-2 text-orange-600 p-3">
         {allIconsData.map((singleIcon, index) =>(
            <div 
               key={index}
               onClick={()=> { handleTheIconSelection(singleIcon)   }}
               className={`w-9 h-9 shadow-sm border border-slate-50 flex items-center justify-center rounded-lg hover:bg-orange-600 hover:text-white
                  ${singleIcon.isSelected ? " bg-orange-600 text-white": " bg-white text-orange-600 "}
                  
                  `}
            >
               {singleIcon.icon}
            </div> 
         ))}
      </div>
    )
}