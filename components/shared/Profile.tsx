import { useRouter } from "next/navigation";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useUser } from "@/hooks/UserContext";
import { truncateString } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { URL_CONSTANTS } from "@/constants";
import * as configJSON from "@/constants/configJson";

const Profile = () => {
  const { userData } = useUser();

  const router = useRouter();

  const onLogoutClick = () => {
    localStorage.clear();
    router.push(URL_CONSTANTS.LOGIN);
  };

  const onRedirectionClick = (location: string) => {
    router.push(location);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-0 p-0 gap-1 text-base font-bold text-primary hover:text-primary"
        >
          {configJSON.hello}, {truncateString(userData.name)}
          {userData.profileImage ? (
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-9 h-9 rounded-full"
            />
          ) : (
            <AccountCircleRoundedIcon color="primary" fontSize="large" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{configJSON.myUserAccount}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => onRedirectionClick(URL_CONSTANTS.PROFILE)}
          >
            <span>{configJSON.profileSetting}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onRedirectionClick(URL_CONSTANTS.RESET_PASSWORD)}
          >
            <span>{configJSON.resetPassword}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutClick}>
          <LogoutRoundedIcon />
          <span>{configJSON.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
