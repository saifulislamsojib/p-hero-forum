"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Select, { Option } from "@/components/ui/select";
import { useUser } from "@/redux/hooks";
import postService from "@/services/PostService";
import Post from "@/types/Post";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsCameraVideo, BsCardImage } from "react-icons/bs";

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
].map((category) => ({
  value: category.toLowerCase().split(" ").join("-"),
  label: category,
}));

const tagsItems = ["Help", "Feedback", "Github", "Deployment", "Es6", "React"];

type Inputs = {
  postBody: string;
  category: string;
  imagesOrVideos: string[];
};

type Props = {
  setOpen: (value: boolean) => void;
  post?: Post;
};

const CreatePostForm = ({ setOpen, post = {} as Post }: Props) => {
  const { name } = useUser().user;

  const { postBody, category, imagesOrVideos, tags } = post;

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      imagesOrVideos: imagesOrVideos || [],
    },
  });

  const [selectedTags, setSelectedTags] = useState(tags || [tagsItems[0]]);
  const [categoryError, setCategoryError] = useState(false);

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
      const toastId = toast.loading("Posting...", { id: "Posting..." });
      try {
        const { message } = await postService.createPost({
          postBody,
          category,
          imagesOrVideos,
          tags: selectedTags,
        });
        setOpen(false);
        startTransition(() => {
          refresh();
          toast.dismiss(toastId);
          toast.success(message, { id: "Posting..." });
        });
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("Posting failed!", { id: "Posting..." });
      }
    }
  };

  const handleSubmitClick = () => {
    if (!getValues("category")) {
      setCategoryError(true);
    }
  };

  const handleCategoryChange = (option: unknown) => {
    const { value } = option as Option;
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
        <Avatar className="cursor-pointer text-2xl">
          <AvatarImage alt="user" />
          <AvatarFallback>{name?.[0]}</AvatarFallback>
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
          defaultValue={postBody}
        ></textarea>
      </div>
      <div className="my-2 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        <div className="w-full">
          <Select
            placeholder="Select a category"
            onChange={handleCategoryChange}
            defaultValue={
              category
                ? {
                    value: category,
                    label: categories.find((it) => it.value === category)
                      ?.label,
                  }
                : undefined
            }
            options={categories}
            menuPlacement="top"
            isSearchable={false}
          />
        </div>
        <div className="w-full">
          <input
            onChange={handleImageUpload}
            type="file"
            multiple
            className="hidden"
            id="upload"
          />

          <Button asChild variant="outline" type="button">
            <label htmlFor="upload" className="cursor-pointer w-full">
              Upload <BsCardImage className="text-xl mx-1 sm:mx-2" /> /
              <BsCameraVideo className="text-xl ms-1 sm:ms-2" />
            </label>
          </Button>
        </div>
      </div>
      <div>
        <Label>Select tags: </Label>
        <div className="flex flex-wrap text-sm items-center gap-3 mt-1">
          {tagsItems.map((tag) => (
            <span
              key={tag}
              onClick={() => handleTagsClick(tag)}
              className={`border rounded-md p-1 px-2 cursor-pointer select-none transition-all${
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
        {postBody ? "Update Post" : "Post"}
      </Button>
    </form>
  );
};

export default CreatePostForm;
