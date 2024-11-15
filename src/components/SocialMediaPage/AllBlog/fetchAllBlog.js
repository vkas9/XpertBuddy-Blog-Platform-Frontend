import toast from "react-hot-toast";
import { getBlogList } from "../../../APIs/api";
import { blogAction } from "../../../redux/blogStore";

export const fetchAllBlog = async (dispatch, signal) => {
  try {
    const allBlogs = await getBlogList(signal);

    if (!signal.aborted) {
      dispatch(blogAction.setAllBlog(allBlogs?.data?.allBlog || []));
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);

    if (!signal.aborted) {
      toast.error(error?.message || "An error occurred while fetching blogs");
    }
  }
};
