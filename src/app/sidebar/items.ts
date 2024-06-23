import {
  IconDefinition,
  faBell,
  faGear,
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
      path: "/tweets",
      icon: faHome,
    },
    {
      name: "Notification",
      path: "/notification",
      icon: faBell,
    }, {
      name: "Profile",
      path: "/user/",
      icon: faUser,
    },
    {
      name: "More",
      path: "/more",
      icon: faGear,
    },

  ];
