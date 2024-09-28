import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Allblogs = () => {


  const [blogs, setBlogs] = useState([]);

  return (
    <>
      <Navbar title="All Blogs"/>
    </>
  );
};

export default Allblogs;
