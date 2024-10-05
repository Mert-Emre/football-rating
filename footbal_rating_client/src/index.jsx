import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";

import "./styles/style.css";
import App from "./App";

const el = document.querySelector("#root");
const root = ReactDOM.createRoot(el);
window.store = store;
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
