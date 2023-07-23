import { Skeleton } from "@/components/ui/skeleton";

const CommentLoading = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 mb-3">
        {[...Array(3)].map((_, idx) => (
          <div className="flex gap-2" key={idx}>
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="bg-slate-200 p-3 rounded-md">
              <Skeleton className="h-4 w-28 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentLoading;
