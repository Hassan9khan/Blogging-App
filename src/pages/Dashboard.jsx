import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../config/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const displayName = localStorage.getItem("displayName");
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const newDate = new Date();
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Function to handle new blog submission
  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid,
        // docId: docRef.id,

        createdAt: newDate.toLocaleString(),
      });
      const newBlog = {
        title: data.title,
        description: data.description,
      docId: docRef.id,
      };

      setBlogs([...blogs, newBlog]);
      // setBlogs([...blogs])
      console.log("Document written with ID: ", docRef.id);
      // getData()
      console.log(auth.currentUser.uid);
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Function to delete a blog
  const deleteBlog = async (index, docId) => {
    console.log("Deleting blog at index", index);
    blogs.splice(index, 1);
    setBlogs([...blogs]);

    try {
      const blogRef = doc(db, "blogs", docId);
      await deleteDoc(blogRef);
      console.log("Blog deleted from Firestore successfully");
    } catch (error) {
      console.error("Error deleting blog from Firestore:", error);
    }
  };

  // Function to edit a blog
  const editBlog = async (item) => {
    const newTitle = prompt("Enter new title", item.title);
    const newDescription = prompt("Enter new description", item.description);
    if (newTitle && newDescription) {
      try {
        const blogRef = doc(db, "blogs", item.docId);
        // Update the document in Firestore
        await updateDoc(blogRef, {
          title: newTitle,
          description: newDescription,
        });
        

        // Update the local state to reflect the changes
        setBlogs(
          blogs.map((blog) =>
            blog.docId === item.docId
              ? { ...blog, title: newTitle, description: newDescription } // Update local state
              : blog
          )
        );
        console.log("Blog updated successfully");
      } catch (error) {
        console.error("Error updating blog in Firestore: ", error);
      }
    } else {
      console.log("Edit canceled or invalid input.");
    }
  };

  useEffect(() => {
    function checkState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid, user);
        } else {
          navigate("/login");
          console.log("user is not logged in");
        }
      });
    }
    checkState();
  }, []);

  // useEffect(() => {
    async function getData() {
      // const [ data , setData] = []
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        blogs.push({...doc.data() , docId:doc.id})
        console.log(doc.id);
      console.log(blogs);
        setBlogs([...blogs])
      });
    }
    // getData()
  // } , [])
  useEffect(() => {
    getData()
  } , [])

  return (
    <>
      <Navbar title="Dashboard" profile={displayName} />
      <div className="flex justify-center bg-[#f0f0f0] mt-4">
        <div className="flex justify-center w-[85%] h-max m-1 p-5 text-center rounded-lg bg-white border border-[#d1c7c7]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Title..."
              className="input input-bordered input-secondary w-full max-w-[100%]"
              required
              minLength="10"
              maxLength="60"
              {...register("title")}
            />
            <br />
            <textarea
              cols="145"
              rows="2"
              className="textarea textarea-secondary mt-4 w-[100%]"
              placeholder="Description..."
              {...register("description")}
              required
              minLength="25"
            ></textarea>
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-primary rounded-xl flex flex-start bg-[#0079ff] text-white"
            >
              Publish Blog
            </button>
          </form>
        </div>
      </div>

      {/* <h1 className="text-3xl font-bold m-6">My Blogs</h1> */}
      {blogs.length > 0 ? (
        <h1 className="text-3xl font-bold m-6">My Blogs</h1>
      ) : (
        <h1 className="text-3xl font-bold m-6">No Blogs Avaliable</h1>
      )}

      {blogs.length > 0 &&
        blogs.map((item, index) => {
          return (
            <div key={index} className="flex justify-center pb-5">
              <div className="w-[85%] h-max m-1 p-5 rounded-lg bg-white border border-[#d1c7c7] shadow-md shadow-[#978d8d]">
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
                      <p>{displayName} | </p>
                      <p>| {newDate.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 ml-3 text-md font-sans">
                  <p>{item.description}</p>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => deleteBlog(index, item.docId)}
                      className="text-[#0079ff] font-bold"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editBlog(item)}
                      className="text-[#0079ff] font-bold"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Dashboard;
