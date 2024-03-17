import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Saved from "./pages/Saved";
import Download from "./pages/Download";
import Navbar from "./parent-components/Navbar";
import Search from "./pages/Search";
import View from "./pages/View";
import Header from "./parent-components/Header";
import react, { useState } from "react";
import Auth from "./pages/Auth";
import AdminPriviledges from "./pages/AdminPriviledges";
import AddMovie from "./pages/AddMovie";

function App() {
  const [currentNav, setCurrentNav] = useState(0);
  const [navVisibility, setNavVisibility] = useState(true);
  return (
    <BrowserRouter>
      <Navbar
        currentNav={currentNav}
        setCurrentNav={setCurrentNav}
        visible={navVisibility}
      />
      {/* <Header /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setCurrentNav={setCurrentNav}
              setNavVisibility={setNavVisibility}
              navVisibility={navVisibility}
            />
          }
        />
        <Route
          path="/Search"
          element={
            <Search
              setCurrentNav={setCurrentNav}
              setNavVisibility={setNavVisibility}
              navVisibility={navVisibility}
            />
          }
        />
        <Route
          path="/Saved"
          element={
            <Saved
              setCurrentNav={setCurrentNav}
              setNavVisibility={setNavVisibility}
              navVisibility={navVisibility}
            />
          }
        />
        <Route
          path="/Account"
          element={
            <Account
              setCurrentNav={setCurrentNav}
              setNavVisibility={setNavVisibility}
              navVisibility={navVisibility}
            />
          }
        />
        <Route
          path="/View"
          element={
            <View
              setCurrentNav={setCurrentNav}
              setNavVisibility={setNavVisibility}
              navVisibility={navVisibility}
            />
          }
        />
        <Route
          path="/Auth"
          element={
            <Auth
              setCurrentNav={setCurrentNav}
              setNavVisibility={setNavVisibility}
              navVisibility={navVisibility}
            />
          }
        />
        <Route
          path="/Admin"
          element={
            <AdminPriviledges
              setCurrentNav={setCurrentNav}
              setNavVisibility={setNavVisibility}
              navVisibility={navVisibility}
            />
          }
        />
        <Route
          path="/AddMovie"
          element={
            <AddMovie
              setCurrentNav={setCurrentNav}
              setNavVisibility={setNavVisibility}
              navVisibility={navVisibility}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
