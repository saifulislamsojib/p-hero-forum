import { Skeleton } from "@/components/ui/skeleton";

const PostCountsLoading = () => {
  return (
    <div className="my-3 bg-slate-100 p-3 rounded shadow border">
      <h3 className="text-2xl font-medium">My Issue Progress</h3>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="bg-slate-200 rounded border shadow h-52 flex gap-2 flex-col items-center justify-center"
          >
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-5 w-full max-w-[144px] rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCountsLoading;
