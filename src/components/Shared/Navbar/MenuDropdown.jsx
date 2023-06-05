import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import HostRequestModal from "../../Modal/HostRequestModal";
import { useAuth } from "../../../hooks/useAuth";
import { becomeHost } from "../../../api/auth";
import { toast } from "react-hot-toast";

const MenuDropdown = () => {
  const { user, logOut, role, setRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  console.log(role);

  const modalHandler = (email) => {
    becomeHost(email).then((data) => {
      console.log(data);
      toast.success("You are host now, Post Rooms!");
      setRole("host");
      closeModal();
    });
    console.log("Modal Continue Button clicked!");
  };

  const closeModal = () => {
    setModal(false);
  };

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* Aircnc btn */}
        <div className="hidden md:block text-sm font-semibold rounded-full py-3 px-8 transition">
          {!role && (
            <button
              className="cursor-pointer hover:bg-neutral-100 rounded-full py-3 px-4"
              onClick={() => setModal(true)}
              disabled={!user}
            >
              AirCNC your home
            </button>
          )}
        </div>
        {/* Dropdown btn */}
        <div
          onClick={toggleOpen}
          // onClick={()=> setIsOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <Link
              to="/"
              className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Dashboard
                </Link>
                <div
                  onClick={() => {
                    setRole(null);
                    logOut();
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <HostRequestModal
        email={user?.email}
        modalHandler={modalHandler}
        isOpen={modal}
        closeModal={closeModal}
      ></HostRequestModal>
    </div>
  );
};

export default MenuDropdown;
