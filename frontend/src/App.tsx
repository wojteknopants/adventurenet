import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import LoginContext from "./pages/login/LoginContext";
import FeedContext from "./pages/feed/FeedContext";
import NotFound from "./pages/NotFound";
import RegistrationContext from "./pages/registration/RegistrationContext";
import ProfileContext from "./pages/profile/ProfileContext";

const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li className="flex flex-col">
            <Link to="/login">login</Link>
            <Link to="/registration">registration</Link>
            <Link to="/feed">feed</Link>
            <Link to="/profile">profile</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginContext />} />
        <Route path="/registration" element={<RegistrationContext />} />
        <Route path="/feed" element={<FeedContext />} />
        <Route path="/profile" element={<ProfileContext />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
