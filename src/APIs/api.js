import axios from "axios";
import { toast } from "react-hot-toast";
import { credentialAction } from "../redux/credentials";
import { blogAction } from "../redux/blogStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signup = (data, navigate) => {
  return async (dispatch) => {
    if (!navigator.onLine) {
      toast.error("No internet connection");
      throw new Error("No internet connection");
    }

    dispatch(credentialAction.setLoading(true));

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        {
          first_name: data.FirstName,
          last_name: data.LastName,
          email: data.Email,
          password: data.Password,
        },
        { withCredentials: true }
      );

      dispatch(credentialAction.setToken(response.data.token));
      dispatch(credentialAction.setCredential(response.data.userDetail));

      localStorage.setItem(
        "active-tab",
        JSON.stringify({ current: "All Blogs" })
      );
      dispatch(blogAction.setActiveTab("All Blogs"));

      localStorage.setItem(
        import.meta.env.VITE_USER,
        JSON.stringify(response.data.userDetail)
      );

      localStorage.setItem(
        import.meta.env.VITE_TOKEN,
        JSON.stringify(response.data.token)
      );

      navigate("/social-media");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong or Server Offline");
      }
    } finally {
      dispatch(credentialAction.setLoading(false));
    }
  };
};

export const login = (data, navigate) => {
  return async (dispatch) => {
    if (!navigator.onLine) {
      toast.error("No internet connection");
      throw new Error("No internet connection");
    }

    dispatch(credentialAction.setLoading(true));

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email: data.Email,
          password: data.Password,
        },
        { withCredentials: true }
      );

      dispatch(credentialAction.setToken(response.data.token));
      dispatch(credentialAction.setCredential(response.data.userDetail));

      localStorage.setItem(
        "active-tab",
        JSON.stringify({ current: "All Blogs" })
      );
      dispatch(blogAction.setActiveTab("All Blogs"));

      localStorage.setItem(
        import.meta.env.VITE_USER,
        JSON.stringify(response.data.userDetail)
      );
      localStorage.setItem(
        import.meta.env.VITE_TOKEN,
        JSON.stringify(response.data.token)
      );

      navigate("/social-hub/all-blogs");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong or Server Offline");
      }
    } finally {
      dispatch(credentialAction.setLoading(false));
    }
  };
};

export const forgotPassword = async (data, navigate) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");

  try {
    const response = await axios.post(
      `${BASE_URL}/api/forgotPassword`,
      {
        email: data.email,
      },
      { withCredentials: true }
    );

    toast.success(response.data.message);
    navigate("/reset-password/verify-email");
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    toast.dismiss(toastId);
  }
};

export const verifyForgotOTP = async (data, navigate) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading...");

  let response;
  try {
    await axios
      .post(`${BASE_URL}/api/verifyForgotPasswordOTP`, {
        email: data.email,
        otp: String(data.data.otp),
      })
      .then((res) => {
        response = res;
      });

    navigate("/reset-password/reset-password");
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const resetPasswordOut = async (data, navigate) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Changing...");
  try {
    const response = await axios.post(`${BASE_URL}/api/resetPassword`, {
      email: data.email,
      password: data.data.password,
      ConfirmPassword: data.data.confirmPassword,
    });
    toast.success(response.data.message);
    navigate("/login");
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    toast.dismiss(toastId);
  }
};

export const checkOTP = (data, navigate) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(credentialAction.setLoading(true));
    let response;

    try {
      await axios
        .post(`${BASE_URL}/api/auth/checkotp`, {
          email: data.Email,
        })
        .then((res) => {
          response = res;
        });

      dispatch(credentialAction.setSignupData(data));
      toast.success(response.data.message);
      navigate("/signup/verify-email");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      dispatch(credentialAction.setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      localStorage.clear();

      dispatch(credentialAction.setCredential(null));
      dispatch(credentialAction.setToken(null));
      dispatch(credentialAction.setSignupData(null));

      dispatch(blogAction.setCurrentTab(null));

      navigate("/");

      // Show success toast
      toast.success("Logout successful!");
    } catch (error) {
      // Show error toast
      toast.error("Logout failed!");
    }
  };
};

export const fetchSingleBlog = async (signal, dispatch, blogId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/blog?blogId=${blogId}`, {
      signal,
    });
    dispatch(blogAction.setSingleBlog(response.data.blog));
    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlogList = async (signal) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }

  try {
    const res = await axios.get(`${BASE_URL}/api/blog/allblog`, {
      withCredentials: true,
      signal,
    });
    return res;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else {
      console.error("Error fetching course details", error);
    }
  }
};

export const pushlishBlog = async (formData) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  try {
    const res = await axios.post(`${BASE_URL}/api/blog/addblog`, formData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = async (id,formData) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  try {
    const res = await axios.put(`${BASE_URL}/api/blog/updateblog?blogId=${id}`, formData, {
      withCredentials: true,
    });
    return res.data.updatedBlog;
    
  } catch (error) {
    console.log(error);
  }
};

export const handleLikeBlog = async ({ blog_id, isAlreadyLike }) => {
  try {
    await axios.post(
      `${BASE_URL}/api/blog/like`,
      {
        blog_id,
        isAlreadyLike,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateDisplayProfile = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/updateprofilepicture`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateProfileDetails = async (dispatch, data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }

  try {
    await axios.post(`${BASE_URL}/api/auth/updateprofiledetails`, data, {
      withCredentials: true,
    });
    const updatedUserCredential = {};
    toast.success("Details Saved");
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async ({ comment, blogId }) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }

  try {
    const res = await axios.post(
      `${BASE_URL}/api/blog/comments`,
      {
        comment,
        blogId,
      },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else {
      console.error("Error fetching course details", error);
    }
  }
};
