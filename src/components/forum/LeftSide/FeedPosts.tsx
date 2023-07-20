import postServerService from "@/services/PostServerService";
import { cache } from "react";
import FeedSinglePost from "./FeedSinglePost";

type Props = {
  category: string;
};

const getPosts = cache((category: string) =>
  postServerService.getFeedPost(category)
);

const FeedPosts = async ({ category }: Props) => {
  const { posts } = await getPosts(category);

  return (
    <div className="mt-5">
      {posts.map((post) => (
        <FeedSinglePost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default FeedPosts;
