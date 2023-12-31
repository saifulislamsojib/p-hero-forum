"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Select, { Option } from "@/components/ui/select";
import { useUser } from "@/redux/hooks";
import postService from "@/services/PostService";
import Post from "@/types/Post";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsCameraVideo, BsCardImage } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

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
};

type Props = {
  setOpen: (value: boolean) => void;
  post?: Post;
};

type Preview = { src: string; lastModified?: number };

const CreatePostForm = ({ setOpen, post = {} as Post }: Props) => {
  const { name } = useUser().user;

  const { postBody, category, tags } = post;

  const [previews, setPreviews] = useState<Preview[]>(() => {
    if (post.imagesOrVideos) {
      return post.imagesOrVideos.map(({ src }) => ({ src }));
    }
    return [];
  });

  const [imagesVideos, setImagesVideos] = useState<File[]>([]);
  const [imagesOrVideos, setImagesOrVideos] = useState(
    post.imagesOrVideos || []
  );

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      category: category,
    },
  });

  const [selectedTags, setSelectedTags] = useState(tags || [tagsItems[0]]);
  const [categoryError, setCategoryError] = useState(false);

  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();
  const [selectResetKey, setSelectResetKey] = useState(1);

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

  const onSubmit: SubmitHandler<Inputs> = async ({ postBody, category }) => {
    if (!categoryError) {
      const toastId = toast.loading(post._id ? "Updating..." : "Posting...", {
        id: "Posting",
      });
      try {
        let resources = imagesOrVideos;
        if (imagesVideos.length) {
          const toastId = toast.loading("Uploading...", {
            id: "Uploading",
          });
          const promises = imagesVideos.map((file) => {
            const formData = new FormData();
            formData.append(
              "upload_preset",
              process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
            );
            formData.append("file", file);
            return postService.imageOrVideoUpload(formData);
          });
          const imageOrVideoData = await Promise.all(promises);
          resources = imageOrVideoData.map(
            ({
              secure_url,
              asset_id,
              width,
              height,
              format,
              resource_type,
            }) => ({
              asset_id,
              width,
              height,
              src: secure_url,
              format,
              resource_type,
            })
          );

          toast.dismiss(toastId);
        }

        let response: { message: string; isUpdated?: boolean };
        if (post._id) {
          response = await postService.updatePost(post._id, {
            postBody,
            category,
            imagesOrVideos: resources,
            tags: selectedTags,
          });
        } else {
          response = await postService.createPost({
            postBody,
            category,
            imagesOrVideos: resources,
            tags: selectedTags,
          });
        }
        setOpen(false);
        reset();
        setSelectResetKey((preKey) => preKey + 1);
        setSelectedTags(tags || [tagsItems[0]]);
        setImagesVideos([]);
        setImagesOrVideos([]);
        setPreviews([]);
        if ((post._id && response.isUpdated) || !post._id) {
          startTransition(() => {
            refresh();
            toast.dismiss(toastId);
            toast.success(response.message, { id: "Posted" });
          });
        } else {
          toast.dismiss(toastId);
          toast.error(response.message, { id: "NotPosted" });
        }
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error(post._id ? "Update failed" : "Posting failed!", {
          id: "NotPosted",
        });
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

  const handleImagePreview = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.length) return;
    const fileList = Array.from(files).map((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        const preview = {
          src: imageUrl as string,
          lastModified: file.lastModified,
        };
        setPreviews((pre) => [...pre, preview]);
      };

      reader.readAsDataURL(file);
      return file;
    });
    setImagesVideos(fileList);
  };

  const cancelImage = (image: Preview) => {
    setPreviews((pre) => pre.filter(({ src }) => src !== image.src));
    if (post.imagesOrVideos) {
      setImagesOrVideos((pre) => pre.filter(({ src }) => src !== image.src));
    }
    if (imagesVideos.length) {
      setImagesVideos((pre) =>
        pre.filter(({ lastModified }) => lastModified !== image.lastModified)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <Avatar className="cursor-pointer text-2xl">
          <AvatarImage alt="user" />
          <AvatarFallback>{name?.[0].toUpperCase()}</AvatarFallback>
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
      <div className="my-2 flex items-center gap-4">
        {previews.map((image, idx) => (
          <div key={idx} className="relative">
            <Image
              height={100}
              width={100}
              className="h-[100px] w-[100px] rounded object-cover border"
              src={image.src}
              alt="post preview"
            />
            <MdOutlineClose
              className="text-2xl cursor-pointer bg-slate-300 rounded-full p-1 w-6 h-6 absolute top-1 right-1"
              onClick={() => cancelImage(image)}
            />
          </div>
        ))}
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
            key={selectResetKey}
            isError={categoryError}
          />
        </div>
        <div className="w-full">
          <input
            onChange={handleImagePreview}
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
