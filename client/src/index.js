import React from "react";
// import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store"
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading="loading..." persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
