import Post from "./Post";
import User from "./User";

interface Comment {
  _id: string;
  text: string;
  post: string | Post;
  sender: string | User;
  mainCommentId?: string;
}

export default Comment;
