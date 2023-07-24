import User from "./User";

type ImagesOrVideo = {
  asset_id: string;
  width: `${number}` | number;
  height: `${number}` | number;
  src: string;
  format: string;
  resource_type: string;
  blurDataURL?: string;
  _id?: string;
};

export interface PostBody {
  postBody: string;
  tags: string[];
  category: string;
  imagesOrVideos: ImagesOrVideo[];
}

interface Post extends PostBody {
  _id: string;
  status:
    | "new"
    | "resolved"
    | "under investigation"
    | "unresolved"
    | "rejected";
  commentOff: boolean;
  commentOffBy?: "me" | "admin";
  createdAt: string;
  updatedAt: string;
  author: User;
  upvote: number;
  commentsCount: number;
  priority: "High" | "Medium" | "Low";
  note?: string;
}

export default Post;
