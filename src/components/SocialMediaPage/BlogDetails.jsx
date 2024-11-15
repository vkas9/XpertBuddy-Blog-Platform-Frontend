import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { commentHandler } from "../../../utils/commentHandler";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FaComment, FaCommentSlash } from "react-icons/fa6";
import { fetchSingleBlog } from "@/APIs/api";

const BlogDetails = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { allBlog, singleBlog } = useSelector((store) => store.blogStore);

  const { userCredentials, token } = useSelector((store) => store.credential);
  let blog;

  if (allBlog && allBlog.length > 0) {
    blog = allBlog.find((p) => p._id === blogId);
  } else {
    blog = singleBlog;
  }

  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const [commentList, setCommentList] = useState(blog?.comments || []);
  const [liked, setLiked] = useState(
    blog?.likes.includes(userCredentials?._id)
  );
  const [likes, setLikes] = useState(blog?.likes?.length);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (true) {
      const loadBlogs = async () => {
        setLoading(true);
        try {
          const result = await fetchSingleBlog(signal, dispatch, blogId);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setLoading(false);
        }
      };

      loadBlogs();
    } else {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [blogId, allBlog, dispatch]); // Added allBlog as dependency

  const charLimit = 300;
  const [showFullContent, setShowFullContent] = useState(false);
  const handleLike = () => {
    if (!token) {
      toast.error("Must be Logged in");

      return;
    }
    // onLikeClick()
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Must be Logged in");
      return;
    }
    if (commentText.trim()) {
      const newComment = {
        text: commentText,
        commentedUser: userCredentials._id,
      };
      setCommentList([...commentList, newComment]);
      await commentHandler(
        commentText,
        blogId,
        allBlog,
        dispatch,
        userCredentials
      );
      setCommentText("");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }
  return (
    <div className=" text-white  w-full h-[calc(100vh-(45px))] sm:h-[calc(100vh-(61px))] flex overflow-y-auto  flex-col rounded-lg shadow-lg py-6 px-[20rem] mb-4 mx-auto">
      <div className="flex items-center mb-4">
        <div className="rounded-full h-10 w-10 ">
          <img
            src={blog.profileDetail.user_profile_image}
            loading="lazy"
            alt={blog.profileDetail.user_profile_image}
            className=" h-10 w-10 select-none  pointer-events-none object-cover rounded-full"
          />
        </div>

        <div className="ml-3">
          <p className="font-bold capitalize">{blog.ownerDetails}</p>
          <p className="text-sm flex items-center">
            <span>{moment(blog.createdAt).fromNow()}</span>
            {blog?.category && (
              <span className="ml-2 capitalize ">| {blog?.category}</span>
            )}
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-2 capitalize">{blog.title}</h2>
      <div className="mb-4">
        {blog.blog_context && (
          <p>
            {showFullContent
              ? blog.blog_context
              : blog.blog_context.substring(0, charLimit) +
                (blog.blog_context.length > charLimit ? "..." : "")}
          </p>
        )}
        {blog.blog_context.length > charLimit && (
          <button className="text-blue-500 mt-2" onClick={toggleContent}>
            {showFullContent ? "Show Less" : "Show More"}
          </button>
        )}

        {blog.blog_image && (
          <div className="flex justify-center">
            <img
              src={blog.blog_image}
              alt="Blog"
              loading="lazy"
              className="mt-4 rounded-lg max-h-[30rem] object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            className={`mr-2 ${liked ? "text-red-500" : "text-blue-500"}`}
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
          >
            <div className="flex items-center gap-1">
              <FaHeart size={20} /> {liked ? "Unlike" : "Like"}
            </div>
          </button>
          <span>
            {likes} {likes === 1 ? "like" : "likes"}
          </span>
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="text-blue-500 text-2xl mr-1"
            onClick={toggleComments}
          >
            {showComments ? <FaCommentSlash /> : <FaComment />}
          </button>
          <span className="text-blue-500 mr-2 text-xl">
            ({blog.comments.length})
          </span>
          {/* <button className="text-blue-500 text-2xl"> <IoShareSocialSharp />
          </button> */}
        </div>
      </div>

      {showComments && (
        <div className="mt-4">
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full px-4 py-2 border outline-none border-none bg-white/10 rounded-md"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </form>

          <div className="mt-4">
            {commentList.length > 0 ? (
              [...commentList].reverse().map((comment, index) => (
                <p key={index} className="mb-2">
                  {comment?.text}
                </p>
              ))
            ) : (
              <p className="text-gray-400">No comments yet</p>
            )}
          </div>
        </div>
      )}
      {blog?.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white/10 text-white rounded-full px-3 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
