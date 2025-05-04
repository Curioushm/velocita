const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-secondary animate-spin" style={{ animationDirection: 'reverse', opacity: 0.6 }}></div>
      </div>
    </div>
  );
};

export default Loader;
