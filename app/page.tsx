'use client'
import Image from "next/image";
import SideBar from "./Components/SideBar";
import AllProjects from "./Pages/AllProjects/AllProjects";
import StatsRightSideBar from "./Pages/AllProjects/Components/StatsRightSideBar";
import AllTasks from "./Pages/AllTasks/AllTasks";
import { useContextApp } from "./Pages/contextApp";
import Modal from "./Components/Modal/Modal";
import IconModal from "./Components/Modal/IconModal";
import ConfirmModal from "./Components/Modal/ConfirmModal";
import { Toaster } from "react-hot-toast";
export default function Home() {
  const {  
    openSideBarObject: { openSideBar} ,
    sideBarMenuObject: { sideBarMenu },
    modelObject: { openModal, setOpenModal},
    openIconObject:{ openIcon, setOpenIcon},
    openConfirmModelObject: {openConfirmModel, setOpenConfirmModel},
  } = useContextApp()
  const componentMap: Record<number, React.ReactNode> = {
    1: <AllProjects/>,
    2: <AllTasks />,
    // 3: <Modal />
  }
  const componentKey = sideBarMenu.findIndex((item) =>item.isSelected)
  const selectedComponent = componentMap[componentKey + 1 ] || null
  return (
    <div className="flex w-full h-screen">
      {(openSideBar || openModal || openIcon || openConfirmModel) && (
        <div className="w-full h-full z-50 bg-slate-800 fixed opacity-30"></div>
      )}
      <Toaster/>
      <ConfirmModal/>
      <IconModal/>
      <Modal/>
      <SideBar/>
      {selectedComponent && selectedComponent}
      {/* <AllProjects/> */}
      {/* <AllTasks /> */}
      {/* <Modal/> */}
    </div>
  );
}
