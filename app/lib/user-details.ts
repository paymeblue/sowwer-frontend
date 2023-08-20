import capitalizeFirstLetters from "@lib/capitalize";
import { User } from "@store/types";

export const generateAvatar = (name: string) => {
  const avatarChars = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase());
  return avatarChars.join("");
};

const userDetails = (user: User | null) => {
  const formattedName = user?.firstName + " " + user?.lastName;
  const name = capitalizeFirstLetters(formattedName);
  const email = user?.email;
  const avatar = generateAvatar(name);
  return { name, email, avatar };
};
export default userDetails;
