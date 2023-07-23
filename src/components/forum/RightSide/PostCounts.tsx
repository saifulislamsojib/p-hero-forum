import postServerService from "@/services/PostServerService";
import { cache } from "react";

const getPostsCount = cache(postServerService.getPostCount);

const PostCounts = async () => {
  const {
    allPostCount,
    resolvedPostCount,
    unresolvedPostCount,
    rejectedPostCount,
  } = await getPostsCount();

  const progress = [
    {
      id: 1,
      title: "My Post",
      count: allPostCount,
    },
    {
      id: 2,
      title: "Resolve",
      count: resolvedPostCount,
    },
    {
      id: 3,
      title: "Unsolved",
      count: unresolvedPostCount,
    },
    {
      id: 4,
      title: "Reject",
      count: rejectedPostCount,
    },
  ];

  return (
    <div className="my-3 bg-slate-100 p-3 rounded shadow border">
      <h3 className="text-2xl font-medium">My Issue Progress</h3>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-3">
        {progress.map(({ id, title, count }) => (
          <div
            key={id}
            className="bg-slate-200 rounded border shadow h-52 flex gap-2 flex-col items-center justify-center"
          >
            <h1 className="text-6xl font-semibold">{count}</h1>
            <h3 className="text-xl font-medium text-center text-gray-500">
              {title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCounts;
