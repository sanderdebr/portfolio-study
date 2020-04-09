import React from "react";
import { hydrate, render } from "react-dom";
import App from "./app";

const root = document.getElementById("root");
root.hasChildNodes() ? hydrate(<App />, root) : render(<App />, root);

const rootElement = document.getElementById("root");
