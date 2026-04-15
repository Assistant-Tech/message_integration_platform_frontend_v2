const SkeletonCard = () => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-grey-light h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-grey-light rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-grey-light rounded col-span-2"></div>
              <div className="h-2 bg-grey-light rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-grey-light rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
