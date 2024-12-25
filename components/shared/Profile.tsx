import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateString } from "@/utils/helper";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

interface ProfileProps {
  onLogoutClick: () => void;
  onRedirectionClick: (location: string) => void;
}

const Profile: React.FC<ProfileProps> = ({
  onLogoutClick,
  onRedirectionClick,
}) => {
  const [userName, setUserName] = useState<string | null>();

  useEffect(() => {
    const userDataJson = localStorage.getItem("userData");
    if (userDataJson) {
      const userData = JSON.parse(userDataJson);
      setUserName(userData.name);
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-0 p-0 gap-1 text-base font-bold text-primary hover:text-primary"
        >
          Hello, {truncateString(userName)}{" "}
          <AccountCircleRoundedIcon color="primary" fontSize="large" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My User Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => onRedirectionClick("/profile")}
            disabled
          >
            <span>Profile Setting</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onRedirectionClick("/reset-password")}
          >
            <span>Reset Password</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem>
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem> */}
        {/* <DropdownMenuItem>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutClick}>
          <LogoutRoundedIcon />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
