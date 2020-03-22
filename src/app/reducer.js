import { theme } from "app/theme";

export const initialState = {
  menuOpen: false,
  currentTheme: theme.dark
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setTheme":
      return { ...state, currentTheme: action.value };
    default:
      throw new Error();
  }
};
