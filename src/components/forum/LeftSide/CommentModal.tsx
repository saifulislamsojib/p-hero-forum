"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useUser } from "@/redux/hooks";
import commentService from "@/services/commentService";
import Comment from "@/types/Comment";
import { useMemo, useState } from "react";
import { TbMessage } from "react-icons/tb";
import CommentBox from "./CommentBox";
import SingleComment from "./SingleComment";

type Props = {
  commentsCount: number;
  postId: string;
  commentOff: boolean;
};

const CommentModal = ({ commentsCount, postId, commentOff }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const onClose = () => {
    setComments([]);
    setLoading(true);
  };

  const parentsComments = useMemo(
    () => comments.filter((comment) => !comment.mainCommentId),
    [comments]
  );

  const handleShowComments = async (postId: string) => {
    setOpen(true);
    try {
      const result = await commentService.getCommentsByPostId(postId);
      setComments(result.comments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const [open, setOpen] = useState(false);
  const { name } = useUser().user;

  return (
    <>
      <Button
        variant="link"
        className="flex items-center font-medium text-md gap-2"
        onClick={() => handleShowComments(postId)}
      >
        <TbMessage className="text-lg" /> {commentsCount} Comments
      </Button>
      <Modal
        open={open}
        setOpen={setOpen}
        heading="All Comment's"
        onClose={onClose}
      >
        <div>
          <div className="text-center my-5 text-muted text-gray-500">
            {loading && <h3>Loading...</h3>}
            {!loading && comments.length === 0 && <h3>No Comments Founds</h3>}
          </div>
          {!loading && (
            <div className="flex flex-col gap-3 mb-3">
              {parentsComments.map((comment) => (
                <SingleComment key={comment._id} comment={comment} />
              ))}
            </div>
          )}
          {!commentOff && (
            <div className="flex w-full items-center gap-3">
              <Avatar className="cursor-pointer text-2xl">
                <AvatarImage alt="user" />
                <AvatarFallback>{name?.[0] || "S"}</AvatarFallback>
              </Avatar>
              <CommentBox postId={postId} setComments={setComments} />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CommentModal;
