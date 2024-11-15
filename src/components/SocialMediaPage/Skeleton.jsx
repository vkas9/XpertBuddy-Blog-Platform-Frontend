const BlogSkeleton = () => {
  return (
    <div className=" animate-pulse p-2 overflow-y-auto flex flex-col items-center  w-full">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white/10 text-white w-full animate-pulse h-full max-h-[640px] max-w-[640px] rounded-lg shadow-lg p-6 mb-4 "
        ></div>
      ))}
    </div>
  );
};

export default BlogSkeleton;
