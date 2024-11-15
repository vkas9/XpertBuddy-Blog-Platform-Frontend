import { blogAction } from "@/redux/blogStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBlog from "./CreateBlog";
import { credentialAction } from "@/redux/credentials";
import { pushlishBlog, updateBlog } from "@/APIs/api";
import { v4 as uuidv4 } from "uuid";
import { fetchBlogs } from "../../../../utils/fetchBlogs";
const BlogModal = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    allBlog,
    isModalOpen,
    pageReloaded,
    currentUpdatingblog,
    blogUpdating,
  } = useSelector((store) => store.blogStore);
  const { userCredentials } = useSelector((store) => store.credential);

  const authorName =
    userCredentials?.first_name + " " + userCredentials?.last_name;

  const handlePublishOrUpdate = async (blog) => {
    try {
      setLoading(true);

      if (blogUpdating) {
        // Handle Update
        const updatedFields = {};
        for (const key in blog) {
          if (blog[key] !== currentUpdatingblog[key]) {
            updatedFields[key] = blog[key];
          }
        }

        if (blog.file) {
          updatedFields.blog_image = blog.file;
        }
        
        const formData = new FormData();
        Object.keys(updatedFields).forEach((key) => {
          if (key === "tags" && Array.isArray(updatedFields[key])) {
            updatedFields[key].forEach((tag) =>
              formData.append("tags", tag)
            );
          } else {
            formData.append(key, updatedFields[key]);
          }
        });

        const updatedBlog= await updateBlog(currentUpdatingblog._id, formData);
        // Update Redux and localStorage here based on response if needed
        const updatedCredential = {
          ...userCredentials,
          blogs: userCredentials.blogs.map((b) =>
            b._id === updatedBlog._id ? updatedBlog : b
          ),
        };

        const updatedAllBlog = allBlog.map((b) =>
          b._id === updatedBlog._id ? updatedBlog : b
        );
        dispatch(blogAction.setBlogUpdating(false));
              dispatch(blogAction.setCurrentUpdatingblog({}));
        dispatch(credentialAction.setCredential(updatedCredential));
        dispatch(blogAction.setAllBlog(updatedAllBlog));
        localStorage.setItem(
          import.meta.env.VITE_USER,
          JSON.stringify(updatedCredential)
        );
        
      } else {
        // Handle Publish
        const newAllBlog = [
          ...allBlog,
          {
            _id: uuidv4(),
            ownerDetails: authorName,
            title: blog.title,
            blog_context: blog.text,
            likes: [],
            comments: [],
            blog_image: blog.imageUrl,
            category: blog.category,
            tags: blog.tags,
            profileDetail: {
              user_profile_image: userCredentials?.profile?.user_profile_image,
            },
          },
        ];

        const formData = new FormData();
        formData.append("blog_image", blog.file);
        formData.append("blog_context", blog.text);
        formData.append("category", blog.category);
        formData.append("title", blog.title);
        blog.tags.forEach((tag) => formData.append("tags", tag));

        const response = await pushlishBlog(formData);
        const newCredential = {
          ...userCredentials,
          blogs: [
            ...userCredentials.blogs,
            {
              _id: response?.blogDetail?._id,
              ownerDetails: response.blogDetail.ownerDetails,
              title: response.blogDetail.title,
              blog_context: response.blogDetail.blog_context,
              likes: response.blogDetail.likes,
              comments: response.blogDetail.comments,
              profileDetail: {
                user_profile_image: blog.imageUrl,
              },
              category: blog.category,
              tags: blog.tags,
              blog_image: response.blogDetail.blog_image,
              createdAt: response.blogDetail.createdAt,
            },
          ],
        };

        dispatch(credentialAction.setCredential(newCredential));
        dispatch(blogAction.setPageReloaded(true));
        dispatch(blogAction.setAllBlog(newAllBlog));
        localStorage.setItem(
          import.meta.env.VITE_USER,
          JSON.stringify(newCredential)
        );
      }

      dispatch(blogAction.setIsModalOpen(false));
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 inset-0 flex items-center justify-center p-6 bg-black/90 z-50">
      <div className="bg-[#1d1d1f] rounded-lg mt-[20px] shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => {
            localStorage.setItem(
              "active-tab",
              JSON.stringify({ current: "All Blogs" })
            );
            dispatch(blogAction.setActiveTab("All Blogs"));
            if (blogUpdating) {
              dispatch(blogAction.setBlogUpdating(false));
              dispatch(blogAction.setCurrentUpdatingblog({}));
            }

            if (isModalOpen) dispatch(blogAction.setIsModalOpen(false));
          }}
          className="absolute text-xl top-4 right-4 text-white hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-lg font-bold mb-4">
          {!blogUpdating ? "Create a New Blog" : "Update Blog"}
        </h2>
        <CreateBlog
          onPublish={handlePublishOrUpdate}
          loading={loading}
          blog={currentUpdatingblog}
        />
      </div>
    </div>
  );
};

export default BlogModal;

