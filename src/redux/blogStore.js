import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlog: [],
  currentTab: null,
  pageReloaded: true,
  activeTab: localStorage.getItem("active-tab")
    ? JSON.parse(localStorage.getItem("active-tab")).current
    : "All Blogs",
  isModalOpen: false,
  singleBlog: null,
  blogUpdating: false,
  currentUpdatingblog: {},
};

const blogSlice = createSlice({
  name: "blogStore",
  initialState,
  reducers: {
    setAllBlog(state, action) {
      state.allBlog = action.payload;
    },
    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
    setPageReloaded(state, action) {
      state.pageReloaded = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setSingleBlog(state, action) {
      state.singleBlog = action.payload;
    },
    setBlogUpdating(state, action) {
      state.blogUpdating = action.payload;
    },
    setCurrentUpdatingblog(state, action) {
      state.currentUpdatingblog = action.payload;
    },
  },
});

export const blogAction = blogSlice.actions;

export default blogSlice;
