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
  fontStack: fontStack.join(", "),
  colorWhite: "rgba(255, 255, 255, 1)",
  colorBlack: "rgba(0, 0, 0, 1)"
};

const dark = {
  id: "dark",
  ...spacing,
  ...base,
  backgroundColor: "#131419",
  headingColor: base.colorWhite,
  textColor: "rgba(160,168,220,.7)",
  accentColor: "#e43333"
};

const light = {
  id: "light",
  ...spacing,
  ...base,
  backgroundColor: "rgba(242, 242, 242, 1)",
  headingColor: base.colorBlack,
  textColor: "rgba(160,168,220,.7)",
  accentColor: "#2B4A5C"
};

export const theme = { dark, light };
