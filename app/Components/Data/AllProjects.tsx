import { v4 as uuidv4 } from 'uuid';
// Structure for a project
export type Task ={
   id:string,
   title: string,
   icon: string,
   projectName: string,
   status: "In Progress" | "Completed"
   priority: "Low" | "Medium" | "High"
   createdAt: string,
   updatedAt: string
}
export type Project ={
   id:string,
   clerkUserId: string,
   title: string,
   createdAt: string,
   updatedAt: string,
   icon: string

   tasks: Task[]
}


// Sample data with three tasks

export const projectsData: Project[] = [
   {
      id: uuidv4(),
      clerkUserId: '123',
      title: 'Project title',
      createdAt: "2024-8-26T10:00:00Z",
      updatedAt: "2024-8-26T10:00:00Z",
      icon: "AddIcon",
      tasks: [
         {
            id: uuidv4(),
            title: "reactjs",
            icon: 'Code',
            projectName: 'React',
            status: "In Progress",
            priority: "Low",
            createdAt: "2024-8-26T10:00:00Z",
            updatedAt: "2024-8-26T10:00:00Z"
         },
         {
            id: uuidv4(),
            title: "next js",
            icon: 'Code',
            projectName: 'React',
            status: "Completed",
            priority: "High",
            createdAt: "2024-8-26T10:00:00Z",
            updatedAt: "2024-8-26T10:00:00Z"
         }
      ]
   
   }
]