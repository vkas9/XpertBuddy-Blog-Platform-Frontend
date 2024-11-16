import React, { useState } from "react";
import moment from "moment";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaComment } from "react-icons/fa6";
import { FaCommentSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { commentHandler } from "../../../utils/commentHandler";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { blogAction } from "@/redux/blogStore";
import axios from "axios";

const Blog = ({
  blogKey,
  title,
  author,
  content,
  image,
  profileImage,
  likesCount,
  comments,
  blogTime = Date.now(),
  onLikeClick,
  blogId,
  tags = [],
  category = "",
}) => {
  const { userCredentials, token } = useSelector((store) => store.credential);
  const { activeTab, blogUpdating } = useSelector((store) => store.blogStore);
  const { allBlog } = useSelector((store) => store.blogStore);
  const [likes, setLikes] = useState(likesCount?.length);
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState(comments || []);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(likesCount.includes(userCredentials?._id));
  const [showFullContent, setShowFullContent] = useState(false);
  const charLimit = 150;

  const handleLike = () => {
    if (!token) {
      toast.error("Must be Logged in");
      return;
    }
    onLikeClick();
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  const dispatch = useDispatch();

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

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const navigate = useNavigate();
  const openBlogDetails = () => {
    navigate(`/blog/${blogId}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();

    dispatch(
      blogAction.setCurrentUpdatingblog({
        _id: blogKey,
        title,
        text: content,
        image,
        tags,
        category,
      })
    );
    dispatch(blogAction.setBlogUpdating(true));
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!token) {
      toast.error("Must be Logged in");
      return;
    }
  
    try {
      
      const response = await axios.delete(`/api/blogs/${blogId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if(response.data.success) toast.success("Blog deleted successfully");
       
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("An error occurred while deleting the blog");
    }
  };

  return (
    <div
      onClick={openBlogDetails}
      className="bg-white/10 text-white w-full max-w-[40rem] rounded-lg shadow-lg p-6 mb-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="rounded-full h-10 w-10">
            <img
              src={profileImage}
              loading="lazy"
              alt={profileImage}
              className="h-10 w-10 select-none pointer-events-none object-cover rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="font-bold capitalize">{author}</p>
            <p className="text-sm flex items-start flex-col sm:gap-2 sm:flex-row">
              <span>{moment(blogTime).fromNow()}</span>
              <span className="max-sm:hidden">|</span>
              {category && (
                <span className=" capitalize ">{category}</span>
              )}
            </p>
          </div>
        </div>
        {activeTab === "My Blogs" && (
          <div className="flex items-center">
            <span
              onClick={(e) => handleEdit(e)}
              className="active:bg-white/10 hover:cursor-pointer hover:bg-white/10 transition-all duration-150 rounded-full p-2"
            >
              <FaRegEdit size={25} />
            </span>
            <span
              onClick={(e) => handleDelete(e)}
              className="active:bg-white/10 hover:cursor-pointer active:text-red-500 sm:hover:text-red-500 hover:bg-white/10 transition-all duration-150 rounded-full p-2"
            >
              <FaTrashAlt size={22} />
            </span>
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-2 capitalize">{title}</h2>
      <div className="mb-4">
        {content && (
          <p>
            {showFullContent
              ? content
              : content.substring(0, charLimit) +
                (content.length > charLimit ? "..." : "")}
          </p>
        )}

        {content.length > charLimit && (
          <button className="text-blue-500 mt-2" onClick={openBlogDetails}>
            Read More...
          </button>
        )}

        {image && (
          <img
            src={image}
            alt="Blog"
            loading="lazy"
            className="mt-4 rounded-lg w-full"
            onError={(e) => (e.target.style.display = "none")}
          />
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
        <div className="flex items-center justify-center">
          <button
            className="text-blue-500 text-2xl mr-1"
            onClick={toggleComments}
          >
            {showComments ? <FaCommentSlash /> : <FaComment />}
          </button>
          <span className="text-blue-500 mr-2 text-xl">
            ({commentList.length})
          </span>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
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

export default Blog;
