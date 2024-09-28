import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/config";

const Register = () => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //Use Navigate
  const navigate = useNavigate()

  // Register New User

  const onSubmit = (data) => {

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: `${data.firstname} ${data.lastname}`
        }).then(() => {
        console.log( user);
        navigate('/login')
        }).catch((error) => {
          console.log(error);
          
        });
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       data.email,
  //       data.password
  //     );
  //     const user = userCredential.user;
  //     console.log("User registered:", user);
  //   } catch (error) {
  //     console.error("Error registering user:", error.message);
  //   }
  // };

  return (
    <>
      <Navbar title="Register"  login="Login"/>
      <div className="flex justify-center bg-[#f0f0f0] ">
        <div className="w-[18rem] h-max m-3 pb-5 text-center rounded-lg bg-white border border-[#d1c7c7] mt-8">
          <h1 className="text-[#0079ff] text-2xl font-bold p-2 m-4">
            Register User
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered input-secondary m-2"
              required
              {...register("firstname")}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered input-secondary m-2"
              required
              {...register("lastname")}
            />{" "}
            <br />
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered input-secondary m-2"
              required
              {...register("email")}
            />{" "}
            <br />
            <input
              type="password"
              placeholder="New Password"
              className="input input-bordered input-secondary m-2 mb-4"
              required
              {...register("password")}
            />
            <button
              type="submit"
              className="btn btn-sm  pb-1 px-[30%] rounded-xl bg-[#0079ff] text-white  "
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
