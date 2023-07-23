import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Comment from "@/types/Comment";
import User from "@/types/User";

type Props = {
  comment: Comment;
};

const SingleComment = ({ comment }: Props) => {
  const { text, sender } = comment;
  const { name } = sender as User;

  return (
    <div className="flex gap-2">
      <Avatar className="cursor-pointer text-lg">
        <AvatarImage alt="user" />
        <AvatarFallback>{name?.[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="bg-slate-200 p-3 rounded-md">
        <h4 className="font-medium text-base">{name}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default SingleComment;
