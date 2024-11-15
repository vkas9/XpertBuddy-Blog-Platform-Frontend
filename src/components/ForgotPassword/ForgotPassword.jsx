import { Field, Form, Formik } from "formik";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../APIs/api";
import { credentialAction } from "../../redux/credentials";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    setLoading(true);
    try {
        await forgotPassword(data, navigate);
        dispatch(credentialAction.setForgotPassword());
        localStorage.setItem(
            "user_email",
            JSON.stringify(data.email)
          );
        
    } catch (error) {
        
        
    }
    finally{
        setLoading(false);
    }

    
  };
  return (
    <div
     
      className="min-h-[calc(100vh-(69px))]  relative flex flex-col overflow-x-hidden items-center justify-center w-full mx-auto"
    >
      <h1 className="text-[2.1rem] vm:text-[2.3rem] oi:text-[2.7rem] overflow-hidden  md:text-[4em] -mt-[8rem] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 max-w-fit bg-clip-text text-transparent font-bold text-center">
        Reset your password
      </h1>
      <div>
        <Formik
          onSubmit={(value) => handleSubmit(value)}
          initialValues={{ email: "" }}
        >
          <Form className="mt-8 w-full backdrop-blur-sm px-3  max-w-[40rem]  overflow-hidden ">
            <div>
              <Field
                className="outline-offset-0 w-full sm:w-[30rem] bg-white/10  outline-none p-3  rounded-md font-semibold text-xl sm:text-2xl"
                name="email"
                type="email"
                required
                placeholder="Enter Your Email Address"
              ></Field>
            </div>
            <button
              disabled={loading}
              className={`bg-blue-600 active:bg-blue-700 sm:hover:bg-blue-700 text-white   transition-all duration-150 w-full font-bold text-2xl ${
                loading ? "opacity-50 cursor-not-allowed" : " "
              } active:bg-blue-700 p-2 rounded-md mt-3  `}
              type="submit"
            >
              {loading ? "Sending..." : "Send OTP via Email"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default ForgotPassword;
