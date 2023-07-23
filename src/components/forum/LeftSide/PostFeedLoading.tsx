import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PostFeedLoading = () => {
  return (
    <div className="mt-5">
      {[...Array(10)].map((_, idx) => (
        <Card className="bg-slate-100 mb-5 shadow" key={idx}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div className="flex items-start justify-between">
                <div className="flex gap-2">
                  <Skeleton className="h-11 w-11 rounded-full" />
                  <div>
                    <h4 className="scroll-m-20 text-md font-medium tracking-tight">
                      <Skeleton className="h-4 w-32" />
                    </h4>
                    <div className="flex gap-2 items-center text-sm text-muted-foreground mt-1">
                      <div className="flex gap-1 items-center">
                        <Skeleton className="h-4 w-14" />
                      </div>
                      <div className="flex gap-1 items-center">
                        <Skeleton className="h-4 w-14" />
                      </div>
                      <div className="gap-1 items-center hidden sm:flex">
                        <Skeleton className="h-4 w-14" />
                      </div>
                    </div>
                  </div>
                </div>
                <Skeleton className="h-5 w-4 sm:hidden" />
              </div>
              <div className="flex justify-between items-start md:items-center gap-2">
                <div className="flex items-center flex-row-reverse gap-2">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-14" />
                  <div className="gap-1 items-center flex sm:hidden text-sm text-muted-foreground">
                    <Skeleton className="h-4 w-14" />
                  </div>
                </div>
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-2 hidden sm:block" />
              </div>
            </div>
          </CardHeader>
          <Skeleton
            className={
              idx % 2 === 0
                ? "h-[500px] w-full rounded-none"
                : "h-56 w-full rounded-none"
            }
          />
          <div className="m-2 flex items-center justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-20 rounded-3xl" />
          </div>
          <hr />
          <CardFooter className="mt-3">
            <div className="flex w-full items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-full rounded-3xl" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PostFeedLoading;
