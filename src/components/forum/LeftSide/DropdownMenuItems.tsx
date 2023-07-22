"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/modal";
import { useUser } from "@/redux/hooks";
import postService from "@/services/PostService";
import Post from "@/types/Post";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import CreatePostForm from "./CreatePostForm";
import StatusUpdate from "./StatusUpdate";

type Props = {
  post: Post;
};

const DropdownMenuItems = ({ post }: Props) => {
  const { role, _id } = useUser().user;
  const { status, author, commentOff } = post;
  const isMe = author._id === _id;
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
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
      {(isMe || role === "admin") && (
        <>
          {isMe && (
            <div
              className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              onClick={() => {
                setOpen(true);
                setIsStatus(false);
              }}
            >
              Edit post
            </div>
          )}
          {role === "admin" && (
            <div
              className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              onClick={() => {
                setOpen(true);
                setIsStatus(true);
              }}
            >
              Update Status
            </div>
          )}
          <Modal
            open={open}
            setOpen={setOpen}
            heading={isStatus ? "Status Update" : "Edit post"}
          >
            {isStatus ? (
              <StatusUpdate setOpen={setOpen} post={post} />
            ) : (
              <CreatePostForm setOpen={setOpen} post={post} />
            )}
          </Modal>
        </>
      )}
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
