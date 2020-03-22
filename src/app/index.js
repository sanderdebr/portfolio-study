import React, { Fragment, Suspense, useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { initialState, reducer } from "app/reducer";
import NexaLight from "assets/fonts/nexa-light.otf";
import NexaBold from "assets/fonts/nexa-bold.otf";

const App = () => {
  const { state, dispatch } = useReducer(reducer, initialState);
  const { currentTheme } = state;
  return (
    <ThemeProvider theme={currentTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<Fragment />}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Suspense>
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
