import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="flex justify-center ">
        <div className=" bg-slate-400 w-[25rem]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-info w-full max-w-xs"
              required
              {...register("name")}
            />
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-info w-full max-w-xs"
              required
              {...register("name")}
            />
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-info w-full max-w-xs"
              required
              {...register("name")}
            />
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-info w-full max-w-xs"
              required
              {...register("name")}
            />
            <button className="btn btn-primary" type="submit">
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
