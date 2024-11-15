import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blogAction } from "../../../redux/blogStore";

const CreateBlog = ({ onPublish, setLoading, loading, blog }) => {
  const { token } = useSelector((store) => store.credential);
  const { blogUpdating, currentUpdatingblog } = useSelector(
    (store) => store.blogStore
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!token) {
      dispatch(blogAction.setCurrentTab(null));
      navigate("/login");
    }
  }, [token, navigate, dispatch]);

  useEffect(() => {
    // Set default values if a blog is provided for updating
    if (blog) {
      setTitle(blog.title || "");
      setText(blog.text || "");
      setCategory(blog.category || "");
      setTags(blog.tags || []);
      if (blog.image) {
        setPreview(blog.image);
      }
    }
  }, [blog]);

  if (!token) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleSubmit = () => {
    const imageUrl = image ? URL.createObjectURL(image) : preview;
    onPublish({ title, text, imageUrl, file: image, tags, category });
    setTitle("");
    setText("");
    setImage(null);
    setPreview(null);
    setTags([]);
    setCategory("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <input
        type="text"
        className="w-full p-2 rounded-lg bg-white/10 outline-none text-white mb-4"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full h-48 p-2 rounded-lg bg-white/10 outline-none text-white mb-4"
        placeholder="Write your blog here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="mb-4 block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
        onChange={handleImageUpload}
      />

      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 rounded-lg bg-white/10 outline-none text-white mb-2"
          placeholder="Add a tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
        <div className="mt-2 overflow-x-auto whitespace-nowrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white/10 text-white rounded-full px-3 py-1 text-sm mr-1 inline-flex items-center"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 relative text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center"
              >
                <span className="absolute -top-[3.6px] left-[3px]">
                  &times;
                </span>
              </button>
            </span>
          ))}
        </div>
      </div>

      <select
        className="w-full p-2 rounded-lg outline-none bg-white/10 text-white mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option className="text-black" value="">
          Select Category
        </option>
        <option className="text-black" value="technology">
          Technology
        </option>
        <option className="text-black" value="education">
          Education
        </option>
        <option className="text-black" value="health">
          Health
        </option>
        <option className="text-black" value="entertainment">
          Entertainment
        </option>
      </select>

      <button
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
        onClick={handleSubmit}
      >
        {blogUpdating
          ? loading
            ? "Updating..."
            : "Update"
          : loading
          ? "Publishing..."
          : "Publish"}
      </button>
    </div>
  );
};

export default CreateBlog;
