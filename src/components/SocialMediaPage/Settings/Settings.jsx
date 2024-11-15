import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import UpdateProfilePicture from "@/components/MyProfile/UpdateProfilePicture";
import { updateProfileDetails } from "@/APIs/api";
import { credentialAction } from "@/redux/credentials";
import { fetchBlogs } from "../../../../utils/fetchBlogs";
import { blogAction } from "@/redux/blogStore";
import BlogSkeleton from "../Skeleton";

const Settings = () => {
  const { userCredentials } = useSelector((store) => store.credential);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [showToast, isShowToast] = useState(false);
  const handleSubmit = async (values, { resetForm }) => {
    if (values.contactNumber == "" && values.gender == "") {
      if (showToast) {
        toast.dismiss(showToast);
        isShowToast(false);
      }
      const toastId = toast.error("Please fill atleast one field");
      isShowToast(toastId);
    } else {
      try {
        setLoading(true);
        await updateProfileDetails(dispatch, values);

        const updateUserCredential = {
          ...userCredentials,
          profile: {
            ...userCredentials.profile,
            contact_number:
              values?.contactNumber || userCredentials.profile.contact_number,
            gender: values?.gender || userCredentials.profile.gender,
          },
        };
        localStorage.setItem(
          import.meta.env.VITE_USER,
          JSON.stringify(updateUserCredential)
        );
        dispatch(credentialAction.setCredential(updateUserCredential));

        resetForm();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const { allBlog, pageReloaded } = useSelector((store) => store.blogStore);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadBlogs = async () => {
      await fetchBlogs(dispatch, signal, pageReloaded, allBlog, blogAction);
    };

    loadBlogs();

    // Cleanup to abort fetch
    return () => {
      controller.abort();
    };
  }, [dispatch, pageReloaded]);

  return (
    <div className="text-white  w-full px-4 sm:px-6 lg:px-8 py-9">
      <h1 className="text-xl sm:text-2xl font-bold">Edit Profile Picture</h1>

      <div
        className={`p-4 mt-4 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 z-[1] flex flex-col sm:flex-row items-center  rounded-xl py-6 gap-4 w-full sm:w-[95%] lg:max-w-[55rem]`}
      >
        <div
          className="bg-cover bg-center rounded-full w-[100px] h-[100px] sm:min-w-[120px] sm:min-h-[120px] border-4 border-gray-700"
          style={{
            backgroundImage: `url(${userCredentials?.profile?.user_profile_image})`,
          }}
        ></div>

        <div className="flex gap-2">
          <button
            onClick={() => setShow(!show)}
            className="bg-blue-600 active:bg-blue-700 transition-all duration-150 sm:hover:bg-blue-700 text-xl w-[100px] font-bold text-white p-2 rounded-md"
          >
            Change
          </button>
        </div>
      </div>
      <div className="w-[98%] my-6  h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />

      <h1 className="text-xl sm:text-2xl  font-bold">Edit Information</h1>
      <div className="mt-4 pb-10 mr-5 sm:mr-0 sm:px-0">
        <div className="p-4 relative mb-9 flex flex-col sm:flex-row  bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl py-6 gap-4 w-full sm:w-[95%] lg:max-w-[55rem]">
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              contactNumber: "",
              gender: "",
            }}
          >
            {() => (
              <Form className="flex gap-2  flex-col md:flex-row flex-wrap">
                <div>
                  <label className="text-md text-white/80">
                    Contact Number
                  </label>
                  <Field
                    className="bg-white/10 w-full sm:max-w-[350px] rounded-md p-2 outline-none"
                    type="text"
                    maxLength="10"
                    placeholder="Enter Mobile Number"
                    name="contactNumber"
                  ></Field>
                </div>
                <div>
                  <label className="text-md text-white/80">Gender</label>
                  <div className="bg-white/10  w-full  sm:w-[350px] rounded-md p-2 outline-none flex items-center gap-4">
                    <div className="gap-1 flex items-center">
                      <Field
                        className="bg-white/10 rounded-md p-2 outline-none"
                        type="radio"
                        name="gender"
                        value="Female"
                        id="female"
                      />
                      <label htmlFor="female" className="ml-2">
                        Female
                      </label>
                    </div>
                    <div className="gap-1 flex items-center">
                      <Field
                        className="bg-white/10 rounded-md p-2 outline-none"
                        type="radio"
                        name="gender"
                        value="Male"
                        id="male"
                      />
                      <label htmlFor="male" className="ml-2">
                        Male
                      </label>
                    </div>
                  </div>
                </div>

                <div className="w-full absolute hover:cursor-pointer  -bottom-[3rem] left-0">
                  <button
                    disabled={loading}
                    type="submit"
                    className={`mt-2 ${
                      loading ? "bg-blue-600" : "bg-blue-600"
                    } md:hover:bg-blue-700 font-bold active:bg-blue-700 text-white transition-all duration-200  p-1 rounded-lg w-[130px] text-2xl`}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {show && <UpdateProfilePicture show={show} setShow={setShow} />}
    </div>
  );
};

export default Settings;
