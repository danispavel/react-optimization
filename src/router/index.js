import React from "react";
import { createBrowserRouter } from "react-router-dom";

import FirstRender from "./FirstRender";
import Key from "./Key";
import Rerender from "./Rerender";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Key />,
  },
  {
    path: "/first-render",
    element: <FirstRender />,
  },
  {
    path: "/rerender",
    element: <Rerender />,
  },
  

]);

export default router;
