import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { IoEllipsisVertical } from "react-icons/io5";

const Navbar = ({ title, link, login, register , profile }) => {

  const navigate = useNavigate()

  const logoutUser = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('signout');
      navigate('/login')
    }).catch((error) => {
      console.log(error);
    });
  }


  return (
    <>
      <div className="flex justify-around p-5 text-white font-bold  bg-[#0079ff]">
        <div className="text-lg">
          <h1>Personal Blogging App</h1>
        </div>
        <div>
          <h1>{link}</h1>
        </div>
        <div>
          <h1 className="text-lg">
            {" "}
            <Link to="/login">{login}</Link>
          </h1>
          <h1 className="text-lg">
            {" "}
            <Link to="/register">{register}</Link>
          </h1>

          <div className="flex justify-center items-center gap-8">
          <div>
          <h1 className="text-md font-normal">
            {" "}
            <Link to="/profile">{profile}</Link>
          </h1>
          </div>
          <div>
          <h1 className="text-md font-normal">
            { (title === "Dashboard" || title === "Profile" || title === "All Blogs" || title === "All From" )  && <button onClick={logoutUser}>Logout</button>}
          </h1>
          </div>
          {/* <div>
          <h1 className="text-md font-normal">
            { title === "Profile"  && <button onClick={logoutUser}>Logout</button>}
          </h1>
          </div> */}
            <div> 
         { (title === "Dashboard" || title === "Profile" || title === "All Blogs" ||title  === "All From" )   &&   (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button">
                    <IoEllipsisVertical />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 text-black shadow"
                  >
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/allblogs">All Blogs</Link>
                    </li>
                    <li>
                      <Link to="/">Dashboard</Link>
                    </li>
                  </ul>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pl-28 font-bold text-3xl bg-[#fff]">
        <h1>{title}</h1>
      </div>
      {/* <div className="p-5 mb-4 font-bold text-3xl">
        <h1>{props.heading}</h1>
      </div> */}
      {/* <h1>Navbar</h1>
      <button className="btn btn-warning m-3 px-5">
        <Link to="/">Login</Link>
      </button>
      <button className="btn btn-warning m-3 px-5">
      <Link to="dashboard">Dashboard</Link>
      </button>
      <button className="btn btn-warning m-3 px-5">
        <Link to="register">Register</Link>
      </button>
      <button className="btn btn-warning m-3 px-5">
        <Link to="allblogs">Allblogs</Link>
      </button>
      <button className="btn btn-warning m-3 px-5">
        <Link to="profile">Profile</Link>
      </button> */}
    </>
  );
};

export default Navbar;
