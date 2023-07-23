import { Skeleton } from "@/components/ui/skeleton";

const TrendingIssuesLoading = () => {
  return (
    <div className="mb-5 bg-slate-100 p-3 rounded shadow border">
      <h3 className="text-2xl font-medium">Trending Issues</h3>
      <hr className="my-4" />
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-slate-200 text-base rounded border p-2 shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-12" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
            <p className="whitespace-nowrap overflow-hidden overflow-ellipsis mt-2">
              <Skeleton className="h-6 w-full" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingIssuesLoading;
