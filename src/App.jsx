import viteLogo from "/vite.svg";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Postpage from "./pages/Postpage";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  // create pages routing using useroutes hook
  const [searchTerm, setSearchTerm] = useState("");
  let pages = useRoutes([
    { path: "/", element: <Home searchTerm={searchTerm} /> },
    { path: "create", element: <Create /> },
    { path: "postpage/:id", element: <Postpage /> },
    { path: "edit/:id", element: <Edit /> },
  ]);

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Navbar>
      {pages}
    </>
  );
}

export default App;
