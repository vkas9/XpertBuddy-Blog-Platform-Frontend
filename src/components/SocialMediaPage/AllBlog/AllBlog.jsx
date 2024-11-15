import React, { useEffect, useState, useRef, useCallback } from "react";
import Blog from "../Blog";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlog } from "./fetchAllBlog";
import { blogAction } from "../../../redux/blogStore";
import { credentialAction } from "@/redux/credentials";
import { handleLikeClick } from "../../../../utils/likeHandler";
import { fetchBlogs } from "../../../../utils/fetchBlogs";
import BlogSkeleton from "../Skeleton";

const LIMIT = 10; // Number of blogs to load per batch

const AllBlog = () => {
  const { allBlog, pageReloaded } = useSelector((store) => store.blogStore);
  const { userCredentials } = useSelector((store) => store.credential);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Page state for pagination
  const [hasMore, setHasMore] = useState(true); // Track if more blogs are available
  const dispatch = useDispatch();
  const observer = useRef();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadBlogs = async () => {
      setLoading(true);
      const result = await fetchBlogs(
        dispatch,
        signal,
        pageReloaded,
        allBlog,
        blogAction,
        page,
        LIMIT
      );
      setLoading(false);
      if (result?.length < LIMIT) setHasMore(false); // If fewer than LIMIT blogs are returned, assume no more blogs
    };

    loadBlogs();

    return () => {
      controller.abort();
    };
  }, [dispatch, page, pageReloaded, userCredentials?.blogs?.length]);

  // Observer callback for lazy loading
  const lastBlogElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="min-w-[calc(100vw-(256px))] w-full overflow-y-scroll flex flex-col items-center p-2">
      {loading && page === 1 ? (
        <BlogSkeleton />
      ) : allBlog && allBlog.length > 0 ? (
        [...allBlog].reverse().map((blog, index) => {
          if (index === allBlog.length - 1) {
            return (
              <Blog
                key={blog._id}
                title={blog.title}
                author={blog.ownerDetails}
                content={blog.blog_context}
                image={blog.blog_image}
                profileImage={blog?.profileDetail?.user_profile_image}
                likesCount={blog.likes}
                comments={blog?.comments}
                blogTime={blog.createdAt}
                onLikeClick={() =>
                  handleLikeClick(blog, allBlog, userCredentials, dispatch)
                }
                blogId={blog._id}
                tags={blog.tags}
                category={blog.category}
              />
            );
          } else {
            return (
              <Blog
                key={blog._id}
                title={blog.title}
                author={blog.ownerDetails}
                content={blog.blog_context}
                image={blog.blog_image}
                profileImage={blog?.profileDetail?.user_profile_image}
                likesCount={blog.likes}
                comments={blog?.comments}
                blogTime={blog.createdAt}
                onLikeClick={() =>
                  handleLikeClick(blog, allBlog, userCredentials, dispatch)
                }
                blogId={blog._id}
                tags={blog.tags}
                category={blog.category}
              />
            );
          }
        })
      ) : (
        <p>No blogs available.</p>
      )}
      {loading && page > 1 && <p className="text-xl">Loading more...</p>}
    </div>
  );
};

export default AllBlog;
