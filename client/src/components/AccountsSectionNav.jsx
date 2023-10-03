import React, { useState } from "react";
import { BiVideoPlus } from "react-icons/bi";
import { PiDotsNineBold } from "react-icons/pi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountDetails from "./AccountDetails";

export default function AccountsSectionNav() {
  const { user } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex gap-4 items-center">
      <div className=" hover:bg-neutral-700 rounded-full p-2">
        <BiVideoPlus className=" cursor-pointer" size={"2rem"} color="white" />
      </div>
      <div className=" hover:bg-neutral-700 rounded-full p-2">
        <PiDotsNineBold
          className=" cursor-pointer"
          size={"2rem"}
          color="white"
        />
      </div>
      <div className=" hover:bg-neutral-700 rounded-full p-2">
        <MdOutlineNotificationsNone
          className=" cursor-pointer"
          size={"2rem"}
          color="white"
        />
      </div>

      {user ? (
        <div className="flex flex-col">
          <div
            className=" cursor-pointer w-fit"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.image ? (
              <div className=" rounded-full overflow-hidden w-10">
                <img src={user.image} alt="img"></img>
              </div>
            ) : (
              <h3 className="text-black font-bold px-4 text-xl bg-green-900 py-2 rounded-full hover:bg-green-700">
                {user.email.charAt(0).toUpperCase()}
              </h3>
            )}
          </div>
          {showDropdown && <AccountDetails drop={setShowDropdown} />}
        </div>
      ) : (
        <Link
          to={"/signin"}
          className=" bg-neutral-700 text-white p-2 rounded border border-sky-400 flex gap-2 items-center hover:bg-neutral-800 cursor-pointer"
        >
          <div>
            <BiUserCircle size={"2rem"} color={"rgb(56 189 248 )"} />
          </div>
          <h3 className=" text-sky-400">SignUp</h3>
        </Link>
      )}
    </div>
  );
}
