import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config/config";

const Userblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const displayName = localStorage.getItem("displayName");

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const fetchedBlogs = [];

    querySnapshot.forEach((doc) => {
      fetchedBlogs.push({ ...doc.data(), docId: doc.id });
    });
    console.log(fetchedBlogs[0].displayName);
    const userBlogs = fetchedBlogs.filter(
      (blog) => blog.uid === auth.currentUser.uid
    );

    const name = fetchedBlogs[0].displayName;
    setBlogs(userBlogs, name);
  }
  getData();

  return (
    <>
      <Navbar title={`All From ${displayName}`} button="< Back to all blogs" />

      <div className="flex justify-around m-2">
        <div>
          <ul className="flex flex-col">
            {blogs.length > 0 &&
              blogs.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-around items-center pb-5"
                  >
                    <div>
                      <li className="w-[55rem] h-fit mt-5 p-5 rounded-lg bg-white border border-[#d1c7c7] shadow-md shadow-[#978d8d]">
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
                          </div>
                        </div>
                      </li>
                    </div>
                  </div>
                );
              })}
          </ul>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl  mb-3">{displayName}</h1>
          <img
            className="border-2 ml-1 border-[#aca7a7] rounded-xl p-1 "
            width="150px"
            height="80px"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile"
          />
        </div>
      </div>
    </>
  );
};

export default Userblogs;
