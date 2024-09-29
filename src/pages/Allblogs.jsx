import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/config";
import { useNavigate } from "react-router-dom";

const Allblogs = () => {
  const [blogs, setBlogs] = useState([]);

  const displayName = localStorage.getItem("displayName");
  const newDate = new Date();
  const navigate = useNavigate()

  const [display, setDisplay] = useState([]);
  async function getData() {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
      blogs.push({ ...doc.data(), docId: doc.id });

      setBlogs([...blogs]);
    });
  }

  useEffect(() => {
    getData();
  }, []);


  const nextPage = () => {
    navigate('/userblogs')
  }


  return (
    <>
      <Navbar title="All Blogs" />
      <ul className="flex flex-col">
        {blogs.length > 0 &&
          blogs.map((item, index) => {
            return (
              <div key={index} className="flex justify-center pb-5">
                <li className="w-[95%] h-fit mt-5 p-5 rounded-lg bg-white border border-[#d1c7c7] shadow-md shadow-[#978d8d]">
                  <div className="flex">
                    <img
                      className="border-2 border-[#aca7a7] rounded-xl p-1"
                      width="50px"
                      height="80px"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="Profile"
                    />
                    <div className="ml-6">
                      <p className="text-lg font-bold">{item.title}</p>
                      <div className="flex text-sm font-semibold">
                        <p>{item.displayName} | </p>
                        <p>| {item.createdAt}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 ml-3 text-md font-sans">
                    <p>{item.description}</p>
                    <div className="flex gap-3 mt-10">
                      <button
                        onClick={nextPage}
                        className="text-[#0079ff] font-bold"
                      >
                        see all blogs from this user
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
      </ul>
    </>
  );
};

export default Allblogs;
