import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../config/config";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log(data);
    const auth = getAuth();
    const user = auth.currentUser;
    const newPassword = data.newPassword;

    updatePassword(user, newPassword)
      .then(() => {
        console.log('password updated');
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    function checkState(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid , user);
        } else {
          navigate('/login')
          console.log("user is not logged in");
        }
      });
    }
    checkState()
  } , [])

  const displayName = localStorage.getItem("displayName");

  return (
    <>
      <Navbar title="Profile" className="bg-[#f0f0f0] " />
      <div className="flex justify-center pb-5 bg-[#f0f0f0] h-screen">
        <div className="w-[85%] h-[100] m-3 p-5 rounded-lg bg-white border border-[#d1c7c7] shadow-md shadow-[#978d8d]">
          <div className="flex">
            <img
              className="border-2 border-[#aca7a7] rounded-xl p-1"
              width="130px"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile"
            />
            <div className="m-10">
              <p className="text-2xl font-bold">{displayName}</p>
            </div>
          </div>
          <div className="mt-6 text-xl ml-3 text-md font-sans">
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="password"
                placeholder="Old Password"
                className="input input-bordered input-secondary mt-6 w-full max-w-[100%]"
                required
                {...register("oldPassword ")}
              />
              <input
                type="password"
                placeholder="New Password"
                className="input input-bordered input-secondary mt-6 w-full max-w-[100%]"
                required
                {...register("newPassword")}
              />
              <input
                type="password"
                placeholder="Repeat Password"
                className="input input-bordered input-secondary mt-6 w-full max-w-[100%]"
                required
                {...register("repeatPassword")}
              />
              <button type="submit">Update Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
