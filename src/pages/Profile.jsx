import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaPenSquare } from "react-icons/fa";
import {
  getAuth,
  onAuthStateChanged,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { app, auth, storage } from "../config/config";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
const db = getFirestore(app);
const collectionRef = doc(db, "doc", "doc1");

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const changePass = (data) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const file = event.target[0].files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(collectionRef, {
            imageurl: downloadURL,
          });
        });
      }
    );
  };

  // const changePass = () => {
  //
  // };

  // const updateUserPassword = (newPassword) => {
  //   const auth = getAuth();
  //   const user = auth.currentUser.uid;

  //   if (user) {
  //     updatePassword(user, newPassword)
  //       .then(() => {
  //         console.log("Password updated successfully!");
  //       })
  //       .catch((error) => {
  //         console.error("Error updating password:", error);
  //       });
  //   } else {
  //     console.log("No user is currently signed in.");
  //   }
  // };

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

  const displayName = localStorage.getItem("displayName");

  return (
    <>
      <Navbar title="Profile" />
      <div className="flex justify-center pb-5 bg-[#f0f0f0] h-screen">
        <div className="w-[85%] h-[25rem] m-3 p-5 rounded-lg bg-white border border-[#d1c7c7] shadow-md shadow-[#978d8d]">
          <div className="flex">
            <div>
            <img
              className="border-2 border-[#aca7a7] rounded-xl p-1"
              width="130px"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile"
            />
            </div>
          
            {/* <input type="file" className="file hidden" accept="image/*" placeholder={`${<FaPenSquare />}`} /> */}
            <div className="m-10">
              <p className="text-2xl font-bold">{displayName}</p>
              <p></p>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="inline-block ml-7 mt-2">
                <label
                  htmlFor="fileInput"
                  className="flex p-1  bg-[#007bff] text-white  rounded cursor-pointer "
                >
                  <FaPenSquare />
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="file-input hidden "
                  accept="image/*"
                  // onChange={handleFileChange}
                />
              </div>
              <button className="ml-2" type="submit">Submit</button>
            </form>
          <div className="mt-6 text-xl ml-3 text-md font-sans">
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit(changePass)}>
              <input
                type="email"
                placeholder="Resest Password"
                className="input input-bordered input-secondary mt-6 w-full max-w-[100%]"
                required
                {...register("email")}
              />
              {/* <input
                type="password"
                placeholder="New Password"
                className="input input-bordered input-secondary mt-6 w-full max-w-[100%]"
                required
                {...register("newPassword")}
              /> */}
              {/* <input
                type="password"
                placeholder="Repeat Password"
                className="input input-bordered input-secondary mt-6 w-full max-w-[100%]"
                required
                {...register("repeatPassword")}
              /> */}
              <button
                className="mt-5 btn bg-[#0079ff] text-white hover:bg-[#0079ff]"
                type="submit"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
