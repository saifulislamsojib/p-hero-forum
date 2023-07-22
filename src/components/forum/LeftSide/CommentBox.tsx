"use client";

import { useUser } from "@/redux/hooks";
import commentService from "@/services/commentService";
import Comment from "@/types/Comment";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useTransition,
} from "react";
import { toast } from "react-hot-toast";

type Props = {
  postId: string;
  mainCommentId?: string;
  setComments?: Dispatch<SetStateAction<Comment[]>>;
};

const CommentBox = ({ postId, mainCommentId, setComments }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();
  const { user } = useUser();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const text = form.message.value;
    if (text && text.trim()) {
      const toastId = toast.loading("Commenting...", {
        id: "Posting",
      });
      try {
        const { message, comment } = await commentService.createComment({
          text,
          post: postId,
          mainCommentId,
        });
        comment.sender = { ...user };
        form.reset();
        setComments?.((preComments) => [...preComments, comment]);
        startTransition(() => {
          refresh();
          toast.dismiss(toastId);
          toast.success(message, { id: "Commented" });
        });
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("Comment failed", {
          id: "NotCommented",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        className="bg-slate-200 w-full py-2 px-4 rounded-full focus:outline-none"
        placeholder="Post your problems here"
        name="message"
      />
    </form>
  );
};

export default CommentBox;
