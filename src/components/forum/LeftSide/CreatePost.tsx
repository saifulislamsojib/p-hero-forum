import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AiOutlineCamera } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { LiaPenAltSolid } from "react-icons/lia";

const CreatePost = () => {
  return (
    <div>
      <Card className="bg-slate-200 pt-8">
        <CardContent>
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer">
              <AvatarImage alt="user" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <input
              type="text"
              className="bg-slate-300 w-full py-2 px-4 rounded-full focus:outline-none"
              placeholder="Post your problems here"
            />
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center text-xl gap-4">
              <AiOutlineCamera />
              <CiImageOn />
            </div>
            <div className="flex items-center">
              <Button variant="link">
                <LiaPenAltSolid className="text-xl" /> Draft
              </Button>
              <Button>Create Post</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
