import React, {
  Fragment,
  lazy,
  Suspense,
  useReducer,
  useEffect,
  createContext
} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Transition, TransitionGroup } from "react-transition-group";
import { theme } from "./theme";
import { useLocalStorage } from "../hooks";
import { initialState, reducer } from "./reducer";
import Header from "../components/Header";
import Nexa from "../assets/fonts/NexaLight.woff2";
import GothamBook from "../assets/fonts/gotham-book.woff2";

export const fontStyles = `
  @font-face {
    font-family: 'GothamBook';
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
const TransitionContext = createContext();

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
        <link rel="preload" href={GothamBook} as="font" crossorigin="" />
        <style>{fontStyles}</style>
      </Helmet>
      <GlobalStyles />
      <Header />
      <TransitionGroup
        component={AppMainContent}
        tabIndex={-1}
        id="MainContent"
        role="main"
      >
        <Transition timeout={300}>
          {status => (
            <TransitionContext.Provider value={{ status }}>
              <AppPage status={status}>
                <Suspense fallback={<Fragment>Loading...</Fragment>}>
                  <Switch>
                    <Route exact path="/" component={Home} />
                  </Switch>
                </Suspense>
              </AppPage>
            </TransitionContext.Provider>
          )}
        </Transition>
      </TransitionGroup>
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

const AppMainContent = styled.main`
  font-family: ${props => props.theme.fonts};
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background: ${props => props.theme.backgroundColor};
  transition: background 0.4s ease;
  outline: none;
  display: grid;
  grid-template-columns: 100%;
`;

const AppPage = styled.div`
  overflow-x: hidden;
  opacity: 0;
  grid-column: 1;
  grid-row: 1;
  transition: opacity 0.3s ease;
`;
