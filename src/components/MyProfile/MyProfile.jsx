import { MdOutlineEdit } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogAction } from "@/redux/blogStore";
import { useEffect } from "react";
import { fetchBlogs } from "../../../utils/fetchBlogs";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userCredentials } = useSelector((store) => store.credential);
  const { allBlog, pageReloaded } = useSelector((store) => store.blogStore);
  const handleClick = () => {
    navigate("settings");
    localStorage.setItem("active-tab", JSON.stringify({ current: "Setting" }));
    dispatch(blogAction.setActiveTab("Setting"));
  };

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

  if (token)
    return (
      <div className="w-full overflow-y-auto max-h-[calc(100vh-5.5rem)] px-4 sm:px-6 lg:px-6 py-6 scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-800 scrollbar-thumb-rounded-md">
        <div className="flex flex-col gap-6 mt-2 text-white">
          <h1 className="text-xl sm:text-2xl font-bold">Profile Overview</h1>

          <div className="relative flex flex-col sm:flex-row items-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden p-6 sm:p-6 gap-6 w-full lg:max-w-[55rem]">
            <div
              className="bg-cover bg-center rounded-full w-[100px] h-[100px] sm:min-w-[120px] sm:min-h-[120px] border-4 border-gray-700"
              style={{
                backgroundImage: `url(${userCredentials?.profile?.user_profile_image})`,
              }}
            ></div>

            <div className="flex flex-col items-center sm:items-start gap-2 w-full text-center sm:text-left">
              <span className="text-xl sm:text-2xl font-semibold capitalize">
                {userCredentials?.first_name} {userCredentials?.last_name}
              </span>
              <span className="text-gray-400 text-sm sm:text-base overflow-x-auto">
                {userCredentials?.email}
              </span>
              <span className="text-gray-500 text-sm sm:text-base capitalize">
                {userCredentials?.profile?.gender || "Not Specified"}
              </span>
            </div>

            <button onClick={handleClick}>
              <button className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition duration-200">
                <MdOutlineEdit size={24} />
              </button>
            </button>
          </div>
          <div className="w-[98%] my-2  h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
          <h2 className="text-xl sm:text-2xl font-semibold">
            Personal Details
          </h2>
          <div className="bg-gradient-to-br lg:max-w-[55rem] relative from-gray-800 to-gray-900 p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center">
              <button onClick={handleClick}>
                <button className=" absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition duration-200">
                  <MdOutlineEdit size={24} />
                </button>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-400 text-sm sm:text-base">
                  First Name
                </h3>
                <p className="capitalize text-base sm:text-lg">
                  {userCredentials?.first_name}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm sm:text-base">
                  Last Name
                </h3>
                <p className="capitalize text-base sm:text-lg">
                  {userCredentials?.last_name}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm sm:text-base">Email</h3>
                <p className="text-base sm:text-lg overflow-x-auto">
                  {userCredentials?.email}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm sm:text-base">
                  Phone Number
                </h3>
                <p className="text-base sm:text-lg">
                  {userCredentials?.profile?.contact_number || "Not Provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else return <Navigate to="/login" />;
};

export default MyProfile;
