"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUser } from "@/redux/hooks";
import postService from "@/services/PostService";
import Post from "@/types/Post";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "react-hot-toast";

type Props = {
  post: Post;
};

const DropdownMenuItems = ({ post }: Props) => {
  const { role, _id } = useUser().user;
  const { status, author, commentOff } = post;
  const isMe = author._id === _id;

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

  const handleResolvePost = async (id: string) => {
    const toastId = toast.loading("Resolving the post...");
    try {
      await postService.updateStatusPost(id, { status: "resolved" });
      startTransition(() => {
        refresh();
        toast.dismiss(toastId);
        toast.success("Post resolved successfully");
      });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error((error as Error).message);
    }
  };
  const handleDeletePost = async (id: string) => {
    const toastId = toast.loading("Deleting the post...");
    try {
      const { deletedCount, message } = await postService.deletePost(id);
      if (deletedCount) {
        startTransition(() => {
          refresh();
          toast.dismiss(toastId);
          toast.success(message);
        });
      } else {
        toast.dismiss(toastId);
        toast.error(message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error((error as Error).message);
    }
  };
  const handleTurnOffComments = async (id: string, commentOff: boolean) => {
    const toastId = toast.loading(
      commentOff ? "Turning off comments..." : "Turning on comments..."
    );
    try {
      await postService.commentOfPost(id, { commentOff });
      toast.dismiss(toastId);
      startTransition(() => {
        refresh();
        toast.dismiss(toastId);
        toast.success(
          commentOff ? "Turned off comments" : "Turned on comments"
        );
      });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      {isMe && role === "user" && status === "new" && (
        <DropdownMenuItem onClick={() => handleResolvePost(post._id)}>
          Resolve the post
        </DropdownMenuItem>
      )}
      {isMe && <DropdownMenuItem>Edit post</DropdownMenuItem>}
      {role === "admin" && <DropdownMenuItem>Update Status</DropdownMenuItem>}
      {(isMe || role === "admin") && (
        <DropdownMenuItem onClick={() => handleDeletePost(post._id)}>
          Delete post
        </DropdownMenuItem>
      )}
      {(isMe || role === "admin") && (
        <DropdownMenuItem
          onClick={() => handleTurnOffComments(post._id, !commentOff)}
        >
          {commentOff ? "Turn On comments" : "Turn Off comments"}
        </DropdownMenuItem>
      )}
      {role === "admin" && <DropdownMenuItem>Pin to the top</DropdownMenuItem>}
      {role === "admin" && (
        <DropdownMenuItem>View student&apos;s details</DropdownMenuItem>
      )}
      {role === "admin" && (
        <DropdownMenuItem>See the user&apos;s all posts</DropdownMenuItem>
      )}
      <DropdownMenuItem>Copy the post</DropdownMenuItem>
      {!isMe && role === "user" && <DropdownMenuItem>Report</DropdownMenuItem>}
    </>
  );
};

export default DropdownMenuItems;
