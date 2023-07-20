import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import moment from "moment";
import Image from "next/image";
import { BsBookmark, BsThreeDotsVertical } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { MdBatchPrediction, MdOutlineDateRange } from "react-icons/md";
import { TbMessage } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Post from "@/types/Post";
import CommentBox from "./CommentBox";
import DropdownMenuItems from "./DropdownMenuItems";
import Upvote from "./Upvote";

type Props = {
  post: Post;
};

const FeedSinglePost = ({ post }: Props) => {
  const {
    author: { name, batch },
    createdAt,
    status,
    postBody,
    imagesOrVideos,
    commentsCount,
    priority,
    upvote,
  } = post;

  return (
    <Card className="bg-slate-100 mb-5">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex items-start justify-between">
            <div className="flex gap-2">
              <Avatar className="cursor-pointer text-2xl">
                <AvatarImage alt="user" />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="scroll-m-20 text-md font-medium tracking-tight">
                  {name}
                </h4>
                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                  <div className="flex gap-1 items-center">
                    <FiClock />
                    <span>{moment(createdAt).startOf("hour").fromNow()}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <MdOutlineDateRange />
                    <span>{moment(createdAt).format("D.MM.YY")}</span>
                  </div>
                  <div className="gap-1 items-center hidden sm:flex">
                    <MdBatchPrediction />
                    <span>{batch?.split("-").join(" ")}</span>
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none sm:hidden">
                <BsThreeDotsVertical className="text-lg cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={10} align="end" className="p-3">
                <DropdownMenuItems post={post} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-between items-start md:items-center gap-2">
            <div className="flex items-center flex-row-reverse gap-2">
              <Badge variant={status.includes("new") ? "accent" : "outline"}>
                {status}
              </Badge>
              <Badge className="text-xs">{priority}</Badge>
              <div className="gap-1 items-center flex sm:hidden text-sm text-muted-foreground">
                <MdBatchPrediction />
                <span>{batch?.split("-").join(" ")}</span>
              </div>
            </div>
            <BsBookmark className="text-lg cursor-pointer" />
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none hidden sm:block">
                <BsThreeDotsVertical className="text-lg cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={10} align="end" className="p-3">
                <DropdownMenuItems post={post} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{postBody}</p>
      </CardContent>
      {imagesOrVideos.length > 0 && (
        <Image
          src={imagesOrVideos[0]}
          alt="post"
          width={500}
          height={700}
          className="my-4 max-w-[700] max-h-[700px] mx-auto object-cover"
          // placeholder="blur"
          // blurDataURL=""
        />
      )}
      <div className="m-2 flex items-center justify-between">
        <Button
          variant="link"
          className="flex items-center font-medium text-lg gap-3"
        >
          <TbMessage className="text-xl" /> {commentsCount} Comments
        </Button>
        <Upvote post={post} />
      </div>
      <hr />
      <CardFooter className="mt-3">
        <div className="flex w-full items-center gap-3">
          <Avatar className="cursor-pointer text-2xl">
            <AvatarImage alt="user" />
            <AvatarFallback>{name?.[0] || "S"}</AvatarFallback>
          </Avatar>
          <CommentBox />
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedSinglePost;
