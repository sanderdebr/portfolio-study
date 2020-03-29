import rgba from "../helpers/rgba";

const fontStack = [
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
  "sans-serif"
];

const spacing = {
  spacingGutter: 20,
  spacingOuter: {
    desktop: 60,
    tablet: 40,
    mobile: 20
  }
};

const media = {
  desktop: 1600,
  laptop: 1280,
  tablet: 1024,
  mobile: 696,
  mobileLS: `(max-width: 820px) and (max-height: 420px)`
};

const base = {
  curveFastoutSlowin: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  clipPath: (size = 8) =>
    `polygon(0 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%)`,
  easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  fontStack: fontStack.join(", "),
  colorWhite: "rgb(255, 255, 255)",
  colorBlack: "rgb(0, 0, 0)"
};

const dark = {
  id: "dark",
  ...media,
  ...spacing,
  ...base,
  backgroundColor: "rgb(18, 32, 54)",
  headingColor: base.colorWhite,
  textColor: "rgb(160,168,220)",
  accentColor: "rgb(211, 0, 105)"
};

const light = {
  id: "light",
  ...spacing,
  ...base,
  backgroundColor: "rgb(242, 242, 242)",
  headingColor: base.colorBlack,
  textColor: "rgb(160,168,220)",
  accentColor: "rgb(211, 0, 105)"
};

export const theme = { dark, light };
