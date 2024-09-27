// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import { useForm } from "react-hook-form";
// import {
//   collection,
//   addDoc,
//   doc,
//   updateDoc,
//   deleteField,
//   deleteDoc,
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

//   const newDate = new Date();

//   const [blogs, setBlogs] = useState([]);

//   const onSubmit = async (data) => {
//     console.log(data);
//     const docRef = await addDoc(collection(db, "blogs"), {
//       title: data.title,
//       description: data.description,
//       createdAt: newDate.toLocaleString(),
//     });
//     const newBlog ={
//       title: data.title,
//       description: data.description,
//       docId: docRef.id
//     }
//     setBlogs([...blogs , newBlog])
//     console.log("Document written with ID: ", docRef.id);

//   };

//   const deleteBlog = async (index, docId) => {
//     console.log("Deleting blog at index", index);
//     if (!docId) {
//       console.error("Document ID is undefined");
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

// const editBlog = async (item) => {
//   // Prompt to get the new title and description from the user
//   const newTitle = prompt("Enter new title", item.title);
//   const newDescription = prompt("Enter new description", item.description);

//   // Check if user input is valid (not null or empty)
//   if (newTitle && newDescription) {
//     try {
//       // Reference to the specific blog document in Firestore
//       const blogRef = doc(db, "blogs", item.docId);

//       // Update the Firestore document with the new title and description
//       await updateDoc(blogRef, {
//         title: newTitle,
//         description: newDescription,
//       });

//       // Update the local state to reflect the changes
//       setBlogs(blogs.map(blog =>
//         blog.docId === item.docId
//           ? { ...blog, title: newTitle, description: newDescription }  // Update in local state
//           : blog
//       ));

//       console.log("Blog updated successfully");
//     } catch (error) {
//       console.error("Error updating blog in Firestore: ", error);
//     }
//   } else {
//     console.log("Edit canceled or invalid input.");
//   }
// };

// // const editBlog = (item) => {
// //   const newTitle = prompt("Enter new title", item.title);
// //   const newDescription = prompt("Enter new description", item.description);

// //   if (newTitle && newDescription) {
// //     setItem({
// //       title: newTitle,
// //       description: newDescription,
// //     });
// //   } else {
// //     console.log("Edit canceled or invalid input.");
// //   }

// // };

//   // const editBlog = (index) => {
//   //   console.log("blog edit" , index);
//   //   const newValue = prompt("enter new value")
//   //   if (blogs) {
//   //     title: newValue
//   //   }else{
//   //     <h1>edited</h1>
//   //   }
//   //   blogs.splice(index , 1 , newValue)
//   //   setBlogs([...blogs]);
//   // }


// useEffect(() => {
    // async function recieve() {
    //   const docRef = doc(db, "blogs", "SF");
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     console.log("No such document!");
    //   }
    // }
  // }, []);
  // recieve();

  // const receive = async (docId) => {
  //   const docRef = doc(db, "blogs", docId ); // Replace "SF" with the actual document ID you want to fetch
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // };


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
//             <div key={index} className="flex justify-center  pb-5 ">
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
//                       onClick={() => deleteBlog(index , item.docId)}
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
  updateDoc,
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

  const newDate = new Date();
  const [blogs, setBlogs] = useState([]);

  // Function to handle new blog submission
  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title: data.title,
        description: data.description,
        createdAt: newDate.toLocaleString(),
      });

      const newBlog = {
        title: data.title,
        description: data.description,
        docId: docRef.id,
      };

      setBlogs([...blogs, newBlog]);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Function to delete a blog
  const deleteBlog = async (index, docId) => {
    console.log("Deleting blog at index", index);
    if (!docId) {
      console.error("Document ID is undefined");
      return;
    }

    // Remove from local state
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

    // Check if the user input is valid
    if (newTitle && newDescription) {
      try {
        // Firestore reference to the specific blog document
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

      <h1 className="text-3xl font-bold m-6">My Blogs</h1>

      {blogs.length > 0 ? (
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
                      <p>Hassan Ahmed | </p>
                      <p>{newDate.toLocaleString()}</p>
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
        })
      ) : (
        <h1>Posting Blogs</h1>
      )}
    </>
  );
};

export default Dashboard;
