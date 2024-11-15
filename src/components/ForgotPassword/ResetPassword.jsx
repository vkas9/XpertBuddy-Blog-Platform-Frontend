import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { resetPasswordOut } from "../../APIs/api";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { isforgotPassword } = useSelector((store) => store.credential);
  const userEmail= JSON.parse( localStorage.getItem("user_email"))
  const navigate = useNavigate();

  useEffect(() => {
    if (!isforgotPassword) {
      navigate("/login");
    }
  }, []);
  const handleSubmit = async (data) => {
    setLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error("Password Not Matching");
      setLoading(false);
      return;
    }

    try {
      await resetPasswordOut({ data, email: userEmail }, navigate);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      
      className="min-h-[calc(100vh-(69px))]  relative flex flex-col overflow-x-hidden items-center justify-center w-full mx-auto"
    >
      <h1 className="text-[2.7rem] overflow-hidden  md:text-[4em] -mt-[8rem] bg-gradient-to-r  from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent font-bold text-center">
        Reset Password
      </h1>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
      >
        <Form className=" mr-5  mt-6">
          <div className="  rounded-md   sm:w-[100%] lg:max-w-[55rem] w-full">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col ">
                <Field
                  className="outline-offset-0 w-full sm:w-[25rem] bg-white/10  outline-none p-3  rounded-md font-semibold text-xl sm:text-2xl"
                  type="password"
                  required
                  placeholder="New Password"
                  name="password"
                ></Field>
              </div>
              <div className="flex flex-col ">
                <Field
                  className="outline-offset-0 w-full sm:w-[25rem] bg-white/10  outline-none p-3  rounded-md font-semibold text-xl sm:text-2xl"
                  type="password"
                  required
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                ></Field>
              </div>
            </div>
          </div>
          <button
            className={`bg-blue-600  hover:bg-blue-700 text-white  transition-all duration-150 w-full font-bold text-2xl ${
              loading ? "opacity-50 cursor-not-allowed" : " "
            } active:bg-blue-700 p-2 rounded-md mt-3  `}
            disabled={loading}
            type="submit"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default ResetPassword;
