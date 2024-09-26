import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <div className="flex justify-around p-3 text-white font-bold text-lg bg-[#0079ff]">
        <div>
            <h1>Personal Blogging App</h1>
        </div>
        <div>
            <h1>{props.link}</h1>
        </div>
        {/* <div>
            <h1>  <Link to={login}>Login</Link></h1>
        </div> */}
      </div>
      <div className="p-5 pl-28 font-bold text-3xl bg-[#fff]">
        <h1>{props.title}</h1>
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
