import postServerService from "@/services/PostServerService";
import { SearchParams } from "@/types/PageProps";
import { cache } from "react";
import FeedSinglePost from "./FeedSinglePost";

type Props = {
  searchParams: SearchParams;
};

const getPosts = cache((searchParams: SearchParams) =>
  postServerService.getFeedPost(searchParams)
);

const FeedPosts = async ({ searchParams }: Props) => {
  const { posts } = await getPosts(searchParams);

  return (
    <div className="mt-5">
      {posts.map((post) => (
        <FeedSinglePost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default FeedPosts;
