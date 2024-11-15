import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../APIs/api";
const Login = () => {

    const [loading,setLoading]=useState(false);

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleSubmit = async (data) => {

       
    
        setLoading(true);
        try {
          await dispatch(login(data, navigate));
          setLoading(false);
        } catch (error) {
          console.error("Login failed:", error);
    
          toast.error("Login failed. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      const validationSchema = Yup.object().shape({
        
        Email: Yup.string().email("Invalid email").required("Email is required"),
        Password: Yup.string().required("Password is required"),
        
      });
  return (
    <div className="flex  relative min-h-[calc(100vh-(69px))] items-center ">
         <Formik
        initialValues={{
         
          Email: "",
          Password: "",
          
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form  className="absolute top-[15%] ">
          
          <div className="w-screen xs:w-full p-6 flex sm:items-center  justify-center flex-col gap-2 xs:gap-5">
          <h1 className="text-[2.5rem]  mx-2 md:text-[4em] bg-gradient-to-r  from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent font-bold text-center">
       Log in to XpertBuddy
      </h1>
              
        
            <div>
              <Field
                className="bg-white/10 outline-none p-3 w-full sm:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                placeholder="Enter Email"
                name="Email"
                type="email"
              />
              <ErrorMessage
                name="Email"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>
            
            <div className="flex flex-col vm:flex-row justify-center gap-2 xs:gap-5 vm:gap-2 ">
              <div>
                <Field
                  className="bg-white/10 outline-none p-3 w-full sm:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter Password"
                  name="Password"
                  type="password"
                />
                <ErrorMessage
                  name="Password"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>
             
            
            <div className="block -mt-1  font-semibold text-end">
            <Link
              to={"/reset-password"}
              className=" text-white/50 hover:text-white"
            >
              Forgot Password?
            </Link>
          </div>
          </div>
            <button
              disabled={loading}
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-[20rem] transition-all duration-150 font-bold text-2xl ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }  active:bg-blue-700 p-2 rounded-md mt-3  `}
            >
              {loading ? "logging... " : "Login"}
            </button>
          </div>
        </Form>
      </Formik>
      
    </div>
  )
}

export default Login
