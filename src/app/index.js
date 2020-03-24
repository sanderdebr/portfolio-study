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
import { Helmet, HelmetProvider } from "react-helmet-async";
import { theme } from "./theme";
import { useLocalStorage } from "../hooks";
import { initialState, reducer } from "./reducer";
import Header from "../components/Header";
import Nexa from "../assets/fonts/NexaLight.woff2";
import GothamBook from "../assets/fonts/gotham-book.woff2";

export const fontStyles = `
@font-face {
  font-family: 'Gotham';
  font-weight: 400;
  src: url(${GothamBook}) format('woff2');
  font-display: swap;
}
    @font-face {
      font-family: 'Nexa';
      font-weight: 500;
      src: url(${Nexa}) format('woff2');
      font-display: swap;
    }
`;

const Home = lazy(() => import("../screens/Home"));

const AppContext = createContext();

const App = () => {
  const [storedTheme] = useLocalStorage("theme", "dark");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentTheme } = state;

  useEffect(() => dispatch({ type: "setTheme", value: theme[storedTheme] }), [
    storedTheme
  ]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <AppContext.Provider value={{ ...state, dispatch }}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppContext.Provider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

const AppRoutes = () => {
  return (
    <Fragment>
      <Helmet>
        <link rel="preload" href={Nexa} as="font" crossorigin="" />
        <style>{fontStyles}</style>
      </Helmet>
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

export const GlobalStyles = createGlobalStyle`
    html,
    body {
      border: 0;
      margin: 0;
      box-sizing: border-box;
      width: 100vw;
      font-family: ${props => props.theme.fonts};
      font-weight: normal;
      -webkit-font-smoothing: antialiased;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
`;
