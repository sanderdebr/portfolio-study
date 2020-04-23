import { configure, addParameters, addDecorator } from "@storybook/react";
// import { themes } from "@storybook/theming";
import React, { Fragment } from "react";
// import { withKnobs, select } from "@storybook/addon-knobs";
// import { withA11y } from "@storybook/addon-a11y";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/app/theme";
import { Helmet, HelmetProvider } from "react-helmet-async";
import InriaLight from "../src/assets/fonts/InriaSans-Light.woff2";
import InriaRegular from "../src/assets/fonts/InriaSans-Regular.woff2";
import InriaBold from "../src/assets/fonts/InriaSans-Bold.woff2";
import { fontStyles, GlobalStyles } from "../src/app";

addParameters({
  options: {
    theme: {
      ...themes.dark,
      brandImage: "https://codyb.co/icon.svg",
      brandTitle: "Cody Bennett Components",
      brandUrl: "https://codyb.co",
    },
  },
});

const themeKeys = {
  Dark: "dark",
  Light: "light",
};

addDecorator((story) => {
  const content = story();
  const themeKey = select("Theme", themeKeys, "dark");
  const currentTheme = theme[themeKey];

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <Fragment>
          <Helmet>
            <link
              rel="preload"
              href={InriaLight}
              as="font"
              crossorigin="crossorigin"
            />
            <link
              rel="preload"
              href={InriaRegular}
              as="font"
              crossorigin="crossorigin"
            />
            <link
              rel="preload"
              href={InriaBold}
              as="font"
              crossorigin="crossorigin"
            />
            <style>{fontStyles}</style>
          </Helmet>
          <GlobalStyles />
          <div id="storyRoot" key={themeKey}>
            {content}
          </div>
        </Fragment>
      </ThemeProvider>
    </HelmetProvider>
  );
});

addDecorator(withKnobs);
addDecorator(withA11y);

configure(require.context("../src", true, /\.stories\.js$/), module);
