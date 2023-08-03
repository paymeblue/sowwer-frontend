import { User } from "@store/services/auth";

const generateAvatar = (name: string) => {
  const avatarChars = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase());
  return avatarChars.join("");
};

const userDetails = (user: User | null) => {
  const name = user?.firstName + " " + user?.lastName;
  const email = user?.email;
  const avatar = generateAvatar(name);
  return { name, email, avatar };
};
export default userDetails;
