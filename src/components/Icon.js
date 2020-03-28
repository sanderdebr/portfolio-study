import React from "react";

import { ReactComponent as IconDribbble } from "../assets/icons/dribbble.svg";
import { ReactComponent as IconGithub } from "../assets/icons/github.svg";
import { ReactComponent as IconDev } from "../assets/icons/dev.svg";
import { ReactComponent as IconCodepen } from "../assets/icons/codepen.svg";

const icons = {
  dribbble: IconDribbble,
  github: IconGithub,
  dev: IconDev,
  codepen: IconCodepen
};

const Icon = ({ icon, className }) => {
  const IconComponent = icons[icon];
  return <IconComponent className={className} />;
};

export default Icon;
