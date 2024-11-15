import React, { useEffect } from "react";
import Blog from "../Blog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blogAction } from "../../../redux/blogStore";
import EmptyLikedMessage from "./EmptyLikedMessage";
import { handleLikeClick } from "../../../../utils/likeHandler";
import { fetchBlogs } from "../../../../utils/fetchBlogs";

const LikedBlogs = () => {
  const { token, userCredentials } = useSelector((store) => store.credential);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(blogAction.setCurrentTab(null));
      navigate("/login");
    }
  }, [token, navigate]);
  if (!token) return null;
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

  const filterLikedBlog = allBlog?.filter((item) =>
    item?.likes?.includes(userCredentials._id)
  );

  return (
    <div className="w-full sm:min-w-[calc(100vw-(256px))] overflow-y-scroll flex flex-col items-center p-2">
      {filterLikedBlog?.length ? (
        [...filterLikedBlog]
          .reverse()
          .map((blog, index) => (
            <Blog
              key={blog._id}
              title={blog.title}
              author={blog.ownerDetails}
              content={blog.blog_context}
              image={blog.blog_image}
              profileImage={blog?.profileDetail?.user_profile_image}
              likesCount={blog.likes}
              comments={blog.comments}
              blogTime={blog.createdAt}
              onLikeClick={() =>
                handleLikeClick(blog, allBlog, userCredentials, dispatch)
              }
              blogId={blog._id}
            />
          ))
      ) : (
        <EmptyLikedMessage />
      )}
    </div>
  );
};

export default LikedBlogs;
