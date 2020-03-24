const fontStack = [
  "Inter",
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

const base = {
  fontStack: fontStack.join(", ")
};

const dark = {
  id: "dark",
  ...base,
  colorBackground: "rgba(17, 17, 17, 1)"
};

const light = {
  id: "light",
  ...base,
  colorBackground: "rgba(242, 242, 242, 1)"
};

export const theme = { dark, light };
