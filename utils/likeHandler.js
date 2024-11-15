import { handleLikeBlog } from "@/APIs/api";
import { credentialAction } from "@/redux/credentials";
import { blogAction } from "@/redux/blogStore";

const updateLikes = (blog, userId) => {
  const alreadyLiked = blog.likes.includes(userId);
  return {
    ...blog,
    likes: alreadyLiked
      ? blog.likes.filter((userId) => userId !== userId)
      : [...blog.likes, userId],
  };
};

export const handleLikeClick = async (
  blog,
  allBlog,
  userCredentials,
  dispatch
) => {
  try {
    const isLiked = blog.likes.includes(userCredentials._id);

    await handleLikeBlog({ isAlreadyLike: isLiked, blog_id: blog._id });

    const updatedAllBlog = allBlog.map((item) =>
      item._id === blog._id ? updateLikes(item, userCredentials._id) : item
    );

    const updatedUserBlog = userCredentials.blogs.map((item) =>
      item._id === blog._id ? updateLikes(item, userCredentials._id) : item
    );

    const updatedUserCredential = {
      ...userCredentials,
      blogs: updatedUserBlog,
    };

    localStorage.setItem(
      import.meta.env.VITE_USER,
      JSON.stringify(updatedUserCredential)
    );
    dispatch(credentialAction.setCredential(updatedUserCredential));
    dispatch(blogAction.setAllBlog(updatedAllBlog));
  } catch (error) {
    console.error("Error liking blog:", error);
  }
};
