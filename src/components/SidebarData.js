import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Game",
    path: "/",
    icon: <IoIcons.IoLogoGameControllerB />,
    className: "nav-text",
  },
  {
    title: "Stats",
    path: "/stats",
    icon: <IoIcons.IoIosStats />,
    className: "nav-text",
  },
];
