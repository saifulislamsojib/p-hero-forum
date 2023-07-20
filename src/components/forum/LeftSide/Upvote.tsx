"use client";

import { Button } from "@/components/ui/button";
import postService from "@/services/PostService";
import Post from "@/types/Post";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "react-hot-toast";
import { BiUpvote } from "react-icons/bi";

type Props = {
  post: Post;
};

const Upvote = ({ post: { upvote, _id } }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();

  useEffect(() => {
    let toastId: string | undefined;
    if (isPending) {
      toastId = toast.loading("Loading...");
    } else if (toastId) {
      toast.dismiss(toastId);
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isPending]);

  const handleUpvote = async (id: string) => {
    const toastId = toast.loading("Upvote adding...");
    try {
      const { message } = await postService.upvotePost(id);
      startTransition(() => {
        refresh();
        toast.dismiss(toastId);
        toast.success(message);
      });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error((error as Error).message);
    }
  };

  return (
    <Button
      variant="outline"
      className="flex items-center font-medium text-lg gap-3 rounded-full"
      onClick={() => handleUpvote(_id)}
    >
      <BiUpvote className="text-xl" /> {upvote}
    </Button>
  );
};

export default Upvote;
