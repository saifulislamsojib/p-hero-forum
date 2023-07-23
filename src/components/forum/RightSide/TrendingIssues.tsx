import { Badge } from "@/components/ui/badge";
import postServerService from "@/services/PostServerService";
import { cache } from "react";

const getTrendingIssues = cache(postServerService.getTrendingIssues);

const TrendingIssues = async () => {
  const { posts } = await getTrendingIssues();

  return (
    <div className="mb-5 bg-slate-100 p-3 rounded shadow border">
      <h3 className="text-2xl font-medium">Trending Issues</h3>
      <hr className="my-4" />
      <div className="flex flex-col gap-3">
        {posts.map(
          ({ _id, postBody, priority, status, upvote, author: { name } }) => (
            <div
              key={_id}
              className="bg-slate-200 text-base rounded border p-2 cursor-pointer shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium">{name}</h5>
                <Badge
                  variant={status.includes("new") ? "accent" : "outline"}
                  className="text-xs"
                >
                  {status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Badge className="text-xs">{priority}</Badge>
                <Badge variant="outline" className="text-xs">
                  {upvote} {upvote > 1 ? "upvote's" : "upvote"}
                </Badge>
              </div>
              <p className="whitespace-nowrap overflow-hidden overflow-ellipsis mt-2">
                {postBody}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TrendingIssues;
