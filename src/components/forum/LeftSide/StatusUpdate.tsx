import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Select, { Option } from "@/components/ui/select";
import postService from "@/services/PostService";
import Post from "@/types/Post";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
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
].map((category) => ({
  value: category.toLowerCase().split(" ").join("-"),
  label: category,
}));

const statusList = [
  "Resolved",
  "Under investigation",
  "Unresolved",
  "Rejected",
].map((status) => ({
  value: status.toLowerCase(),
  label: status,
}));

const priorityList = ["High", "Medium", "Low"].map((priority) => ({
  value: priority,
  label: priority,
}));

const tagsItems = ["Help", "Feedback", "Github", "Deployment", "Es6", "React"];

type Props = {
  setOpen: (value: boolean) => void;
  post: Post;
};

type Inputs = Pick<Post, "category" | "status" | "note" | "priority">;

const StatusUpdate = ({ setOpen, post }: Props) => {
  const { category, tags, status, priority, note, _id } = post;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      category,
      status,
      priority,
      note,
    },
  });

  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();
  const [selectedTags, setSelectedTags] = useState(tags);

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

  const handleSelectChange = (
    option: unknown,
    type: "status" | "category" | "priority"
  ) => {
    const { value } = option as Option;
    console.log(type, value);
    setValue(type, value);
  };

  const handleCancel = () => {
    setOpen(false);
    reset();
    setValue("category", category);
    setValue("status", status);
    setValue("priority", priority);
    setSelectedTags(tags);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Status Updating...", {
      id: "Updating",
    });
    try {
      const response = await postService.updateAdminPost(_id, {
        ...data,
        tags: selectedTags,
      });
      setOpen(false);
      reset();
      setSelectedTags(tags);
      if (response.isUpdated) {
        startTransition(() => {
          refresh();
          toast.dismiss(toastId);
          toast.success(response.message, { id: "Posted" });
        });
      } else {
        setValue("category", category);
        setValue("status", status);
        setValue("priority", priority);
        toast.dismiss(toastId);
        toast.error(response.message, { id: "NotPosted" });
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Updating failed!", { id: "NotPosted" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4">
        <Select
          placeholder="Select a status"
          onChange={(value) => handleSelectChange(value, "status")}
          defaultValue={{
            value: status,
            label: `${status[0].toUpperCase()}${status.slice(1)}`,
          }}
          options={statusList}
          isSearchable={false}
        />
      </div>
      <div className="my-4">
        <Select
          placeholder="Select a priority"
          onChange={(value) => handleSelectChange(value, "priority")}
          defaultValue={{ value: priority, label: priority }}
          options={priorityList}
          isSearchable={false}
        />
      </div>
      <div className="my-4">
        <Select
          placeholder="Select a category"
          onChange={(value) => handleSelectChange(value, "category")}
          defaultValue={{
            value: category,
            label: categories.find((it) => it.value === category)?.label,
          }}
          options={categories}
          isSearchable={false}
        />
      </div>
      <div className="my-4">
        <textarea
          id="note"
          className={`focus:outline-none text-base w-full min-h-[12rem] resize-none border rounded-md p-1 ${
            errors.note ? "border-red-500" : "border-gray-500/30"
          }`}
          placeholder="Write your note."
          {...register("note", { required: true })}
          defaultValue={note}
        ></textarea>
      </div>
      <div className="my-4">
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
      <div className="flex items-center justify-between my-3">
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Update Status</Button>
      </div>
    </form>
  );
};

export default StatusUpdate;
