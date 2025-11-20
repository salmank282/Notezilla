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

const Header: React.FC = () => {
  const { title } = NoteZillaStringHelper;

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
      <div className="Search-container">
        <div className="absolute top-1 left-1">
          <IoSearch className=" h-[22px] w-[22px] text-[#323232]" />
        </div>
        <input type="text" className="search" />
      </div>
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
