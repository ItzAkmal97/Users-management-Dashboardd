import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

function Header() {
  return (
    <header className="bg-stone-700 p-6">
      <nav className="relative text-stone-300 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">User Management System</h1>

          {/* Hamburger Menu */}
          <label htmlFor="nav-toggle" className="cursor-pointer lg:hidden">
            <Menu className="h-8 w-8" />
          </label>
          <input type="checkbox" id="nav-toggle" className="hidden peer" />

          {/* Navigation Links */}
          <ul
            className="fixed lg:relative top-0 -right-full peer-checked:right-0 lg:right-0 
                         h-screen lg:h-auto w-2/4 sm:w-1/3 lg:w-auto
                         flex flex-col justify-center lg:flex-row items-start lg:items-center 
                         px-8 sm:px-12 md:px-16 lg:px-0
                         gap-8 lg:gap-12 text-xl
                         bg-stone-700 lg:bg-transparent
                         transition-all duration-300
                         lg:flex z-50"
          >
            {/* Close button for mobile */}
            <label
              htmlFor="nav-toggle"
              className="absolute top-6 right-6 cursor-pointer lg:hidden"
            >
              ✕
            </label>

            <li className="hover:text-yellow-400 transition duration-400 w-full lg:w-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block ${isActive ? "text-yellow-400" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="hover:text-yellow-400 transition duration-400 w-full lg:w-auto">
              <NavLink
                to="/About"
                className={({ isActive }) =>
                  `block ${isActive ? "text-yellow-400" : ""}`
                }
              >
                About
              </NavLink>
            </li>
            <li className="hover:text-yellow-400 transition duration-400 w-full lg:w-auto">
              <NavLink
                to="/Contact"
                className={({ isActive }) =>
                  `block ${isActive ? "text-yellow-400" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="hover:text-yellow-400 transition duration-400 w-full lg:w-auto">
              <NavLink
                to="/Dashboard"
                className={({ isActive }) =>
                  `block ${isActive ? "text-yellow-400" : ""}`
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>

          {/* Overlay */}
          <label
            htmlFor="nav-toggle"
            className="fixed top-0 left-0 w-full h-full bg-black/50 
                       hidden peer-checked:block lg:hidden z-40"
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
