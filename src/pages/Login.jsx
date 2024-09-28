import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // React Hook Form

  const saveUserName = (displayName) => {
    localStorage.setItem('displayName', displayName);
    
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //Use Navigate
  const navigate = useNavigate();

  // Sign in User
  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        saveUserName(user.displayName);
        navigate('/')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  };


  return (
    <>
      <Navbar title="Login" register="Register" />
      <div className="flex justify-center bg-[#f0f0f0] mt-16">
        <div className="w-[18rem] h-max m-3 pb-5 text-center rounded-lg bg-white border border-[#d1c7c7]">
          <h1 className="text-[#0079ff] text-2xl font-bold p-2 m-4">
            Login User
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              Signin
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
