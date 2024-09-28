import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Userblogs = () => {

    const navigate = useNavigate()

    function backToAllBlogs(){
        navigate('/allblogs')
    }

  return (
    <>
      <Navbar title="All From"/>
      <button onClick={backToAllBlogs}>Back to All Blogs</button>
    </>
  );
};

export default Userblogs;
