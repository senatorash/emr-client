import { Skeleton } from "../ui/skeleton";
const StatsCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-12 w-12 rounded-xl" />
      </div>
    </div>
  );
};
export default StatsCardSkeleton;
