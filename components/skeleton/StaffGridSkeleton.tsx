import StaffCardSkeleton from "./StaffCardSkeleton";

const StaffGridSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <StaffCardSkeleton key={i} />
    ))}
  </div>
);

export default StaffGridSkeleton;
