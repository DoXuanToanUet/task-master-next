import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
export const getIconComponent =( 
   iconName: string,
   textColor?: string,
   fontSize?: string
): JSX.Element | null =>{
   const defaultFontSize= "27px"
   const defaultTextColor = 'text-orange-600'
   const iconProps ={
      sx: { fontSize: fontSize || defaultFontSize},
      className: `${defaultTextColor} ${textColor || ""}`.trim()
   }
   switch(iconName){
      case "LibraryBooksIcon":
         return  <LibraryBooksIcon {...iconProps}/>
      case "TaskAltIcon":
         return  <TaskAltIcon {...iconProps}/>
      case "AddIcon":
         return  <AddIcon {...iconProps}/>
      case "ListIcon":
         return  <ListIcon {...iconProps}/>
      default:
         console.warn(`Icon "${iconName}" không được hỗ trợ.`);
         return null; // Trả về null nếu không tìm thấy Icon
   }
}