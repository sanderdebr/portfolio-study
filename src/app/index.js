import React, {
  Fragment,
  lazy,
  Suspense,
  useReducer,
  useEffect,
  createContext,
  useState,
  useRef,
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
import { useLocalStorage, useAppContext } from "../hooks";
import { initialState, reducer } from "./reducer";
import Header from "../components/Header";
import Cursor from "../components/Cursor";
import InriaLight from "../assets/fonts/InriaSans-Light.woff2";
import InriaRegular from "../assets/fonts/InriaSans-Regular.woff2";
import InriaBold from "../assets/fonts/InriaSans-Bold.woff2";
import Noise from "../assets/img/noise.png";
import isEdge from "../utils/isEdge";
import { rgba } from "../utils/style";
import Scrollbar from "smooth-scrollbar";

export const fontStyles = `
@font-face {
  font-family: 'Inria';
  font-weight: 300;
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

  // Theme and pullball check localStorage
  const [storedTheme] = useLocalStorage("theme", "dark");
  const [storedPulled] = useLocalStorage("pulled");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentTheme } = state;

  useEffect(() => dispatch({ type: "setTheme", value: theme[storedTheme] }), [
    storedTheme,
  ]);

  useEffect(
    () => dispatch({ type: "setPulled", value: storedPulled === "true" }),
    [storedPulled]
  );

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
  const { pulled } = useAppContext();
  const scrollArea = useRef();

  useEffect(() => {
    // Add smooth scroll
    Scrollbar.init(scrollArea.current, { damping: 0.1, renderByPixels: true });
  }, []);

  return (
    <>
      <Helmet>
        <link rel="preload" href={InriaLight} as="font" crossorigin="" />
        <link rel="preload" href={InriaRegular} as="font" crossorigin="" />
        <link rel="preload" href={InriaBold} as="font" crossorigin="" />
        <style>{fontStyles}</style>
      </Helmet>
      <GlobalStyles pulled={pulled} />
      {!isEdge && <Cursor />}
      <Header location={location} />
      <ScrollArea ref={scrollArea}>
        <TransitionGroup
          component={AppMainContent}
          tabIndex={-1}
          id="MainContent"
          role="main"
          data-scrollbar
        >
          <Transition timeout={300}>
            {(status) => (
              <TransitionContext.Provider value={{ status }}>
                <AppPage status={status}>
                  <Suspense fallback={<Fragment></Fragment>}>
                    <Switch>
                      <Route exact path="/" component={Home} />
                    </Switch>
                  </Suspense>
                </AppPage>
              </TransitionContext.Provider>
            )}
          </Transition>
        </TransitionGroup>
      </ScrollArea>
    </>
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
    overflow-y: ${(props) => (props.pulled ? "visible" : "hidden")} ;
    background-image: url(${Noise});

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: ${(props) => props.theme.backgroundColor};
    }
    ::-webkit-scrollbar {
      width: 8px;
      background-color: ${(props) => props.theme.backgroundColor};;
    }
    ::-webkit-scrollbar-thumb{
      border-radius: 4px;
      background-color: ${(props) => rgba(props.theme.headingColor, 0.2)};
    }
  }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    ::selection {
      background: ${(props) => props.theme.secondaryAccentColor}; 
    }
    ::-moz-selection {
      background: ${(props) => props.theme.secondaryAccentColor}; ;
    }
`;

const ScrollArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
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
