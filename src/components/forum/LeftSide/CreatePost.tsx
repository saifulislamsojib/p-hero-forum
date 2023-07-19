"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { LiaPenAltSolid } from "react-icons/lia";
import CreatePostForm from "./CreatePostForm";

const CreatePost = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Card className="bg-slate-100 pt-8">
        <CardContent>
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex items-center gap-5">
              <Avatar className="cursor-pointer">
                <AvatarImage alt="user" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <DialogTrigger asChild>
                <input
                  type="text"
                  className="bg-slate-200 w-full py-2 px-4 rounded-full focus:outline-none cursor-pointer hover:bg-slate-300"
                  placeholder="Post your problems here"
                  readOnly
                />
              </DialogTrigger>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center text-xl gap-4">
                <AiOutlineCamera className="cursor-pointer" />
                <CiImageOn className="cursor-pointer" />
              </div>
              <div className="flex items-center">
                <Button variant="link">
                  <LiaPenAltSolid className="text-xl" /> Draft
                </Button>
                <DialogTrigger asChild>
                  <Button>Create Post</Button>
                </DialogTrigger>
              </div>
            </div>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-center border-b pb-4">
                  Create post
                </DialogTitle>
              </DialogHeader>
              <CreatePostForm setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
