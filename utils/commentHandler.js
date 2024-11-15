import { addComment } from "@/APIs/api";
import { credentialAction } from "@/redux/credentials";
import { blogAction } from "@/redux/blogStore";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export const commentHandler = async (
  comment,
  blogId,
  allBlogs,
  dispatch,
  userCredentials
) => {
  try {
    const updatedAllBlogs = allBlogs?.map((blog) => {
      if (blog?._id === blogId) {
        return {
          ...blog,
          comments: [
            ...blog.comments,
            {
              _id: uuidv4(),
              text: comment,
            },
          ],
        };
      }
      return blog;
    });

    const updatedUserBlogs = userCredentials?.blogs?.map((blog) => {
      if (blog?._id === blogId) {
        return {
          ...blog,
          comments: [
            ...blog.comments,
            {
              _id: uuidv4(),
              text: comment,
            },
          ],
        };
      }
      return blog;
    });
    const updatedUserCredential = {
      ...userCredentials,
      blogs: updatedUserBlogs,
    };

    dispatch(credentialAction.setCredential(updatedUserCredential));
    dispatch(blogAction.setAllBlog(updatedAllBlogs));
    localStorage.setItem(
      import.meta.env.VITE_USER,
      JSON.stringify(updatedUserCredential)
    );
    await addComment({ comment, blogId });
  } catch (error) {
    console.log("error", error);
    toast.error("Failed to add comment. Please try again.");
  }
};
