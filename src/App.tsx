import React from "react";
import AllRoutes from "./routes/Routes";
import { configureFakeBackend } from "./helpers";
// For Default import Default.scss
import './assets/scss/Default.scss';
// Other
import './assets/scss/Landing.scss';
import "./assets/scss/Icons.scss";

// configure fake backend
configureFakeBackend();

const App = () => {
  return (
    <>
      <React.Fragment>
        <AllRoutes />
      </React.Fragment>
    </>
  );
};

export default App;
