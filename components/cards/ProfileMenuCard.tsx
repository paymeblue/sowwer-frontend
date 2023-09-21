import { Avatar, AvatarFallback } from "@components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { ChevronDown } from "react-iconly";

const ProfileMenuCard = () => {
  return (
    <DropdownMenu>
      <div className="w-fit">
        <DropdownMenuTrigger asChild className="w-fit">
          <div className="flex cursor-pointer items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>SY</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0">
                <h5 className="text_small_body_sb text-[.8rem]">
                  Semira Yesufu
                </h5>
                <span className="text_tiny_body_r">ysemiraefe@gmail.com</span>
              </div>
            </div>

            <ChevronDown size={14} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[10rem]">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href="/donor/settings">
              <span className="font-body">Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <Link href="/">
              <span className="cursor-pointer font-body">Log out</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default ProfileMenuCard;
