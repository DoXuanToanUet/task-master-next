// Setting the structure of the context
export type SidebarMenuItem={
   id: number,
   name: string,
   isSelected: boolean
}
export interface IconData{
   id: number,
   name: string,
   icon: React.ReactNode,
   isSelected: boolean
}
export type AppType={
   openSideBarObject:{
      openSideBar: boolean,
      setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>
   },
   sideBarMenuObject: { sideBarMenu: SidebarMenuItem[] , setSideBarMenu: React.Dispatch<React.SetStateAction<SidebarMenuItem[]>>},
   modelObject: { openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>}
   allIconsDataObject: { allIconsData: IconData[], setAllIconsData: React.Dispatch<React.SetStateAction<IconData[]>>}
   openIconObject:{ openIcon: boolean, setOpenIcon: React.Dispatch<React.SetStateAction<boolean>>}
   selectedIconObject: { selectedIcon: IconData | null, setSelectedIcon: React.Dispatch<React.SetStateAction<IconData | null>>}
}