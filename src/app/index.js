import React, {
  Fragment,
  lazy,
  Suspense,
  useReducer,
  useEffect,
  createContext
} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { useLocalStorage } from "../hooks";
import { initialState, reducer } from "./reducer";
import Header from "../components/Header";
import NexaLight from "../assets/fonts/nexa-light.otf";
import NexaBold from "../assets/fonts/nexa-bold.otf";

const Home = lazy(() => import("../screens/Home"));

const AppContext = createContext();

const App = () => {
  const [storedTheme] = useLocalStorage("theme", "light");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentTheme } = state;

  useEffect(() => dispatch({ type: "setTheme", value: theme[storedTheme] }), [
    storedTheme
  ]);

  return (
    <ThemeProvider theme={currentTheme}>
      <AppContext.Provider value={{ ...state, dispatch }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

const AppRoutes = () => {
  return (
    <Fragment>
      <GlobalStyles />
      <Header />
      <Suspense fallback={<Fragment>Loading...</Fragment>}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default App;

export const fontStyles = `
    @font-face {
        font-family: 'Nexa';
        font-weight: normal;
        src: url(${NexaLight}) format('otf');
        font-display: swap;
    }
    @font-face {
        font-family: 'Nexa';
        font-weight: bold;
        src: url(${NexaBold}) format('otf');
        font-display: swap;
    }
`;

export const GlobalStyles = createGlobalStyle`
    html,
    body {
      border: 0;
      margin: 0;
      box-sizing: border-box;
      width: 100vw;
      font-family: ${props => props.theme.fontStack};
      font-weight: normal;
      -webkit-font-smoothing: antialiased;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
`;
