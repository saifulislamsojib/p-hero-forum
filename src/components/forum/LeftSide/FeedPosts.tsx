import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import postServerService from "@/services/PostServerService";
import Image from "next/image";
import { cache } from "react";

type Props = {
  category: string;
};

const getPosts = cache((category: string) =>
  postServerService.getFeedPost(category)
);

const FeedPosts = async ({ category }: Props) => {
  const { posts } = await getPosts(category);

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Card key={post._id} className="bg-slate-100 mb-5">
          <CardHeader>
            <div className="flex gap-2">
              <Avatar className="cursor-pointer">
                <AvatarImage alt="user" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <h4 className="scroll-m-20 text-md font-medium tracking-tight">
                {post.author.name}
              </h4>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.postBody}</p>
            {post.imagesOrVideos.length > 0 && (
              <Image
                src={post.imagesOrVideos[0]}
                alt="post"
                width={500}
                height={500}
              />
            )}
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeedPosts;
