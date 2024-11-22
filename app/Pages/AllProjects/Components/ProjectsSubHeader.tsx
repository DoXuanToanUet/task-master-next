import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Sorting from "@/app/Components/DropDowns/Sorting";

const ProjectsSubHeader = () => {
  const [isSortingVisible, setIsSortingVisible] = useState(false); // Trạng thái hiển thị menu
  const sortingRef = useRef<HTMLDivElement>(null); // Tham chiếu đến menu Sorting

  const toggleSortingMenu = () => {
    setIsSortingVisible((prev) => !prev); // Chuyển đổi trạng thái hiển thị
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sortingRef.current && !sortingRef.current.contains(event.target as Node)) {
      setIsSortingVisible(false); // Đóng menu nếu click bên ngoài
    }
  };

  useEffect(() => {
    // Gắn sự kiện khi component được render
    document.addEventListener("mousedown", handleClickOutside);

    // Xóa sự kiện khi component bị unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-20 relative">
      {/* SubHeader Content */}
      <div className="flex justify-between font-bold items-center">
        <MyProjectText />
        <SortByButton toggleSortingMenu={toggleSortingMenu} />
      </div>

      {/* Sorting Menu */}
      {isSortingVisible && (
        <div
          ref={sortingRef} // Gắn ref vào menu Sorting
          className="absolute top-full right-0 bg-white shadow-lg p-4 rounded-md z-10"
        >
          <Sorting />
        </div>
      )}
    </div>
  );
};

function MyProjectText() {
  return <p className="text-[26px] font-bold cursor-pointer">My Project</p>;
}

function SortByButton({ toggleSortingMenu }: { toggleSortingMenu: () => void }) {
  return (
    <div
      className="flex text-[15px] font-semibold gap-3 cursor-pointer"
      onClick={toggleSortingMenu} // Mở menu khi click vào Sort By
    >
      <span className="text-slate-300">Sort By</span>
      <div className="flex gap-1 items-center">
        <span className="text-slate-800">Recent Project</span>
        <KeyboardArrowDownIcon sx={{ fontSize: "19px" }} />
      </div>
    </div>
  );
}

export default ProjectsSubHeader;
