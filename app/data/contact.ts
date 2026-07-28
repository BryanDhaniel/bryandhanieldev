import type { IconType } from "react-icons";
import {
  PiGithubLogoBold,
  PiInstagramLogoBold,
  PiLinkedinLogoBold,
  PiYoutubeLogoBold,
} from "react-icons/pi";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
  color: string;
};

export const contactEmail = "bryandhaniel123@gmail.com";

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/BryanDhaniel",
    icon: PiGithubLogoBold,
    color: "#f4f1eb",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bryan-dhaniel-5b8953258/",
    icon: PiLinkedinLogoBold,
    color: "#00ffc6",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bryandhaniel/",
    icon: PiInstagramLogoBold,
    color: "#ff3366",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCqJwyxrh9hD2FuCREEgVhCg",
    icon: PiYoutubeLogoBold,
    color: "#d7ff54",
  },
];
