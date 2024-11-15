import React, { useEffect } from "react";
import Blog from "../Blog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blogAction } from "../../../redux/blogStore";
import EmptyMyBlogMessage from "./EmptyMyBlogMessage";
import { handleLikeClick } from "../../../../utils/likeHandler";
import { fetchBlogs } from "../../../../utils/fetchBlogs";

const MyBlog = () => {
  const { token } = useSelector((store) => store.credential);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(blogAction.setCurrentTab(null));
      navigate("/login");
    }
  }, [token, navigate]);
  if (!token) return null;

  const { userCredentials } = useSelector((store) => store.credential);
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
    <div className="w-full sm:min-w-[calc(100vw-(256px))] overflow-y-scroll flex flex-col items-center p-2">
      {userCredentials.blogs && userCredentials.blogs.length > 0 ? (
        [...userCredentials.blogs]
          .reverse()
          .map((blog, index) => (
            <Blog
              key={blog._id}
              blogKey={blog._id}
              title={blog.title}
              author={blog.ownerDetails}
              content={blog.blog_context}
              image={blog.blog_image}
              profileImage={userCredentials?.profile?.user_profile_image}
              likesCount={blog.likes}
              comments={blog.comments}
              blogTime={blog.createdAt}
              tags={blog.tags}
              onLikeClick={() =>
                handleLikeClick(blog, allBlog, userCredentials, dispatch)
              }
              blogId={blog._id}
              category={blog.category}
            />
          ))
      ) : (
        <EmptyMyBlogMessage />
      )}
    </div>
  );
};

export default MyBlog;
