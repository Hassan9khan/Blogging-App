// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import { useForm } from "react-hook-form";
// import {
//   collection,
//   addDoc,
//   doc,
//   updateDoc,
//   deleteField,
// } from "firebase/firestore";
// import { db } from "../config/config";

// const Dashboard = () => {
//   // React Hook Form
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const [blogs, setBlogs] = useState([]);

//   const onSubmit = async (data) => {
//     console.log(data);
//     blogs.push(data);
//     setBlogs(blogs);
//     const docRef = await addDoc(collection(db, "blogs"), {
//       title: data.title,
//       description: data.description,
//       createdAt: newDate.toLocaleString(),
//     });
//     console.log("Document written with ID: ", docRef.id);
    
//   };

  

//   // const deleteBlog = async (index) => {
//   //   console.log("delete todo", index);
//   //   blogs.splice(index, 1);
//   //   setBlogs([...blogs]);

//   //   const cityRef = doc(db, "cities", "BJ");

//   //   await updateDoc(cityRef, {
//   //     capital: deleteField(),
//   //   });
//   // };


//   const deleteBlog = async (index, docId) => {
//     console.log("Deleting blog at index", index);
//     if (!docId) {
//         console.error("Document ID is undefined");
//         return;
//     }
//     blogs.splice(index, 1);
//     setBlogs([...blogs]);
//     try {
//         const blogRef = doc(db, "blogs", docId);
//         await deleteDoc(blogRef);
//         console.log("Blog deleted from Firestore successfully");
//     } catch (error) {
//         console.error("Error deleting blog from Firestore:", error);
//     }
// };





//   // const editBlog = (index) => {
//   //   console.log("blog edit" , index);
//   //   const newValue = prompt("enter new value")
//   //   if (item) {
//   //     item.title: prompt
//   //     item.description: prompt
//   //     return
//   //   }
//   //   blogs.splice(index , 1 , newValue)
//   //   setBlogs([...blogs]);
//   // }

//   const newDate = new Date();

//   return (
//     <>
//       <Navbar title="Dashboard" link="Hassan Ahmed" />
//       <div className="flex justify-center bg-[#f0f0f0] mt-4">
//         <div className="flex justify-center w-[85%] h-max m-1 p-5 text-center rounded-lg bg-white border border-[#d1c7c7]">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <input
//               type="text"
//               placeholder="Title..."
//               className="input input-bordered input-secondary w-full max-w-[100%]"
//               required
//               minLength="10"
//               maxLength="60"
//               {...register("title")}
//             />
//             <br />
//             <textarea
//               cols="145"
//               rows="2"
//               className="textarea textarea-secondary mt-4  w-[100%]"
//               placeholder="Description..."
//               {...register("description")}
//               required
//               minLength="25"
//             ></textarea>{" "}
//             <br />
//             <br />
//             <button
//               type="submit"
//               className="btn btn-primary rounded-xl  flex flex-start bg-[#0079ff] text-white  "
//             >
//               Publish Blogs
//             </button>
//           </form>
//         </div>
//       </div>

//       <h1 className="text-3xl font-bold m-6">My Blogs</h1>

//       {blogs ? (
//         blogs.map((item , index) => {
//           return (
//             <div key={item.index} className="flex justify-center  pb-5 ">
//               <div className="w-[85%] h-max m-1 p-5  rounded-lg bg-white border border-[#d1c7c7] shadow-md shadow-[#978d8d]">
//                 <div className="flex">
//                   <img
//                     className="border-2 border-[#aca7a7] rounded-xl p-1"
//                     width="50px"
//                     height="80px"
//                     src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//                     alt="loading"
//                   />
//                   <div className="ml-6">
//                     <p className="text-lg font-bold">{item.title}</p>
//                     <div className="flex text-sm font-semibold">
//                       <p>Hassan Ahmed | </p>
//                       <p>| {newDate.toLocaleString()}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-6 ml-3 text-md font-sans">
//                   <p>{item.description}</p>
//                   <div className="flex gap-3 mt-3">
//                     <button
//                       onClick={() => deleteBlog(index)}
//                       className="text-[#0079ff] font-bold"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => editBlog(index)}
//                       className="text-[#0079ff] font-bold"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <h1>Posting Blogs</h1>
//       )}
//     </>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/config";

const Dashboard = () => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [blogs, setBlogs] = useState([]);

  // Add new blog and store docId
  const onSubmit = async (data) => {
    console.log(data);

    // Add blog to Firestore and get the document ID
    const docRef = await addDoc(collection(db, "blogs"), {
      title: data.title,
      description: data.description,
      createdAt: new Date().toLocaleString(),
    });

    // Add the new blog with its docId to the state
    const newBlog = {
      title: data.title,
      description: data.description,
      docId: docRef.id, // Store docId for deletion
    };

    setBlogs([...blogs, newBlog]); // Update state with new blog
    console.log("Document written with ID: ", docRef.id);
  };

  // Delete blog from both UI and Firestore
  const deleteBlog = async (index, docId) => {
    console.log("Deleting blog at index", index);
    if (!docId) {
      console.error("Document ID is undefined");
      return;
    }

    // Remove the blog from the local state
    const updatedBlogs = [...blogs];
    updatedBlogs.splice(index, 1); // Remove blog at the given index
    setBlogs(updatedBlogs); // Update state

    try {
      // Reference to the specific blog document in Firestore
      const blogRef = doc(db, "blogs", docId);
      // Delete the document from Firestore
      await deleteDoc(blogRef);
      console.log("Blog deleted from Firestore successfully");
    } catch (error) {
      console.error("Error deleting blog from Firestore:", error);
    }
  };

  const newDate = new Date();

  return (
    <>
      <Navbar title="Dashboard" link="Hassan Ahmed" />
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
              className="textarea textarea-secondary mt-4  w-[100%]"
              placeholder="Description..."
              {...register("description")}
              required
              minLength="25"
            ></textarea>
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-primary rounded-xl  flex flex-start bg-[#0079ff] text-white"
            >
              Publish Blogs
            </button>
          </form>
        </div>
      </div>

      <h1 className="text-3xl font-bold m-6">My Blogs</h1>

      {blogs.length > 0 ? (
        blogs.map((item, index) => (
          <div key={index} className="flex justify-center  pb-5 ">
            <div className="w-[85%] h-max m-1 p-5  rounded-lg bg-white border border-[#d1c7c7] shadow-md shadow-[#978d8d]">
              <div className="flex">
                <img
                  className="border-2 border-[#aca7a7] rounded-xl p-1"
                  width="50px"
                  height="80px"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="loading"
                />
                <div className="ml-6">
                  <p className="text-lg font-bold">{item.title}</p>
                  <div className="flex text-sm font-semibold">
                    <p>Hassan Ahmed | </p>
                    <p>| {newDate.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 ml-3 text-md font-sans">
                <p>{item.description}</p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => deleteBlog(index, item.docId)} // Pass the docId for deletion
                    className="text-[#0079ff] font-bold"
                  >
                    Delete
                  </button>
                  <button className="text-[#0079ff] font-bold">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No Blogs Available</h1>
      )}
    </>
  );
};

export default Dashboard;
