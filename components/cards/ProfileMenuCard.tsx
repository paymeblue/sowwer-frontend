import { Avatar, AvatarFallback } from "@components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import useUserAuth from "@hooks/auth/useUserAuth";
import { LogOut, Settings } from "lucide-react";
import { ChevronDown, User } from "react-iconly";
import { useRouter } from "next/navigation";

interface Props {
  variant?: "donor" | "landing" | "ministry";
  onMenuClick?: () => void;
}

const ProfileMenuCard = ({ variant = "landing", onMenuClick }: Props) => {
  const { user, isAuthenticated, logout, context } = useUserAuth();
  const router = useRouter();

  if (!isAuthenticated || !user) {
    return (
      <p className="text_small_body_r">
        Already have an account?{" "}
        <span className="cursor-pointer font-[500] text-accent transition-all duration-200 hover:underline">
          Sign in
        </span>{" "}
      </p>
    );
  }

  const getAccountUrl = () => {
    if (context === "donor") return "/donor";
    if (context === "ministry") return "/ministry";
    return "/";
  };

  const { firstName, lastName, email } = user;
  return (
    <DropdownMenu>
      <div className="w-fit">
        <DropdownMenuTrigger asChild className="w-fit">
          <div className="flex cursor-pointer items-center space-x-4 max-lg:w-full max-lg:justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>{`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0">
                <h5 className="text_small_body_sb text-[.8rem] capitalize">
                  {firstName} {lastName}
                </h5>
                <span className="text_tiny_body_r max-lg:hidden">{email}</span>
              </div>
            </div>

            <ChevronDown size={14} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[10rem]">
          {variant === "donor" && (
            <div
              onClick={() => {
                if (onMenuClick) {
                  onMenuClick();
                }
                router.push("/donor/settings");
              }}
            >
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span className="font-body">Settings</span>
              </DropdownMenuItem>
            </div>
          )}
          {variant === "landing" && (
            <div
              onClick={() => {
                if (onMenuClick) {
                  onMenuClick();
                }
                router.push(getAccountUrl());
              }}
            >
              <DropdownMenuItem>
                <div className="mr-2">
                  <User size={18} />
                </div>
                <span className="font-body">Go to account</span>
              </DropdownMenuItem>
            </div>
          )}
          <DropdownMenuItem
            onClick={() => {
              if (onMenuClick) {
                onMenuClick();
              }
              logout();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="cursor-pointer font-body">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default ProfileMenuCard;
