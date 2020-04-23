import React from "react";

import { ReactComponent as IconDribbble } from "../assets/icons/dribbble.svg";
import { ReactComponent as IconGithub } from "../assets/icons/github.svg";
import { ReactComponent as IconDev } from "../assets/icons/dev.svg";
import { ReactComponent as IconCodepen } from "../assets/icons/codepen.svg";
import { ReactComponent as IconMenu } from "../assets/icons/menu.svg";
import { ReactComponent as IconClose } from "../assets/icons/close.svg";
import { ReactComponent as RightArrow } from "../assets/icons/right-arrow.svg";

const icons = {
  dribbble: IconDribbble,
  github: IconGithub,
  dev: IconDev,
  codepen: IconCodepen,
  menu: IconMenu,
  close: IconClose,
  rightArrow: RightArrow,
};

const Icon = ({ icon, className }) => {
  const IconComponent = icons[icon];
  return <IconComponent className={className} />;
};

export default Icon;
