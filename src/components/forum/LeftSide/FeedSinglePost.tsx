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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Post from "@/types/Post";
import dynamic from "next/dynamic";
import CommentBox from "./CommentBox";
import DropdownMenuItems from "./DropdownMenuItems";
import Upvote from "./Upvote";

const CommentModal = dynamic(() => import("./CommentModal"), { ssr: false });

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
    _id,
    commentOff,
  } = post;

  const length = imagesOrVideos?.length || 1;
  let grid = "";
  let sizes = "";

  if (length === 1) {
    grid = "grid-cols-1";
    sizes = "(max-width: 1024px) 100vw, 80vw";
  } else {
    grid = "grid-cols-2";
    sizes = "(max-width: 1024px) 50vw, 80vw";
  }

  return (
    <Card className="bg-slate-100 mb-5 shadow">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex items-start justify-between">
            <div className="flex gap-2">
              <Avatar className="cursor-pointer text-2xl">
                <AvatarImage alt="user" />
                <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
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
            <DropdownMenu modal={false}>
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
      {imagesOrVideos?.length > 0 && (
        <div className={cn(`grid gap-2 ${grid}`)}>
          {imagesOrVideos.map(({ src, width, height, _id }, idx) => (
            <div
              key={_id}
              className={`my-4${
                length - 1 === idx && length % 2 !== 0 ? " col-span-2" : ""
              }`}
            >
              <Image
                src={src}
                alt="post"
                width={width}
                height={height}
                className="mx-auto object-cover rounded w-full"
                placeholder="blur"
                sizes={
                  (length - 1 === idx && length % 2 !== 0) || length === 1
                    ? "(max-width: 1024px) 100vw, 80vw"
                    : "(max-width: 1024px) 50vw, 80vw"
                }
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACJAIkDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAAMEAgEGBf/EABoQAQEBAQEBAQAAAAAAAAAAAAACAQMREjH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD2YAAAAAAAAAAAAAAAAABm/wAS9FN/iXpoE0y7Ws+g+sAAAAAObrrFUDvruaV9NZQpgczfXRAAAADm75gF9NS9NP6al6aBda56zWueg+0AAAABmt8wmqb6UnqhWvp3KI+msoFU0Zm+ppo2aA0OZo9EdLumtom6AvpSa6M6UmuhGapn6YqnPpR6IAIocrfMdL6aBPSk9030pPdIrv07lEbTuUKrmjZpJNHTQKsp36IymvpUaqirp3aJuhGOlJrozpSbpSozVM/TFUz9CPWABGnNI6afX4m6aCfpqa9O6amvUVnddzS912dFUTp06mnTp0D81r0vNd9VHd0m9brSr0Qnpqbpp3TU3TVQutZ+nK1n1UezADLTN/iXoptN0BL0TWp6JrRS9dweOzgpknSVOHTgN46Mx1UYomzqJsRP0S9NU9EvRUIrWfXaZB7cAIrFpuiq03QEvTE9YpvCKwUrxqcHjc4DU4bOMzhs4DuY741mDcAqsIvFNYR0wRJ0SdFnVJ0BNTDdsg9uAAZr8T9FNfifoCa8IrFFk1gF+Nzjnjc4Dc4bOMThs4DuYNxvMc3AKrCOmKKwjoCPriTqt6o+qKlthu2Qe2ACo5v4RZ+/hFgnsmjrJoHGpZbkDJOkqTZBvHNdwaBdJ+iik/RFSdUfVb1R9QS2w3bKK//Z"
              />
            </div>
          ))}
        </div>
      )}
      <div className="mr-2 my-2 flex items-center justify-between">
        <CommentModal
          postId={_id}
          commentsCount={commentsCount}
          commentOff={commentOff}
        />
        <Upvote post={post} />
      </div>
      {!commentOff && <hr />}
      {!commentOff && (
        <CardFooter className="mt-3">
          <div className="flex w-full items-center gap-3">
            <Avatar className="cursor-pointer text-2xl">
              <AvatarImage alt="user" />
              <AvatarFallback>{name?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <CommentBox postId={_id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default FeedSinglePost;
