import viteLogo from "/vite.svg";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Postpage from "./pages/Postpage";

import Navbar from "./components/Navbar";

function App() {
  // create pages routing using useroutes hook
  let pages = useRoutes([
    { path: "/", element: <Home /> },
    { path: "create", element: <Create /> },
    { path: "postpage/:id", element: <Postpage /> },
    { path: "edit/:id", element: <Edit /> },
  ]);

  return (
    <>
      <Navbar></Navbar>
      {pages}
    </>
  );
}

export default App;
