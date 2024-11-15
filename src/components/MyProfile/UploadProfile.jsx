import { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import { MdUpload } from "react-icons/md";
import { toast } from "react-hot-toast"; 

const UploadProfile = ({ name, label, viewData = null }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [, , helpers] = useField(name);
  const { setValue, setTouched } = helpers;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
    
      setIsLoading(true);
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setIsLoading(false);
      toast.error("Failed to read file. Please try again.");
    };
  };

  useEffect(() => {
    setValue(selectedFile);
    setTouched(true);
  }, [selectedFile, setValue, setTouched]);

  const handleBrowseClick = () => {
    inputRef.current.click();
  };

  const handleCancelClick = () => {
    setPreviewSource(null);
    setSelectedFile(null);
    setValue(null);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}
      </label>
      <div className="flex min-h-[250px] items-center justify-center rounded-md border-2 border-dashed border-white/30 bg-richblack-700">
        {isLoading ? (
          <p className="text-center text-richblack-200">Loading...</p>
        ) : previewSource ? (
          <div className="flex w-full items-center justify-center flex-col p-6">
            
            <img
                src={previewSource}
                alt="Preview"
                className="max-h-[200px] h-[150px] w-[150px] vm:h-[200px] vm:w-[200px] max-w-[200px] overflow-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-full object-cover"
              />
            
            {!viewData && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="mt-3 text-richblack-400 active:bg-white/20 sm:hover:bg-white/20 bg-white/10 py-2 rounded-full px-5"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <MdUpload size={70} className=" text-blue-600" />
            </div>
            <p className="mt-2 max-w-[200px] leading-8 text-center text-lg text-richblack-200">
              Choose a Image file
            </p>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="mt-2 font-semibold bg-white/10 active:bg-white/20 transition-all duration-150 sm:hover:bg-white/20 py-1 px-2 rounded-full text-yellow-50"
            >
              Browse a image
            </button>
            <input
              type="file"
              accept={"image/*"}
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
            />
           
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadProfile;
