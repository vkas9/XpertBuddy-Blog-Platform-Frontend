import { fetchAllBlog } from "@/components/SocialMediaPage/AllBlog/fetchAllBlog";

export const fetchBlogs = async (
  dispatch,
  signal,
  pageReloaded,
  allBlog,
  blogAction
) => {
  try {
    if (pageReloaded || !allBlog.length) {
      await fetchAllBlog(dispatch, signal);

      dispatch(blogAction.setPageReloaded(false));
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error fetching blogs:", error);
    }
  }
};
