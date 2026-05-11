/**
 * The `Header` component represents the top section of the application,
 * containing the application title, a search bar, and a user avatar.
 * @component
 * @returns {JSX.Element} The rendered Header component.
 * @author Salman <salmankamalbasha@gmail.com>
 */

/**
 *  @dependencies
 */
import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Styles
 */
import "./Header.css";

/**
 * icons
 */
import notes_icon from "../../assets/images/notes_icon.png";
import avatar from "../../assets/images/avatar.jpg";
import { IoSearch } from "react-icons/io5";

/**
 * helpers
 */
import NoteZillaStringHelper from "../../utils/StringHelper";

interface HeaderProps {
  searchNote: string;
  setSearchNote: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ searchNote, setSearchNote}) => {
  const { title } = NoteZillaStringHelper;
  
  const location = useLocation();
  const hideSearchBar = location.pathname === "/new-note" || location.pathname.startsWith("/notes/");

  return (
    <div className="header-container">
      <div className="flex gap-2 items-center">
        <img
          src={notes_icon}
          className="rounded-[10px]"
          alt="notes-icon"
          height={"34px"}
          width={"34px"}
        />
        <div className="satisfy-regular text-white text-[30px]">
          {title.noteZilla}
        </div>
      </div>
      {!hideSearchBar && <div className="Search-container">
        <div className="absolute top-1 left-1">
          <IoSearch className=" h-[22px] w-[22px] text-[#323232]" />
        </div>
        <input type="text" value={searchNote} onChange={(e)=>{setSearchNote(e.target.value)}} className="search" />
      </div>}
      <img
        src={avatar}
        className="rounded-full"
        alt="avatar"
        height={"34px"}
        width={"34px"}
      />
    </div>
  );
};

export default Header;
