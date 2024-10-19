import './HeaderC.css';
import { Link, useNavigate, NavLink } from "react-router-dom";

function HeaderC() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (

    <>
      <div className="navbar text-xl text-white font px-5">
        <Link to="/"><img src="/kg.png" className="logo"></img> </Link>

        <ul className='hidden lg:block'>
          <li>
            <NavLink
              className={({ isActive }) => `text-xl ${isActive ? 'text-red-600' : 'text-head'}`}
              to="/"
              aria-current="page"
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => `text-xl ${isActive ? 'text-red-600' : 'text-head'}`}
              to="/Games"
            >
              GAMES
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => `text-xl ${isActive ? 'text-red-600' : 'text-head'}`}
              to="/Blogs"
            >
              BLOGS
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => `text-xl ${isActive ? 'text-red-600' : 'text-head'}`}
              to="/Esports"
            >
              ESPORTS
            </NavLink>
          </li>
        </ul>

        <div className='block lg:hidden text-medium gap-y-6 gap-x-6 mx-auto '>
          <ul >
            <li>
              <NavLink
                className={({ isActive }) => ` ${isActive ? 'text-red-600' : 'text-head'}`}
                to="/"
                aria-current="page"
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => ` ${isActive ? 'text-red-600' : 'text-head'}`}
                to="/Games"
              >
                GAMES
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => `${isActive ? 'text-red-600' : 'text-head'}`}
                to="/Blogs"
              >
                BLOGS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => ` ${isActive ? 'text-red-600' : 'text-head'}`}
                to="/Esports"
              >
                ESPORTS
              </NavLink>
            </li>
          </ul>
        </div>

        {token ? (
          <Link to="/" onClick={handleLogout}>
            <a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
              <span className="w-full h-full bg-gradient-to-br from-[#ff5e5b] via-[#ff2c2c] to-[#be3030] group-hover:from-[#ff7373] group-hover:via-[#e60000] group-hover:to-[#be3030] absolute"></span>
              <span className="relative px-4 py-2 transition-all ease-out bg-button rounded-md group-hover:bg-opacity-0 duration-400">
                <span className="relative text-white">LOG OUT</span>
              </span>
            </a>
          </Link>

        ) : (
          <Link to="/SignUp"> <a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#FF4500] to-[#D63031] group-hover:from-[#FF5733] group-hover:to-[#C0392B] absolute"></span>
            <span className="relative px-4 py-2 transition-all ease-out bg-button rounded-md group-hover:bg-opacity-0 duration-400">
              <span className="relative text-white">JOIN US</span>
            </span>
          </a>
          </Link>

        )}

        


      </div>
    </>
  )
}

export default HeaderC
