"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/redux/hooks";
import postService from "@/services/PostService";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const categories = [
  "Github",
  "Deployment",
  "Html & Css",
  "Javascript(problem-solving)",
  "Javascript(DOM)",
  "JavaScript(es6)",
  "JavaScript(API)",
  "React(core-concept)",
  "React Router",
  "Firebase Authentication",
  "Node(Express)",
  "Mongodb",
  "SCIC",
  "ACC",
  "Other",
];

const tags = ["Help", "Feedback", "Github", "Deployment", "Es6", "React"];

type Inputs = {
  postBody: string;
  category: string;
  imagesOrVideos: string[];
};

type Props = {
  setOpen: (value: boolean) => void;
};

const CreatePostForm = ({ setOpen }: Props) => {
  const { name } = useUser().user;

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      imagesOrVideos: [],
    },
  });

  const [selectedTags, setSelectedTags] = useState([tags[0]]);
  const [categoryError, setCategoryError] = useState(false);

  const handleTagsClick = (tag: string) => {
    setSelectedTags((preTags) => {
      if (preTags.includes(tag)) {
        return preTags.filter((preTag) => preTag !== tag);
      }
      return [...preTags, tag];
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async ({
    postBody,
    category,
    imagesOrVideos,
  }) => {
    if (!categoryError) {
      const toastId = toast.loading("Posting...");
      try {
        const { message } = await postService.createPost({
          postBody,
          category,
          imagesOrVideos,
          tags,
        });
        toast.dismiss(toastId);
        toast.success(message);
        setOpen(false);
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("Posting failed!");
      }
    }
  };

  const handleSubmitClick = () => {
    if (!getValues("category")) {
      setCategoryError(true);
    }
  };

  const handleCategoryChange = (value: string) => {
    setValue("category", value);
    setCategoryError(false);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const toastId = toast.loading("Uploading...");
    try {
      const promises = Array.from(e.target.files).map((file) => {
        const formData = new FormData();
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
        );
        formData.append("file", file);
        return postService.imageOrVideoUpload(formData);
      });
      const imageOrVideoData = await Promise.all(promises);
      toast.dismiss(toastId);
      toast.success("Uploaded  successfully!");
      const urls = imageOrVideoData.map(({ secure_url }) => secure_url);
      setValue("imagesOrVideos", urls);
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.success("Not Uploaded!");
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <Avatar className="cursor-pointer">
          <AvatarImage alt="user" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <h4 className="scroll-m-20 text-md font-medium tracking-tight">
          {name}
        </h4>
      </div>
      <div className="mt-3">
        <textarea
          id="postBody"
          className={`focus:outline-none text-lg w-full min-h-[12rem] resize-none border rounded-md p-1 ${
            errors.postBody ? "border-red-500" : "border-transparent"
          }`}
          placeholder="Write your problems in details here..."
          {...register("postBody", { required: true })}
        ></textarea>
      </div>
      <div className="my-2 flex items-center justify-between gap-3">
        <div className="w-full">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger
              id="category"
              className={
                categoryError
                  ? "border border-destructive focus:border-destructive"
                  : ""
              }
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent position="popper">
              {categories.map((category) => {
                const value = category.toLowerCase().split(" ").join("-");
                return (
                  <SelectItem value={value} key={value}>
                    {category}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-max">
          <input
            onChange={handleImageUpload}
            type="file"
            multiple
            className="hidden"
            id="upload"
          />

          <Button asChild variant="outline" type="button">
            <label htmlFor="upload" className="cursor-pointer">
              Upload Images / Videos
            </label>
          </Button>
        </div>
      </div>
      <div>
        <Label>Select tags: </Label>
        <div className="flex flex-wrap text-sm items-center gap-3 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => handleTagsClick(tag)}
              className={`border rounded-md p-1 px-2 cursor-pointer select-none${
                selectedTags.includes(tag)
                  ? " bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Button onClick={handleSubmitClick} type="submit" className="w-full mt-3">
        Post
      </Button>
    </form>
  );
};

export default CreatePostForm;
