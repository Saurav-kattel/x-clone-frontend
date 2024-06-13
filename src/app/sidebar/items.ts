import {
  IconDefinition,
  faBell,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const items: {
  name: string;
  path: string;
  icon: IconDefinition;
}[] = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "Notification",
      path: "/notification",
      icon: faBell,
    },
    {
      name: "Profile",
      path: "/user/profile",
      icon: faUser,
    },
  ];
