import React, { useState } from "react";
import { Formik, Form } from "formik";


import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import UploadProfile from "./UploadProfile";
import { credentialAction } from "@/redux/credentials";
import { updateDisplayProfile } from "@/APIs/api";
const UpdateProfilePicture = ({ show, setShow }) => {
  const [loading, setLoading] = useState(false);
  const {userCredentials}=useSelector((store)=>store.credential)
  const initialValues = {
    profilePicture: null,
  };
  const [showToast, isShowToast] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    if (values.profilePicture) {
      try {
        setLoading(true);
        const formData = new FormData();
        const imageUrl = values.profilePicture ? URL.createObjectURL(values.profilePicture) : null;
        formData.append("profilePicture", values.profilePicture);
        
       
        

        const tempData= await updateDisplayProfile(formData);
        const updateUserCredential={
            ...userCredentials,
            profile: {
                ...userCredentials.profile,
                user_profile_image : tempData.data.user_profile_image
            },

        }
        localStorage.setItem(
            import.meta.env.VITE_USER,
            JSON.stringify(updateUserCredential)
          );
        dispatch(credentialAction.setCredential(updateUserCredential))
        setShow(!show);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      if (showToast) {
        toast.dismiss(showToast);
        isShowToast(false);
      }
      const toastId = toast.error("Kindly upload your image");
      isShowToast(toastId);
    }
  };

  return (
    <div
     
      onClick={() => {
        setShow(!show);
      }}
      className="h-screen z-[10] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full  px-2 w-screen fixed top-0 left-0 bg-black/80 flex items-start sm:items-center justify-center"
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form
            onClick={(e) => e.stopPropagation()}
            className=" h-fit   mt-[6rem] sm:mt-[0rem] bg-gradient-to-br from-gray-800 to-gray-900  p-4 max-w-[500px] w-[500px] rounded-md"
          >
            <UploadProfile name="profilePicture" label="Profile Picture" />
            <div className="w-full flex flex-col sm:flex-row items-center justify-between">
              <button
                type="submit"
                className="mt-4 font-semibold bg-blue-500 text-white active:bg-blue-600 sm:hover:bg-blue-600 py-1 px-4 rounded"
                disabled={isSubmitting}
              >
               {loading?"Updating...":"Update Profile Picture"}
              </button>
              <button
                onClick={() => setShow(!show)}
                className="bg-white/10 py-1 mt-4 hover:bg-white/20 rounded-full px-7"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfilePicture;
