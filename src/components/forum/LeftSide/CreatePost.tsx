"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { useUser } from "@/redux/hooks";
import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { LiaPenAltSolid } from "react-icons/lia";
import CreatePostForm from "./CreatePostForm";

const CreatePost = () => {
  const { name } = useUser().user;

  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="bg-slate-100 pt-5 shadow">
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="cursor-pointer text-2xl">
              <AvatarImage alt="user" />
              <AvatarFallback>{name?.[0] || "S"}</AvatarFallback>
            </Avatar>
            <input
              type="text"
              className="bg-slate-200 w-full py-2 px-4 rounded-full focus:outline-none cursor-pointer hover:bg-slate-300"
              placeholder="Post your problems here"
              readOnly
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center text-xl gap-4">
              <AiOutlineCamera
                className="cursor-pointer"
                onClick={() => setOpen(true)}
              />
              <CiImageOn
                className="cursor-pointer"
                onClick={() => setOpen(true)}
              />
            </div>
            <div className="flex items-center">
              <Button variant="link">
                <LiaPenAltSolid className="text-xl" /> Draft
              </Button>
              <Button onClick={() => setOpen(true)}>Create Post</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Modal open={open} setOpen={setOpen} heading="Create Post">
        <CreatePostForm setOpen={setOpen} />
      </Modal>
    </>
  );
};

export default CreatePost;
