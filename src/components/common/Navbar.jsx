import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow" : "shadow-2xs"
      }`}
    >
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to={"/"}>
              <img
                className="w-auto h-6 sm:h-7"
                src="https://merakiui.com/images/logo.svg"
                alt=""
              />
            </Link>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
                onClick={toggleMenu}
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <NavLink
                exact
                to="/"
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:text-blue-600"
                activeClassName="bg-gray-200 "
              >
                Home
              </NavLink>
              <NavLink
                to="/colleges"
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:text-blue-600"
                activeClassName="bg-gray-200 "
              >
                Colleges
              </NavLink>
              <NavLink
                to="/admission"
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:text-blue-600"
                activeClassName="bg-gray-200 "
              >
                Admission
              </NavLink>
              <NavLink
                to="/my-college"
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:text-blue-600"
                activeClassName="bg-gray-200 "
              >
                My College
              </NavLink>
            </div>

            <div className="flex items-center mt-4 lg:mt-0">
              {user ? (
                <>
                  <button
                    type="button"
                    className="flex items-center focus:outline-none"
                    aria-label="toggle profile dropdown"
                    onClick={toggleDropdown}
                  >
                    <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                        className="object-cover w-full h-full"
                        alt="avatar"
                      />
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-12 right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none  "
                    >
                      <div
                        className="pt-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <a
                          href="#"
                          className="block py-2 px-1 text-sm text-gray-700 hover:text-blue-600"
                          role="menuitem"
                        >
                          <h3 className="text-center">
                            Welcome, {user.name || "User"}
                          </h3>
                          {/* <h3 className="text-gray-600">{user.email}</h3> */}
                        </a>

                        <button
                          onClick={logout}
                          className="bg-blue-500 text-white py-2 w-full cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link to={"/auth/login"}>
                    <button className=" text-[#444] pr-3 text-[18px] font-semibold hover:text-gray-400 transform transition duration-300 cursor-pointer">
                      Login
                    </button>
                  </Link>
                  <Link to={"/auth/register"}>
                    <button className="bg-blue-500 text-white text-[18px] font-semibold px-4 py-2 rounded-md hover:bg-gray-400 transform transition duration-300 cursor-pointer">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
