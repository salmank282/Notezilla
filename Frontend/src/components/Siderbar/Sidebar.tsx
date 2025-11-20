/**
 * @dependencies
 */
import React from "react";

/**
 * Styles
 */
import "./Sidebar.css";

/**
 * helpers
 */
import NoteZillaStringHelper from "../../utils/StringHelper";

/**
 * icons
 */
import { FaNotesMedical } from "react-icons/fa6";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiLightBulb } from "react-icons/hi";
import { RiUser5Line } from "react-icons/ri";
import { RiUser5Fill } from "react-icons/ri";

/**
 * Additional libraries
 */
import { useNavigate,useLocation } from "react-router-dom";

interface sidebarItemProps {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
  pageValue: string;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {pageTitle,routes}  = NoteZillaStringHelper;

  const toPage = (pageValue: string) => {
    navigate(`/${pageValue}`);
  };

  const SidebarItem: React.FC<sidebarItemProps> = ({
    icon,
    activeIcon,
    label,
    pageValue,
  }) => {
    const isActive= location.pathname === `/${pageValue}`;

    return (
      <div className={`sidebar-item ${isActive?"active":""}`} onClick={() => toPage(pageValue)}>
        {isActive ? activeIcon : icon} {label}
      </div>
    );
  };

  const sidebarItems = [
    { icon: <MdOutlineLibraryBooks />,activeIcon:<MdLibraryBooks />, label: pageTitle.allNotes, pageValue: routes.notes },
    { icon: <FaRegStar />, activeIcon:<FaStar />, label: pageTitle.favorites, pageValue: routes.favorites },
    { icon: <MdOutlineWorkOutline />, activeIcon:<MdOutlineWork />, label: pageTitle.work, pageValue: routes.work },
    { icon: <RiUser5Line />, activeIcon:<RiUser5Fill />, label: pageTitle.personal, pageValue: routes.personal },
    { icon: <HiOutlineLightBulb />, activeIcon:<HiLightBulb />, label: pageTitle.ideas, pageValue: routes.ideas },
  ];

  return (
    <div className="sidebar-container">
      <div className="mx-auto">
        <button className="flex gap-1 items-center border-2 hover:text-[25px]  rounded-lg border-[#0a4174] mt-4 bg-[#49769f] text-white text-2xl cursor-pointer px-4 py-2">
          <FaNotesMedical /> <span>New Note</span>
        </button>
      </div>
      <div className="flex flex-col justify-start items-start text-2xl mt-10">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            activeIcon={item.activeIcon}
            label={item.label}
            pageValue={item.pageValue}
          ></SidebarItem>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
