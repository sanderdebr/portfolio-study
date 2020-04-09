import React, {
  Fragment,
  lazy,
  Suspense,
  useReducer,
  useEffect,
  createContext,
} from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  css,
  ThemeContext,
} from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Transition, TransitionGroup } from "react-transition-group";
import { theme } from "./theme";
import { useLocalStorage } from "../hooks";
import { initialState, reducer } from "./reducer";
import Header from "../components/Header";
import Cursor from "../components/Cursor";
import InriaLight from "../assets/fonts/InriaSans-Light.woff2";
import InriaRegular from "../assets/fonts/InriaSans-Regular.woff2";
import InriaBold from "../assets/fonts/InriaSans-Bold.woff2";
import Noise from "../assets/img/noise.jpg";
import isEdge from "../utils/isEdge";

export const fontStyles = `
@font-face {
  font-family: 'Inria';
  font-weight: 500;
  src: url(${InriaLight}) format('woff2');
  font-display: swap;
}
  @font-face {
    font-family: 'Inria';
    font-weight: 400;
    src: url(${InriaRegular}) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: 'Inria';
    font-weight: 500;
    src: url(${InriaBold}) format('woff2');
    font-display: swap;
  }
`;

const Home = lazy(() => import("../screens/Home"));

export const AppContext = createContext();
export const TransitionContext = createContext();
export const CursorContext = createContext();

const App = () => {
  console.log("rerender");
  const [storedTheme] = useLocalStorage("theme", "light");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentTheme } = state;

  useEffect(() => dispatch({ type: "setTheme", value: theme[storedTheme] }), [
    storedTheme,
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
  const location = useLocation();

  return (
    <Fragment>
      <Helmet>
        <link rel="preload" href={InriaLight} as="font" crossorigin="" />
        <link rel="preload" href={InriaRegular} as="font" crossorigin="" />
        <link rel="preload" href={InriaBold} as="font" crossorigin="" />
        <style>{fontStyles}</style>
      </Helmet>
      <GlobalStyles />
      {!isEdge && <Cursor />}
      <Header location={location} />
      <TransitionGroup
        component={AppMainContent}
        tabIndex={-1}
        id="MainContent"
        role="main"
      >
        <Transition timeout={300}>
          {(status) => (
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
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
    font-family: ${(props) => props.theme.fontStack};
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    border: 0;
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
    font-weight: 300;
    line-height: 1.7rem;
    scroll-behavior: smooth;
    &:after {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(${Noise});
      opacity: .025;
      z-index: 0;
    }
  }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    ::selection {
      background: ${(props) => props.theme.accentColor}; 
    }
    ::-moz-selection {
      background: ${(props) => props.theme.accentColor}; ;
    }
`;

const AppMainContent = styled.main`
  width: 100%;
  overflow-x: hidden;
  position: relative;
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

  ${(props) =>
    (props.status === "exiting" || props.status === "entering") &&
    css`
      opacity: 0;
    `}

  ${(props) =>
    props.status === "entered" &&
    css`
      transition-duration: 0.5s;
      transition-delay: 0.2s;
      opacity: 1;
    `}
`;
