import isEdge from "../utils/isEdge";

const fontStack = [
  "Inria",
  "Heebo",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "San Francisco",
  "Roboto",
  "Segoe UI",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Helvetica Neue",
  "sans-serif",
];

const spacing = {
  spacingGutter: 20,
  spacingOuter: {
    desktop: 60,
    tablet: 40,
    mobile: 30,
  },
};

const media = {
  desktop: 1600,
  laptop: 1280,
  tablet: 1024,
  mobile: 696,
  mobileLS: `(max-width: 820px) and (max-height: 420px)`,
};

const base = {
  curveFastoutSlowin: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  easeInOutBack: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  clipPath: (size = 8) => `circle(50% at 50% 50%);`,
  easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  fontStack: fontStack.join(", "),
  colorWhite: "rgb(255, 255, 255)",
  colorBlack: "rgb(0, 0, 0)",
  maxWidthDesktop: 1600,
  maxWidthLaptop: 1000,
  isEdge,
};

const dark = {
  id: "dark",
  ...media,
  ...spacing,
  ...base,
  backgroundColor: "#09091f",
  headingColor: base.colorWhite,
  textColor: "#999",
  accentColor: "rgb(211, 0, 105)",
};

const light = {
  id: "light",
  ...media,
  ...spacing,
  ...base,
  backgroundColor: "rgb(255, 255, 255)",
  headingColor: base.colorBlack,
  textColor: "#999",
  accentColor: "rgb(211, 0, 105)",
};

export const theme = { dark, light };
