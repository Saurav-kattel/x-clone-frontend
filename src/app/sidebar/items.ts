import {
  IconDefinition,
  faBell,
  faGear,
  faHome,
  faSearch,
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
      name: "Search",
      path: "/search",
      icon: faSearch,
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
